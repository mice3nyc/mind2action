import { useState, useEffect } from 'react';
import { loadResults, loadCampaignResults, loadResponseCounts, deleteResult, NO_CAMPAIGN } from '../../lib/storage';
import { useCampaignRows } from '../../lib/useCampaignRows';
import { orderCampaignsForFilter, resolveCampaignKey } from '../../lib/adminSelect';
import { listCampaigns, deleteCampaign } from '../../lib/campaigns';
import { EGO_LABELS } from '../../lib/scoreEngine';
import { EGO_ORDER, EGO_COLOR, EGO_TINT, EGO_INK } from '../../lib/egoTerms';
import { JOB_LABELS, INCOME_LABELS, sortRows } from '../../lib/resultLabels';
import CampaignManager from './CampaignManager';
import CampaignDashboard from './CampaignDashboard';
import CampaignAnalytics from './CampaignAnalytics';
import ResultInsightModal from '../Result/ResultInsightModal';
import { reportTypeOf, isSimhwaTarget } from '../../lib/reportType';

// 직군 → 리포트 종류·심화 대상 판정은 lib/reportType으로 옮겼다(9/18, 심화 일괄 출력과 같이 쓴다 — SPEC simhwa §23-2).

// 용어 사전의 color·tint·ink를 이 화면이 쓰는 이름(bg/light/text)으로 옮긴다.
const EGO_COLORS = Object.fromEntries(EGO_ORDER.map(c => [c, {
  bg: EGO_COLOR[c], light: EGO_TINT[c], text: EGO_INK[c],
}]));

// 고객사명 → 안정적 색 (하드코딩 GROUP_COLORS 대체)
const GROUP_PALETTE = ['#0012de', '#e11d48', '#059669', '#d97706', '#7c3aed', '#0891b2', '#be185d', '#4338ca'];
function colorFor(name) {
  if (!name) return { bg: '#888', text: '#fff' };
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) >>> 0;
  return { bg: GROUP_PALETTE[h % GROUP_PALETTE.length], text: '#fff' };
}

function ScoreCell({ ego, score }) {
  const pct = (score / 20) * 100;
  const color = EGO_COLORS[ego];
  return (
    <td className="td-score-bar">
      <div className="score-cell-v" style={{ background: `linear-gradient(to top, ${color.bg}30 ${pct}%, transparent ${pct}%)` }}>
        <span className="score-num">{score}</span>
      </div>
    </td>
  );
}

function EgoTag({ ego, type }) {
  const color = EGO_COLORS[ego];
  const style = type === 'top'
    ? { background: color.light, color: color.text, border: `1.5px solid ${color.bg}40` }
    : { background: '#f5f5f5', color: '#999', border: '1.5px solid #e0e0e0' };
  return <span className="ego-tag" style={style}>{ego}</span>;
}

function GroupBadge({ group }) {
  const c = colorFor(group);
  return <span className="group-badge" style={{ background: c.bg, color: c.text }}>{group || '-'}</span>;
}

// 클릭 정렬 헤더 — 소속/직무/소득에서 재사용. 버튼 형태로 정렬 가능함을 항상 표시(⇅)
function SortableTh({ label, sortKey, sortConfig, onSort }) {
  const active = sortConfig?.key === sortKey;
  const arrow = active ? (sortConfig.dir === 'asc' ? '▲' : '▼') : '⇅';
  return (
    <th className="th-sortable">
      <button type="button" className={`th-sort-btn ${active ? 'th-sort-btn-active' : ''}`} onClick={() => onSort(sortKey)}>
        {label}<span className="th-sort-arrow">{arrow}</span>
      </button>
    </th>
  );
}

