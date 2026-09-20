// 인쇄 판형 하니스 — 영업성향(일반) 리포트. SPEC §14-2.
//   재는 것: 「소제목(.report-subhead)이 페이지 맨 아래에 홀로 남는가」.
//   손소장 9/20: 1장 마지막 줄의 「성향별로 자세히 보기」만 남고 본문이 다음 장으로 넘어간다.
//
//   판정은 눈이 아니라 PDF 페이지 스트림으로 한다 —
//   그 제목이 있는 쪽에서 «제목 뒤에 아무 글자도 없고» 뒤에 쪽이 더 있으면 고아다.
//
//   ⚠️ 이 현상은 사람마다·여백 설정마다 다르게 난다. 한 판만 재면 「고쳤다」와
//      「원래 안 났다」가 구분되지 않는다. 그래서 표본 6명 × 여백 3종을 다 돈다.
//
//   무대는 러너가 세우고 러너가 치운다 — vite dev와 크롬을 여기서 띄우고 끝나면 죽인다.
//   (하니스 무대 `harness/print-report.html`은 dev 서버만 서빙한다. vite build 엔트리는 index.html 하나라
//    배포본에는 딸려 나가지 않는다.)
//
//   사용: node scripts/print-report.mjs <출력디렉토리>
//   종료코드: 0 = 고아 0건 / 1 = 고아 있음

import { WebSocket } from 'ws';
import { spawn, execFileSync } from 'node:child_process';
import { mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { SAMPLES } from '../harness/report-samples.js';

const OUT = process.argv[2];
if (!OUT) { console.error('사용: node scripts/print-report.mjs <출력디렉토리>'); process.exit(1); }

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const PORT = 9222 + (process.pid % 100);
const VITE_PORT = 5190 + (process.pid % 9);
const PROFILE = `/tmp/m2a-printreport-${process.pid}`;
const BASE = `http://localhost:${VITE_PORT}`;

// 재는 소제목 — ReportPageV2의 .report-subhead 두 곳(문구는 화면이 정본).
const SUBHEADS = ['한눈에 보는 다섯 성향', '성향별로 자세히 보기'];
// 여백 프리셋(인치) — 크롬 인쇄 대화상자의 기본/넓게/좁게.
const MARGINS = [
  ['기본', 0.4],
  ['넓게', 0.6],
  ['좁게', 0.25],
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
    setTimeout(() => { ws.off('message', onMsg); reject(new Error(`timeout: ${method}`)); }, 60000);
  });
}
const sleep = (ms) => new Promise(r => setTimeout(r, ms));

