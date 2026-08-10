// 탭 이름 + 워크북 본문 크기 검증 하니스 (SPEC §11·§12)
//   탭 이름은 "여러 탭을 동시에 열었을 때 구별되는가"가 판정 기준이라
//   문자열이 다른지가 아니라 앞 10자가 서로 다른지를 본다.
//
//   사용: node scripts/check-tab-titles.mjs [베이스URL]
//   전제: 다른 터미널에서 `npx vite preview --port 4173`가 떠 있어야 한다.

import { WebSocket } from 'ws';
import { spawn } from 'node:child_process';
import { rmSync, readFileSync } from 'node:fs';
import { createServer } from 'node:http';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const BASE = process.argv[2] || 'http://localhost:4173/mind2action/egogram';
const DIST = join(dirname(fileURLToPath(import.meta.url)), '..', 'dist');
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const PORT = 9222 + Math.floor(process.pid % 100);
const PROFILE = `/tmp/m2a-title-${process.pid}`;

// 탭에서 잘리는 지점. 이 앞이 같으면 사용자에겐 같은 탭이다.
const TAB_VISIBLE = 10;

const PAGES = [
  ['설문(기본)', '/#/', '에고그램 설문 · MIND2ACTION'],
  ['관리자', '/#/admin', '관리자 · MIND2ACTION'],
  ['성향 리포트', '/#/report/demo-id', '성향 리포트 · MIND2ACTION'],
  ['리포트 일괄', '/#/report-batch/demo-campaign', '리포트 일괄 · MIND2ACTION'],
  ['심화 코칭', '/#/simhwa/demo-id', '심화 코칭 리포트 · MIND2ACTION'],
  ['미리보기 결과', '/#/preview/result?cp=14&np=13&a=18&fc=14&ac=6&name=김정임', '미리보기 · 성향 리포트 · MIND2ACTION'],
  ['미리보기 심화', '/#/preview/simhwa?s=김정임', '미리보기 · 심화 코칭 · MIND2ACTION'],
  ['워크북 허브', '/workbook/index.html', '워크북 허브 · MIND2ACTION'],
  ['워크북 여정', '/workbook/journey.html', '워크북 실전 여정 · 김성아 TCR'],
  ['워크북 사전', '/workbook/types.html', '워크북 유형별 사전 · 김성아 TCR'],
  ['워크북 비교', '/workbook/compare.html', '워크북 방식 비교 · MIND2ACTION'],
];

// 워크북 본문이 실제로 커졌는지 — 선언값이 아니라 계산값으로 본다.
// [경로, 셀렉터, 기대 px]
const BODY_SIZES = [
  ['/workbook/journey.html', '.report-container', 16.5],
  ['/workbook/types.html', '.report-container', 16.5],
  ['/workbook/index.html', '.wbcard .desc', 15],
  ['/workbook/compare.html', '.situ', 15.5],
];

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

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const STATIC_PORT = 4200 + Math.floor(process.pid % 100);

// dist를 그대로 주는 정적 서버. SPA fallback을 두지 않는 것이 요점 —
// 없는 파일은 404여야 "파일이 바뀌었나"와 "서버가 딴 걸 줬나"가 구별된다.
function startStatic() {
  const server = createServer((req, res) => {
    const path = decodeURIComponent(req.url.split('?')[0]);
    try {
      const body = readFileSync(join(DIST, path));
      res.writeHead(200, { 'Content-Type': path.endsWith('.html') ? 'text/html; charset=utf-8' : 'application/octet-stream' });
      res.end(body);
    } catch {
      res.writeHead(404); res.end('not found');
    }
  });
  return new Promise((r) => server.listen(STATIC_PORT, '127.0.0.1', () => r(server)));
}

