// 관리자 결과 확인 탭의 캠페인 선택 규칙 — SPEC §15-4. 화면과 검사가 같이 쓰는 순수 함수.
import { NO_CAMPAIGN } from './storage.js';

// 필터 목록 순서: 참여 시작순 → 생성순 (7/3부터 쓰던 순서 그대로)
export function orderCampaignsForFilter(campaigns) {
  return campaigns.slice().sort((a, b) =>
    (a.period_start || '9999-99-99').localeCompare(b.period_start || '9999-99-99')
    || (a.created_at || '').localeCompare(b.created_at || '')
  );
}

// 자동 선택: 응답이 있는 캠페인 중 가장 최근에 만든 것 → 없으면 캠페인 없음 응답 → 없으면 null
export function defaultCampaignKey(campaigns, counts) {
  if (!counts) return null;
  const withRows = campaigns
    .filter((c) => (counts.byCampaign[c.id] || 0) > 0)
    .sort((a, b) => (b.created_at || '').localeCompare(a.created_at || ''));
  if (withRows.length > 0) return withRows[0].id;
  return counts.none > 0 ? NO_CAMPAIGN : null;
}

// 사람이 고른 키가 아직 유효하면 그것, 아니면 자동 선택.
//   응답 0명인 캠페인도 사람이 골랐으면 유효하다(캠페인 관리 탭 「설문결과 데이터 보기」).
export function resolveCampaignKey(chosen, campaigns, counts) {
  if (chosen === NO_CAMPAIGN && counts && counts.none > 0) return chosen;
  if (chosen && campaigns.some((c) => c.id === chosen)) return chosen;
  return defaultCampaignKey(campaigns, counts);
}
