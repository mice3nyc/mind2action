import { supabase } from './supabase';
import { fetchAllRows } from './fetchAll';

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
export async function fetchResponses(columns = '*', filter = (q) => q) {
  const { rows, error } = await fetchAllRows(() =>
    filter(supabase.from('responses').select(columns, { count: 'exact' }))
      .order('created_at', { ascending: true })
      .order('id', { ascending: true })
  );
  if (error) {
    console.error('Load failed:', error);
    throw error;
  }
  return rows;
}

// 관리자 결과 목록 — 전체, 최신순. 실패하면 throw (0건은 「다 지워졌다」로 읽힌다).
export async function loadResults() {
  const rows = await fetchResponses();
  return rows.reverse().map(mapRow);
}

// 한 캠페인의 응답 전부 — 캠페인 삭제 전 백업용. 메모리 목록이 아니라 DB에 다시 묻는다.
export async function loadCampaignResults(campaignId) {
  const rows = await fetchResponses('*', (q) => q.eq('campaign_id', campaignId));
  return rows.reverse().map(mapRow);
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

export async function deleteResult(id) {
  const { error } = await supabase.from('responses').delete().eq('id', id);
  if (error) console.error('Delete failed:', error);
}

export async function clearResults() {
  const { error } = await supabase.from('responses').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  if (error) console.error('Clear failed:', error);
}
