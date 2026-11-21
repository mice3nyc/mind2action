// 일반판 리더 리포트 문안 검사 — SPEC-org-edition §11 (11/21).
//   장학사(org_leader) 리포트가 손소장 영업외 포맷(cm_org_leader·identity60_org)으로 나가는가,
//   보험판 리더(sales_leader)는 그대로 보험 관리자 문안(cm_manager·identity60)인가.
//   60조합 전부를 동점 없는 점수로 만들어 실제 ReportViewV2를 띄우고 화면 글자를 yaml과 대조한다.
//   이름은 가짜(시험NN)만 쓴다 — 응답자 실명·연락처를 검사에 넣지 않는다.
//   사용: node scripts/check-org-report.mjs      종료코드 0 = 전부 통과
import { WebSocket } from 'ws';
import { spawn } from 'node:child_process';
import { rmSync } from 'node:fs';
import { createServer } from 'node:net';

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const freePort = () => new Promise((res) => { const s = createServer(); s.listen(0, () => { const p = s.address().port; s.close(() => res(p)); }); });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const PORT = await freePort(), VITE_PORT = await freePort();
const PROFILE = `/tmp/m2a-orgrep-${process.pid}`;
const BASE = `http://localhost:${VITE_PORT}`;

import { readFileSync } from 'node:fs';
import yaml from 'js-yaml';

const readY = (f) => yaml.load(readFileSync(new URL(`../src/data/${f}`, import.meta.url), 'utf8'));
const DATA = {
  org_leader:   { cm: readY('cm_org_leader.yaml'), id: readY('identity60_org.yaml') },
  sales_leader: { cm: readY('cm_manager.yaml'),    id: readY('identity60.yaml') },
};
const EGOS = ['CP', 'NP', 'A', 'FC', 'AC'];
// 키 → 동점 없는 점수 (top1 18 · top2 15 · 가운데 12·10 · bottom 4)
const scoresFor = (key) => {
  const [t1, t2, b] = key.split('_');
  const mid = EGOS.filter(e => ![t1, t2, b].includes(e));
  const s = { [t1]: 18, [t2]: 15, [mid[0]]: 12, [mid[1]]: 10, [b]: 4 };
  return EGOS.map(e => s[e]);
};
// 비교용 첫머리 — 이름 자리 치환, 코드형 라벨 앞에서 자른다(렌더러가 라벨을 정본 이름으로 바꾼다)
const headOf = (text, name) => text.replace(/OOO/g, name).split(/\n|[A-Z]{1,2}\(/)[0].trim().slice(0, 30);
// 두 포맷을 가르는 조각 — 그 직군 문안에만 있고 상대 직군 같은 키 문안엔 없는 조각.
//   첫머리만 보면 두 포맷이 첫 문장을 공유하는 조합에서 원리상 못 가른다.
//   조각 = 성향 라벨(`CP(…)`, 렌더러가 정본 이름으로 바꾼다)·줄바꿈 사이 글. 라벨 뒤 조사(이/가)가 바뀔 수 있어 앞 3자는 뗀다.
const OTHER = { org_leader: 'sales_leader', sales_leader: 'org_leader' };
const flat = (t) => t.replace(/\s+/g, ' ').trim();
const distinctPiece = (job, key, name) => {
  const mine = DATA[job].cm.cm5[key].manner.replace(/OOO/g, name), theirs = flat(DATA[OTHER[job]].cm.cm5[key].manner.replace(/OOO/g, name));
  const pieces = mine.split(/[A-Z]{1,2}\([^)]*\)|\n/).map(p => flat(p).slice(3)).filter(p => p.length >= 15);
  return pieces.find(p => !theirs.includes(p)) || null;
};
const INSURANCE = /보험|고객|계약|설계사|매출|영업|보장/g;

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


  const keys = Object.keys(DATA.org_leader.id);
  ok(keys.length === 60, '인물상 60조합', keys.length);
  let n = 0;
  for (const key of keys) {
    for (const job of ['org_leader', 'sales_leader']) {
      const name = `시험${String(++n).padStart(3, '0')}`;
      const r = await render(scoresFor(key), job, name);
      const { cm, id } = DATA[job];
      const manner = headOf(cm.cm5[key].manner, name);
      const idn = id[key];
      const idOk = r.text.includes(idn.title) && idn.desc.split('\n').every(l => r.text.includes(l.trim()));
      const dl = distinctPiece(job, key, name);
      const cm5Ok = manner.length >= 10 && r.cm5.includes(manner) && !!dl && flat(r.cm5).includes(dl);
      if (job === 'org_leader') {
        const ins = r.text.match(INSURANCE) || [];
        ok(idOk && cm5Ok && ins.length === 0, `${key} · 일반판: 인물상·§4 = 영업외 포맷, 보험 어휘 0`,
          `인물상 ${idOk} · §4 ${cm5Ok} [${dl}] · 보험어휘 ${ins.join(',')}`);
      } else {
        ok(idOk && cm5Ok, `${key} · 보험판 리더: 인물상·§4 그대로`, `인물상 ${idOk} · §4 ${cm5Ok} [${manner}]`);
      }
    }
  }
  ws.close();
} catch (e) { fail++; console.log('⛔ 무대 오류:', e.message); }

const EXPECT = 1 + 60 * 2;
if (ran !== EXPECT) { fail++; console.log(`⛔ 검사 수 ${ran} ≠ ${EXPECT}`); }
console.log(fail ? `\n❌ FAIL ${fail}건 (실행 ${ran})` : `\n✅ PASS ${ran}/${EXPECT}`);
process.exit(fail ? 1 : 0);
