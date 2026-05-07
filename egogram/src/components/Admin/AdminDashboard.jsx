import { useState, useEffect } from 'react';
import { loadResults, deleteResult, clearResults } from '../../lib/storage';
import { EGO_LABELS } from '../../lib/scoreEngine';

const JOB_LABELS = {
  insurance: '설계사',
  manager: '관리자',
  coach: '코치',
};

export default function AdminDashboard({ onLogout }) {
  const [results, setResults] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    setResults(loadResults());
  }, []);

  const groups = [...new Set(results.map(r => r.group).filter(Boolean))];
  const filtered = filter === 'all' ? results : results.filter(r => r.group === filter);

  function handleDelete(id) {
    const updated = deleteResult(id);
    setResults(updated);
  }

  function handleClearAll() {
    if (!window.confirm(`전체 ${results.length}건을 삭제하시겠습니까?`)) return;
    clearResults();
    setResults([]);
  }

  function handleExportCSV() {
    if (filtered.length === 0) return;
    const headers = ['그룹', '이름', '소속', '직무', 'CP', 'NP', 'A', 'FC', 'AC', '총점', 'TOP1', 'TOP2', 'BOTTOM', '일시'];
    const rows = filtered.map(r => [
      r.group,
      r.name,
      r.department,
      JOB_LABELS[r.jobType] || r.jobType,
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
            전체
          </button>
          {groups.map(g => (
            <button
              key={g}
              className={`filter-chip ${filter === g ? 'active' : ''}`}
              onClick={() => setFilter(g)}
            >
              {g}
            </button>
          ))}
        </div>
        <div className="admin-actions">
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
                <th>소속</th>
                <th>직무</th>
                <th>CP</th>
                <th>NP</th>
                <th>A</th>
                <th>FC</th>
                <th>AC</th>
                <th>총점</th>
                <th>TOP1</th>
                <th>BOTTOM</th>
                <th>일시</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(r => (
                <tr key={r.id}>
                  <td><span className="group-badge">{r.group}</span></td>
                  <td className="td-name">{r.name}</td>
                  <td>{r.department}</td>
                  <td>{JOB_LABELS[r.jobType] || r.jobType}</td>
                  <td className="td-score">{r.scores?.CP}</td>
                  <td className="td-score">{r.scores?.NP}</td>
                  <td className="td-score">{r.scores?.A}</td>
                  <td className="td-score">{r.scores?.FC}</td>
                  <td className="td-score">{r.scores?.AC}</td>
                  <td className="td-score td-total">{r.total}</td>
                  <td><span className="tag-inline top">{r.top1}</span></td>
                  <td><span className="tag-inline bot">{r.bottom}</span></td>
                  <td className="td-date">{new Date(r.timestamp).toLocaleString('ko-KR', { month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</td>
                  <td><button className="delete-btn" onClick={() => handleDelete(r.id)}>×</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
