import { useState, useEffect } from 'react';
import { loadResults, deleteResult, saveResult } from '../../lib/storage';
import { listCampaigns, createCampaign, deleteCampaign } from '../../lib/campaigns';
import { EGO_LABELS } from '../../lib/scoreEngine';
import CampaignManager from './CampaignManager';
import CampaignDashboard from './CampaignDashboard';

const JOB_TO_REPORT = {
  sales: '보험설계사',
  coach: '코치/멘토',
  sales_leader: '관리자',
  branch_manager: '관리자',
  training_leader: '관리자',
  division_head: '관리자',
  executive: '관리자',
};
import sampleData from '../../data/sampleResults.json';

const JOB_LABELS = {
  sales: '고객 컨설팅 영업',
  coach: '신인 육성 코칭',
  sales_leader: '조직운영 리더',
  branch_manager: '지점장/지사장',
  training_leader: '교육팀장/지원팀장',
  division_head: '사업단장/부장',
  executive: '본부장',
};

const INCOME_LABELS = {
  under200: '200만 미만',
  '200-400': '200~400만',
  '400-600': '400~600만',
  '600-800': '600~800만',
  '800-1000': '800~1000만',
  '1000-1500': '1000~1500만',
  '1500-2000': '1500~2000만',
  over2000: '2000만 이상',
};

const EGO_COLORS = {
  CP: { bg: '#ef4444', light: '#fef2f2', text: '#dc2626' },
  NP: { bg: '#f59e0b', light: '#fffbeb', text: '#d97706' },
  A:  { bg: '#38bdf8', light: '#f0f9ff', text: '#0284c7' },
  FC: { bg: '#10b981', light: '#ecfdf5', text: '#059669' },
  AC: { bg: '#8b5cf6', light: '#f5f3ff', text: '#7c3aed' },
};

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

export default function AdminDashboard({ onLogout }) {
  const [tab, setTab] = useState('results');
  const [results, setResults] = useState([]);
  const [campaigns, setCampaigns] = useState([]);
  const [filter, setFilter] = useState('all');

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

  // 캠페인별 참여수 (results 기준)
  const counts = {};
  for (const r of results) {
    if (r.campaignId) counts[r.campaignId] = (counts[r.campaignId] || 0) + 1;
  }

  const groups = [...new Set(results.map(r => r.group).filter(Boolean))].sort();
  const filtered = filter === 'all' ? results : results.filter(r => r.group === filter);
  const groupCounts = {};
  for (const r of results) {
    if (r.group) groupCounts[r.group] = (groupCounts[r.group] || 0) + 1;
  }

  // 결과 필터 옵션: 캠페인을 일정(참여 시작)순 → 생성순, 그 뒤 레거시 그룹
  const orderedCampaignNames = [...new Set(
    campaigns.slice().sort((a, b) =>
      (a.period_start || '9999-99-99').localeCompare(b.period_start || '9999-99-99')
      || (a.created_at || '').localeCompare(b.created_at || '')
    ).map(c => c.client_name)
  )];
  const filterOptions = [...orderedCampaignNames, ...groups.filter(g => !orderedCampaignNames.includes(g))];

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

  async function handleLoadSample() {
    // 샘플 그룹별로 캠페인 확보 (없으면 생성, 있으면 재사용) → 응답에 연결
    const existing = await listCampaigns();
    const byName = {};
    for (const c of existing) byName[c.client_name] = c;
    const sampleGroups = [...new Set(sampleData.map(r => r.group))];
    const idByGroup = {};
    let idx = 0;
    for (const g of sampleGroups) {
      if (byName[g]) {
        idByGroup[g] = byName[g].id;
      } else {
        const periodStart = new Date(Date.now() + idx * 7 * 86400000).toISOString().slice(0, 10);
        const camp = await createCampaign({
          clientName: g, target: '샘플 캠페인', status: 'active',
          periodStart, periodEnd: null, educationDate: null, memo: '테스트용 샘플 데이터',
        });
        idByGroup[g] = camp.id;
      }
      idx++;
    }
    // 샘플 응답 저장 (campaign_id 연결)
    for (const r of sampleData) {
      await saveResult(
        { group: r.group, name: r.name, birthDate: r.birthDate, careerMonths: r.careerMonths, company: r.company || '', department: r.department, jobType: r.jobType, incomeRange: r.incomeRange, recruitCount: r.recruitCount },
        { scores: r.scores, grades: r.grades, top1: r.top1, top2: r.top2, bottom: r.bottom, total: r.total },
        idByGroup[r.group] || null
      );
    }
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
      </div>

      {tab === 'campaigns' && (
        <CampaignManager campaigns={campaigns} counts={counts} onChange={reload} onViewResults={viewCampaignResults} onDeleteCampaign={handleDeleteCampaign} />
      )}

      {tab === 'dashboard' && (
        <CampaignDashboard campaigns={campaigns} counts={counts} />
      )}

      {tab === 'results' && (
        <>
          <div className="admin-toolbar">
            <div className="admin-filters">
              <label className="results-filter-label">캠페인</label>
              <select
                className="form-input results-filter-select"
                value={filter}
                onChange={e => setFilter(e.target.value)}
              >
                <option value="all">전체 ({results.length})</option>
                {filterOptions.map(g => (
                  <option key={g} value={g}>{g} ({groupCounts[g] || 0})</option>
                ))}
              </select>
            </div>
            <div className="admin-actions">
              <button className="btn btn-secondary" onClick={handleLoadSample}>
                샘플 20명
              </button>
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
                    <th>소속</th>
                    <th>직무</th>
                    <th>소득</th>
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
                  {filtered.map(r => (
                    <tr key={r.id}>
                      <td><GroupBadge group={r.group} /></td>
                      <td className="td-name">{r.name}</td>
                      <td>{r.birthDate}</td>
                      <td>{r.careerMonths && `${r.careerMonths}개월`}</td>
                      <td>{r.company || '-'}</td>
                      <td>{r.department}</td>
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
    </section>
  );
}
