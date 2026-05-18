import { useState } from 'react';

const JOB_OPTIONS = [
  { value: '', label: '선택해주세요' },
  { value: 'sales', label: '고객 컨설팅 영업' },
  { value: 'coach', label: '신인 육성 코칭' },
  { value: 'sales_leader', label: '조직운영 리더' },
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
    jobType: '',
    incomeRange: '',
    recruitCount: '',
  });

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.name || !form.birthDate || !form.careerMonths || !form.company || !form.department || !form.jobType) return;
    onSubmit(form);
  }

  const isValid = form.name && form.birthDate && form.careerMonths && form.company && form.department && form.jobType;

  return (
    <section className="intro-section">
      {group && <div className="intro-group-badge">{group}</div>}
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
        <div className="form-group">
          <label className="form-label">경력 (개월) *</label>
          <input className="form-input" name="careerMonths" type="number" value={form.careerMonths} onChange={handleChange} placeholder="36" />
        </div>
        <div className="form-group">
          <label className="form-label">회사 *</label>
          <input className="form-input" name="company" value={form.company} onChange={handleChange} placeholder="회사명" />
        </div>
        <div className="form-group">
          <label className="form-label">소속 *</label>
          <input className="form-input" name="department" value={form.department} onChange={handleChange} placeholder="OO지점" />
        </div>
        <div className="form-group">
          <label className="form-label">성향 코칭을 받고 싶은 역할 *</label>
          <select className="form-input form-select" name="jobType" value={form.jobType} onChange={handleChange}>
            {JOB_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>
        <div className="form-group">
          <label className="form-label">직전 3개월 평균 소득</label>
          <select className="form-input form-select" name="incomeRange" value={form.incomeRange} onChange={handleChange}>
            {INCOME_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>
        <div className="form-group">
          <label className="form-label">직전 1년 리크루팅 수</label>
          <input className="form-input" name="recruitCount" type="number" value={form.recruitCount} onChange={handleChange} placeholder="0" />
        </div>
        <button type="submit" className="btn btn-primary btn-full" disabled={!isValid}>
          설문 시작
        </button>
      </form>
    </section>
  );
}
