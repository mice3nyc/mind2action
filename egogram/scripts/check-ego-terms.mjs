// 용어 드리프트 검사 — 사전을 지어도 다음에 또 복사하면 원위치다. (SPEC-ego-terms §7)
//   실행: npm run check:terms
//
//   1) 사전 값이 개편 전 정본과 같은가 (값 추출 리팩터링이 값을 흘리지 않았는지)
//   2) 컴포넌트가 성향 이름·색을 다시 정의하고 있지 않은가
//   3) yaml 산문에 사전이 모르는 성향 이름이 있는가 (별칭 등록 누락)
//   4) 조사 규칙이 받침 있는 이름·없는 이름 양쪽에서 맞는가

import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import yaml from 'js-yaml';
import { hasBatchim, josa, withJosa } from '../src/lib/josa.js';

const ROOT = new URL('..', import.meta.url).pathname;
const SRC = join(ROOT, 'src');
const dict = yaml.load(readFileSync(join(SRC, 'data/ego_terms.yaml'), 'utf-8'));

let failures = 0;
const fail = (msg) => { failures++; console.log(`  ✗ ${msg}`); };
const ok = (msg) => console.log(`  ✓ ${msg}`);

// ── 1. 정본 스냅샷 ────────────────────────────────────────────
// 2026-07-29 용어 사전 도입 직전, 코드에 흩어져 있던 리터럴을 그대로 옮겨 적은 것.
// 사전이 이 값에서 벗어나면 리팩터링이 값을 바꿔 버린 것이다.
// 라벨을 의도적으로 바꿀 때는 이 스냅샷도 함께 고친다(그때는 화면이 바뀌는 게 맞으므로).
const FROZEN = {
  order: ['CP', 'NP', 'A', 'FC', 'AC'],
  tie_priority: ['A', 'CP', 'NP', 'FC', 'AC'],
  // 2026-07-29 오후 손소장 확정으로 CP·NP·AC 라벨 교체(옛 표기는 사전 aliases로 내려감).
  //   기준·결단→원칙·결단 / 배려·공감→공감·배려(순서 뒤집힘) / 협조·조율→순응·협조. A·FC는 변동 없음.
  label: { CP: '원칙·결단', NP: '공감·배려', A: '이성·판단', FC: '친화·표현', AC: '순응·협조' },
  color: { CP: '#ef4444', NP: '#f59e0b', A: '#38bdf8', FC: '#10b981', AC: '#8b5cf6' },
  tint: { CP: '#fef2f2', NP: '#fffbeb', A: '#f0f9ff', FC: '#ecfdf5', AC: '#f5f3ff' },
  ink: { CP: '#dc2626', NP: '#d97706', A: '#0284c7', FC: '#059669', AC: '#7c3aed' },
  strength: { CP: '또렷한 기준', NP: '따뜻한 공감', A: '차분한 분석', FC: '밝은 표현력', AC: '세심한 조율' },
  type_name: { CP: '기준을 세우는 힘', NP: '마음을 살피는 힘', A: '흐름을 읽는 힘', FC: '분위기를 여는 힘', AC: '보폭을 맞추는 힘' },
};

console.log('\n[1] 사전 값 = 개편 전 정본');
if (JSON.stringify(dict.order) !== JSON.stringify(FROZEN.order)) fail(`order 다름: ${dict.order}`);
if (JSON.stringify(dict.tie_priority) !== JSON.stringify(FROZEN.tie_priority)) fail(`tie_priority 다름: ${dict.tie_priority}`);
for (const field of ['label', 'color', 'tint', 'ink', 'strength', 'type_name']) {
  for (const code of FROZEN.order) {
    const got = dict.terms[code]?.[field];
    if (got !== FROZEN[field][code]) fail(`${code}.${field}: 정본 "${FROZEN[field][code]}" ≠ 사전 "${got}"`);
  }
}
if (!failures) ok('8개 항목 × 5성향 전부 정본과 일치');

// ── 2. 재정의 탐지 ───────────────────────────────────────────
console.log('\n[2] 컴포넌트가 이름·색을 다시 정의하지 않는가');
const files = [];
(function walk(dir) {
  for (const e of readdirSync(dir)) {
    const p = join(dir, e);
    if (statSync(p).isDirectory()) walk(p);
    else if (/\.(js|jsx)$/.test(p)) files.push(p);
  }
})(SRC);

