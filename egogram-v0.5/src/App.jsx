import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import SurveyApp from './pages/SurveyApp';
import AdminApp from './pages/AdminApp';
import ReportPage from './components/Report/ReportPage';
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
          <Route path="/report/:id" element={<ReportPage />} />
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
