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
  expectedCount: '',
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
  const [editingId, setEditingId] = useState(null); // null = 생성 모드, id = 그 캠페인 수정 모드

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  // 목록 [수정] → 그 캠페인 값을 폼에 로드 (생성 폼 재사용)
  function handleEdit(camp) {
    setForm({
      clientName: camp.client_name || '',
      target: camp.target || '',
      expectedCount: camp.expected_count != null ? String(camp.expected_count) : '',
      periodStart: camp.period_start || '',
      periodEnd: camp.period_end || '',
      educationDate: camp.education_date || '',
      memo: camp.memo || '',
    });
    setEditingId(camp.id);
    setError('');
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function handleCancelEdit() {
    setForm(EMPTY_FORM);
    setEditingId(null);
    setError('');
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.clientName.trim()) return;
    setCreating(true);
    setError('');
    try {
      if (editingId) {
        // 수정 — code·status는 건드리지 않음 (링크 정체성 불변, status는 마감/재개 토글 담당)
        await updateCampaign(editingId, {
          client_name: form.clientName.trim(),
          target: form.target.trim() || null,
          expected_count: form.expectedCount !== '' ? Number(form.expectedCount) : null,
          period_start: form.periodStart || null,
          period_end: form.periodEnd || null,
          education_date: form.educationDate || null,
          memo: form.memo.trim() || null,
        });
      } else {
        await createCampaign({
          clientName: form.clientName.trim(),
          target: form.target.trim(),
          status: 'active',
          expectedCount: form.expectedCount,
          periodStart: form.periodStart || null,
          periodEnd: form.periodEnd || null,
          educationDate: form.educationDate || null,
          memo: form.memo.trim(),
        });
      }
      setForm(EMPTY_FORM);
      setEditingId(null);
      onChange();
    } catch (err) {
      setError(err.message || (editingId ? '수정에 실패했습니다.' : '생성에 실패했습니다.'));
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
      <form className="campaign-create" onSubmit={handleSubmit}>
        <h2 className="campaign-create-title">{editingId ? '캠페인 수정' : '새 설문 캠페인'}</h2>

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
          <div className="form-group">
            <label className="form-label">참여 예상 인원</label>
            <input className="form-input" type="number" min="0" name="expectedCount" value={form.expectedCount} onChange={handleChange} placeholder="예: 40 (선택)" />
            <div className="form-hint">진행 현황 진행률 기준값 — 실제가 더 적거나 많아도 무방합니다</div>
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

        {editingId && (
          <div className="form-hint">코드(링크)와 진행 상태는 바뀌지 않습니다. 상태 변경은 목록의 마감/재개로.</div>
        )}
        {error && <div className="landing-error">{error}</div>}
        <button type="submit" className="btn btn-primary" disabled={!form.clientName.trim() || creating}>
          {creating ? (editingId ? '저장 중...' : '생성 중...') : (editingId ? '수정 저장' : '캠페인 생성 + 링크 발급')}
        </button>
        {editingId && (
          <button type="button" className="btn btn-secondary" onClick={handleCancelEdit} disabled={creating}>
            취소
          </button>
        )}
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
                <th>인원</th>
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
                  <td className="td-score">
                    {counts[c.id] || 0}
                    {c.expected_count ? <span className="td-expected">/{c.expected_count}</span> : null}
                  </td>
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
                    <button
                      className="btn-view-results"
                      onClick={() => handleEdit(c)}
                      disabled={editingId === c.id}
                    >
                      {editingId === c.id ? '수정 중' : '수정'}
                    </button>
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
