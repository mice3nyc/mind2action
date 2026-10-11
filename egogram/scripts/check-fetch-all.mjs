// 응답 조회가 끝까지 읽는가 — SPEC §14-5.
//   서버 상한을 흉내 낸 가짜 쿼리로 돈다. 판정은 «개수»가 아니라 받은 것이 원본과 같은 id·같은 순서인가.
//   사용: node scripts/check-fetch-all.mjs [대상 모듈 경로]   (경로를 주면 그 구현을 검사 — 변이 시험용)
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';

const target = process.argv[2]
  ? pathToFileURL(resolve(process.argv[2])).href
  : new URL('../src/lib/fetchAll.js', import.meta.url).href;
const { fetchAllRows } = await import(target);

let fail = 0;
let ran = 0;
const bad = (m) => { fail++; console.log('⛔', m); };

// 가짜 서버: n행을 들고, 한 요청에 serverCap행까지만 준다. range를 안 부르면 앞 serverCap행.
function fakeServer(n, { serverCap = 1000, withCount = true, failOnRequest = 0 } = {}) {
  const table = Array.from({ length: n }, (_, i) => ({ id: `r${String(i).padStart(5, '0')}` }));
  const state = { requests: 0 };
  const buildQuery = () => {
    let from = 0;
    let to = Infinity;
    const q = {
      range(a, b) { from = a; to = b; return q; },
      then(resolveFn, rejectFn) {
        state.requests++;
        const res = state.requests === failOnRequest
          ? { data: null, error: new Error('가짜 실패'), count: null }
          : { data: table.slice(from, Math.min(to + 1, from + serverCap)), error: null, count: withCount ? n : null };
        return Promise.resolve(res).then(resolveFn, rejectFn);
      },
    };
    return q;
  };
  return { table, state, buildQuery };
}

async function expectAll(label, n, opts) {
  ran++;
  const { table, buildQuery } = fakeServer(n, opts);
  const { rows, error } = await fetchAllRows(buildQuery);
  if (error) return bad(`${label}: 에러 ${error.message}`);
  if (!Array.isArray(rows)) return bad(`${label}: rows가 배열이 아님`);
  if (rows.length !== n) return bad(`${label}: ${rows.length}건 받음 (원본 ${n}건)`);
  for (let i = 0; i < n; i++) {
    if (rows[i].id !== table[i].id) return bad(`${label}: ${i}번째가 다름 ${rows[i].id} ≠ ${table[i].id}`);
  }
  console.log('✓', label, `${n}건`);
}

for (const n of [0, 1, 999, 1000, 1001, 2500]) await expectAll('기본 상한 1000', n);
for (const n of [499, 500, 501, 2500]) await expectAll('서버 상한이 요청보다 작음(500)', n, { serverCap: 500 });
for (const n of [0, 1000, 1001, 2500]) await expectAll('count를 안 주는 서버', n, { withCount: false });

// 중간 페이지 실패 → 부분 결과 없이 실패
{
  ran++;
  const { buildQuery } = fakeServer(2500, { failOnRequest: 2 });
  const { rows, error } = await fetchAllRows(buildQuery);
  if (!error) bad('2번째 페이지 실패: 에러가 안 올라옴');
  else if (rows != null) bad(`2번째 페이지 실패: 부분 결과 ${rows.length}건을 돌려줌`);
  else console.log('✓ 2번째 페이지 실패 → 부분 결과 없음');
}

if (ran !== 15) bad(`검사 ${ran}개만 돎 (15개여야 함)`);
console.log(fail ? `\n⛔ FAIL ${fail}건` : `\n✅ PASS ${ran}/15`);
process.exit(fail ? 1 : 0);
