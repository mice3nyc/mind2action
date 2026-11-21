import { supabase } from './supabase.js';
import { fetchAllRows } from './fetchAll.js';
import { EDITION } from './edition.js';

// 지움(보관) — SPEC-org-edition §12. 일반판만 hidden_at 열이 있다.
//   스위치가 꺼져 있으면(보험판) 조건을 한 글자도 붙이지 않는다 — 없는 열을 거르면 목록이 통째로 깨진다.
//   includeHidden = master가 「지운 항목 보기」를 켰을 때 · 캠페인 삭제 전 백업(삭제는 전부 지우므로 백업도 전부).
const hideFilter = (includeHidden = false) => (q) => (EDITION.hasHide && !includeHidden ? q.is('hidden_at', null) : q);

// 지운 캠페인 id — 응답 행에 따로 적지 않고 캠페인으로 거른다(§12). 실패하면 throw.
async function hiddenCampaignIds() {
  if (!EDITION.hasHide) return [];
  const { data, error } = await supabase.from('campaigns').select('id').not('hidden_at', 'is', null);
  if (error) throw error;
  return (data || []).map((c) => c.id);
}

export async function saveResult(profile, result, campaignId = null) {
  const row = {
    campaign_id: campaignId,
    group_name: profile.group || '',
    name: profile.name,
    birth_date: profile.birthDate,
    career_months: profile.careerMonths,
    company: profile.company || '',
    department: profile.department,
    job_type: profile.jobType,
    income_range: profile.incomeRange || '',
    recruit_count: profile.recruitCount || '',
    score_cp: result.scores.CP,
    score_np: result.scores.NP,
    score_a: result.scores.A,
    score_fc: result.scores.FC,
    score_ac: result.scores.AC,
    total: result.total,
    top1: result.top1,
    top2: result.top2,
    bottom: result.bottom,
    grades: result.grades,
  };

  const { error } = await supabase.from('responses').insert(row);
  if (error) console.error('Save failed:', error);
  return row;
}

function mapRow(r) {
  return {
    id: r.id,
    timestamp: r.created_at,
    campaignId: r.campaign_id,
    group: r.group_name,
    name: r.name,
    birthDate: r.birth_date,
    careerMonths: r.career_months,
    company: r.company || '',
    department: r.department,
    jobType: r.job_type,
    incomeRange: r.income_range,
    recruitCount: r.recruit_count,
    hiddenAt: EDITION.hasHide ? (r.hidden_at ?? null) : null,   // 일반판 지움 시각. 보험판은 늘 null(열이 없다)
    scores: { CP: r.score_cp, NP: r.score_np, A: r.score_a, FC: r.score_fc, AC: r.score_ac },
    grades: r.grades,
    total: r.total,
    top1: r.top1,
    top2: r.top2,
    bottom: r.bottom,
  };
}

// responses 여러 행 조회 — 끝까지 읽는다 (SPEC §14). 오름차순으로 읽어 돌려준다.
//   filter(q) — 조건을 붙일 자리. 실패하면 throw (부분 결과·빈 배열로 돌려주지 않는다).
//   일반판은 지운 응답을 기본으로 뺀다(§12). includeHidden이면 같이 읽는다.
export async function fetchResponses(columns = '*', filter = (q) => q, { includeHidden = false } = {}) {
  const { rows, error } = await fetchAllRows(() =>
    filter(hideFilter(includeHidden)(supabase.from('responses').select(columns, { count: 'exact' })))
      .order('created_at', { ascending: true })
      .order('id', { ascending: true })
  );
  if (error) {
    console.error('Load failed:', error);
    throw error;
  }
  return rows;
}

// 전체, 최신순 — 「전체 CSV」 전용 (SPEC §15-5). 화면을 여는 것만으로는 부르지 않는다.
// 실패하면 throw (0건은 「다 지워졌다」로 읽힌다).
// 일반판: 지운 응답 + 지운 캠페인의 응답을 뺀다 (§12).
export async function loadResults() {
  const [rows, hiddenCamps] = await Promise.all([fetchResponses(), hiddenCampaignIds()]);
  const drop = new Set(hiddenCamps);
  return rows.filter((r) => !drop.has(r.campaign_id)).reverse().map(mapRow);
}

