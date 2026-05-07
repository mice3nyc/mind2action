import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import SurveyApp from './pages/SurveyApp';
import AdminApp from './pages/AdminApp';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import './styles/praxi.css';

function AppContent() {
  const location = useLocation();
  const isAdmin = location.pathname === '/admin';

  return (
    <div className="app">
      <Header />
      <main className={isAdmin ? 'main-content main-admin' : 'main-content'}>
        <Routes>
          <Route path="/admin" element={<AdminApp />} />
          <Route path="/*" element={<SurveyApp />} />
        </Routes>
      </main>
      <Footer />
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