// `{ CP: …` 객체 리터럴 중 **색(#hex)이나 성향 이름 꼴(가나·다라)** 이 박힌 것만 복사본으로 본다.
//   `CUSTOMER_GENKEY = { CP: 'CP고객' … }` 같은 조회키 맵은 이름·색이 아니므로 통과시킨다.
const REDEFINE = /\{\s*CP\s*:\s*['"{]/;
const LABEL_SHAPE = /[가-힣]{2}\s*[·,]\s*[가-힣]{2}/;
const ALLOWED = ['src/lib/egoTerms.js'];   // 사전 로더만 예외
let redefs = 0;
for (const f of files) {
  const rel = relative(ROOT, f);
  if (ALLOWED.includes(rel)) continue;
  const src = readFileSync(f, 'utf-8');
  for (const line of src.split('\n')) {
    if (!REDEFINE.test(line)) continue;
    if (!/#[0-9a-fA-F]{6}/.test(line) && !LABEL_SHAPE.test(line)) continue;
    fail(`${rel}: 이름·색을 다시 정의함 → ${line.trim().slice(0, 70)}`);
    redefs++;
  }
}
if (!redefs) ok(`${files.length}개 파일 — 복사본 없음`);

// ── 3. 산문 속 미등록 이름 ────────────────────────────────────
console.log('\n[3] yaml 산문에 사전이 모르는 성향 이름이 있는가');
const known = new Set();
for (const code of dict.order) {
  known.add(dict.terms[code].label);
  for (const a of dict.terms[code].aliases || []) known.add(a);
}
// 사전에 있는 표기의 '변형'만 잡는다 — 가운뎃점/쉼표 표기 흔들림, 낱말 교체.
// 괄호형 `CP(무엇이든)`은 렌더러가 코드로 잡으므로 검사 대상이 아니다.
const NAME_LIKE = /(?<![A-Za-z(])([가-힣]{2})\s*[·,]\s*([가-힣]{2})(?![)가-힣])/g;
const stems = new Set();
for (const l of known) { const [a, b] = l.split(/[·,]/); stems.add(a); stems.add(b); }

const dataDir = join(SRC, 'data');
let unknown = 0;
for (const f of readdirSync(dataDir).filter(f => f.endsWith('.yaml'))) {
  const text = readFileSync(join(dataDir, f), 'utf-8');
  const seen = new Map();
  for (const line of text.split('\n')) {
    if (/^\s*#/.test(line)) continue;                       // 주석은 화면에 안 나간다
    for (const m of line.matchAll(NAME_LIKE)) {
      const [whole, a, b] = m;
      if (known.has(`${a}·${b}`) || known.has(whole)) continue;
      // 성향 이름으로 볼 근거가 둘 중 하나는 있어야 한다.
      //   (가) 두 낱말 모두 사전 어간 — 뒤섞인 표기(친화·공감 같은 오타)
      //   (나) 한 낱말이 사전 어간이면서 바로 뒤에 '성향'이 붙음 — 새 이름을 산문에 박은 경우(원칙·결단 성향)
      //        '성향'만으로는 부족하다. "…한다면, 해당 성향은"처럼 평범한 문장이 걸린다.
      const bothStems = stems.has(a) && stems.has(b);
      const oneStem = stems.has(a) || stems.has(b);
      const followedBySeonghyang = /^\s*성향/.test(line.slice(m.index + whole.length));
      if (!bothStems && !(oneStem && followedBySeonghyang)) continue;   // 평범한 쉼표 산문은 통과
      seen.set(whole, (seen.get(whole) || 0) + 1);
    }
  }
  for (const [w, n] of seen) { fail(`${f}: 사전에 없는 표기 "${w}" ${n}곳 — 별칭(aliases)에 넣거나 오타를 고칠 것`); unknown++; }
}
if (!unknown) ok('전 yaml — 미등록 표기 없음');

// ── 4. 조사 규칙 ─────────────────────────────────────────────
console.log('\n[4] 조사 규칙');
const CASES = [
  ['협조·조율', '이/가', '이'], ['협조·조율', '과/와', '과'], ['협조·조율', '으로/로', '로'],   // ㄹ 받침
  ['순응·협조', '이/가', '가'], ['순응·협조', '과/와', '와'], ['순응·협조', '으로/로', '로'],   // 받침 없음
  ['기준·결단', '은/는', '은'], ['기준·결단', '을/를', '을'], ['기준·결단', '으로/로', '으로'],
];
let josaBad = 0;
for (const [w, pair, want] of CASES) {
  const got = josa(w, pair);
  if (got !== want) { fail(`josa("${w}","${pair}") = "${got}" (기대 "${want}")`); josaBad++; }
}
for (const code of dict.order) {
  const l = dict.terms[code].label;
  if (!hasBatchim(l)) console.log(`  · 참고: ${code} "${l}"은 받침이 없다 → "${withJosa(l, '이/가')}"로 나간다`);
}
if (!josaBad) ok(`${CASES.length}개 경우 전부 통과`);

// ── 5. 금지 어휘 ─────────────────────────────────────────────
// 리포트에 실리면 안 되는 낱말. 지금은 MBTI 하나 — 과학적 근거 없는 유형론을 겹쳐 설명하면
// 놀공 산출물의 신뢰가 깎인다는 피터공 판단(2026-07-29). 손소장 원문에 5줄 들어 있었고,
// 데이터로 옮기다 딸려 들어가기 쉬운 자리(각 편 2번째 줄)라 검사로 막는다.
console.log('\n[5] 금지 어휘가 리포트 데이터에 들어오지 않았는가');
const BANNED = [{ word: 'MBTI', why: '과학적 근거 없는 유형론 — 피터공 2026-07-29 배제 결정' }];
let banned = 0;
for (const f of readdirSync(dataDir).filter(f => f.endsWith('.yaml'))) {
  const text = readFileSync(join(dataDir, f), 'utf-8');
  for (const { word, why } of BANNED) {
    const n = text.split('\n').filter(l => l.toUpperCase().includes(word)).length;
    if (n) { fail(`${f}: 금지 어휘 "${word}" ${n}줄 — ${why}. 원문을 옮길 때 떼고 옮길 것`); banned++; }
  }
}
if (!banned) ok(`전 yaml — 금지 어휘 없음 (${BANNED.map(b => b.word).join(', ')})`);

console.log(failures ? `\n실패 ${failures}건\n` : '\n전부 통과\n');
process.exit(failures ? 1 : 0);
