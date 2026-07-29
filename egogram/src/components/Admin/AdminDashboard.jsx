import { useState, useEffect } from 'react';
import { loadResults, deleteResult } from '../../lib/storage';
import { listCampaigns, deleteCampaign } from '../../lib/campaigns';
import { EGO_LABELS } from '../../lib/scoreEngine';
import { EGO_ORDER, EGO_COLOR, EGO_TINT, EGO_INK } from '../../lib/egoTerms';
import { JOB_LABELS, INCOME_LABELS, sortRows } from '../../lib/resultLabels';
import CampaignManager from './CampaignManager';
import CampaignDashboard from './CampaignDashboard';
import CampaignAnalytics from './CampaignAnalytics';
import ResultInsightModal from '../Result/ResultInsightModal';

const JOB_TO_REPORT = {
  sales: '보험설계사',
  coach: '코치/멘토',
  sales_leader: '관리자',
  branch_manager: '관리자',
  training_leader: '관리자',
  division_head: '관리자',
  executive: '관리자',
};

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
  const [results, setResults] = useState([]);
  const [campaigns, setCampaigns] = useState([]);
  const [filter, setFilter] = useState('all');
  const [analyticsCampId, setAnalyticsCampId] = useState(null);
  const [insightIdx, setInsightIdx] = useState(null); // 개인 인사이트 팝업 — filtered 내 인덱스 (검토 프로토타입 26.0616)
  const [sortConfig, setSortConfig] = useState(null); // { key: 'department'|'jobType'|'incomeRange', dir: 'asc'|'desc' } — null=기본(입력순)

  async function reload() {
    const [r, c] = await Promise.all([loadResults(), listCampaigns()]);
    setResults(r);
    setCampaigns(c);
  }

  useEffect(() => {
    reload();
  }, []);

  // 캠페인 목록에서 "설문 결과 확인" → 그 캠페인만 필터링된 결과 탭
  function viewCampaignResults(clientName) {
    setFilter(clientName || 'all');
    setTab('results');
  }

  // 캠페인 목록에서 "분석 보기" → 그 캠페인 분석 탭
  function viewCampaignAnalytics(campaignId) {
    setAnalyticsCampId(campaignId);
    setTab('analytics');
  }

  // 캠페인별 참여수 (results 기준)
  const counts = {};
  for (const r of results) {
    if (r.campaignId) counts[r.campaignId] = (counts[r.campaignId] || 0) + 1;
  }

  const filtered = filter === 'all' ? results : results.filter(r => r.group === filter);

  // 헤더 클릭 정렬 — 소속/직무/소득 3개 지원. 같은 헤더 재클릭 시 오름↔내림 토글, 다른 헤더 클릭 시 오름차순부터.
  function handleSort(key) {
    setSortConfig(prev => {
      if (prev?.key === key) return { key, dir: prev.dir === 'asc' ? 'desc' : 'asc' };
      return { key, dir: 'asc' };
    });
  }

  const sorted = sortRows(filtered, sortConfig);

  const groupCounts = {};
  for (const r of results) {
    if (r.group) groupCounts[r.group] = (groupCounts[r.group] || 0) + 1;
  }

  // 결과 필터 옵션: 캠페인을 일정(참여 시작)순 → 생성순
  const orderedCampaignNames = [...new Set(
    campaigns.slice().sort((a, b) =>
      (a.period_start || '9999-99-99').localeCompare(b.period_start || '9999-99-99')
      || (a.created_at || '').localeCompare(b.created_at || '')
    ).map(c => c.client_name)
  )];
  // 실존 캠페인만 (삭제·레거시 group_name 잔재 제외 — 손소장 26.0604).
  // group_name == client_name으로 적재되므로 필터 매칭은 그대로 유효.
  const filterOptions = orderedCampaignNames;

  async function handleDelete(id) {
    const target = results.find(r => r.id === id);
    if (!window.confirm(`${target?.name || ''}님의 결과를 삭제하시겠습니까?`)) return;
    const updated = await deleteResult(id);
    setResults(updated);
  }

  // 캠페인 삭제 — 백업(그 캠페인 응답 CSV) 자동 다운로드 후 삭제.
  // 전체 일괄 삭제는 폐기, 캠페인 단위로만 (피터공 5/31).
  async function handleDeleteCampaign(campaign) {
    const campRows = results.filter(r => r.campaignId === campaign.id);
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

  function handleExportCSV() {
    downloadResultsCSV(filtered, `egogram_results_${new Date().toISOString().slice(0, 10)}.csv`);
  }

  const egoKeys = ['CP', 'NP', 'A', 'FC', 'AC'];

  return (
    <section className="admin-section">
      <div className="admin-header">
        <div>
          <h1>관리자</h1>
          <p className="admin-count">설문 결과 {results.length}건 · 캠페인 {campaigns.length}개</p>
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
        <CampaignManager campaigns={campaigns} counts={counts} onChange={reload} onViewResults={viewCampaignResults} onViewAnalytics={viewCampaignAnalytics} onDeleteCampaign={handleDeleteCampaign} sortConfig={sortConfig} />
      )}

      {tab === 'dashboard' && (
        <CampaignDashboard campaigns={campaigns} counts={counts} />
      )}

      {tab === 'analytics' && (
        <CampaignAnalytics campaigns={campaigns} results={results} campId={analyticsCampId} onCampId={setAnalyticsCampId} />
      )}

      {tab === 'results' && (
        <>
          <div className="admin-toolbar">
            <div className="admin-filters">
              <label className="results-filter-label">캠페인</label>
              <select
                className="form-input results-filter-select"
                value={filter}
                onChange={e => { setFilter(e.target.value); setSortConfig(null); }}
              >
                <option value="all">전체 ({results.length})</option>
                {filterOptions.map(g => (
                  <option key={g} value={g}>{g} ({groupCounts[g] || 0})</option>
                ))}
              </select>
            </div>
            <div className="admin-actions">
              <button className="btn btn-primary" onClick={handleExportCSV} disabled={filtered.length === 0}>
                CSV 다운로드
              </button>
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="admin-empty">아직 설문 결과가 없습니다.</div>
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
                            리포트 보기<span className="btn-report-type" data-type={JOB_TO_REPORT[r.jobType] || '보험설계사'}>{JOB_TO_REPORT[r.jobType] || '보험설계사'}</span>
                          </a>
                          {/* 심화코칭 리포트 — 보험설계사(sales)만 (심화는 sales 전용, SPEC §11 D5) */}
                          {(JOB_TO_REPORT[r.jobType] || '보험설계사') === '보험설계사' && (
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
