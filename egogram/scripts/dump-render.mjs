// 렌더 덤프 하니스 — 용어 사전 개편의 회귀 정답지를 만든다.
//   헤드리스 크롬 + CDP로 실제 렌더된 DOM에서 "화면에 나간 글자와 색"만 뽑는다.
//   개편 전/후 두 번 돌려 diff. 다른 곳이 나오면 그건 버그다. (SPEC-ego-terms §8)
//
//   사용: node scripts/dump-render.mjs <출력디렉토리> [베이스URL]
//   전제: 다른 터미널에서 `npx vite preview --port 4173`가 떠 있어야 한다.

import { WebSocket } from 'ws';
import { spawn } from 'node:child_process';
import { mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { join } from 'node:path';

const OUT = process.argv[2];
const BASE = process.argv[3] || 'http://localhost:4173';
if (!OUT) { console.error('사용: node scripts/dump-render.mjs <출력디렉토리> [베이스URL]'); process.exit(1); }

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const PORT = 9222 + Math.floor(process.pid % 100);
const PROFILE = `/tmp/m2a-dump-${process.pid}`;

// 덤프 대상 — 성향 이름·색이 나가는 화면 전부.
const PAGES = [
  ['simhwa_김정임', '/#/preview/simhwa?s=김정임'],
  ['simhwa_이서연', '/#/preview/simhwa?s=이서연'],
  ['simhwa_이선규', '/#/preview/simhwa?s=이선규'],
  ['simhwa_이영수', '/#/preview/simhwa?s=이영수'],
  ['simhwa_허진랑', '/#/preview/simhwa?s=허진랑'],
  ['result_김정임', '/#/preview/result?cp=14&np=13&a=18&fc=14&ac=6&name=김정임'],
  ['result_이서연', '/#/preview/result?cp=6&np=16&a=8&fc=14&ac=17&name=이서연'],
];

// 페이지 안에서 돌 코드 — 보이는 텍스트 + 색 있는 요소의 (텍스트, rgb) 목록.
const EXTRACT = `(() => {
  const root = document.querySelector('#root') || document.body;
  const text = root.innerText.replace(/\\s+/g, ' ').trim();
  const colored = [];
  for (const el of root.querySelectorAll('*')) {
    if (el.children.length) continue;                 // 잎 노드만
    const t = (el.textContent || '').trim();
    if (!t) continue;
    const c = getComputedStyle(el).color;
    colored.push(t + ' :: ' + c);
  }
  const svgFills = [...root.querySelectorAll('svg circle, svg polygon, svg path')]
    .map(e => (e.getAttribute('fill') || '') + '|' + (e.getAttribute('stroke') || ''));
  return JSON.stringify({ text, colored, svgFills }, null, 1);
})()`;

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

const sleep = (ms) => new Promise(r => setTimeout(r, ms));

async function main() {
  rmSync(PROFILE, { recursive: true, force: true });
  mkdirSync(OUT, { recursive: true });

  const chrome = spawn(CHROME, [
    '--headless=new', `--remote-debugging-port=${PORT}`, `--user-data-dir=${PROFILE}`,
    '--no-first-run', '--disable-gpu', '--window-size=1200,2000', 'about:blank',
  ], { stdio: 'ignore' });

  let wsUrl = null;
  for (let i = 0; i < 40 && !wsUrl; i++) {
    await sleep(250);
    try {
      const r = await fetch(`http://127.0.0.1:${PORT}/json/version`);
      wsUrl = (await r.json()).webSocketDebuggerUrl;
    } catch { /* 아직 안 뜸 */ }
  }
  if (!wsUrl) { chrome.kill(); throw new Error('크롬 디버그 포트 안 열림'); }

  const ws = new WebSocket(wsUrl, { maxPayload: 256 * 1024 * 1024 });
  await new Promise(r => ws.on('open', r));

  const { targetId } = await send(ws, 'Target.createTarget', { url: 'about:blank' });
  const { sessionId } = await send(ws, 'Target.attachToTarget', { targetId, flatten: true });
  await send(ws, 'Runtime.enable', {}, sessionId);
  await send(ws, 'Console.enable', {}, sessionId);

  const consoleErrors = [];
  ws.on('message', (raw) => {
    const m = JSON.parse(raw);
    if (m.method === 'Runtime.exceptionThrown') consoleErrors.push(m.params.exceptionDetails?.text || 'exception');
    if (m.method === 'Console.messageAdded' && m.params.message.level === 'error') consoleErrors.push(m.params.message.text);
  });

  for (const [name, path] of PAGES) {
    await send(ws, 'Page.enable', {}, sessionId).catch(() => {});
    await send(ws, 'Runtime.evaluate', { expression: `location.href = ${JSON.stringify(BASE + path)}` }, sessionId);
    await sleep(1400);
    const res = await send(ws, 'Runtime.evaluate', { expression: EXTRACT, returnByValue: true }, sessionId);
    const payload = res.result?.value;
    if (!payload) throw new Error(`${name}: 추출 실패`);
    writeFileSync(join(OUT, `${name}.json`), payload);
    const parsed = JSON.parse(payload);
    console.log(`  ${name.padEnd(16)} 글자 ${String(parsed.text.length).padStart(6)}자 · 색요소 ${parsed.colored.length}`);
  }

  writeFileSync(join(OUT, '_console.json'), JSON.stringify(consoleErrors, null, 1));
  console.log(`콘솔 에러 ${consoleErrors.length}건`);
  ws.close();
  chrome.kill();
  // 프로필 삭제는 크롬이 아직 파일을 쥐고 있으면 실패한다 — 덤프는 이미 끝났으니 실패해도 무시.
  try { rmSync(PROFILE, { recursive: true, force: true }); } catch { /* 임시 프로필, 남아도 무해 */ }
}

main().catch((e) => { console.error('실패:', e.message); process.exit(1); });
