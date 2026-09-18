// 인물상 60조합 키 (SPEC mind2action §13-4).
// scoreEngine은 top·bottom을 같은 동점 우선순위로 양방향 정렬해서, 최저점에 4~5개가 동점이면
// bottom이 top1/top2와 같은 코드가 된다(0~20 전수 408만 중 1,071). 그때 60종 키가 없다.
// 인물상 조회에서만 오름차순에서 top1·top2가 아닌 첫 성향을 bottom으로 쓴다.
// ⚠️ result.bottom 자체는 바꾸지 않는다 — cm7·조율 포인트가 읽는다.
// 순수 함수로 둔다(yaml import 없음) — node 대조 스크립트(check-identity60.mjs)도 같은 함수를 쓴다.
// 동점 우선순위는 호출하는 쪽이 넘긴다(egoTerms.TIE_PRIORITY).

const EGOS = ['CP', 'NP', 'A', 'FC', 'AC'];

export function identityBottom({ scores, top1, top2, bottom }, tie) {
  if (bottom !== top1 && bottom !== top2) return bottom;
  const asc = [...EGOS].sort((a, b) => scores[a] - scores[b] || tie.indexOf(a) - tie.indexOf(b));
  return asc.find(e => e !== top1 && e !== top2);
}

export function identityKey(result, tie) {
  return `${result.top1}_${result.top2}_${identityBottom(result, tie)}`;
}