async function main() {
  rmSync(PROFILE, { recursive: true, force: true });
  const staticServer = await startStatic();

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

  const ws = new WebSocket(wsUrl);
  await new Promise((r) => ws.on('open', r));

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

  // ⚠️ 워크북은 preview 서버로 못 본다 — vite preview의 SPA fallback이 /workbook/*.html에도
  // 앱 index.html을 돌려줘 검사 대상이 통째로 바뀐다(라이브 S3는 실제 파일을 준다).
  // file://도 안 된다 — 헤드리스가 http 페이지의 file:// 이동을 차단해 빈 페이지가 된다.
  // 그래서 fallback 없는 정적 서버를 여기서 띄운다(있는 파일만 그대로 준다 = 라이브와 같은 동작).
  const urlFor = (path) => path.startsWith('/workbook/')
    ? `http://127.0.0.1:${STATIC_PORT}${path}`
    : BASE + path;

  const go = async (path) => {
    // 해시만 바뀌면 리로드가 안 걸려 옛 title이 남는다 — about:blank를 거쳐 확실히 새로 태운다.
    await send(ws, 'Runtime.evaluate', { expression: `location.href = 'about:blank'` }, sessionId);
    await sleep(150);
    await send(ws, 'Runtime.evaluate', { expression: `location.href = ${JSON.stringify(urlFor(path))}` }, sessionId);
    await sleep(1200);                              // React 마운트 + title useEffect까지
  };
  const evalIn = async (expr) =>
    (await send(ws, 'Runtime.evaluate', { expression: expr, returnByValue: true }, sessionId)).result?.value;

  let fail = 0;
  const seen = new Map();

  console.log('=== 탭 이름 ===');
  for (const [label, path, expected] of PAGES) {
    await go(path);
    const title = await evalIn('document.title');
    const ok = title === expected;
    if (!ok) fail++;
    console.log(`${ok ? '  OK' : 'FAIL'}  ${label.padEnd(14)} ${title}`);
    if (!ok) console.log(`        기대: ${expected}`);
    const head = (title || '').slice(0, TAB_VISIBLE);
    if (seen.has(head)) { fail++; console.log(`FAIL  탭 앞 ${TAB_VISIBLE}자 충돌: "${head}" — ${seen.get(head)} vs ${label}`); }
    else seen.set(head, label);
  }

  console.log('\n=== 워크북 본문 크기(계산값) ===');
  for (const [path, sel, expected] of BODY_SIZES) {
    await go(path);
    const px = await evalIn(
      `(() => { const el = document.querySelector(${JSON.stringify(sel)});
         return el ? parseFloat(getComputedStyle(el).fontSize) : null; })()`);
    const ok = px !== null && Math.abs(px - expected) < 0.2;
    if (!ok) fail++;
    console.log(`${ok ? '  OK' : 'FAIL'}  ${path.replace('/workbook/', '').padEnd(14)} ${sel.padEnd(18)} ${px}px (기대 ${expected})`);
  }

  // 화면 확대가 인쇄로 새면 조판(번호 블록이 페이지 중간에 안 끊기게 튜닝된 것)이 깨진다.
  // 인쇄 미디어를 흉내 내 같은 셀렉터를 다시 읽는다 — 기존 15px 그대로여야 한다.
  console.log('\n=== 인쇄 미디어에서의 본문 크기 (기존 조판 유지 확인) ===');
  for (const path of ['/workbook/journey.html', '/workbook/types.html']) {
    await go(path);
    await send(ws, 'Emulation.setEmulatedMedia', { media: 'print' }, sessionId);
    await sleep(200);
    const px = await evalIn(
      `parseFloat(getComputedStyle(document.querySelector('.report-container')).fontSize)`);
    await send(ws, 'Emulation.setEmulatedMedia', { media: '' }, sessionId);
    const ok = Math.abs(px - 15) < 0.2;
    if (!ok) fail++;
    console.log(`${ok ? '  OK' : 'FAIL'}  ${path.replace('/workbook/', '').padEnd(14)} .report-container  ${px}px (기대 15 — 인쇄는 확대 전 값)`);
  }

  console.log(`\n콘솔 에러 ${consoleErrors.length}건`);
  consoleErrors.slice(0, 5).forEach((e) => console.log(`  · ${e}`));

  chrome.kill();
  staticServer.close();
  try { rmSync(PROFILE, { recursive: true, force: true }); } catch { /* 프로필 정리 실패는 판정과 무관 */ }
  console.log(fail === 0 ? '\n전부 통과' : `\n실패 ${fail}건`);
  process.exit(fail === 0 ? 0 : 1);
}

main().catch((e) => { console.error(e); process.exit(1); });
