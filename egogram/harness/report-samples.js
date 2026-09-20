// 인쇄 하니스용 표본 행 — 실응답이 아니다(anon으로는 responses가 0행).
//   SPEC §14-2: 「소제목이 페이지 바닥에 홀로 남는가」는 사람마다 다르게 나므로
//   인물상 설명문·본문 길이가 갈리도록 top 쌍·bottom·직군을 흩어 놓았다.
//   점수는 0~20. top1/top2/bottom/grades는 scoreEngine과 같은 규칙으로 여기서 파생한다.

export const EGO_STATES = ['CP', 'NP', 'A', 'FC', 'AC'];
const TIE_PRIORITY = ['A', 'CP', 'NP', 'FC', 'AC'];

function grade(score) {
  if (score >= 17) return '극고';
  if (score >= 14) return '고';
  if (score >= 11) return '중';
  if (score >= 8) return '저';
  return '극저';
}

// scoreEngine.calculateScores와 같은 정렬 — answers가 아니라 점수에서 바로 판다.
export function deriveRow({ name, job_type, company, department, scores }) {
  const desc = [...EGO_STATES].sort((a, b) =>
    scores[b] !== scores[a] ? scores[b] - scores[a] : TIE_PRIORITY.indexOf(a) - TIE_PRIORITY.indexOf(b));
  const asc = [...EGO_STATES].sort((a, b) =>
    scores[a] !== scores[b] ? scores[a] - scores[b] : TIE_PRIORITY.indexOf(a) - TIE_PRIORITY.indexOf(b));
  const grades = {};
  for (const ego of EGO_STATES) grades[ego] = grade(scores[ego]);
  return {
    name, job_type, company, department,
    score_cp: scores.CP, score_np: scores.NP, score_a: scores.A,
    score_fc: scores.FC, score_ac: scores.AC,
    top1: desc[0], top2: desc[1], bottom: asc[0], grades,
    total: EGO_STATES.reduce((s, e) => s + scores[e], 0),
  };
}

export const SAMPLES = [
  { name: '이영화', job_type: 'sales',        company: '한화피플라이프', department: '강남지점',
    scores: { CP: 15, NP: 16, A: 19, FC: 5,  AC: 17 } },   // 사진의 장면과 같은 모양(A top, FC bottom)
  { name: '김정임', job_type: 'sales',        company: '한화피플라이프', department: '분당지점',
    scores: { CP: 18, NP: 12, A: 14, FC: 16, AC: 9  } },
  { name: '이서연', job_type: 'coach',        company: '테스트 고객사',  department: '교육팀',
    scores: { CP: 6,  NP: 18, A: 11, FC: 17, AC: 13 } },
  { name: '이선규', job_type: 'branch_manager', company: '테스트 고객사', department: '영업1본부',
    scores: { CP: 13, NP: 13, A: 13, FC: 13, AC: 13 } },   // 전부 동점 — 가장자리
  { name: '허진랑', job_type: 'executive',    company: '테스트 고객사',  department: '경영지원',
    scores: { CP: 20, NP: 7,  A: 16, FC: 10, AC: 4  } },
  { name: '이영수', job_type: 'sales',        company: '',               department: '',
    scores: { CP: 9,  NP: 9,  A: 20, FC: 18, AC: 15 } },   // 소속 없는 표지
];
