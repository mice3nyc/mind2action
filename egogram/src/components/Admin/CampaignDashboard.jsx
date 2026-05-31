const STATUS_LABEL = {
  active: '진행중',
  draft: '준비',
  closed: '마감',
};

// 로컬 자정 기준 오늘
function todayMid() {
  const d = new Date();
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

// 'YYYY-MM-DD' → 오늘로부터 남은 일수 (양수=미래, 0=오늘, 음수=지남). null이면 null
function daysUntil(dateStr) {
  if (!dateStr) return null;
  const [y, m, d] = dateStr.split('-').map(Number);
  const target = new Date(y, m - 1, d);
  return Math.round((target - todayMid()) / 86400000);
}

function ddayText(n) {
  if (n === null) return '-';
  if (n > 0) return `D-${n}`;
  if (n === 0) return 'D-DAY';
  return `${-n}일 지남`;
}

// 'YYYY-MM-DD' → 'M.D'
function fmtDate(s) {
  if (!s) return '-';
  const [, m, d] = s.split('-');
  return `${Number(m)}.${Number(d)}`;
}

export default function CampaignDashboard({ campaigns, counts }) {
  if (!campaigns || campaigns.length === 0) {
    return <div className="admin-empty">아직 생성된 캠페인이 없습니다.</div>;
  }

  // 진행중 먼저, 그 다음 참여종료 임박순
  const ordered = campaigns.slice().sort((a, b) => {
    const aActive = a.status === 'active' ? 0 : 1;
    const bActive = b.status === 'active' ? 0 : 1;
    if (aActive !== bActive) return aActive - bActive;
    return (a.period_end || '9999-99-99').localeCompare(b.period_end || '9999-99-99');
  });

  return (
    <div className="campaign-dashboard">
      <div className="dashboard-grid">
        {ordered.map(c => {
          const part = counts[c.id] || 0;
          const expected = c.expected_count;
          const pct = expected ? Math.round((part / expected) * 100) : null;
          const endDays = daysUntil(c.period_end);
          const eduDays = daysUntil(c.education_date);
          return (
            <div key={c.id} className="dashboard-card" data-status={c.status}>
              <div className="dashboard-card-head">
                <span className="dashboard-card-name">{c.client_name}</span>
                <span className={`campaign-status campaign-status-${c.status}`}>
                  {STATUS_LABEL[c.status] || c.status}
                </span>
              </div>

              <div className="dashboard-progress">
                <div className="dashboard-progress-num">
                  참여 <strong>{part}</strong>
                  {expected ? <> / 예상 {expected}명</> : <>명</>}
                  {pct !== null && <span className="dashboard-pct"> ({pct}%)</span>}
                </div>
                {expected ? (
                  <div className="dashboard-bar">
                    <div
                      className="dashboard-bar-fill"
                      style={{ width: `${Math.min(pct, 100)}%` }}
                    />
                  </div>
                ) : (
                  <div className="dashboard-hint">예상 인원 미설정</div>
                )}
              </div>

              <div className="dashboard-meta">
                <div className="dashboard-meta-row">
                  <span>참여 기간</span>
                  <span>
                    {fmtDate(c.period_start)} ~ {fmtDate(c.period_end)}
                    {c.period_end && <span className="dashboard-dday"> {ddayText(endDays)}</span>}
                  </span>
                </div>
                <div className="dashboard-meta-row">
                  <span>교육일</span>
                  <span>
                    {fmtDate(c.education_date)}
                    {c.education_date && <span className="dashboard-dday"> {ddayText(eduDays)}</span>}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
