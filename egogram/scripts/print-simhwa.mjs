// 인쇄 판형 하니스 — 심화코칭 리포트를 실제 PDF로 뽑아 쪽수·페이지별 내용·윗여백을 잰다.
//   손소장 8/1 항목 2(윗여백)는 화면으로는 판정이 안 되고, 요소 padding으로는 고칠 수도 없다.
//   페이지 경계가 콘텐츠 중간에 떨어지므로 "매 페이지의 위"는 @page 여백만 만든다 → 실측이 유일한 검증.
//
//   사용: node scripts/print-simhwa.mjs <출력디렉토리> [베이스URL]
//   전제: 다른 터미널에서 `npx vite preview --port 4173`가 떠 있어야 한다.
//
//   ⚠️ 헤드리스 `--print-to-pdf`(CLI)는 넘치면 자동 축소해서 "한 장이 두 장으로 갈라진다"를
//      원리상 못 잡는다. 그래서 CDP `Page.printToPDF`를 scale=1 · preferCSSPageSize=true로 쓴다
//      (CSS @page 여백이 그대로 먹고, 크롬이 배율을 건드리지 않는다).

import { WebSocket } from 'ws';
import yaml from 'js-yaml';
import { spawn, execFileSync } from 'node:child_process';
import { mkdirSync, writeFileSync, rmSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const OUT = process.argv[2];
const BASE = process.argv[3] || 'http://localhost:4173';
if (!OUT) { console.error('사용: node scripts/print-simhwa.mjs <출력디렉토리> [베이스URL]'); process.exit(1); }

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const PORT = 9322 + Math.floor(process.pid % 100);
const PROFILE = `/tmp/m2a-print-${process.pid}`;

const SAMPLES = ['김정임', '이서연', '이선규', '이영수', '허진랑'];

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

// pdftotext -bbox 로 각 페이지 첫 단어의 yMin(pt)을 뽑는다 = 윗여백 실측.
//   -bbox는 페이지마다 <page width height> 안에 <word xMin yMin ...>를 낸다.
function pageTops(pdfPath) {
  const xml = execFileSync('pdftotext', ['-bbox', pdfPath, '-'], { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
  const pages = xml.split(/<page /).slice(1);
  return pages.map(p => {
    const m = p.match(/yMin="([\d.]+)"/);         // 문서 순서 첫 단어 = 그 페이지 맨 위 글자
    return m ? Number(m[1]) : null;               // pt 단위(1pt = 0.3528mm)
  });
}

// 페이지별 텍스트 — 페이지 구분은 폼피드(\f).
function pageTexts(pdfPath) {
  const txt = execFileSync('pdftotext', ['-layout', pdfPath, '-'], { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
  return txt.split('\f').filter((s, i, a) => i < a.length - 1 || s.trim());
}

// 성향 이름은 용어 사전이 단일 출처(ego_terms.yaml) — 여기 베껴 적으면 개명 때 조용히 0건이 된다.
const TERMS = yaml.load(readFileSync('src/data/ego_terms.yaml', 'utf8'));
const TRAITS = ['CP', 'NP', 'A', 'FC', 'AC'].map(code => TERMS.terms[code].label);

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
  await send(ws, 'Page.enable', {}, sessionId);

  const summary = {};
  for (const name of SAMPLES) {
    await send(ws, 'Runtime.evaluate', {
      expression: `location.href = ${JSON.stringify(`${BASE}/#/preview/simhwa?s=${encodeURIComponent(name)}`)}`,
    }, sessionId);
    await sleep(1600);

    const { data } = await send(ws, 'Page.printToPDF', {
      printBackground: true,
      preferCSSPageSize: true,     // CSS @page 여백을 그대로 쓴다
      scale: 1,                    // 자동 축소 금지 — 넘침이 넘침으로 보여야 한다
      paperWidth: 8.27, paperHeight: 11.69,   // A4 (preferCSSPageSize가 @page size를 못 찾을 때의 바탕)
    }, sessionId);

    const pdfPath = join(OUT, `simhwa_${name}.pdf`);
    writeFileSync(pdfPath, Buffer.from(data, 'base64'));

    const tops = pageTops(pdfPath);
    const texts = pageTexts(pdfPath);
    // 2장(에너지 발현 상태) 다섯 성향이 몇 페이지에 흩어져 있는지 — §18-3 회귀 감시
    const s2page = TRAITS.map(t => {
      const i = texts.findIndex(p => p.includes(`${t} 성향`) && /\/ 20/.test(p));
      return i < 0 ? null : i + 1;
    });
    // 마지막 장에 푸터만 남는 "빈 장" 감시 (§21-2) — 윗여백을 키우면 꼬리 한 줄이 밀려난다.
    const lastPage = (texts[texts.length - 1] || '').replace(/\s+/g, ' ').trim();
    const footerOnlyLastPage = /^© \d{4} MIND2ACTION/.test(lastPage) && lastPage.length < 80;

    summary[name] = {
      pages: texts.length,
      topsPt: tops,
      topsMm: tops.map(v => v == null ? null : Math.round(v * 0.3528 * 10) / 10),
      section2Pages: s2page,
      section2OnePage: new Set(s2page.filter(Boolean)).size === 1 && !s2page.includes(null),
      footerOnlyLastPage,
    };
    const t = summary[name];
    console.log(`  ${name}  ${t.pages}쪽 · 윗여백(mm) 1p=${t.topsMm[0]} 2p=${t.topsMm[1]} 3p=${t.topsMm[2]} · 2장 페이지 ${JSON.stringify(t.section2Pages)} ${t.section2OnePage ? '한 페이지 ✅' : '갈라짐 ⛔'} · 꼬리장 ${footerOnlyLastPage ? '푸터만 ⛔' : 'OK'}`);
  }

  // 회귀 — @page 주입이 심화 화면 밖으로 새지 않는가 (§21-2).
  //   @page는 문서 전역이라, 언마운트 정리가 빠지면 성향리포트·일괄 리포트 인쇄까지 21mm가 걸린다.
  await send(ws, 'Runtime.evaluate', {
    expression: `location.href = ${JSON.stringify(`${BASE}/#/preview/result?cp=14&np=13&a=18&fc=14&ac=6&name=김정임`)}`,
  }, sessionId);
  await sleep(1600);
  const leak = await send(ws, 'Runtime.evaluate', {
    expression: `!!document.getElementById('simhwa-page-margin')`, returnByValue: true,
  }, sessionId);
  const { data: otherPdf } = await send(ws, 'Page.printToPDF', {
    printBackground: true, preferCSSPageSize: true, scale: 1, paperWidth: 8.27, paperHeight: 11.69,
  }, sessionId);
  const otherPath = join(OUT, 'other_result.pdf');
  writeFileSync(otherPath, Buffer.from(otherPdf, 'base64'));
  const otherTop = Math.round((pageTops(otherPath)[0] ?? 0) * 0.3528 * 10) / 10;
  summary._leak = { styleTagPresent: leak.result.value, otherPageTopMm: otherTop };
  console.log(`  [회귀] 심화 밖 화면 — @page 태그 ${leak.result.value ? '남아 있음 ⛔' : '없음 ✅'} · 윗여백 ${otherTop}mm(21mm이면 누수)`);

  writeFileSync(join(OUT, '_summary.json'), JSON.stringify(summary, null, 1));
  ws.close();
  chrome.kill();
  try { rmSync(PROFILE, { recursive: true, force: true }); } catch { /* 임시 프로필 */ }
}

main().catch(e => { console.error(e); process.exit(1); });
