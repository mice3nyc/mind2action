// 관리자 데이터 층 검사 — SPEC §15-8.
//   가짜 PostgREST(서버 상한 1,000)에 «실제 supabase-js»로 붙어 storage.js를 그대로 돌린다.
//   사용: node scripts/check-admin-data.mjs [storage 모듈 경로]   (경로를 주면 그 구현을 검사 — 변이 시험용)
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';
import { buildDataset, makeFakeBackend } from './lib/fake-postgrest.mjs';

const data = buildDataset();
const backend = makeFakeBackend(data);
globalThis.fetch = backend.fetch; // supabase-js는 전역 fetch를 쓴다 — 불러오기 전에 바꿔 둔다

const target = process.argv[2]
  ? pathToFileURL(resolve(process.argv[2])).href
  : new URL('../src/lib/storage.js', import.meta.url).href;
const S = await import(target);
const { defaultCampaignKey, resolveCampaignKey, orderCampaignsForFilter } = await import('../src/lib/adminSelect.js');

let fail = 0;
let ran = 0;
const ok = (cond, label, detail = '') => { ran++; if (cond) console.log('✓', label); else { fail++; console.log('⛔', label, detail); } };
const ids = data.campaigns.map((c) => c.id);
const srcDesc = (pred) => data.responses.filter(pred).slice().sort((a, b) => b.created_at.localeCompare(a.created_at) || b.id.localeCompare(a.id)).map((r) => r.id);
const sameIds = (rows, want) => rows.length === want.length && rows.every((r, i) => r.id === want[i]);
async function served(fn) { const before = backend.stats.rowsServed; const out = await fn(); return { out, rows: backend.stats.rowsServed - before }; }

// 1. 개수 — 원본과 같은가, 본문을 한 줄도 안 내려받았는가
{
  const { out: c, rows } = await served(() => S.loadResponseCounts(ids));
  ok(c.total === data.responses.length, `전체 개수 ${data.responses.length}`, `받은 값 ${c.total}`);
  ok(c.none === 18, '캠페인 없음 18', `받은 값 ${c.none}`);
  for (const id of ids) ok(c.byCampaign[id] === data.expected[id], `${id} 개수 ${data.expected[id]}`, `받은 값 ${c.byCampaign[id]}`);
  ok(c.total === c.none + ids.reduce((s, id) => s + c.byCampaign[id], 0), '전체 = 캠페인 합 + 캠페인 없음');
  ok(rows === 0, '개수를 묻는 동안 내려받은 본문 0행', `${rows}행 내려받음`);
}

// 2. 캠페인 하나 읽기 — 그 캠페인 인원만큼만 내려받고, 원본과 같은 id·같은 순서
for (const id of ['camp-a', 'camp-b', 'camp-c', 'camp-d']) {
  const want = srcDesc((r) => r.campaign_id === id);
  const { out, rows } = await served(() => S.loadResultsByKey(id));
  ok(sameIds(out, want), `${id} 읽기: 원본과 같은 ${want.length}명·같은 순서`, `받은 ${out.length}명`);
  ok(rows === want.length, `${id} 읽기: 내려받은 행 = ${want.length}`, `${rows}행 내려받음`);
  ok(out.every((r) => r.campaignId === id), `${id} 읽기: 남의 캠페인 행 0`);
}

// 3. 캠페인 없음
{
  const want = srcDesc((r) => r.campaign_id == null);
  const { out, rows } = await served(() => S.loadResultsByKey(S.NO_CAMPAIGN));
  ok(sameIds(out, want), '캠페인 없음 읽기: 원본과 같은 18명·같은 순서', `받은 ${out.length}명`);
  ok(rows === 18, '캠페인 없음 읽기: 내려받은 행 = 18', `${rows}행`);
}

// 4. 전체 CSV용 — 전부
{
  const want = srcDesc(() => true);
  const out = await S.loadResults();
  ok(sameIds(out, want), `전체 읽기: 원본과 같은 ${want.length}명·같은 순서`, `받은 ${out.length}명`);
}

// 5. 개수 요청 하나가 실패하면 throw (일부만 0으로 채우지 않는다)
{
  backend.control.failMatching = (url) => url.search.includes('campaign_id=eq.camp-b');
  let threw = false;
  let got = null;
  try { got = await S.loadResponseCounts(ids); } catch { threw = true; }
  backend.control.failMatching = null;
  ok(threw, '개수 요청 하나 실패 → throw', got ? `값을 돌려줌: ${JSON.stringify(got.byCampaign)}` : '');
}
// 6. 본문 읽기 2번째 페이지 실패 → throw
{
  backend.control.failMatching = (url) => url.searchParams.get('offset') === '1000';
  let threw = false;
  try { await S.loadResultsByKey('camp-a'); } catch { threw = true; }
  backend.control.failMatching = null;
  ok(threw, '본문 2번째 페이지 실패 → throw');
}

// 7. 자동 선택 (§15-4)
{
  const counts = { total: 1431, none: 18, byCampaign: data.expected };
  ok(defaultCampaignKey(data.campaigns, counts) === 'camp-d', '자동 선택 = 응답 있는 것 중 가장 최근 생성(camp-d). 더 최근인 camp-c는 0명이라 건너뜀');
  ok(defaultCampaignKey(data.campaigns, { total: 18, none: 18, byCampaign: {} }) === S.NO_CAMPAIGN, '응답 있는 캠페인이 없으면 캠페인 없음');
  ok(defaultCampaignKey(data.campaigns, { total: 0, none: 0, byCampaign: {} }) === null, '아무것도 없으면 선택 없음');
  ok(resolveCampaignKey('camp-c', data.campaigns, counts) === 'camp-c', '사람이 고른 0명 캠페인은 유지');
  ok(resolveCampaignKey('camp-지워짐', data.campaigns, counts) === 'camp-d', '고른 캠페인이 사라지면 자동 선택으로');
  ok(resolveCampaignKey(S.NO_CAMPAIGN, data.campaigns, counts) === S.NO_CAMPAIGN, '캠페인 없음 선택 유지');
  ok(defaultCampaignKey(data.campaigns, null) === null, '개수를 아직 모르면 선택 없음');
  const order = orderCampaignsForFilter(data.campaigns).map((c) => c.id).join(',');
  ok(order === 'camp-a,camp-b,camp-d,camp-c', '필터 순서 = 참여 시작순, 시작일 없는 것은 끝', order);
}

const EXPECT = 33;
if (ran !== EXPECT) { fail++; console.log(`⛔ 검사 ${ran}개만 돎 (${EXPECT}개여야 함)`); }
console.log(fail ? `\n⛔ FAIL ${fail}건` : `\n✅ PASS ${ran}/${EXPECT}`);
process.exit(fail ? 1 : 0);
