// 에디션 역할 표 검사 — SPEC-org-edition §10 검증 (a).
//   역할 표가 여섯 군데에서 lib/edition 한 곳으로 모였다. 보험판은 «옮기기 전과 같은 값»이어야 한다.
//   아래 BEFORE는 10/20 옮기기 직전 코드에서 그대로 베낀 값이다(일부러 바꾼 sales_leader 라벨만 새 이름).
//   사용: node scripts/check-edition.mjs      종료코드 0 = 전부 통과
import { ROLES, EDITIONS, JOB_LABELS, JOB_TO_CM, JOB_TO_ROLE, JOB_TO_REPORT, ROLE_GROUP, EDITION_KEY } from '../src/lib/edition.js';

const LEGACY = ['sales', 'coach', 'sales_leader', 'branch_manager', 'training_leader', 'division_head', 'executive'];
const BEFORE = {
  JOB_LABELS: {   // resultLabels.js · CampaignAnalytics.jsx
    sales: '고객 컨설팅 영업', coach: '신인 육성 코칭', sales_leader: '리더(보험 조직 운영)',
    branch_manager: '지점장/지사장', training_leader: '교육팀장/지원팀장', division_head: '사업단장/부장', executive: '본부장',
  },
  JOB_TO_CM: {    // cmLookup.js
    sales: 'sales', coach: 'coach', sales_leader: 'manager',
    branch_manager: 'manager', training_leader: 'manager', division_head: 'manager', executive: 'manager',
  },
  JOB_TO_ROLE: {  // scoreEngine.js
    sales: 'sales', coach: 'coach', sales_leader: 'manager',
    branch_manager: 'manager', training_leader: 'manager', division_head: 'manager', executive: 'manager',
  },
  JOB_TO_REPORT: { // reportType.js
    sales: '보험설계사', coach: '코치/멘토', sales_leader: '관리자',
    branch_manager: '관리자', training_leader: '관리자', division_head: '관리자', executive: '관리자',
  },
  ROLE_GROUP: {   // CampaignAnalytics.jsx ROLE_OF
    sales: '컨설턴트', coach: '코치', sales_leader: '리더',
    branch_manager: '리더', training_leader: '리더', division_head: '리더', executive: '리더',
  },
};
const NOW = { JOB_LABELS, JOB_TO_CM, JOB_TO_ROLE, JOB_TO_REPORT, ROLE_GROUP };

const fails = [];
let checked = 0;
const eq = (what, got, want) => { checked++; if (got !== want) fails.push(`${what}: ${JSON.stringify(got)} ≠ ${JSON.stringify(want)}`); };

// 1. 보험판 옛 역할 일곱 × 표 다섯 — 값이 옮기기 전과 같은가
for (const [table, want] of Object.entries(BEFORE)) {
  for (const job of LEGACY) eq(`${table}.${job}`, NOW[table][job], want[job]);
}
// 2. 보험판 선택지 — 순서까지 옛 SurveyIntro와 같은가
eq('insurance.roleOptions', EDITIONS.insurance.roleOptions.join(','), 'sales,coach,sales_leader');
eq('insurance.hasIncome', EDITIONS.insurance.hasIncome, true);
eq('insurance.hasRecruit', EDITIONS.insurance.hasRecruit, true);
eq('insurance.brandSuffix', EDITIONS.insurance.brandSuffix, 'MIND2ACTION');   // 탭 제목 불변
// 3. 일반판 — 역할 하나, 소득·리크루팅 없음, 보험설계사 리포트(심화 대상)가 아님
eq('org.roleOptions', EDITIONS.org.roleOptions.join(','), 'org_leader');
eq('org.hasIncome', EDITIONS.org.hasIncome, false);
eq('org.hasRecruit', EDITIONS.org.hasRecruit, false);
eq('org_leader.report', JOB_TO_REPORT.org_leader, '관리자');
// 4. 선택지에 오른 역할은 전부 표에 있어야 한다(라벨 없는 선택지 방지)
for (const [ed, cfg] of Object.entries(EDITIONS)) for (const r of cfg.roleOptions) eq(`${ed} 선택지 ${r} 표에 있음`, !!ROLES[r], true);
// 5. node에서는 import.meta.env가 없으니 보험판으로 떨어져야 한다(기본값 = 라이브)
eq('EDITION_KEY 기본값', EDITION_KEY, 'insurance');

if (checked === 0) fails.push('검사한 항목이 0개 — 검사 자체가 안 돌았다');
if (fails.length) {
  console.error(`✗ 에디션 표 ${fails.length}건 어긋남 (검사 ${checked}개)`);
  for (const f of fails) console.error('  - ' + f);
  process.exit(1);
}
console.log(`✓ 에디션 표 통과 — 검사 ${checked}개`);
