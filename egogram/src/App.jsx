import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import SurveyApp from './pages/SurveyApp';
import AdminApp from './pages/AdminApp';
import ReportPageV2 from './components/Report/ReportPageV2';
import ReportBatchPage from './components/Report/ReportBatchPage';
import PreviewResultPage from './pages/PreviewResultPage';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import './styles/praxi.css';

function AppContent() {
  const location = useLocation();
  const isAdmin = location.pathname === '/admin';
  const isReport = location.pathname.startsWith('/report');

  return (
    <div className="app">
      {!isReport && <Header />}
      <main className={isAdmin ? 'main-content main-admin' : isReport ? 'main-content main-report' : 'main-content'}>
        <Routes>
          <Route path="/admin" element={<AdminApp />} />
          <Route path="/report/:id" element={<ReportPageV2 />} />
          <Route path="/report-batch/:campaignId" element={<ReportBatchPage />} />
          <Route path="/preview/result" element={<PreviewResultPage />} />
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