export default function AdminDashboard({ onLogout }) {
  const [tab, setTab] = useState('results');
  const [campaigns, setCampaigns] = useState([]);
  const [counts, setCounts] = useState(null); // { total, none, byCampaign } — 개수만 묻는다. null=아직 모름 (SPEC §15-2)
  const [filter, setFilter] = useState(null); // 사람이 고른 캠페인 id | NO_CAMPAIGN. null이면 자동 선택 (§15-4)
  const [version, setVersion] = useState(0); // 올리면 고른 캠페인을 다시 읽는다
  const [exportingAll, setExportingAll] = useState(false);
  const [analyticsCampId, setAnalyticsCampId] = useState(null);
  const [insightIdx, setInsightIdx] = useState(null); // 개인 인사이트 팝업 — filtered 내 인덱스 (검토 프로토타입 26.0616)
  const [sortConfig, setSortConfig] = useState(null); // { key: 'department'|'jobType'|'incomeRange', dir: 'asc'|'desc' } — null=기본(입력순)
  const [loadError, setLoadError] = useState(false); // 개수 조회 실패 — 0건으로 보이면 「다 지워졌다」로 읽힌다 (SPEC §14)

  // 화면을 여는 것만으로는 응답 본문을 내려받지 않는다 — 캠페인 목록 + 개수만 (SPEC §15-1)
  async function reload() {
    const c = await listCampaigns();
    const n = await loadResponseCounts(c.map(x => x.id)).catch(() => null);
    setCampaigns(c);
    if (n) setCounts(n); // 실패하면 지난 숫자는 그대로 둔다
    setLoadError(!n);
    setVersion(v => v + 1);
  }

  useEffect(() => {
    reload();
  }, []);

  // 캠페인 목록에서 "설문 결과 확인" → 그 캠페인만 필터링된 결과 탭
  function viewCampaignResults(campaignId) {
    setFilter(campaignId || null);
    setSortConfig(null);
    setTab('results');
  }

  // 캠페인 목록에서 "분석 보기" → 그 캠페인 분석 탭
  function viewCampaignAnalytics(campaignId) {
    setAnalyticsCampId(campaignId);
    setTab('analytics');
  }

  const byCampaign = counts?.byCampaign || {};

  // 결과 확인 탭 — 고른 캠페인의 응답만 읽는다 (SPEC §15-3)
  const selectedKey = resolveCampaignKey(filter, campaigns, counts);
  const { rows, loading: rowsLoading, error: rowsError } = useCampaignRows(selectedKey, version);
  const filtered = rows || [];
  const selectedName = selectedKey === NO_CAMPAIGN
    ? '캠페인없음'
    : (campaigns.find(c => c.id === selectedKey)?.client_name || '');

  // 헤더 클릭 정렬 — 소속/직무/소득 3개 지원. 같은 헤더 재클릭 시 오름↔내림 토글, 다른 헤더 클릭 시 오름차순부터.
  function handleSort(key) {
    setSortConfig(prev => {
      if (prev?.key === key) return { key, dir: prev.dir === 'asc' ? 'desc' : 'asc' };
      return { key, dir: 'asc' };
    });
  }

  const sorted = sortRows(filtered, sortConfig);

  // 결과 필터 옵션: 캠페인을 일정(참여 시작)순 → 생성순. 선택 단위는 캠페인 id (SPEC §15-3)
  const filterOptions = orderCampaignsForFilter(campaigns);

  async function handleDelete(id) {
    const target = filtered.find(r => r.id === id);
    if (!window.confirm(`${target?.name || ''}님의 결과를 삭제하시겠습니까?`)) return;
    await deleteResult(id);
    await reload();
  }

  // 캠페인 삭제 — 백업(그 캠페인 응답 CSV) 자동 다운로드 후 삭제.
  // 전체 일괄 삭제는 폐기, 캠페인 단위로만 (피터공 5/31).
  // 백업 대상은 화면 목록이 아니라 그 자리에서 DB에 다시 물어 만든다 — 삭제는 DB 전부를 지우므로
  // 백업도 DB 전부여야 한다. 조회가 실패하면 삭제하지 않는다 (SPEC §14).
  async function handleDeleteCampaign(campaign) {
    let campRows;
    try {
      campRows = await loadCampaignResults(campaign.id);
    } catch {
      window.alert('이 캠페인의 응답을 불러오지 못해 삭제를 중단했습니다. 잠시 후 다시 시도해 주세요.');
      return;
    }
    const ok = window.confirm(
      `[${campaign.client_name}] 캠페인과 연결된 응답 ${campRows.length}건을 삭제합니다.\n\n` +
      `삭제 전 이 캠페인 응답을 CSV로 백업 다운로드합니다. 계속할까요?`
    );
    if (!ok) return;
    // 백업 먼저 (응답이 있을 때만)
    if (campRows.length > 0) {
      downloadResultsCSV(campRows, `backup_${campaign.client_name}_${new Date().toISOString().slice(0, 10)}.csv`);
    }
    await deleteCampaign(campaign.id);
    await reload();
  }

  // 결과 행 배열 → CSV 다운로드 (내보내기·삭제 전 백업 공용)
  function downloadResultsCSV(rows, filename) {
    if (!rows || rows.length === 0) return;
    const headers = ['그룹', '이름', '생년월일', '경력(월)', '회사', '소속', '직무', '소득', '리크루팅', 'CP', 'NP', 'A', 'FC', 'AC', '총점', 'TOP1', 'TOP2', 'BOTTOM', '일시'];
    const dataRows = rows.map(r => [
      r.group,
      r.name,
      r.birthDate,
      r.careerMonths,
      r.company || '',
      r.department,
      JOB_LABELS[r.jobType] || r.jobType,
      INCOME_LABELS[r.incomeRange] || r.incomeRange || '',
      r.recruitCount || '',
      r.scores?.CP, r.scores?.NP, r.scores?.A, r.scores?.FC, r.scores?.AC,
      r.total,
      `${r.top1} ${EGO_LABELS[r.top1]}`,
      `${r.top2} ${EGO_LABELS[r.top2]}`,
      `${r.bottom} ${EGO_LABELS[r.bottom]}`,
      new Date(r.timestamp).toLocaleString('ko-KR'),
    ]);

    const bom = '﻿';
    const csv = bom + [headers, ...dataRows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }

  // 파일명에 캠페인명 — 「전체 CSV」와 같은 이름이면 내려받은 뒤 어느 것이 전체인지 안 갈린다 (SPEC §15-5)
  function handleExportCSV() {
    downloadResultsCSV(filtered, `egogram_${selectedName}_${new Date().toISOString().slice(0, 10)}.csv`);
  }

  // 전체 CSV — 누를 때만 전체를 읽는다. 실패하면 파일을 만들지 않는다(부분 파일 금지).
  async function handleExportAllCSV() {
    setExportingAll(true);
    try {
      const all = await loadResults();
      downloadResultsCSV(all, `egogram_전체_${new Date().toISOString().slice(0, 10)}.csv`);
    } catch {
      window.alert('전체 응답을 불러오지 못해 CSV를 만들지 않았습니다. 잠시 후 다시 시도해 주세요.');
    } finally {
      setExportingAll(false);
    }
  }

  const egoKeys = ['CP', 'NP', 'A', 'FC', 'AC'];

  return (
    <section className="admin-section">
      <div className="admin-header">
        <div>
          <h1>관리자</h1>
          <p className="admin-count">설문 결과 {counts ? counts.total : '…'}건 · 캠페인 {campaigns.length}개</p>
          {loadError && (
            <p className="admin-count" role="alert" style={{ color: '#d0021b' }}>
              응답을 불러오지 못했습니다. 아래 숫자는 최신이 아닐 수 있습니다. 새로고침해 주세요.
            </p>
          )}
        </div>
        <button className="btn btn-secondary" onClick={onLogout}>로그아웃</button>
      </div>

      <div className="admin-tabs">
        <button className={`admin-tab ${tab === 'campaigns' ? 'active' : ''}`} onClick={() => setTab('campaigns')}>캠페인 관리</button>
        <button className={`admin-tab ${tab === 'dashboard' ? 'active' : ''}`} onClick={() => setTab('dashboard')}>진행 현황</button>
        <button className={`admin-tab ${tab === 'results' ? 'active' : ''}`} onClick={() => setTab('results')}>결과 확인</button>
        <button className={`admin-tab ${tab === 'analytics' ? 'active' : ''}`} onClick={() => setTab('analytics')}>캠페인 분석</button>
      </div>

      {tab === 'campaigns' && (
        <CampaignManager campaigns={campaigns} counts={byCampaign} onChange={reload} onViewResults={viewCampaignResults} onViewAnalytics={viewCampaignAnalytics} onDeleteCampaign={handleDeleteCampaign} sortConfig={sortConfig} />
      )}

      {tab === 'dashboard' && (
        <CampaignDashboard campaigns={campaigns} counts={byCampaign} />
      )}

      {tab === 'analytics' && (
        <CampaignAnalytics campaigns={campaigns} counts={byCampaign} version={version} campId={analyticsCampId} onCampId={setAnalyticsCampId} />
      )}

      {tab === 'results' && (
        <>
          <div className="admin-toolbar">
            <div className="admin-filters">
              <label className="results-filter-label">캠페인</label>
              <select
                className="form-input results-filter-select"
                value={selectedKey || ''}
                onChange={e => { setFilter(e.target.value || null); setSortConfig(null); }}
              >
                {!selectedKey && <option value="">응답이 있는 캠페인 없음</option>}
                {filterOptions.map(c => (
                  <option key={c.id} value={c.id}>{c.client_name} ({byCampaign[c.id] ?? '…'})</option>
                ))}
                {counts?.none > 0 && <option value={NO_CAMPAIGN}>캠페인 없음 ({counts.none})</option>}
              </select>
            </div>
            <div className="admin-actions">
              <button className="btn btn-primary" onClick={handleExportCSV} disabled={filtered.length === 0}>
                CSV 다운로드
              </button>
              <button className="btn btn-secondary" onClick={handleExportAllCSV} disabled={exportingAll || !counts || counts.total === 0} title="모든 캠페인의 응답을 한 파일로">
                {exportingAll ? '전체 불러오는 중…' : `전체 CSV (${counts ? counts.total : '…'}건)`}
              </button>
            </div>
          </div>

          {rowsError ? (
            <div className="admin-empty" role="alert">응답을 불러오지 못했습니다. 새로고침해 주세요.</div>
          ) : !selectedKey ? (
            <div className="admin-empty">{counts ? '아직 설문 결과가 없습니다.' : loadError ? '응답 수를 불러오지 못했습니다. 새로고침해 주세요.' : '불러오는 중…'}</div>
          ) : !rows && rowsLoading ? (
            <div className="admin-empty">불러오는 중…</div>
          ) : filtered.length === 0 ? (
            <div className="admin-empty">이 캠페인에는 아직 응답이 없습니다.</div>
          ) : (
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>그룹</th>
                    <th>이름</th>
                    <th>생년월일</th>
                    <th>경력</th>
                    <th>회사</th>
                    <SortableTh label="소속" sortKey="department" sortConfig={sortConfig} onSort={handleSort} />
                    <SortableTh label="직무" sortKey="jobType" sortConfig={sortConfig} onSort={handleSort} />
                    <SortableTh label="소득" sortKey="incomeRange" sortConfig={sortConfig} onSort={handleSort} />
                    <th>리크루팅</th>
                    {egoKeys.map(e => (
                      <th key={e} className="th-ego" style={{ color: EGO_COLORS[e].bg }}>{e}</th>
                    ))}
                    <th>총점</th>
                    <th>TOP1</th>
                    <th>BOT</th>
                    <th>일시</th>
                    <th>리포트</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {sorted.map((r, ri) => (
                    <tr key={r.id}>
                      <td><GroupBadge group={r.group} /></td>
                      <td className="td-name">{r.name}</td>
                      <td>{r.birthDate}</td>
                      <td>{r.careerMonths && `${r.careerMonths}개월`}</td>
                      <td>{r.company || '-'}</td>
                      <td className="td-dept">{r.department}</td>
                      <td>{JOB_LABELS[r.jobType] || r.jobType}</td>
                      <td className="td-small">{INCOME_LABELS[r.incomeRange] || '-'}</td>
                      <td>{r.recruitCount || '-'}</td>
                      {egoKeys.map(e => (
                        <ScoreCell key={e} ego={e} score={r.scores?.[e] || 0} />
                      ))}
                      <td className="td-score td-total">{r.total}</td>
                      <td><EgoTag ego={r.top1} type="top" /></td>
                      <td><EgoTag ego={r.bottom} type="bot" /></td>
                      <td className="td-date">{new Date(r.timestamp).toLocaleString('ko-KR', { month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</td>
                      <td>
                        <div className="report-action-group">
                          <a href={`#/report/${r.id}`} target="_blank" className="btn-report-action">
                            리포트 보기<span className="btn-report-type" data-type={reportTypeOf(r.jobType)}>{reportTypeOf(r.jobType)}</span>
                          </a>
                          {/* 심화코칭 리포트 — 보험설계사(sales)만 (심화는 sales 전용, SPEC §11 D5) */}
                          {isSimhwaTarget(r.jobType) && (
                            <a href={`#/simhwa/${r.id}`} target="_blank" className="btn-report-action btn-simhwa-action">
                              심화코칭
                            </a>
                          )}
                          {/* 성향 인사이트 팝업 (검토 프로토타입 26.0616) */}
                          <button type="button" className="btn-report-action btn-graph-action" onClick={() => setInsightIdx(ri)}>
                            그래프<br />보기
                          </button>
                        </div>
                      </td>
                      <td>
                        <button className="btn-delete-action" onClick={() => handleDelete(r.id)}>삭제</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}

      {/* 개인 성향 인사이트 팝업 (검토 프로토타입 26.0616) — 결과 행 "그래프 보기" + 이전/다음 이동 */}
      {(() => {
        const cur = insightIdx != null ? sorted[insightIdx] : null;
        return (
          <ResultInsightModal
            open={insightIdx != null && !!cur}
            onClose={() => setInsightIdx(null)}
            result={cur ? { scores: cur.scores, top1: cur.top1, top2: cur.top2, bottom: cur.bottom } : { scores: {} }}
            profile={cur ? { name: cur.name, jobType: cur.jobType, group: cur.group } : null}
            campaignId={cur?.campaignId || null}
            position={insightIdx != null ? `${insightIdx + 1} / ${sorted.length}` : ''}
            onPrev={insightIdx > 0 ? () => setInsightIdx(insightIdx - 1) : null}
            onNext={insightIdx != null && insightIdx < sorted.length - 1 ? () => setInsightIdx(insightIdx + 1) : null}
          />
        );
      })()}
    </section>
  );
}
