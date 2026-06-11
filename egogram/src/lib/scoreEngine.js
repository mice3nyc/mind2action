import questions from '../data/questions.json';

const EGO_STATES = ['CP', 'NP', 'A', 'FC', 'AC'];
// 자아상태 라벨 — TA 정식명("통제적 부모" 등)은 부정적으로 읽혀 중립 키워드로 통일.
// 리포트(ReportPageV2 EGO_PLAIN_LABEL)와 동일한 표기. 결과 화면·admin CSV가 이걸 쓴다.
const EGO_LABELS = {
  CP: '기준·결단',
  NP: '배려·공감',
  A: '이성·판단',
  FC: '친화·표현',
  AC: '협조·조율'
};

// 동점 시 우선순위 (TOP·BOTTOM 공통) — 손소장 26.0611(1): A 최우선으로 변경 (구: CP A NP AC FC)
const TIE_PRIORITY = ['A', 'CP', 'NP', 'FC', 'AC'];

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
