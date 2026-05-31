import { supabase } from './supabase';

// 링크 코드용 문자셋 — 혼동문자(0 O 1 I l) 제외
const CODE_CHARS = 'abcdefghjkmnpqrstuvwxyz23456789';

function genCode(len = 7) {
  let s = '';
  for (let i = 0; i < len; i++) {
    s += CODE_CHARS[Math.floor(Math.random() * CODE_CHARS.length)];
  }
  return s;
}

// 설문 링크 (배포 도메인 기준)
export function campaignLink(code) {
  return `https://survey.mind2action.kr/?g=${code}`;
}

// 관리자: 전체 캠페인 (로그인 필요 — RLS authenticated)
export async function listCampaigns() {
  const { data, error } = await supabase
    .from('campaigns')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) {
    console.error('listCampaigns failed:', error);
    return [];
  }
  return data || [];
}

// 관리자: 캠페인 생성 (코드 자동 발급 + unique 충돌 재시도)
export async function createCampaign({ clientName, target, status, periodStart, periodEnd, educationDate, memo }) {
  for (let attempt = 0; attempt < 6; attempt++) {
    const code = genCode();
    const { data, error } = await supabase
      .from('campaigns')
      .insert({
        code,
        client_name: clientName,
        target: target || null,
        status: status || 'active',
        period_start: periodStart || null,
        period_end: periodEnd || null,
        education_date: educationDate || null,
        memo: memo || null,
      })
      .select()
      .single();
    if (!error) return data;
    if (error.code === '23505') continue; // code unique 충돌 → 재발급
    console.error('createCampaign failed:', error);
    throw error;
  }
  throw new Error('코드 발급에 실패했습니다. 다시 시도해주세요.');
}

// 관리자: 캠페인 수정
export async function updateCampaign(id, fields) {
  const { data, error } = await supabase
    .from('campaigns')
    .update(fields)
    .eq('id', id)
    .select()
    .single();
  if (error) {
    console.error('updateCampaign failed:', error);
    throw error;
  }
  return data;
}

// 설문 진입: code → 캠페인 단건 (anon, RPC — 전체 목록 비노출)
export async function getCampaignByCode(code) {
  const { data, error } = await supabase.rpc('get_campaign_by_code', { p_code: code });
  if (error) {
    console.error('getCampaignByCode failed:', error);
    return null;
  }
  return (data && data[0]) || null;
}
