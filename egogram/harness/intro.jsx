// 설문 첫 화면 하니스 무대 — 실제 SurveyIntro를 띄우고 제출된 값을 window.__submitted에 남긴다. SPEC-org-edition §10-T.
//   DB에 닿지 않는다(SurveyIntro는 edition만 읽는다). 에디션은 vite 모드로 갈린다(--mode org).
import { createRoot } from 'react-dom/client';
import SurveyIntro from '../src/components/Survey/SurveyIntro.jsx';
import { EDITION_KEY } from '../src/lib/edition.js';

window.__edition = EDITION_KEY;
window.__submitted = null;
createRoot(document.getElementById('root')).render(
  <SurveyIntro group="" onSubmit={(form) => { window.__submitted = form; }} />
);