// 페이지별 텍스트 — 페이지 구분은 폼피드(\f). 공백을 전부 걷어 비교한다
// (pdftotext가 글자 사이에 넣는 공백이 판정을 흔들지 않게).
function pageFlats(pdfPath) {
  const txt = execFileSync('pdftotext', ['-layout', pdfPath, '-'], { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
  return txt.split('\f').filter((s, i, a) => i < a.length - 1 || s.trim()).map(p => p.replace(/\s+/g, ''));
}

// 고아 판정 — 제목이 있는 쪽에서 그 제목 뒤에 아무 글자도 없고, 그 뒤로 쪽이 더 있으면 고아.
function orphanOf(flats, headingRaw) {
  const key = headingRaw.replace(/\s+/g, '');
  const page = flats.findIndex(p => p.includes(key));
  if (page < 0) return { page: null, orphan: false, missing: true };
  const after = flats[page].slice(flats[page].indexOf(key) + key.length);
  return { page: page + 1, orphan: after.length === 0 && page < flats.length - 1, missing: false };
}

async function main() {
  rmSync(PROFILE, { recursive: true, force: true });
  mkdirSync(OUT, { recursive: true });

  const vite = spawn('npx', ['vite', '--port', String(VITE_PORT), '--strictPort'], { stdio: 'ignore' });
  const chrome = spawn(CHROME, [
    '--headless=new', `--remote-debugging-port=${PORT}`, `--user-data-dir=${PROFILE}`,
    '--no-first-run', '--disable-gpu', '--window-size=1200,2000', 'about:blank',
  ], { stdio: 'ignore' });
  const cleanup = () => {
    try { chrome.kill(); } catch { /* 이미 죽음 */ }
    try { vite.kill(); } catch { /* 이미 죽음 */ }
    try { rmSync(PROFILE, { recursive: true, force: true }); } catch { /* 임시 프로필 */ }
  };
  process.on('exit', cleanup);

  // dev 서버가 실제로 응답할 때까지 (뜬 것과 답하는 것은 다른 사실)
  let viteUp = false;
  for (let i = 0; i < 60 && !viteUp; i++) {
    await sleep(300);
    try { viteUp = (await fetch(`${BASE}/harness/print-report.html`)).ok; } catch { /* 아직 */ }
  }
  if (!viteUp) { cleanup(); throw new Error('vite dev 서버가 안 떴다'); }

  let wsUrl = null;
  for (let i = 0; i < 40 && !wsUrl; i++) {
    await sleep(250);
    try { wsUrl = (await (await fetch(`http://127.0.0.1:${PORT}/json/version`)).json()).webSocketDebuggerUrl; }
    catch { /* 아직 */ }
  }
  if (!wsUrl) { cleanup(); throw new Error('크롬 디버그 포트 안 열림'); }

  const ws = new WebSocket(wsUrl, { maxPayload: 256 * 1024 * 1024 });
  await new Promise(r => ws.on('open', r));
  const { targetId } = await send(ws, 'Target.createTarget', { url: 'about:blank' });
  const { sessionId } = await send(ws, 'Target.attachToTarget', { targetId, flatten: true });
  await send(ws, 'Page.enable', {}, sessionId);

  const rows = [];
  const fails = [];
  let rendered = 0;
  for (const s of SAMPLES) {
    await send(ws, 'Runtime.evaluate', {
      expression: `location.href = ${JSON.stringify(`${BASE}/harness/print-report.html?s=${encodeURIComponent(s.name)}`)}`,
    }, sessionId);
    await sleep(1800);
    // 무대가 실제로 섰는지 — 안 서면 「고아 0건」이 공허하게 통과한다.
    const ok = await send(ws, 'Runtime.evaluate', {
      expression: `document.querySelectorAll('.report-subhead').length`, returnByValue: true,
    }, sessionId);
    if (ok.result.value !== SUBHEADS.length) {
      fails.push(`${s.name} 무대 미구성(.report-subhead ${ok.result.value}개)`);
      continue;
    }
    rendered++;

    for (const [mName, inch] of MARGINS) {
      const { data } = await send(ws, 'Page.printToPDF', {
        printBackground: true, scale: 1,
        paperWidth: 8.27, paperHeight: 11.69,           // A4
        marginTop: inch, marginBottom: inch, marginLeft: inch, marginRight: inch,
      }, sessionId);
      const pdfPath = join(OUT, `report_${s.name}_${mName}.pdf`);
      writeFileSync(pdfPath, Buffer.from(data, 'base64'));
      const flats = pageFlats(pdfPath);
      for (const h of SUBHEADS) {
        const r = orphanOf(flats, h);
        if (r.missing) { fails.push(`${s.name}/${mName} 「${h}」 PDF에 없음`); continue; }
        rows.push({ name: s.name, margin: mName, heading: h, page: r.page, pages: flats.length, orphan: r.orphan });
        if (r.orphan) fails.push(`${s.name}/${mName} 「${h}」 ${r.page}쪽 바닥에 홀로`);
      }
    }
  }

  // 0건 통과 차단 — 표본이 안 돌았는데 "고아 없음"이 참이 되는 것을 막는다.
  if (rendered !== SAMPLES.length) fails.push(`표본 ${rendered}/${SAMPLES.length}만 렌더`);
  if (rows.length !== SAMPLES.length * MARGINS.length * SUBHEADS.length) {
    fails.push(`측정 ${rows.length}건 (기대 ${SAMPLES.length * MARGINS.length * SUBHEADS.length})`);
  }

  for (const r of rows) {
    console.log(`  ${r.name.padEnd(4)} ${r.margin}  「${r.heading}」 ${r.page}/${r.pages}쪽  ${r.orphan ? '바닥에 홀로 ⛔' : 'OK'}`);
  }
  writeFileSync(join(OUT, '_summary.json'), JSON.stringify({ rows, fails }, null, 1));
  ws.close();
  cleanup();

  const orphans = rows.filter(r => r.orphan).length;
  console.log(fails.length
    ? `⛔ 실패 ${fails.length} (고아 ${orphans}건): ${fails.join(' / ')}`
    : `✅ 통과 — 측정 ${rows.length}건, 소제목이 페이지 바닥에 홀로 남은 건 0`);
  process.exit(fails.length ? 1 : 0);
}

main().catch(e => { console.error(e); process.exit(1); });
