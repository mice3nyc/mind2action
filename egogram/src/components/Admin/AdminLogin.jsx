import { useState } from 'react';
import { supabase } from '../../lib/supabase';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError('');
    const { error: authError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password: pass,
    });
    setLoading(false);
    if (authError) {
      setError('이메일 또는 비밀번호가 올바르지 않습니다.');
    }
    // 성공 시: onAuthStateChange가 AdminApp의 세션을 갱신 → 대시보드로 전환
  }

  return (
    <section className="landing-section">
      <div className="landing-badge">ADMIN</div>
      <h1>관리자 로그인</h1>
      <p className="landing-desc">설문 결과를 확인하려면 관리자 계정으로 로그인하세요.</p>
      <form onSubmit={handleSubmit} className="landing-code-wrap">
        <div className="form-group">
          <input
            className="form-input"
            type="email"
            value={email}
            onChange={e => { setEmail(e.target.value); setError(''); }}
            placeholder="이메일"
            autoComplete="username"
          />
        </div>
        <div className="form-group">
          <input
            className="form-input landing-code-input"
            type="password"
            value={pass}
            onChange={e => { setPass(e.target.value); setError(''); }}
            placeholder="비밀번호"
            autoComplete="current-password"
          />
          {error && <div className="landing-error">{error}</div>}
        </div>
        <button type="submit" className="btn btn-primary btn-full" disabled={!email || !pass || loading}>
          {loading ? '로그인 중...' : '로그인'}
        </button>
      </form>
    </section>
  );
}
