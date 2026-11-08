// 설문 첫 화면 검사 — SPEC-org-edition §10-T.
//   실제 SurveyIntro를 하니스(harness/intro.html)에 띄워 보험판·일반판 두 번 읽는다.
//   보험판 = 칸 일곱 그대로 / 일반판 = 이름·생년월일·소속 셋, 역할은 org_leader로 미리 채워 저장.
//   사용: node scripts/check-intro.mjs      종료코드 0 = 전부 통과
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

async function stage(mode) {
  const PORT = await freePort(), VITE_PORT = await freePort();
  const PROFILE = `/tmp/m2a-intro-${process.pid}-${mode}`;
  const BASE = `http://localhost:${VITE_PORT}`;
  rmSync(PROFILE, { recursive: true, force: true });
  const vite = spawn('npx', ['vite', '--port', String(VITE_PORT), '--strictPort', ...(mode === 'org' ? ['--mode', 'org'] : [])], { stdio: 'ignore' });
  const chrome = spawn(CHROME, ['--headless=new', `--remote-debugging-port=${PORT}`, `--user-data-dir=${PROFILE}`, '--no-first-run', '--disable-gpu', 'about:blank'], { stdio: 'ignore' });
  const cleanup = () => { try { chrome.kill(); } catch { /* */ } try { vite.kill(); } catch { /* */ } try { rmSync(PROFILE, { recursive: true, force: true }); } catch { /* */ } };
  try {
    // org 모드 base는 /org/ — 하니스도 그 아래에서 뜬다
    const page = `${BASE}${mode === 'org' ? '/org' : ''}/harness/intro.html`;
    let up = false;
    for (let i = 0; i < 60 && !up; i++) { await sleep(300); try { up = (await fetch(page)).ok; } catch { /* */ } }
    if (!up) throw new Error(`vite(${mode}) 안 뜸`);
    let wsUrl = null;
    for (let i = 0; i < 40 && !wsUrl; i++) { await sleep(250); try { wsUrl = (await (await fetch(`http://127.0.0.1:${PORT}/json/version`)).json()).webSocketDebuggerUrl; } catch { /* */ } }
    const ws = new WebSocket(wsUrl);
    await new Promise((r) => ws.on('open', r));
    const { targetId } = await send(ws, 'Target.createTarget', { url: 'about:blank' });
    const { sessionId } = await send(ws, 'Target.attachToTarget', { targetId, flatten: true });
    await send(ws, 'Runtime.enable', {}, sessionId);
    const ev = async (expression) => {
      const r = await send(ws, 'Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true }, sessionId);
      if (r.exceptionDetails) throw new Error(r.exceptionDetails.exception?.description || r.exceptionDetails.text);
      return r.result.value;
    };
    const until = async (expr, label) => { for (let i = 0; i < 100; i++) { if (await ev(expr)) return; await sleep(100); } throw new Error(`기다려도 안 됨: ${label}`); };
    await send(ws, 'Page.navigate', { url: page }, sessionId);
    await until(`!!document.querySelector('form .form-group')`, '첫 화면');

    const ed = await ev('window.__edition');
    ok(ed === mode, `[${mode}] 에디션 = ${mode}`, ed);
    const labels = await ev(`[...document.querySelectorAll('form .form-label')].map(l => l.textContent.trim())`);
    const fill = async (name, value) => ev(`(() => { const el = document.querySelector('[name=${name}]'); const proto = el.tagName === 'SELECT' ? HTMLSelectElement.prototype : HTMLInputElement.prototype; Object.getOwnPropertyDescriptor(proto, 'value').set.call(el, ${JSON.stringify(value)}); el.dispatchEvent(new Event(el.tagName === 'SELECT' ? 'change' : 'input', { bubbles: true })); })()`);
    const disabled = `document.querySelector('button[type=submit]').disabled`;

    if (mode === 'org') {
      ok(labels.join('|') === '이름 *|생년월일 *|소속 *', '[org] 칸 = 이름·생년월일·소속 셋', labels.join('|'));
      ok(await ev(`document.querySelector('[name=department]').placeholder`) === '', '[org] 소속 예시 비어 있음', await ev(`document.querySelector('[name=department]').placeholder`));
      ok(await ev(`!document.querySelector('select[name=jobType]')`), '[org] 역할 선택칸 없음');
      ok(await ev(disabled) === true, '[org] 빈 상태에선 「설문 시작」 잠김');
      await fill('name', '시험'); await fill('birthDate', '19800101');
      ok(await ev(disabled) === true, '[org] 소속 비면 여전히 잠김');
      await fill('department', '교육지원청');
      ok(await ev(disabled) === false, '[org] 셋 채우면 「설문 시작」 눌림');
      await ev(`document.querySelector('button[type=submit]').click()`);
      await until('!!window.__submitted', '제출');
      const sub = await ev('window.__submitted');
      ok(sub.jobType === 'org_leader', '[org] 제출값 job_type = org_leader', JSON.stringify(sub));
      ok(sub.careerMonths === '' && sub.company === '' && sub.department === '교육지원청', '[org] 경력·회사 빈 값, 소속 그대로', JSON.stringify(sub));
      // 관리 표 — 빈 열(경력·회사)이 일반판에서 빠지고, 머리칸과 행 칸 수가 맞는가
      await send(ws, 'Page.navigate', { url: `${BASE}/org/harness/admin.html` }, sessionId);
      await until(`document.querySelectorAll('.admin-table tbody tr').length > 0`, '관리 표');
      const heads = await ev(`[...document.querySelectorAll('.admin-table thead th')].map(t => t.textContent.trim())`);
      ok(!heads.includes('경력') && !heads.includes('회사') && heads.some(h => h.startsWith('소속')), '[org] 관리 표에 경력·회사 열 없음', heads.join('|'));
      ok(await ev(`(() => { const h = document.querySelectorAll('.admin-table thead th').length; return [...document.querySelectorAll('.admin-table tbody tr')].every(tr => tr.children.length === h); })()`), '[org] 관리 표 머리칸 수 = 행 칸 수');
    } else {
      ok(labels.join('|') === '이름 *|생년월일 *|경력 (개월) *|회사 *|소속 *|성향 코칭을 받고 싶은 역할 *|직전 3개월 평균 소득', '[insurance] 칸 일곱 그대로', labels.join('|'));
      ok(await ev(`document.querySelector('[name=department]').placeholder`) === 'OO지점', '[insurance] 소속 예시 OO지점');
      const opts = await ev(`[...document.querySelectorAll('select[name=jobType] option')].map(o => o.value).join(',')`);
      ok(opts === ',sales,coach,sales_leader', '[insurance] 역할 선택지 셋(+선택해주세요)', opts);
      await fill('name', '시험'); await fill('birthDate', '19800101'); await fill('department', 'A지점');
      ok(await ev(disabled) === true, '[insurance] 경력·회사·역할 비면 잠김');
      await fill('careerMonths', '12'); await fill('company', '회사');
      ok(await ev(disabled) === true, '[insurance] 역할 비면 잠김');
      await fill('jobType', 'coach');
      ok(await ev(disabled) === false, '[insurance] 다 채우면 눌림');
    }
    ws.close();
  } finally { cleanup(); }
}

try {
  await stage('insurance');
  await stage('org');
} catch (e) { fail++; console.log('⛔ 무대 오류:', e.message); }
const EXPECT = 18;
if (ran !== EXPECT) { fail++; console.log(`⛔ 검사 수 ${ran} ≠ ${EXPECT} — 일부가 안 돌았다`); }
console.log(fail ? `\n❌ FAIL ${fail}건 (실행 ${ran})` : `\n✅ PASS ${ran}/${EXPECT}`);
process.exit(fail ? 1 : 0);
