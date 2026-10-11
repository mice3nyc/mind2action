// 여러 행을 끝까지 읽기 — SPEC §14.
//   Supabase는 한 요청에 돌려주는 행 수에 상한이 있고(기본 1,000), 범위를 안 주면 에러 없이 앞부분만 준다.
//   responses를 여러 행 읽는 곳은 전부 이 함수를 거친다.
//
//   buildQuery() — 호출마다 새 쿼리를 만들어 돌려준다. 반드시
//     · select(…, { count: 'exact' })
//     · 끝까지 고정된 정렬 (created_at 오름차순 → id 오름차순)
//   을 포함할 것. 오름차순이어야 읽는 도중 들어온 새 응답이 이미 읽은 자리를 밀지 않는다.
//
//   돌려주는 것: { rows, error }. 중간 페이지가 실패하면 rows는 null — 부분 결과를 주지 않는다.
export const PAGE_SIZE = 1000;
const MAX_PAGES = 1000; // 서버가 같은 페이지를 계속 돌려주는 경우의 안전판

export async function fetchAllRows(buildQuery, pageSize = PAGE_SIZE) {
  const rows = [];
  let total = null;
  for (let page = 0; page < MAX_PAGES; page++) {
    const { data, error, count } = await buildQuery().range(rows.length, rows.length + pageSize - 1);
    if (error) return { rows: null, error };
    if (total == null && typeof count === 'number') total = count;
    const got = data || [];
    rows.push(...got);
    // 멈추는 조건은 이 둘뿐 — 「한 페이지가 덜 찼다」로 멈추면 서버 상한이 pageSize보다 작을 때 다시 잘린다
    if (got.length === 0) return { rows, error: null };
    if (total != null && rows.length >= total) return { rows, error: null };
  }
  return { rows: null, error: new Error(`fetchAllRows: ${MAX_PAGES}페이지를 넘겨도 끝나지 않음`) };
}
