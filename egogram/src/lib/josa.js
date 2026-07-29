// ─────────────────────────────────────────────────────────────
// 조사 유틸 — 앞 낱말의 받침을 보고 조사를 고른다.
//   egoTerms에서 분리한 이유: 데이터(yaml) 의존이 없는 순수 함수라 노드에서 바로 검사할 수 있다.
//   왜 필요한가: 성향 라벨 다섯이 우연히 전부 받침으로 끝나서, 코드 곳곳이 "조사는 항상 '과'"를
//   전제로 쓰여 있었다. 받침 없는 이름(순응·협조 등)이 들어오면 그 전제가 깨진다.
//   SPEC: docs/SPEC-ego-terms.md §4·§5-3
// ─────────────────────────────────────────────────────────────

const HANGUL_FIRST = 0xac00, HANGUL_LAST = 0xd7a3;

export function hasBatchim(word) {
  if (!word) return false;
  const c = word.charCodeAt(word.length - 1);
  if (c < HANGUL_FIRST || c > HANGUL_LAST) return true;   // 한글 음절이 아니면 받침 있는 쪽으로(안전)
  return (c - HANGUL_FIRST) % 28 !== 0;
}

// 'ㄹ' 받침 — '으로/로'만 여기서 갈린다(예: 조율로).
export function isRieulBatchim(word) {
  if (!word) return false;
  const c = word.charCodeAt(word.length - 1);
  if (c < HANGUL_FIRST || c > HANGUL_LAST) return false;
  return (c - HANGUL_FIRST) % 28 === 8;
}

// josa('순응·협조', '이/가') → '가'
export function josa(word, pair) {
  const [withB, without] = pair.split('/');
  if (pair === '으로/로') return hasBatchim(word) && !isRieulBatchim(word) ? withB : without;
  return hasBatchim(word) ? withB : without;
}

// withJosa('순응·협조', '이/가') → '순응·협조가'
export function withJosa(word, pair) { return `${word}${josa(word, pair)}`; }

// 라벨 목록을 자연스럽게 잇는다 — "A과 B", "A, B, C". 조사는 앞 낱말 받침에 맞춘다.
export function joinWithJosa(words) {
  if (words.length <= 1) return words.join('');
  if (words.length === 2) return `${withJosa(words[0], '과/와')} ${words[1]}`;
  return words.join(', ');
}
