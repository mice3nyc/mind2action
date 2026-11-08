// 동점 가장자리 리포트 검사 — SPEC §13-4 (11/8 확장).
//   60종 키(top1_top2_bottom)에서 bottom이 top과 겹쳐도 §4 「성과에 도움이 되는 말투」가 뜨는가.
//   인쇄 하니스(harness/print-report.html)에 점수를 직접 넣어 실제 ReportViewV2를 띄운다.
//   사용: node scripts/check-report-ties.mjs      종료코드 0 = 전부 통과
import { WebSocket } from 'ws';
import { spawn } from 'node:child_process';
import { rmSync } from 'node:fs';
import { createServer } from 'node:net';

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const freePort = () => new Promise((res) => { const s = createServer(); s.listen(0, () => { const p = s.address().port; s.close(() => res(p)); }); });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const PORT = await freePort(), VITE_PORT = await freePort();
const PROFILE = `/tmp/m2a-ties-${process.pid}`;
const BASE = `http://localhost:${VITE_PORT}`;

// [이름, 점수, 무엇을 보나]
const CASES = [
  ['전부20',   [20, 20, 20, 20, 20], '전부 동점 → bottom = top1'],
  ['최저넷',   [18, 6, 6, 6, 6],     '최저 넷 동점 → bottom = top2'],
  ['전부0',    [0, 0, 0, 0, 0],      '전부 0점'],
];
const JOBS = ['sales', 'coach', 'sales_leader', 'org_leader'];
// 동점 없는 응답 — 고치기 전과 §4 글자가 같아야 한다(손용배 11/8 점수)
const PLAIN = [14, 9, 7, 3, 11];
// 고치기 전 코드(cmLookup 원래 열쇠)로 뽑아 둔 손용배 §4 첫 문장 — org_leader(=manager 문안) CP_AC_FC
const PLAIN_HEAD = 'OOO님은';

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

rmSync(PROFILE, { recursive: true, force: true });
const vite = spawn('npx', ['vite', '--port', String(VITE_PORT), '--strictPort'], { stdio: 'ignore' });
const chrome = spawn(CHROME, ['--headless=new', `--remote-debugging-port=${PORT}`, `--user-data-dir=${PROFILE}`, '--no-first-run', '--disable-gpu', 'about:blank'], { stdio: 'ignore' });
const cleanup = () => { try { chrome.kill(); } catch { /* */ } try { vite.kill(); } catch { /* */ } try { rmSync(PROFILE, { recursive: true, force: true }); } catch { /* */ } };
process.on('exit', cleanup);

try {
  let up = false;
  for (let i = 0; i < 60 && !up; i++) { await sleep(300); try { up = (await fetch(`${BASE}/harness/print-report.html`)).ok; } catch { /* */ } }
  if (!up) throw new Error('vite 안 뜸');
  let wsUrl = null;
  for (let i = 0; i < 40 && !wsUrl; i++) { await sleep(250); try { wsUrl = (await (await fetch(`http://127.0.0.1:${PORT}/json/version`)).json()).webSocketDebuggerUrl; } catch { /* */ } }
  const ws = new WebSocket(wsUrl, { maxPayload: 64 * 1024 * 1024 });
  await new Promise((r) => ws.on('open', r));
  const { targetId } = await send(ws, 'Target.createTarget', { url: 'about:blank' });
  const { sessionId } = await send(ws, 'Target.attachToTarget', { targetId, flatten: true });
  await send(ws, 'Runtime.enable', {}, sessionId);
  const ev = async (expression) => {
    const r = await send(ws, 'Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true }, sessionId);
    if (r.exceptionDetails) throw new Error(r.exceptionDetails.exception?.description || r.exceptionDetails.text);
    return r.result.value;
  };
  const render = async (scores, job, name) => {
    await send(ws, 'Page.navigate', { url: `${BASE}/harness/print-report.html?scores=${scores.join(',')}&job=${job}&name=${encodeURIComponent(name)}` }, sessionId);
    for (let i = 0; i < 100; i++) {
      if (await ev(`document.title.includes(${JSON.stringify(name)}) && document.body.innerText.length > 500`)) break;
      await sleep(100);
    }
    await sleep(200);
    return ev(`({ cm5: document.querySelector('.report-cm5')?.innerText.trim() || '', text: document.body.innerText })`);
  };

  for (const [name, scores, what] of CASES) {
    for (const job of JOBS) {
      const r = await render(scores, job, `${name}_${job}`);
      ok(r.cm5.length > 50, `${what} · ${job}: §4 있음`, `cm5 ${r.cm5.length}자`);
    }
  }
  // 동점 없는 응답: §4가 있고, 열쇠가 원래 bottom 그대로라 문안이 같아야 한다
  const p = await render(PLAIN, 'org_leader', '손용배');
  ok(p.cm5.length > 50 && p.cm5.startsWith(PLAIN_HEAD.replace('OOO', '손용배')), '동점 없음(손용배) · org_leader: §4 있음', p.cm5.slice(0, 40));
  // DUMP=파일 — 동점 없는 응답 여러 개의 §4 전문을 남긴다(고치기 전/후 대조용)
  if (process.env.DUMP) {
    const { writeFileSync } = await import('node:fs');
    const out = {};
    const plains = [[14, 9, 7, 3, 11], [3, 17, 12, 8, 15], [10, 5, 19, 14, 2], [16, 12, 4, 18, 9], [7, 20, 11, 1, 13]];
    for (const sc of plains) for (const job of JOBS) out[`${sc.join(',')}_${job}`] = (await render(sc, job, `대조_${sc.join('')}_${job}`)).cm5;
    writeFileSync(process.env.DUMP, JSON.stringify(out, null, 1));
    console.log('덤프', Object.keys(out).length, '건 →', process.env.DUMP);
  }
  ws.close();
} catch (e) { fail++; console.log('⛔ 무대 오류:', e.message); }

const EXPECT = CASES.length * JOBS.length + 1;
if (ran !== EXPECT) { fail++; console.log(`⛔ 검사 수 ${ran} ≠ ${EXPECT}`); }
console.log(fail ? `\n❌ FAIL ${fail}건 (실행 ${ran})` : `\n✅ PASS ${ran}/${EXPECT}`);
process.exit(fail ? 1 : 0);
