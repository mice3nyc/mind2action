import { useState } from 'react';
import { EDITION, JOB_LABELS } from '../../lib/edition';

// 선택지는 에디션마다 다르다 — 보험판 세 역할 / 일반판 한 역할 (SPEC-org-edition §10)
//   하나뿐이면 칸을 빼고 그 값으로 미리 채운다 — 리포트 문안이 job_type으로 갈리니 값은 반드시 있어야 한다 (§10-T)
const ONLY_ROLE = EDITION.roleOptions.length === 1 ? EDITION.roleOptions[0] : '';
const JOB_OPTIONS = [
  { value: '', label: '선택해주세요' },
  ...EDITION.roleOptions.map(value => ({ value, label: JOB_LABELS[value] })),
];

const INCOME_OPTIONS = [
  { value: '', label: '선택해주세요 (선택사항)' },
  { value: 'under200', label: '200만원 미만' },
  { value: '200-400', label: '200~400만원' },
  { value: '400-600', label: '400~600만원' },
  { value: '600-800', label: '600~800만원' },
  { value: '800-1000', label: '800~1000만원' },
  { value: '1000-1500', label: '1000~1500만원' },
  { value: '1500-2000', label: '1500~2000만원' },
  { value: 'over2000', label: '2000만원 이상' },
];

export default function SurveyIntro({ group, onSubmit }) {
  const [form, setForm] = useState({
    name: '',
    birthDate: '',
    careerMonths: '',
    company: '',
    department: '',
    jobType: ONLY_ROLE,
    incomeRange: '',
  });

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!isValid) return;
    onSubmit(form);
  }

  // 화면에 없는 칸은 필수에서 뺀다 (§10-T)
  const isValid = !!(form.name && form.birthDate && form.department && form.jobType
    && (!EDITION.hasCareer || form.careerMonths)
    && (!EDITION.hasCompany || form.company));

  return (
    <section className="intro-section">
      {group && <div className="intro-group-badge">소속: {group}</div>}
      <h2>기본 정보 입력</h2>
      <p>모든 개인 정보는 성향코칭 외에는 그 어디에도 활용되지 않습니다.</p>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">이름 *</label>
          <input className="form-input" name="name" value={form.name} onChange={handleChange} placeholder="홍길동" />
        </div>
        <div className="form-group">
          <label className="form-label">생년월일 *</label>
          <input className="form-input" name="birthDate" value={form.birthDate} onChange={handleChange} placeholder="19850315" maxLength={8} />
        </div>
        {EDITION.hasCareer && (
          <div className="form-group">
            <label className="form-label">경력 (개월) *</label>
            <input className="form-input" name="careerMonths" type="number" value={form.careerMonths} onChange={handleChange} placeholder="36" />
          </div>
        )}
        {EDITION.hasCompany && (
          <div className="form-group">
            <label className="form-label">회사 *</label>
            <input className="form-input" name="company" value={form.company} onChange={handleChange} placeholder="회사명" />
          </div>
        )}
        <div className="form-group">
          <label className="form-label">소속 *</label>
          <input className="form-input" name="department" value={form.department} onChange={handleChange} placeholder={EDITION.deptPlaceholder} />
        </div>
        {!ONLY_ROLE && (
          <div className="form-group">
            <label className="form-label">성향 코칭을 받고 싶은 역할 *</label>
            <select className="form-input form-select" name="jobType" value={form.jobType} onChange={handleChange}>
              {JOB_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
        )}
        {EDITION.hasIncome && (
          <div className="form-group">
            <label className="form-label">직전 3개월 평균 소득</label>
            <select className="form-input form-select" name="incomeRange" value={form.incomeRange} onChange={handleChange}>
              {INCOME_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
        )}
        <button type="submit" className="btn btn-primary btn-full" disabled={!isValid}>
          설문 시작
        </button>
      </form>
    </section>
  );
}
