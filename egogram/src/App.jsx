import { useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import SurveyApp from './pages/SurveyApp';
import AdminApp from './pages/AdminApp';
import ReportPageV2 from './components/Report/ReportPageV2';
import ReportBatchPage from './components/Report/ReportBatchPage';
import SimhwaReportPage from './components/Report/SimhwaReportView';
import PreviewResultPage from './pages/PreviewResultPage';
import PreviewSimhwaPage from './pages/PreviewSimhwaPage';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import './styles/praxi.css';

// 화면별 탭 이름 — 구별어를 앞에 둔다. 탭은 좁아서 뒤쪽이 잘리므로
// "MIND2ACTION —"으로 시작하면 여러 탭이 전부 같은 글자로 보인다 (26.0810)
const PAGE_TITLES = [
  ['/admin', '관리자'],
  ['/report-batch', '리포트 일괄'],
  ['/report', '성향 리포트'],
  ['/simhwa', '심화 코칭 리포트'],
  ['/preview/result', '미리보기 · 성향 리포트'],
  ['/preview/simhwa', '미리보기 · 심화 코칭'],
];

function pageTitle(pathname) {
  const hit = PAGE_TITLES.find(([prefix]) => pathname.startsWith(prefix));
  return `${hit ? hit[1] : '에고그램 설문'} · MIND2ACTION`;
}

function AppContent() {
  const location = useLocation();
  const isAdmin = location.pathname === '/admin';
  const isReport = location.pathname.startsWith('/report') || location.pathname.includes('simhwa');

  useEffect(() => {
    document.title = pageTitle(location.pathname);
  }, [location.pathname]);

  return (
    <div className="app">
      {!isReport && <Header />}
      <main className={isAdmin ? 'main-content main-admin' : isReport ? 'main-content main-report' : 'main-content'}>
        <Routes>
          <Route path="/admin" element={<AdminApp />} />
          <Route path="/report/:id" element={<ReportPageV2 />} />
          <Route path="/report-batch/:campaignId" element={<ReportBatchPage />} />
          <Route path="/simhwa/:id" element={<SimhwaReportPage />} />
          <Route path="/preview/result" element={<PreviewResultPage />} />
          <Route path="/preview/simhwa" element={<PreviewSimhwaPage />} />
          <Route path="/*" element={<SurveyApp />} />
        </Routes>
      </main>
      {!isReport && <Footer />}
    </div>
  );
}

function App() {
  return (
    <HashRouter>
      <AppContent />
    </HashRouter>
  );
}

export default App;
