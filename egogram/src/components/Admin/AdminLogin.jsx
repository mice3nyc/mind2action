import { useState } from 'react';

const ADMIN_PASS = 'sonson';

export default function AdminLogin({ onLogin }) {
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (pass === ADMIN_PASS) {
      onLogin();
    } else {
      setError('비밀번호가 틀렸습니다.');
    }
  }

  return (
    <section className="landing-section">
      <div className="landing-badge">ADMIN</div>
      <h1>관리자 로그인</h1>
      <p className="landing-desc">설문 결과를 확인하려면 관리자 비밀번호를 입력하세요.</p>
      <form onSubmit={handleSubmit} className="landing-code-wrap">
        <div className="form-group">
          <input
            className="form-input landing-code-input"
            type="password"
            value={pass}
            onChange={e => { setPass(e.target.value); setError(''); }}
            placeholder="비밀번호"
          />
          {error && <div className="landing-error">{error}</div>}
        </div>
        <button type="submit" className="btn btn-primary btn-full" disabled={!pass}>
          로그인
        </button>
      </form>
    </section>
  );
}
