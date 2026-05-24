import { useState } from 'react';

const VALID_CODES = {
  '망원동': '망원동',
  '서교동': '서교동',
  '합정동': '합정동',
};

export default function LandingPage({ onEnter }) {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    const trimmed = code.trim();
    const group = VALID_CODES[trimmed];
    if (group) {
      onEnter(group);
    } else {
      setError('유효하지 않은 참여 코드입니다.');
    }
  }

  return (
    <section className="landing-section">
      <div className="landing-badge">EGOGRAM</div>
      <h1>나를 알면<br />행동이 바뀝니다</h1>
      <p className="landing-desc">
        50문항 성향 진단 설문입니다.<br />
        약 5~10분 소요됩니다. 참여 코드를 입력하고 시작하세요.
      </p>
      <form onSubmit={handleSubmit} className="landing-code-wrap">
        <div className="form-group">
          <label className="form-label">참여 코드</label>
          <input
            className="form-input landing-code-input"
            value={code}
            onChange={e => { setCode(e.target.value); setError(''); }}
            placeholder="코드 입력"
          />
          {error && <div className="landing-error">{error}</div>}
        </div>
        <button type="submit" className="btn btn-primary btn-full" disabled={!code.trim()}>
          시작하기
        </button>
      </form>
    </section>
  );
}
