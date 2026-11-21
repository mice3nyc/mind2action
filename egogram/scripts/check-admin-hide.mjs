// 지움(보관)·되살리기 검사 — SPEC-org-edition §12 검증 (a).
//   하니스(harness/admin.html)에 «실제 AdminDashboard·ReportBatchPage»를 가짜 PostgREST 위에 띄워 CDP로 읽는다.
//   일반판 무대(--mode org, ?data=hide) master·son 두 번 + 보험판 무대 한 번.
//   보험판 = 버튼·토글 변화 0, 나가는 요청(URL·본문)에 `hidden_at`이 한 글자도 없다.
//   무대(vite·크롬)는 러너가 세우고 러너가 치운다. 크롬 디버그 포트는 빈 포트 + 새 프로필.
//   사용: node scripts/check-admin-hide.mjs      종료코드 0 = 전부 통과
import { WebSocket } from 'ws';
import { spawn } from 'node:child_process';
import { rmSync } from 'node:fs';
import { createServer } from 'node:net';

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const freePort = () => new Promise((res) => { const s = createServer(); s.listen(0, () => { const p = s.address().port; s.close(() => res(p)); }); });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

let msgId = 0;
function send(ws, method, params = {}, sessionId) {
  const id = ++msgId;
  ws.send(JSON.stringify({ id, method, params, ...(sessionId ? { sessionId } : {}) }));
  return new Promise((resolve, reject) => {
    const onMsg = (raw) => { const m = JSON.parse(raw); if (m.id !== id) return; ws.off('message', onMsg); m.error ? reject(new Error(m.error.message)) : resolve(m.result); };
    ws.on('message', onMsg);
    setTimeout(() => { ws.off('message', onMsg); reject(new Error(`timeout: ${method}`)); }, 30000);
  });
}

let fail = 0, ran = 0;
const ok = (cond, label, detail = '') => { ran++; if (cond) console.log('✓', label); else { fail++; console.log('⛔', label, detail); } };

// 표 읽기 도구 (페이지 안에서 도는 식)
const rowCount = `document.querySelectorAll('.admin-table tbody tr').length`;
const hiddenRows = `document.querySelectorAll('.admin-table tbody tr.row-hidden').length`;
const header = `document.querySelector('.admin-count')?.textContent || ''`;
const selectVal = `document.querySelector('.results-filter-select')?.value`;
const names = `[...document.querySelectorAll('.admin-table tbody tr .td-name')].map(td => td.firstChild?.textContent?.trim() || td.textContent.trim())`;
// 행마다 버튼 글자 묶음 — 「마감/재개」와 같은 클래스라 글자로 가른다(§4)
const rowButtons = `[...document.querySelectorAll('.admin-table tbody tr')].map(tr => [...tr.querySelectorAll('button')].map(b => b.textContent.trim()).filter(t => ['지움', '삭제', '되살리기'].includes(t)).join('+'))`;
const colsMatch = `(() => { const h = document.querySelectorAll('.admin-table thead th').length; const rows = [...document.querySelectorAll('.admin-table tbody tr')]; return rows.length > 0 && rows.every(tr => tr.children.length === h); })()`;
const options = `[...document.querySelectorAll('.results-filter-select option')].map(o => o.textContent)`;
const toggle = `document.querySelector('.admin-hidden-toggle input')`;
const clickTab = (text) => `[...document.querySelectorAll('.admin-tab')].find(b => b.textContent.trim() === ${JSON.stringify(text)}).click()`;
const clickRowBtn = (name, btn) => `(() => { const tr = [...document.querySelectorAll('.admin-table tbody tr')].find(tr => tr.querySelector('.td-name')?.textContent.trim().startsWith(${JSON.stringify(name)})); [...tr.querySelectorAll('button')].find(b => b.textContent.trim() === ${JSON.stringify(btn)}).click(); })()`;
const clickButton = (text) => `[...document.querySelectorAll('button')].find(b => b.textContent.trim().startsWith(${JSON.stringify(text)})).click()`;
const choose = (value) => `(() => { const s = document.querySelector('.results-filter-select'); Object.getOwnPropertyDescriptor(HTMLSelectElement.prototype, 'value').set.call(s, ${JSON.stringify(value)}); s.dispatchEvent(new Event('change', { bubbles: true })); })()`;
const setToggle = (on) => `(() => { const el = ${toggle}; if (el.checked !== ${on}) el.click(); })()`;
const lastCsv = `(() => { const t = window.__csv[window.__csv.length - 1] || ''; return t.replace(/^\\ufeff/, '').split('\\n').slice(1); })()`;

