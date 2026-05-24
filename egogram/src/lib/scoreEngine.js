import questions from '../data/questions.json';

const EGO_STATES = ['CP', 'NP', 'A', 'FC', 'AC'];
const EGO_LABELS = {
  CP: '통제적 부모',
  NP: '자상한 부모',
  A: '어른 자아',
  FC: '자유로운 아이',
  AC: '순응하는 아이'
};

const TIE_PRIORITY = ['CP', 'A', 'NP', 'AC', 'FC'];

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

// 역할별 × 자아상태별 "조율(코칭) 불필요 안전구간" (손소장 26.0525 확정)
// §1 성향 그래프의 경계선 밴드 + §3 조율 발동 로직이 공유하는 단일 기준
const SAFE_RANGES = {
  sales:   { CP: [11, 16], NP: [11, 16], A: [14, 20], FC: [11, 16], AC: [8, 16] },  // 컨설턴트
  manager: { CP: [11, 16], NP: [14, 20], A: [14, 20], FC: [11, 16], AC: [8, 13] },  // 리더
  coach:   { CP: [11, 16], NP: [14, 20], A: [11, 20], FC: [11, 16], AC: [11, 16] }, // 코치
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
