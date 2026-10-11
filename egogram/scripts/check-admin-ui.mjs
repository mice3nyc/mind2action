// 관리자 화면 배선 검사 — SPEC §15-8.
//   하니스 무대(harness/admin.html)에서 «실제 AdminDashboard»를 가짜 PostgREST 위에 띄워 CDP로 읽는다.
//   무대는 러너가 세우고 러너가 치운다 — vite dev와 크롬을 여기서 띄우고 끝나면 죽인다.
//   사용: node scripts/check-admin-ui.mjs      종료코드 0 = 전부 통과
import { WebSocket } from 'ws';
import { spawn } from 'node:child_process';
import { rmSync } from 'node:fs';
import { createServer } from 'node:net';

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const freePort = () => new Promise((res) => { const s = createServer(); s.listen(0, () => { const p = s.address().port; s.close(() => res(p)); }); });
const PORT = await freePort();       // 고정 포트 금지 — 다른 창의 브라우저에 붙는다
const VITE_PORT = await freePort();
const PROFILE = `/tmp/m2a-adminui-${process.pid}`;
const BASE = `http://localhost:${VITE_PORT}`;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

let msgId = 0;
function send(ws, method, params = {}, sessionId) {
  const id = ++msgId;
  ws.send(JSON.stringify({ id, method, params, ...(sessionId ? { sessionId } : {}) }));
  return new Promise((resolve, reject) => {
    const onMsg = (raw) => {
      const m = JSON.parse(raw);
      if (m.id !== id) return;
      ws.off('message', onMsg);
      m.error ? reject(new Error(m.error.message)) : resolve(m.result);
    };
    ws.on('message', onMsg);
    setTimeout(() => { ws.off('message', onMsg); reject(new Error(`timeout: ${method}`)); }, 30000);
  });
}