async function stage(mode, run) {
  const PORT = await freePort(), VITE_PORT = await freePort();
  const PROFILE = `/tmp/m2a-hide-${process.pid}-${mode}`;
  const BASE = `http://localhost:${VITE_PORT}${mode === 'org' ? '/org' : ''}`;
  rmSync(PROFILE, { recursive: true, force: true });
  const vite = spawn('npx', ['vite', '--port', String(VITE_PORT), '--strictPort', ...(mode === 'org' ? ['--mode', 'org'] : [])], { stdio: 'ignore' });
  const chrome = spawn(CHROME, ['--headless=new', `--remote-debugging-port=${PORT}`, `--user-data-dir=${PROFILE}`, '--no-first-run', '--disable-gpu', '--window-size=1400,1000', 'about:blank'], { stdio: 'ignore' });
  const cleanup = () => { try { chrome.kill(); } catch { /* */ } try { vite.kill(); } catch { /* */ } try { rmSync(PROFILE, { recursive: true, force: true }); } catch { /* */ } };
  try {
    let up = false;
    for (let i = 0; i < 60 && !up; i++) { await sleep(300); try { up = (await fetch(`${BASE}/harness/admin.html`)).ok; } catch { /* */ } }
    if (!up) throw new Error(`vite(${mode}) 안 뜸`);
    let wsUrl = null;
    for (let i = 0; i < 40 && !wsUrl; i++) { await sleep(250); try { wsUrl = (await (await fetch(`http://127.0.0.1:${PORT}/json/version`)).json()).webSocketDebuggerUrl; } catch { /* */ } }
    if (!wsUrl) throw new Error('크롬 디버그 포트 안 열림');
    const ws = new WebSocket(wsUrl, { maxPayload: 256 * 1024 * 1024 });
    await new Promise((r) => ws.on('open', r));
    const { targetId } = await send(ws, 'Target.createTarget', { url: 'about:blank' });
    const { sessionId } = await send(ws, 'Target.attachToTarget', { targetId, flatten: true });
    await send(ws, 'Runtime.enable', {}, sessionId);
    const exceptions = [];
    ws.on('message', (raw) => { const m = JSON.parse(raw); if (m.method === 'Runtime.exceptionThrown') exceptions.push(m.params.exceptionDetails.exception?.description || m.params.exceptionDetails.text); });
    const ev = async (expression) => {
      const r = await send(ws, 'Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true }, sessionId);
      if (r.exceptionDetails) throw new Error(r.exceptionDetails.exception?.description || r.exceptionDetails.text);
      return r.result.value;
    };
    const until = async (expr, label) => { for (let i = 0; i < 150; i++) { if (await ev(expr)) return; await sleep(100); } throw new Error(`기다려도 안 됨: ${label}`); };
    // 페이지를 떠나기 전에 그 페이지가 보낸 요청 기록을 모은다 — 새 페이지마다 기록이 비기 때문
    const logs = [];
    const keepLog = async () => { try { logs.push(...(await ev('window.__fake ? __fake.stats.log : []'))); } catch { /* 첫 페이지 */ } };
    const open = async (query, readyExpr, label) => {
      await keepLog();
      await send(ws, 'Page.navigate', { url: `${BASE}/harness/admin.html${query}` }, sessionId);
      await until(`window.__fake && (${readyExpr})`, label);
    };
    await run({ ev, until, open, logs, keepLog, exceptions, blocked: () => ev('__fake.blocked.length') });
    ws.close();
  } finally { cleanup(); }
}

// ─── 일반판 · master ───
async function orgMaster({ ev, until, open, logs, keepLog, exceptions, blocked }) {
  await open('?data=hide', `/\\d+건/.test(${header}) && ${rowCount} > 0`, '[org master] 첫 표');
  ok(await ev('window.__edition') === 'org', '[org master] 에디션 = org', await ev('window.__edition'));
  const h = await ev(header);
  ok(h.includes('설문 결과 7건') && h.includes('캠페인 2개'), '[org master] 헤더 = 지운 것 뺀 7건 · 캠페인 2개', h);
  ok(await ev(`!!${toggle}`), '[org master] 「지운 항목 보기」 토글 있음');
  ok(await ev(selectVal) === 'camp-x' && await ev(rowCount) === 5, '[org master] camp-x 표 = 5행(지운 1명 빠짐)', `${await ev(selectVal)} ${await ev(rowCount)}`);
  ok(!(await ev(names)).includes('X가짜5'), '[org master] 지운 응답(X가짜5) 표에 없음', (await ev(names)).join(','));
  const btns = await ev(rowButtons);
  ok(btns.length === 5 && btns.every((b) => b === '지움+삭제'), '[org master] 행마다 「지움」「삭제」', btns.join(' | '));
  ok(await ev(colsMatch), '[org master] 머리칸 수 = 행 칸 수');
  const opts = await ev(options);
  ok(!opts.some((o) => o.includes('두리')) && opts.includes('하나 시험청 (5)') && opts.includes('캠페인 없음 (2)'), '[org master] 필터: 지운 캠페인 없음 · 수는 지운 것 뺀 값', opts.join(' | '));
  // CSV — 고른 캠페인 · 전체
  await ev(clickButton('CSV 다운로드'));
  await until('window.__csv.length === 1', 'CSV');
  const csv1 = await ev(lastCsv);
  ok(csv1.length === 5 && !csv1.some((l) => l.includes('X가짜5')), '[org master] 캠페인 CSV = 5줄, 지운 응답 없음', `${csv1.length}줄`);
  ok((await ev(`[...document.querySelectorAll('.admin-actions button')].map(b => b.textContent.trim()).join('|')`)).includes('전체 CSV (7건)'), '[org master] 「전체 CSV (7건)」');
  await ev(clickButton('전체 CSV'));
  await until('window.__csv.length === 2', '전체 CSV');
  const csvAll = await ev(lastCsv);
  ok(csvAll.length === 7 && !csvAll.some((l) => /Y가짜|X가짜5|N가짜2/.test(l)), '[org master] 전체 CSV = 7줄, 지운 응답·지운 캠페인 응답 없음', csvAll.map((l) => l.split(',')[1]).join(','));
  await ev(choose('none'));
  await until(`${selectVal} === 'none' && ${rowCount} === 2`, '캠페인 없음 표');
  ok(!(await ev(names)).includes('N가짜2'), '[org master] 캠페인 없음 = 2행, 지운 응답 없음', (await ev(names)).join(','));

  // 캠페인 관리 · 분석
  await ev(clickTab('캠페인 관리'));
  await until(`document.querySelectorAll('.campaign-table tbody tr').length > 0`, '캠페인 관리 표');
  const camps = await ev(`[...document.querySelectorAll('.campaign-table tbody tr')].map(tr => tr.querySelector('.td-name').firstChild.textContent.trim())`);
  ok(camps.join(',') === '세모 시험청,하나 시험청', '[org master] 캠페인 목록에 지운 캠페인 없음', camps.join(','));
  const cbtns = await ev(rowButtons);
  ok(cbtns.every((b) => b === '지움+삭제'), '[org master] 캠페인마다 「지움」「삭제」', cbtns.join(' | '));
  await ev(clickTab('진행 현황'));
  await sleep(200);
  ok(!(await ev(`document.querySelector('.admin-section').textContent`)).includes('두리'), '[org master] 진행 현황에 지운 캠페인 없음');
  await ev(clickTab('캠페인 분석'));
  await until(`document.querySelector('.admin-section').textContent.includes('참여 인원')`, '분석 탭');
  const aText = await ev(`document.querySelector('.admin-section').textContent`);
  ok(aText.includes('5명') && !aText.includes('두리'), '[org master] 분석 = camp-x 5명, 지운 캠페인 없음', aText.slice(0, 160));

  // 응답 지움 → 빠짐 → 토글로 보임 → 되살리기 → 돌아옴
  await ev(clickTab('결과 확인'));
  await ev(choose('camp-x'));
  await until(`${selectVal} === 'camp-x' && ${rowCount} === 5`, 'camp-x 표');
  await ev(clickRowBtn('X가짜0', '지움'));
  await until(`${rowCount} === 4`, '지움 뒤 4행');
  const conf = await ev('window.__confirms[window.__confirms.length - 1]');
  ok(conf === 'X가짜0님의 결과를 목록에서 지웁니다. (관리자가 되살릴 수 있습니다)', '[org master] 지움 확인 문구', conf);
  ok((await ev(header)).includes('설문 결과 6건'), '[org master] 지움 뒤 헤더 6건', await ev(header));
  ok((await ev('__fake.stats.log')).some((l) => l.startsWith('PATCH responses') && l.includes('id=eq.hresp-camp-x-0') && l.includes('"hidden_at":"20')), '[org master] 지움 = responses PATCH hidden_at(시각)');
  await ev(setToggle(true));
  await until(`${rowCount} === 6 && ${hiddenRows} === 2`, '토글 켜면 6행(지운 2 흐리게)');
  ok(true, '[org master] 토글 켜면 지운 2명이 흐리게 섞여 보임');
  const tb = await ev(rowButtons);
  ok(tb.filter((b) => b === '되살리기+삭제').length === 2 && tb.filter((b) => b === '지움+삭제').length === 4, '[org master] 지운 행엔 「되살리기」「삭제」, 나머지는 「지움」「삭제」', tb.join(' | '));
  ok((await ev(options)).includes('두리 시험청 (4) · 지움'), '[org master] 토글 켜면 필터에 지운 캠페인 「· 지움」', (await ev(options)).join(' | '));
  ok((await ev(header)).includes('설문 결과 6건') && (await ev(header)).includes('캠페인 2개'), '[org master] 토글 켜도 헤더 수는 지운 것 뺀 값', await ev(header));
  await ev(clickButton('CSV 다운로드'));
  await until('window.__csv.length === 3', '토글 중 CSV');
  ok((await ev(lastCsv)).length === 4, '[org master] 토글 켜도 CSV엔 지운 응답 없음(4줄)', String((await ev(lastCsv)).length));
  await ev(clickRowBtn('X가짜0', '되살리기'));
  await until(`${hiddenRows} === 1`, '되살리기 뒤 흐린 행 1');
  await ev(setToggle(false));
  await until(`${rowCount} === 5 && /설문 결과 7건/.test(${header})`, '토글 끄면 5행 · 7건');
  ok((await ev(names)).includes('X가짜0'), '[org master] 되살리기 → 토글 꺼도 다시 보임 · 헤더 7건');

  // 캠페인 지움 → 그 응답도 빠짐 → 되살리기
  await ev(clickTab('캠페인 관리'));
  await until(`document.querySelectorAll('.campaign-table tbody tr').length === 2`, '캠페인 표');
  await ev(clickRowBtn('하나 시험청', '지움'));
  await until(`document.querySelectorAll('.campaign-table tbody tr').length === 1`, '캠페인 지움 뒤 1행');
  ok((await ev('window.__confirms[window.__confirms.length - 1]')).includes('설문 링크는 계속 열립니다'), '[org master] 캠페인 지움 확인 문구(링크는 열림)');
  ok((await ev('__fake.stats.log')).some((l) => l.startsWith('PATCH campaigns') && l.includes('id=eq.camp-x') && l.includes('"hidden_at":"20')), '[org master] 캠페인 지움 = campaigns PATCH hidden_at');
  ok((await ev('window.__csv.length')) === 3, '[org master] 캠페인 지움은 백업 CSV를 받지 않음');
  const hh = await ev(header);
  ok(hh.includes('설문 결과 2건') && hh.includes('캠페인 1개'), '[org master] 캠페인 지움 뒤 헤더 = 그 응답 빠진 2건 · 캠페인 1개', hh);
  await ev(clickTab('결과 확인'));
  await until(`${selectVal} === 'none' && ${rowCount} === 2`, '캠페인 지움 뒤 결과 탭');
  ok(!(await ev(options)).some((o) => o.includes('하나')), '[org master] 지운 캠페인은 필터에서 빠짐', (await ev(options)).join(' | '));
  await ev(clickButton('전체 CSV'));
  await until('window.__csv.length === 4', '전체 CSV');
  ok((await ev(lastCsv)).length === 2, '[org master] 전체 CSV = 2줄(지운 캠페인 응답 빠짐)', String((await ev(lastCsv)).length));
  await ev(setToggle(true));
  await ev(clickTab('캠페인 관리'));
  await until(`document.querySelectorAll('.campaign-table tbody tr.row-hidden').length === 2`, '토글 켜면 지운 캠페인 둘 흐리게');
  ok(!(await ev(`!!document.querySelector('a[href*="report-batch/camp-y"]')`)), '[org master] 지운 캠페인엔 전체 PDF 링크 없음');
  await ev(clickRowBtn('하나 시험청', '되살리기'));
  await until(`document.querySelectorAll('.campaign-table tbody tr.row-hidden').length === 1`, '캠페인 되살리기');
  await ev(setToggle(false));
  await until(`document.querySelectorAll('.campaign-table tbody tr').length === 2 && /설문 결과 7건 · 캠페인 2개/.test(${header})`, '되살리기 뒤 7건 · 2개');
  ok(true, '[org master] 캠페인 되살리기 → 7건 · 캠페인 2개로 돌아옴');
  ok(await blocked() === 0, '[org master] 진짜 Supabase로 나가려던 요청 0');

  // 전체 리포트 일괄 출력
  await open('?data=hide&batch=camp-x', `!!document.querySelector('.report-batch-title')`, '일괄 리포트');
  await until(`document.querySelectorAll('.report-batch-item').length === 5`, '일괄 리포트 5명');
  const bt = await ev(`document.querySelector('.report-batch').textContent`);
  ok(bt.includes('참여 5명') && !bt.includes('X가짜5'), '[org master] 일괄 리포트 camp-x = 5명, 지운 응답 없음', bt.slice(0, 80));
  await open('?data=hide&batch=camp-y', `!!document.querySelector('.report-batch-title')`, '지운 캠페인 일괄 리포트');
  ok((await ev(`document.querySelector('.report-batch').textContent`)).includes('참여자가 없습니다'), '[org master] 지운 캠페인 일괄 리포트 = 비어 있음');
  await keepLog();
  ok(logs.some((l) => l.includes('hidden_at=is.null')), '[org master] 일반판 요청엔 hidden_at 거르기가 붙는다(검사 자신의 접촉 확인)');
  ok(exceptions.length === 0, '[org master] 콘솔 예외 0', exceptions.join(' / ').slice(0, 300));
}

// ─── 일반판 · son ───
async function orgSon({ ev, until, open, exceptions, blocked }) {
  await open('?data=hide&canDelete=0', `/\\d+건/.test(${header}) && ${rowCount} > 0`, '[org son] 첫 표');
  ok(!(await ev(`!!${toggle}`)), '[org son] 「지운 항목 보기」 토글 없음');
  const btns = await ev(rowButtons);
  ok(btns.length === 5 && btns.every((b) => b === '지움'), '[org son] 결과 표: 「지움」만', btns.join(' | '));
  ok(await ev(colsMatch), '[org son] 머리칸 수 = 행 칸 수');
  await ev(clickTab('캠페인 관리'));
  await until(`document.querySelectorAll('.campaign-table tbody tr').length === 2`, '[org son] 캠페인 표');
  const cb = await ev(rowButtons);
  ok(cb.every((b) => b === '지움'), '[org son] 캠페인 관리: 「지움」만', cb.join(' | '));
  await ev(clickTab('결과 확인'));
  await until(`${rowCount} === 5`, 'son 결과');
  await ev(clickRowBtn('X가짜1', '지움'));
  await until(`${rowCount} === 4`, 'son 지움 뒤 4행');
  ok(!(await ev(names)).includes('X가짜1'), '[org son] son도 지울 수 있다 → 표에서 빠짐');
  ok(await blocked() === 0, '[org son] 진짜 Supabase로 나가려던 요청 0');
  ok(exceptions.length === 0, '[org son] 콘솔 예외 0', exceptions.join(' / ').slice(0, 300));
}

// ─── 보험판 ───
async function insurance({ ev, until, open, logs, keepLog, exceptions, blocked }) {
  await open('', `/\\d+건/.test(${header}) && ${rowCount} > 0`, '[insurance] 첫 표');
  ok(await ev('window.__edition') === 'insurance', '[insurance] 에디션 = insurance');
  ok(!(await ev(`!!${toggle}`)), '[insurance] 토글 없음');
  const btns = await ev(rowButtons);
  ok(btns.length > 0 && btns.every((b) => b === '삭제'), '[insurance] 결과 표: 「삭제」만(지움 없음)', [...new Set(btns)].join(' | '));
  ok(await ev(`document.querySelectorAll('.admin-table tbody tr.row-hidden, .admin-table tbody tr[style]').length`) === 0, '[insurance] 행에 흐림 표시 없음');
  const first = await ev(`document.querySelector('.admin-table tbody tr .td-name').textContent.trim()`);
  await ev(`[...document.querySelector('.admin-table tbody tr').querySelectorAll('button')].find(b => b.textContent.trim() === '삭제').click()`);
  await until('window.__confirms.length > 0', '삭제 확인');
  const c0 = await ev('window.__confirms[0]');
  ok(c0 === `${first}님의 결과를 삭제하시겠습니까?`, '[insurance] 삭제 확인 문구 그대로', c0);
  await ev(clickButton('전체 CSV'));
  await until('window.__csv.length > 0', '전체 CSV');
  await ev(clickTab('캠페인 관리'));
  await until(`document.querySelectorAll('.campaign-table tbody tr').length > 0`, '캠페인 표');
  const cb = await ev(rowButtons);
  ok(cb.every((b) => b === '삭제'), '[insurance] 캠페인 관리: 「삭제」만(지움 없음)', [...new Set(cb)].join(' | '));
  await ev(clickTab('캠페인 분석'));
  await until(`document.querySelector('.admin-section').textContent.includes('참여 인원')`, '분석 탭');
  await ev(clickTab('진행 현황'));
  // 지움 표본을 보험판에 올려도 거르지 않는다(보험판엔 그런 열이 없다는 전제 그대로) — 13건 · 3개
  await open('?data=hide', `/\\d+건/.test(${header})`, '[insurance] 지움 표본');
  const h = await ev(header);
  ok(h.includes('설문 결과 13건') && h.includes('캠페인 3개'), '[insurance] 지움 표본도 거르지 않음(13건 · 3개)', h);
  await open('?batch=camp-b', `!!document.querySelector('.report-batch-count')`, '[insurance] 일괄 리포트');
  ok((await ev(`document.querySelector('.report-batch').textContent`)).includes('참여 40명'), '[insurance] 일괄 리포트 40명 그대로');
  await keepLog();
  ok(logs.length > 10, `[insurance] 요청 기록을 모았다(${logs.length}건)`);
  const leak = logs.filter((l) => l.includes('hidden_at'));
  ok(leak.length === 0, '[insurance] 나간 요청 URL·본문에 hidden_at 0', leak.slice(0, 3).join(' / '));
  ok(await blocked() === 0, '[insurance] 진짜 Supabase로 나가려던 요청 0');
  ok(exceptions.length === 0, '[insurance] 콘솔 예외 0', exceptions.join(' / ').slice(0, 300));
}

try {
  await stage('insurance', insurance);
  await stage('org', orgMaster);
  await stage('org', orgSon);
} catch (e) { fail++; console.log('⛔ 무대 오류:', e.message); }
const EXPECT = 57;
if (ran !== EXPECT) { fail++; console.log(`⛔ 검사 수 ${ran} ≠ ${EXPECT} — 일부가 안 돌았다`); }
console.log(fail ? `\n❌ FAIL ${fail}건 (실행 ${ran})` : `\n✅ PASS ${ran}/${EXPECT}`);
process.exit(fail ? 1 : 0);
