import questions from '../data/questions.json';
import { EGO_ORDER, EGO_LABEL, TIE_PRIORITY } from './egoTerms';

// 자아상태 코드·라벨·동점 우선순위는 전부 용어 사전(data/ego_terms.yaml)에서 온다.
//   라벨은 TA 정식명("통제적 부모" 등)이 부정적으로 읽혀 중립 키워드로 통일한 것.
//   결과 화면·admin CSV·리포트가 같은 값을 본다. SPEC: docs/SPEC-ego-terms.md
const EGO_STATES = EGO_ORDER;
const EGO_LABELS = EGO_LABEL;

const QUESTION_EGO = {};
for (const q of questions) {
  QUESTION_EGO[q.id] = q.egoState;
}

function getGrade(score) {
  if (score >= 17) return '극고';
  if (score >= 14) return '고';
  if (score >= 11) return '중';
  if (score >= 8) return '저';
  return '극저';
}

// "조율(코칭) 불필요 안전구간" — §1 성향 그래프의 경계선 밴드 + §3 조율 발동 로직이 공유하는 단일 기준
// 손소장 26.0611(10·11): 역할별 표(v0.7) 폐기, 세 역할 공통 CP·NP·A·FC=11-20, AC=8-16.
// 26.0611 xlsx CM4-2의 본문 셀 배치(CP·NP·A·FC 8-10, AC 17-20만 본문)가 이 구간을 전제한다.
const UNIFIED_RANGES = { CP: [11, 20], NP: [11, 20], A: [11, 20], FC: [11, 20], AC: [8, 16] };
const SAFE_RANGES = {
  sales:   UNIFIED_RANGES,  // 컨설턴트
  manager: UNIFIED_RANGES,  // 리더
  coach:   UNIFIED_RANGES,  // 코치
};

const JOB_TO_ROLE = {
  sales: 'sales',
  coach: 'coach',
  sales_leader: 'manager',
  branch_manager: 'manager',
  training_leader: 'manager',
  division_head: 'manager',
  executive: 'manager',
};

function roleFromJobType(jobType) {
  return JOB_TO_ROLE[jobType] || 'sales';
}

function getSuccessRange(egoState, jobType) {
  const role = roleFromJobType(jobType);
  return SAFE_RANGES[role]?.[egoState] || [11, 16];
}

export function calculateScores(answers) {
  const scores = {};
  for (const ego of EGO_STATES) {
    scores[ego] = 0;
  }

  for (const [qId, value] of Object.entries(answers)) {
    const ego = QUESTION_EGO[qId];
    if (ego) scores[ego] += value;
  }

  const grades = {};
  for (const ego of EGO_STATES) {
    grades[ego] = getGrade(scores[ego]);
  }

  const sorted = [...EGO_STATES].sort((a, b) => {
    if (scores[b] !== scores[a]) return scores[b] - scores[a];
    return TIE_PRIORITY.indexOf(a) - TIE_PRIORITY.indexOf(b);
  });

  const sortedAsc = [...EGO_STATES].sort((a, b) => {
    if (scores[a] !== scores[b]) return scores[a] - scores[b];
    return TIE_PRIORITY.indexOf(a) - TIE_PRIORITY.indexOf(b);
  });

  return {
    scores,
    grades,
    top1: sorted[0],
    top2: sorted[1],
    bottom: sortedAsc[0],
    total: Object.values(scores).reduce((a, b) => a + b, 0)
  };
}

export { EGO_STATES, EGO_LABELS, getSuccessRange, SAFE_RANGES, roleFromJobType };