// 한 캠페인의 응답 전부, 최신순 — 결과 확인·분석 탭, 캠페인 삭제 전 백업.
export async function loadCampaignResults(campaignId, opts) {
  const rows = await fetchResponses('*', (q) => q.eq('campaign_id', campaignId), opts);
  return rows.reverse().map(mapRow);
}

// 선택 키로 읽기 — 캠페인 id 또는 NO_CAMPAIGN(캠페인에 안 묶인 응답). SPEC §15-3
export const NO_CAMPAIGN = 'none';
export async function loadResultsByKey(key, opts) {
  if (key !== NO_CAMPAIGN) return loadCampaignResults(key, opts);
  const rows = await fetchResponses('*', (q) => q.is('campaign_id', null), opts);
  return rows.reverse().map(mapRow);
}

// 개수만 — 본문은 한 줄도 내려받지 않는다 (SPEC §15-2).
async function countResponses(filter = (q) => q) {
  const { count, error } = await filter(hideFilter()(supabase.from('responses').select('*', { count: 'exact', head: true })));
  if (error || typeof count !== 'number') throw error || new Error('countResponses: count 없음');
  return count;
}

// 관리자 숫자 — { total, none, byCampaign: { [id]: n } }. 하나라도 실패하면 throw
// (일부만 0으로 채워 주지 않는다 — 0명은 「아무도 안 했다」로 읽힌다).
// 요청 수가 캠페인 수에 비례한다. 캠페인이 100개를 넘기면 RPC 하나로 바꿀 자리.
//   일반판(§12): 개수는 지운 응답을 뺀 값. total = 캠페인 없음 + 지우지 않은 캠페인들의 합
//   (campaign_id는 FK라 남는 응답이 없다) — 지운 캠페인의 응답은 total에 안 든다.
//   hiddenCampaignIds = 목록에 같이 실려 온 지운 캠페인(「지운 항목 보기」를 켰을 때).
export async function loadResponseCounts(campaignIds, { hiddenCampaignIds: hiddenIds = [] } = {}) {
  // 보험판은 요청 순서까지 그대로(전체 → 캠페인 없음 → 캠페인별). 일반판은 전체를 따로 묻지 않는다
  const [counted, none, ...per] = await Promise.all([
    EDITION.hasHide ? null : countResponses(),
    countResponses((q) => q.is('campaign_id', null)),
    ...campaignIds.map((id) => countResponses((q) => q.eq('campaign_id', id))),
  ]);
  const byCampaign = {};
  campaignIds.forEach((id, i) => { byCampaign[id] = per[i]; });
  const drop = new Set(hiddenIds);
  const total = EDITION.hasHide
    ? none + campaignIds.filter((id) => !drop.has(id)).reduce((s, id) => s + byCampaign[id], 0)
    : counted;
  return { total, none, byCampaign };
}

// 캠페인 평균 5축 점수 + 표본 수. 집계만 조회(타인 개별 데이터 비노출).
// 결과 화면 "전체 속 내 위치" 비교용. campaignId 없으면 null.
export async function loadCampaignAverage(campaignId) {
  if (!campaignId) return null;
  let data;
  try {
    data = await fetchResponses('score_cp, score_np, score_a, score_fc, score_ac', (q) => q.eq('campaign_id', campaignId));
  } catch {
    return null;
  }
  if (data.length === 0) return null;
  const cols = { CP: 'score_cp', NP: 'score_np', A: 'score_a', FC: 'score_fc', AC: 'score_ac' };
  const avg = {};
  for (const [k, col] of Object.entries(cols)) {
    avg[k] = data.reduce((s, r) => s + (r[col] ?? 0), 0) / data.length;
  }
  return { avg, n: data.length };
}

// 지움/되살리기 — 일반판만 (§12). hidden_at 하나만 고친다(DB 열 권한도 이 열 하나).
export async function setResultHidden(id, hidden) {
  if (!EDITION.hasHide) throw new Error('지움은 일반판만');
  const { error } = await supabase.from('responses').update({ hidden_at: hidden ? new Date().toISOString() : null }).eq('id', id);
  if (error) {
    console.error('Hide failed:', error);
    throw error;
  }
}

export async function deleteResult(id) {
  const { error } = await supabase.from('responses').delete().eq('id', id);
  if (error) console.error('Delete failed:', error);
}

export async function clearResults() {
  const { error } = await supabase.from('responses').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  if (error) console.error('Clear failed:', error);
}