async function main() {
  rmSync(PROFILE, { recursive: true, force: true });
  const vite = spawn('npx', ['vite', '--port', String(VITE_PORT), '--strictPort'], { stdio: 'ignore' });
  const chrome = spawn(CHROME, [
    '--headless=new', `--remote-debugging-port=${PORT}`, `--user-data-dir=${PROFILE}`,
    '--no-first-run', '--disable-gpu', '--window-size=1400,1000', 'about:blank',
  ], { stdio: 'ignore' });
  const cleanup = () => {
    try { chrome.kill(); } catch { /* 이미 죽음 */ }
    try { vite.kill(); } catch { /* 이미 죽음 */ }
    try { rmSync(PROFILE, { recursive: true, force: true }); } catch { /* 임시 프로필 */ }
  };
  process.on('exit', cleanup);

  let viteUp = false;
  for (let i = 0; i < 60 && !viteUp; i++) {
    await sleep(300);
    try { viteUp = (await fetch(`${BASE}/harness/admin.html`)).ok; } catch { /* 아직 */ }
  }
  if (!viteUp) throw new Error('vite dev 서버가 안 떴다');
  let wsUrl = null;
  for (let i = 0; i < 40 && !wsUrl; i++) {
    await sleep(250);
    try { wsUrl = (await (await fetch(`http://127.0.0.1:${PORT}/json/version`)).json()).webSocketDebuggerUrl; } catch { /* 아직 */ }
  }
  if (!wsUrl) throw new Error('크롬 디버그 포트 안 열림');

  const ws = new WebSocket(wsUrl, { maxPayload: 256 * 1024 * 1024 });
  await new Promise((r) => ws.on('open', r));
  const { targetId } = await send(ws, 'Target.createTarget', { url: 'about:blank' });
  const { sessionId } = await send(ws, 'Target.attachToTarget', { targetId, flatten: true });
  await send(ws, 'Page.enable', {}, sessionId);
  await send(ws, 'Runtime.enable', {}, sessionId);
  const exceptions = [];
  ws.on('message', (raw) => {
    const m = JSON.parse(raw);
    if (m.method === 'Runtime.exceptionThrown') exceptions.push(m.params.exceptionDetails.exception?.description || m.params.exceptionDetails.text);
  });

  const ev = async (expression) => {
    const r = await send(ws, 'Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true }, sessionId);
    if (r.exceptionDetails) throw new Error(`evaluate 실패: ${r.exceptionDetails.exception?.description || r.exceptionDetails.text}`);
    return r.result.value;
  };
  // 조건이 참이 될 때까지 — 고정 sleep으로 재지 않는다
  const until = async (expression, label) => {
    for (let i = 0; i < 100; i++) { if (await ev(expression)) return true; await sleep(100); }
    throw new Error(`기다려도 안 됨: ${label}`);
  };

  let fail = 0;
  let ran = 0;
  const ok = (cond, label, detail = '') => { ran++; if (cond) console.log('✓', label); else { fail++; console.log('⛔', label, detail); } };

  await send(ws, 'Page.navigate', { url: `${BASE}/harness/admin.html` }, sessionId);
  await until(`!!document.querySelector('.admin-count') && /\\d+건/.test(document.querySelector('.admin-count').textContent)`, '헤더 건수');

  const D = await ev(`({ total: __fake.data.responses.length, expected: __fake.data.expected, camps: __fake.data.campaigns.map(c => ({ id: c.id, name: c.client_name })) })`);
  const rowCount = `document.querySelectorAll('.admin-table tbody tr').length`;
  const selectVal = `document.querySelector('.results-filter-select').value`;
  const served = `__fake.stats.rowsServed`;

  // 1. 첫 화면
  const header = await ev(`document.querySelector('.admin-count').textContent`);
  ok(header.includes(`설문 결과 ${D.total}건`) && header.includes(`캠페인 ${D.camps.length}개`), `헤더 「설문 결과 ${D.total}건 · 캠페인 ${D.camps.length}개」`, header);
  await until(`${rowCount} > 0`, '첫 표');
  ok(await ev(selectVal) === 'camp-d', '자동 선택 = camp-d(응답 있는 것 중 가장 최근)', await ev(selectVal));
  ok(await ev(rowCount) === D.expected['camp-d'], `표 행 수 = ${D.expected['camp-d']}`, String(await ev(rowCount)));
  ok(await ev(served) === D.expected['camp-d'], `첫 화면에서 내려받은 본문 = ${D.expected['camp-d']}행(고른 캠페인 것만)`, `${await ev(served)}행`);
  const opts = await ev(`[...document.querySelectorAll('.results-filter-select option')].map(o => o.textContent)`);
  ok(!opts.some((t) => t.startsWith('전체')), '필터에 「전체」 없음', opts.join(' | '));
  ok(opts[opts.length - 1] === '캠페인 없음 (18)', '필터 끝 = 「캠페인 없음 (18)」', opts.join(' | '));
  ok(opts.includes('가나 사업단 (1300)') && opts.includes('마바 사업단 (0)'), '필터 항목에 캠페인별 인원', opts.join(' | '));
  const allBtn = await ev(`[...document.querySelectorAll('.admin-actions button')].map(b => b.textContent.trim())`);
  ok(allBtn.includes(`전체 CSV (${D.total}건)`), '「전체 CSV」 버튼', allBtn.join(' | '));

  // 2. 필터 변경 → 그 캠페인만 읽는다
  const choose = async (value) => {
    await ev(`(() => { const s = document.querySelector('.results-filter-select'); const set = Object.getOwnPropertyDescriptor(HTMLSelectElement.prototype, 'value').set; set.call(s, ${JSON.stringify(value)}); s.dispatchEvent(new Event('change', { bubbles: true })); })()`);
  };
  for (const [key, n, label] of [['camp-b', D.expected['camp-b'], '다라 사업단'], ['camp-a', D.expected['camp-a'], '가나 사업단(1,300명 — 상한 초과)'], ['none', 18, '캠페인 없음']]) {
    const before = await ev(served);
    await choose(key);
    await until(`${selectVal} === ${JSON.stringify(key)} && ${rowCount} === ${n}`, `${label} 표 ${n}행`);
    ok(await ev(rowCount) === n, `${label}: 표 ${n}행`);
    ok((await ev(served)) - before === n, `${label}: 새로 내려받은 본문 = ${n}행`, `${(await ev(served)) - before}행`);
  }
  // 0명 캠페인
  await choose('camp-c');
  await until(`document.querySelector('.admin-empty')?.textContent.includes('아직 응답이 없습니다')`, '0명 캠페인 안내');
  ok(true, '0명 캠페인: 「이 캠페인에는 아직 응답이 없습니다」');

  const clickTab = async (text) => ev(`[...document.querySelectorAll('.admin-tab')].find(b => b.textContent.trim() === ${JSON.stringify(text)}).click()`);

  // 4. 캠페인 관리 탭 — 인원 열
  await clickTab('캠페인 관리');
  await until(`document.querySelectorAll('table tbody tr').length >= ${D.camps.length}`, '캠페인 관리 표');
  const mgr = await ev(`[...document.querySelectorAll('table tbody tr')].map(tr => tr.textContent)`);
  for (const c of D.camps) {
    const row = mgr.find((t) => t.includes(c.name));
    const n = D.expected[c.id];
    ok(!!row && new RegExp(`(^|\\D)${n}(/|\\D)`).test(row.replace(c.name, '')), `캠페인 관리: ${c.name} 인원 ${n}`, row ? row.slice(0, 80) : '행 없음');
  }
  // 「설문결과 데이터 보기」 → 그 캠페인이 골라진 결과 탭
  await ev(`[...document.querySelectorAll('table tbody tr')].find(tr => tr.textContent.includes('다라 사업단')).querySelector('.btn-view-results').click()`);
  await until(`document.querySelector('.results-filter-select') && ${selectVal} === 'camp-b' && ${rowCount} === ${D.expected['camp-b']}`, '데이터 보기 → camp-b');
  ok(true, '캠페인 관리 「설문결과 데이터 보기」 → 그 캠페인 표');

  // 5. 진행 현황 · 분석 탭이 뜬다
  await clickTab('진행 현황');
  await sleep(300);
  ok((await ev(`document.querySelector('.admin-section').textContent.length`)) > 200, '진행 현황 탭 렌더');
  const beforeA = await ev(served);
  await clickTab('캠페인 분석');
  await until(`document.querySelector('.admin-section').textContent.includes('참여 인원')`, '분석 탭');
  const aText = await ev(`document.querySelector('.admin-section').textContent`);
  ok(aText.includes('1300명'), '분석 탭: 응답 최다 캠페인(1,300명) 분석', aText.slice(0, 120));
  ok((await ev(served)) - beforeA === 1300, '분석 탭: 새로 내려받은 본문 = 1,300행(그 캠페인 것만)', `${(await ev(served)) - beforeA}행`);

  ok((await ev(`__fake.blocked.length`)) === 0, '진짜 Supabase로 나가려던 요청 0', JSON.stringify(await ev(`__fake.blocked`)));
  ok(exceptions.length === 0, '콘솔 예외 0', exceptions.join(' / ').slice(0, 300));

  // 6. 개수 조회 실패 → 「0건」이 아니라 경고 문구. 캠페인을 손으로 고르면 본문은 읽힌다
  await send(ws, 'Page.navigate', { url: `${BASE}/harness/admin.html?failCounts=1` }, sessionId);
  await until(`!!document.querySelector('.admin-count[role=alert]')`, '개수 실패 경고');
  const failHeader = await ev(`[...document.querySelectorAll('.admin-count')].map(p => p.textContent).join(' // ')`);
  ok(!/설문 결과 0건/.test(failHeader) && failHeader.includes('불러오지 못했습니다'), '개수 실패: 「0건」이 아니라 경고 문구', failHeader);
  ok((await ev(`document.querySelector('.admin-empty')?.textContent || ''`)).includes('불러오지 못했습니다'), '개수 실패: 표 자리에도 실패 안내');
  await choose('camp-b');
  await until(`${rowCount} === ${D.expected['camp-b']}`, '개수 실패 중에도 고른 캠페인 표');
  ok(true, '개수 실패 중에도 손으로 고른 캠페인은 읽힌다');
  ok(exceptions.length === 0, '콘솔 예외 0 (실패 시나리오 포함)', exceptions.join(' / ').slice(0, 300));

  const EXPECT = 29;
  if (ran !== EXPECT) { fail++; console.log(`⛔ 검사 ${ran}개만 돎 (${EXPECT}개여야 함)`); }
  ws.close();
  cleanup();
  console.log(fail ? `\n⛔ FAIL ${fail}건` : `\n✅ PASS ${ran}/${EXPECT}`);
  process.exit(fail ? 1 : 0);
}

main().catch((e) => { console.error('⛔', e.message); process.exit(1); });
