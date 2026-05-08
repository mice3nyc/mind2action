import { useState, useEffect } from 'react';
import { loadResults, deleteResult, clearResults, saveResult } from '../../lib/storage';
import { EGO_LABELS } from '../../lib/scoreEngine';
import sampleData from '../../data/sampleResults.json';

const JOB_LABELS = {
  sales: '영업',
  coach: '코치/멘토',
  sales_leader: '영업팀장/센터장',
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

const GROUP_COLORS = {
  '망원동': { bg: '#0012de', text: '#fff' },
  '서교동': { bg: '#e11d48', text: '#fff' },
  '합정동': { bg: '#059669', text: '#fff' },
};

function ScoreCell({ ego, score, isTop, isBottom }) {
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
  const c = GROUP_COLORS[group] || { bg: '#888', text: '#fff' };
  return <span className="group-badge" style={{ background: c.bg, color: c.text }}>{group}</span>;
}

export default function AdminDashboard({ onLogout }) {
  const [results, setResults] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    loadResults().then(setResults);
  }, []);

  const groups = [...new Set(results.map(r => r.group).filter(Boolean))].sort();
  const filtered = filter === 'all' ? results : results.filter(r => r.group === filter);
  const groupCounts = {};
  for (const r of results) {
    if (r.group) groupCounts[r.group] = (groupCounts[r.group] || 0) + 1;
  }

  async function handleDelete(id) {
    const target = results.find(r => r.id === id);
    if (!window.confirm(`${target?.name || ''}님의 결과를 삭제하시겠습니까?`)) return;
    const updated = await deleteResult(id);
    setResults(updated);
  }

  async function handleClearAll() {
    if (!window.confirm(`전체 ${results.length}건을 삭제하시겠습니까?`)) return;
    await clearResults();
    setResults([]);
  }

  async function handleLoadSample() {
    for (const r of sampleData) {
      await saveResult(
        { group: r.group, name: r.name, birthDate: r.birthDate, careerMonths: r.careerMonths, company: r.company || '', department: r.department, jobType: r.jobType, incomeRange: r.incomeRange, recruitCount: r.recruitCount },
        { scores: r.scores, grades: r.grades, top1: r.top1, top2: r.top2, bottom: r.bottom, total: r.total }
      );
    }
    const updated = await loadResults();
    setResults(updated);
  }

  function handleExportCSV() {
    if (filtered.length === 0) return;
    const headers = ['그룹', '이름', '생년월일', '경력(월)', '회사', '소속', '직무', '소득', '리크루팅', 'CP', 'NP', 'A', 'FC', 'AC', '총점', 'TOP1', 'TOP2', 'BOTTOM', '일시'];
    const rows = filtered.map(r => [
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
    const csv = bom + [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `egogram_results_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  const egoKeys = ['CP', 'NP', 'A', 'FC', 'AC'];

  return (
    <section className="admin-section">
      <div className="admin-header">
        <div>
          <h1>설문 결과</h1>
          <p className="admin-count">총 {filtered.length}건 {filter !== 'all' && `(${filter})`}</p>
        </div>
        <button className="btn btn-secondary" onClick={onLogout}>로그아웃</button>
      </div>

      <div className="admin-toolbar">
        <div className="admin-filters">
          <button
            className={`filter-chip ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            전체 ({results.length})
          </button>
          {groups.map(g => {
            const gc = GROUP_COLORS[g] || { bg: '#888' };
            return (
              <button
                key={g}
                className={`filter-chip ${filter === g ? 'active' : ''}`}
                onClick={() => setFilter(g)}
                style={filter === g ? { background: gc.bg, borderColor: gc.bg, color: '#fff' } : { borderColor: gc.bg, color: gc.bg }}
              >
                {g} ({groupCounts[g] || 0})
              </button>
            );
          })}
        </div>
        <div className="admin-actions">
          <button className="btn btn-secondary" onClick={handleLoadSample}>
            샘플 20명
          </button>
          <button className="btn btn-primary" onClick={handleExportCSV} disabled={filtered.length === 0}>
            CSV 다운로드
          </button>
          <button className="btn btn-secondary" onClick={handleClearAll} disabled={results.length === 0}>
            전체 삭제
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
                    <ScoreCell
                      key={e}
                      ego={e}
                      score={r.scores?.[e] || 0}
                      isTop={e === r.top1 || e === r.top2}
                      isBottom={e === r.bottom}
                    />
                  ))}
                  <td className="td-score td-total">{r.total}</td>
                  <td><EgoTag ego={r.top1} type="top" /></td>
                  <td><EgoTag ego={r.bottom} type="bot" /></td>
                  <td className="td-date">{new Date(r.timestamp).toLocaleString('ko-KR', { month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</td>
                  <td className="td-actions">
                    <a href={`#/report/${r.id}`} target="_blank" className="report-link" title="리포트 보기">📄</a>
                    <button className="delete-btn" onClick={() => handleDelete(r.id)}>×</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
