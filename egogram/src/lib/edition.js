// 에디션 — 보험판(insurance)과 일반 조직판(org)이 갈리는 값은 전부 여기. SPEC-org-edition §2·§10.
//   빌드 때 VITE_EDITION으로 정한다(.env.org). 값이 없으면 보험판 = 현행 라이브.
//   `?.` — 검사 스크립트가 node에서 이 파일을 그대로 불러온다(node에는 import.meta.env가 없다).

// 역할 한 벌 — 선택지에서 내린 역할도 저장된 응답에 남아 있으니 라벨·매핑은 지우지 않는다.
//   cm     = 리포트 문안 묶음 (cmLookup CM_DATA 키)
//   range  = 안전구간 키 (scoreEngine SAFE_RANGES 키)
//   report = 리포트 종류 이름 (관리 표 배지 · 심화 대상 판정)
//   group  = 캠페인 분석의 역할 분류
export const ROLES = {
  sales:           { label: '고객 컨설팅 영업',     cm: 'sales',   range: 'sales',   report: '보험설계사', group: '컨설턴트' },
  coach:           { label: '신인 육성 코칭',       cm: 'coach',   range: 'coach',   report: '코치/멘토',  group: '코치' },
  sales_leader:    { label: '리더(보험 조직 운영)', cm: 'manager', range: 'manager', report: '관리자',     group: '리더' },  // 손소장 10/20 개명. 저장값 그대로
  // 5/18에 선택지에서 내린 옛 역할
  branch_manager:  { label: '지점장/지사장',        cm: 'manager', range: 'manager', report: '관리자',     group: '리더' },
  training_leader: { label: '교육팀장/지원팀장',    cm: 'manager', range: 'manager', report: '관리자',     group: '리더' },
  division_head:   { label: '사업단장/부장',        cm: 'manager', range: 'manager', report: '관리자',     group: '리더' },
  executive:       { label: '본부장',               cm: 'manager', range: 'manager', report: '관리자',     group: '리더' },
  // 일반 조직판. ⚠️ 문안은 임시로 보험판 관리자 문안 — 손소장 포맷(cm_org_leader)이 오기 전엔 일반판을 배포하지 않는다
  org_leader:      { label: '리더(일반 조직 운영)', cm: 'manager', range: 'manager', report: '관리자',     group: '리더' },
};

export const EDITIONS = {
  insurance: {
    roleOptions: ['sales', 'coach', 'sales_leader'],
    hasIncome: true,     // 설문 소득 칸 · 관리 표/CSV 소득 열
    hasRecruit: true,    // 관리 표/CSV 리크루팅 열 · 분석 리크루팅 대조
    brandSuffix: 'MIND2ACTION',
    headerSub: '',
  },
  org: {
    roleOptions: ['org_leader'],
    hasIncome: false,    // 피터공 10/20: 설계사가 아니니 소득은 필요 없다
    hasRecruit: false,
    brandSuffix: 'MIND2ACTION 일반',
    headerSub: '일반 조직판',
  },
};

export const EDITION_KEY = import.meta.env?.VITE_EDITION === 'org' ? 'org' : 'insurance';
export const EDITION = EDITIONS[EDITION_KEY];

const pick = (field) => Object.fromEntries(Object.entries(ROLES).map(([k, r]) => [k, r[field]]));
export const JOB_LABELS = pick('label');
export const JOB_TO_CM = pick('cm');
export const JOB_TO_ROLE = pick('range');
export const JOB_TO_REPORT = pick('report');
export const ROLE_GROUP = pick('group');
