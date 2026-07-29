import terms from '../data/ego_terms.yaml';

// ─────────────────────────────────────────────────────────────
// egoTerms — 성향 이름·색의 단일 출처. 사전(ego_terms.yaml)을 읽어 파생값까지 만든다.
//   컴포넌트는 여기서 가져다 쓰기만 하고, 자기 파일에 이름·색을 다시 적지 않는다.
//   SPEC: docs/SPEC-ego-terms.md
// ─────────────────────────────────────────────────────────────

export const EGO_ORDER = terms.order;
export const TIE_PRIORITY = terms.tie_priority;

const pick = (field) => Object.fromEntries(EGO_ORDER.map(c => [c, terms.terms[c][field]]));

export const EGO_LABEL = pick('label');          // {CP:'기준·결단', …}  그래프 축·본문·CSV
export const EGO_COLOR = pick('color');
export const EGO_TINT = pick('tint');            // admin 카드 배경
export const EGO_INK = pick('ink');              // admin 카드 글자
export const EGO_STRENGTH = pick('strength');    // 인물상 fallback 문장용
export const EGO_TYPE_NAME = pick('type_name');  // top1 강조용

export function labelOf(code) { return EGO_LABEL[code]; }

// 이름만 갈아끼우는 문구 틀. yaml 산문에 이름을 박으면 렌더러를 안 지나는 자리(h3 등)에서
//   옛 이름이 살아남는다 — 심화 customer_title 다섯 줄이 실제로 그랬다.
export function customerTitle(code) {
  return terms.templates.customer_title.replace('{label}', EGO_LABEL[code]);
}

// 유형 블록 안 소제목 — 옛 큰 제목이 내려온 자리(손소장 항목 3·6, 2026-07-30).
export function customerRecognizeTitle(code) {
  return terms.templates.customer_recognize_title.replace('{label}', EGO_LABEL[code]);
}

// 상담 방법 문단의 소제목. 성향 이름이 안 들어가는 고정 문구라 치환 대상이 없다.
export const CUSTOMER_GUIDE_TITLE = terms.templates.customer_guide_title;

// 산문 속 표기 → 코드. 정본 라벨과 별칭(옛 표기)을 함께 받는다.
//   이름을 바꿔도 산문에 남은 옛 표기가 계속 매칭되는 것은 이 별칭 덕분이다.
export const LABEL_TO_CODE = {};
for (const code of EGO_ORDER) {
  LABEL_TO_CODE[EGO_LABEL[code]] = code;
  for (const a of terms.terms[code].aliases || []) LABEL_TO_CODE[a] = code;
}

// 매칭 규칙 단일 출처 — 두 리포트가 각자 갖고 있던 정규식을 합쳤다.
//   (1) 코드형 `CP(기준,결단)` — 괄호 안은 무엇이든 버리고 코드로 판정
//   (2) 맨 라벨 `기준·결단` — 정본 + 별칭
//   긴 것부터 매칭해야 부분 일치로 잘리지 않는다.
const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const LABEL_ALT = Object.keys(LABEL_TO_CODE)
  .sort((a, b) => b.length - a.length)
  .map(escapeRe)
  .join('|');
const CODE_ALT = [...EGO_ORDER].sort((a, b) => b.length - a.length).join('|');

// 옵션 bareCode: 괄호도 라벨도 없는 맨 코드(`CP의 방향 제시가`)까지 잡는다.
//   손소장 항목 2·4(2026-07-30) — 심화 synergy 산문에 영문 코드가 그대로 노출돼 있던 건.
//   ⚠️ 기본값 false로 둔 이유: 이 정규식은 성향리포트(ReportPageV2)와 공용이다.
//      전역으로 켜면 안 바꾸기로 한 쪽까지 바뀐다(Manifesto 26.0729 교훈, SPEC-ego-terms §7).
//      켜는 곳은 SimhwaReportView 한 곳뿐이고, ReportPageV2는 회귀 감시 대상이다.
//   오탐 방어 둘: (1) 앞이 영문·밑줄이면 안 잡는다(yaml 키 `CP_NP`) (2) 뒤가 아래 둘 중 하나일 때만.
//      특히 `A`는 한 글자라 이 조건이 없으면 영문 문장에서 걸린다. 넓히지 말 것.
//      - 조사가 바로 붙는 형태: `CP의 방향`, `AC는 …`
//      - 뒤에 `고객`이 오는 수식 형태: `CP 고객은 신뢰를…` (손소장 시트1 각 편 마지막 문단)
const JOSA_AFTER = '의|가|이|는|은|를|을|와|과|도|만|에|로';
const BARE_TAIL = `(?:(?:${JOSA_AFTER})[\\s,.]|\\s고객)`;

export function egoTermRe({ bareCode = false } = {}) {
  const alts = [
    `(?:(${CODE_ALT})\\([가-힣·,\\s]+\\))`,
    `(${LABEL_ALT})`,
  ];
  if (bareCode) alts.push(`(?<![A-Za-z_])(${CODE_ALT})(?=${BARE_TAIL})`);
  return new RegExp(alts.join('|'), 'g');
}

// ── 조사 ──────────────────────────────────────────────────────
// 규칙 본체는 lib/josa.js에 있다(순수 함수 — 노드에서 검사 가능하도록 분리).
// 쓰는 쪽이 두 군데를 import하지 않게 여기서 함께 내보낸다.
export { hasBatchim, josa, withJosa, joinWithJosa } from './josa';
