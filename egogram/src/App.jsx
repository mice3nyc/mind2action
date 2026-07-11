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

function AppContent() {
  const location = useLocation();
  const isAdmin = location.pathname === '/admin';
  const isReport = location.pathname.startsWith('/report') || location.pathname.includes('simhwa');

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
