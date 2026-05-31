import { useState } from 'react';
import { createCampaign, updateCampaign, campaignLink } from '../../lib/campaigns';

const STATUS_LABEL = {
  active: '진행중',
  draft: '준비',
  closed: '마감',
};

const EMPTY_FORM = {
  clientName: '',
  target: '',
  periodStart: '',
  periodEnd: '',
  educationDate: '',
  memo: '',
};

function StatusBadge({ status }) {
  return <span className={`campaign-status campaign-status-${status}`}>{STATUS_LABEL[status] || status}</span>;
}

export default function CampaignManager({ campaigns, counts, onChange, onViewResults }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [creating, setCreating] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const [error, setError] = useState('');

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleCreate(e) {
    e.preventDefault();
    if (!form.clientName.trim()) return;
    setCreating(true);
    setError('');
    try {
      await createCampaign({
        clientName: form.clientName.trim(),
        target: form.target.trim(),
        status: 'active',
        periodStart: form.periodStart || null,
        periodEnd: form.periodEnd || null,
        educationDate: form.educationDate || null,
        memo: form.memo.trim(),
      });
      setForm(EMPTY_FORM);
      onChange();
    } catch (err) {
      setError(err.message || '생성에 실패했습니다.');
    } finally {
      setCreating(false);
    }
  }

  async function handleCopy(camp) {
    try {
      await navigator.clipboard.writeText(campaignLink(camp.code));
      setCopiedId(camp.id);
      setTimeout(() => setCopiedId(null), 1600);
    } catch {
      window.prompt('아래 링크를 복사하세요', campaignLink(camp.code));
    }
  }

  async function handleToggleStatus(camp) {
    const next = camp.status === 'closed' ? 'active' : 'closed';
    const verb = next === 'closed' ? '마감' : '재개';
    if (!window.confirm(`${camp.client_name} 설문을 ${verb}하시겠습니까?`)) return;
    await updateCampaign(camp.id, { status: next });
    onChange();
  }

  return (
    <div className="campaign-pane">
      <div className="campaign-layout">
      <form className="campaign-create" onSubmit={handleCreate}>
        <h2 className="campaign-create-title">새 설문 캠페인</h2>

        <fieldset className="campaign-fieldset">
          <legend className="campaign-fieldset-label">기본 정보</legend>
          <div className="form-group">
            <label className="form-label">고객사 / 대상명 *</label>
            <input className="form-input" name="clientName" value={form.clientName} onChange={handleChange} placeholder="예: 한화생명 FC 1기" />
            <div className="form-hint form-hint-public">설문 참여자에게 표시됩니다 ("○○ 설문")</div>
          </div>
          <div className="form-group">
            <label className="form-label">대상 설명</label>
            <input className="form-input" name="target" value={form.target} onChange={handleChange} placeholder="예: 신입 설계사 (선택)" />
            <div className="form-hint">관리자 기록용 — 참여자에게는 보이지 않습니다</div>
          </div>
        </fieldset>

        <fieldset className="campaign-fieldset">
          <legend className="campaign-fieldset-label">일정</legend>
          <div className="campaign-form-grid">
            <div className="form-group">
              <label className="form-label">참여 시작</label>
              <input className="form-input" type="date" name="periodStart" value={form.periodStart} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label className="form-label">참여 종료</label>
              <input className="form-input" type="date" name="periodEnd" value={form.periodEnd} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label className="form-label">교육일</label>
              <input className="form-input" type="date" name="educationDate" value={form.educationDate} onChange={handleChange} />
            </div>
          </div>
        </fieldset>

        <fieldset className="campaign-fieldset">
          <legend className="campaign-fieldset-label">메모</legend>
          <div className="form-group">
            <input className="form-input" name="memo" value={form.memo} onChange={handleChange} placeholder="내부 메모 (선택)" />
            <div className="form-hint">관리자 내부 메모 — 참여자·결과 화면에 보이지 않습니다</div>
          </div>
        </fieldset>

        {error && <div className="landing-error">{error}</div>}
        <button type="submit" className="btn btn-primary" disabled={!form.clientName.trim() || creating}>
          {creating ? '생성 중...' : '캠페인 생성 + 링크 발급'}
        </button>
      </form>

      <div className="campaign-list-col">
      {campaigns.length === 0 ? (
        <div className="admin-empty">아직 생성된 캠페인이 없습니다.</div>
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table campaign-table">
            <thead>
              <tr>
                <th>고객사 / 대상</th>
                <th>상태</th>
                <th>참여 시작</th>
                <th>참여 종료</th>
                <th>교육일</th>
                <th>참여</th>
                <th>설문 링크</th>
                <th>설문 결과</th>
                <th>관리</th>
              </tr>
            </thead>
            <tbody>
              {campaigns.map(c => (
                <tr key={c.id}>
                  <td className="td-name">
                    {c.client_name}
                    {c.target && <div className="campaign-target">{c.target}</div>}
                    {c.memo && <div className="campaign-memo">메모: {c.memo}</div>}
                  </td>
                  <td><StatusBadge status={c.status} /></td>
                  <td className="td-small">{c.period_start || '-'}</td>
                  <td className="td-small">{c.period_end || '-'}</td>
                  <td className="td-small">{c.education_date || '-'}</td>
                  <td className="td-score">{counts[c.id] || 0}</td>
                  <td>
                    <button className="btn-copy-link" onClick={() => handleCopy(c)}>
                      {copiedId === c.id ? '복사됨 ✓' : '링크 복사'}
                    </button>
                    <code className="campaign-code">?g={c.code}</code>
                  </td>
                  <td>
                    <button className="btn-view-results" onClick={() => onViewResults(c.client_name)}>설문 결과</button>
                  </td>
                  <td>
                    <button className="btn-delete-action" onClick={() => handleToggleStatus(c)}>
                      {c.status === 'closed' ? '재개' : '마감'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      </div>
      </div>
    </div>
  );
}
