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

  return <AdminDashboard onLogout={() => supabase.auth.signOut()} />;
}
