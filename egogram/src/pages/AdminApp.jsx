import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import AdminLogin from '../components/Admin/AdminLogin';
import AdminDashboard from '../components/Admin/AdminDashboard';

export default function AdminApp() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 현재 세션 확인 (새로고침해도 유지)
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });

    // 로그인/로그아웃 시 세션 갱신
    const { data: listener } = supabase.auth.onAuthStateChange((_event, sess) => {
      setSession(sess);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <section className="landing-section">
        <p className="landing-desc">불러오는 중...</p>
      </section>
    );
  }

  if (!session) {
    return <AdminLogin />;
  }

  // son(손소장) 계정은 삭제 버튼을 숨긴다 — 진짜 막는 것은 RLS, 화면은 가린다 (SPEC-org-edition §4).
  //   역할로 판정한다: 보험판 admin@은 역할 값이 없어 그대로 보인다.
  const canDelete = session.user?.app_metadata?.role !== 'son';

  return <AdminDashboard onLogout={() => supabase.auth.signOut()} canDelete={canDelete} />;
}
