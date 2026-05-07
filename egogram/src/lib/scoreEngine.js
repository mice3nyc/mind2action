const EGO_STATES = ['CP', 'NP', 'A', 'FC', 'AC'];
const EGO_LABELS = {
  CP: '통제적 부모',
  NP: '자상한 부모',
  A: '어른 자아',
  FC: '자유로운 아이',
  AC: '순응하는 아이'
};

const TIE_PRIORITY = ['CP', 'A', 'NP', 'AC', 'FC'];

function getGrade(score) {
  if (score >= 17) return '극고';
  if (score >= 14) return '고';
  if (score >= 11) return '중';
  if (score >= 8) return '저';
  return '극저';
}

function getSuccessRange(egoState) {
  if (['CP', 'NP', 'A'].includes(egoState)) return [14, 16];
  return [11, 13];
}

export function calculateScores(answers) {
  const scores = {};
  for (const ego of EGO_STATES) {
    scores[ego] = 0;
  }

  for (const [qId, value] of Object.entries(answers)) {
    const qNum = parseInt(qId.replace('Q', ''));
    let ego;
    if (qNum <= 10) ego = 'CP';
    else if (qNum <= 20) ego = 'NP';
    else if (qNum <= 30) ego = 'A';
    else if (qNum <= 40) ego = 'FC';
    else ego = 'AC';
    scores[ego] += value;
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

export { EGO_STATES, EGO_LABELS, getSuccessRange };
