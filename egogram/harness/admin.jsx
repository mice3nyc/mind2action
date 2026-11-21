// 관리자 화면 하니스 무대 — 실제 AdminDashboard를 가짜 PostgREST 위에 띄운다. SPEC §15-8.
//   로그인 없이 화면 배선을 보려는 것. 실서비스 경로가 아니다(vite build 엔트리는 index.html 하나).
//   ⚠️ 진짜 Supabase에 닿는 길을 끊는다 — /rest/v1/ 은 전부 가짜가 받고, 그 밖의 supabase 요청은 막고 센다.
import { buildDataset, buildHideDataset, makeFakeBackend } from '../scripts/lib/fake-postgrest.mjs';

const params = new URLSearchParams(location.search);
// ?data=hide — 지움 표본(SPEC-org-edition §12, 일반판 무대에서 쓴다)
const data = params.get('data') === 'hide' ? buildHideDataset() : buildDataset();
const backend = makeFakeBackend(data);
const realFetch = window.fetch.bind(window);
const blocked = [];
window.fetch = (input, init) => {
  const u = typeof input === 'string' ? input : input.url;
  if (u.includes('/rest/v1/')) return backend.fetch(input, init);
  if (u.includes('supabase')) { blocked.push(u); return Promise.resolve(new Response('{}', { status: 503 })); }
  return realFetch(input, init);
};
// ?failCounts=1 — 개수 요청(HEAD)을 전부 실패시킨다. 「0건」으로 보이지 않는지 보려는 것
if (new URLSearchParams(location.search).get('failCounts')) backend.control.failMatching = (_url, method) => method === 'HEAD';
window.__fake = { stats: backend.stats, control: backend.control, data, blocked };
// CSV 내려받기를 가로챈다 — 파일 대신 본문을 window.__csv에 쌓는다(다운로드는 일어나지 않는다)
window.__csv = [];
const realCreate = URL.createObjectURL.bind(URL);
URL.createObjectURL = (blob) => { blob.text().then((t) => window.__csv.push(t)); return realCreate(blob); };
const realClick = HTMLAnchorElement.prototype.click;
HTMLAnchorElement.prototype.click = function click() { if (this.download) return; realClick.call(this); };
// 확인 창은 «예»로 답하고 문구를 남긴다
window.__confirms = [];
window.confirm = (msg) => { window.__confirms.push(String(msg)); return true; };
window.alert = (msg) => { window.__confirms.push(`alert: ${msg}`); };

// fetch를 바꾼 «뒤에» 앱을 불러온다
const { createRoot } = await import('react-dom/client');
await import('../src/styles/praxi.css');
const { EDITION_KEY } = await import('../src/lib/edition.js');
window.__edition = EDITION_KEY;
const batch = params.get('batch');
if (batch) {
  // ?batch=<캠페인 id> — 전체 리포트 일괄 출력 화면(ReportBatchPage)을 같은 가짜 DB 위에 띄운다 (§12)
  const { MemoryRouter, Routes, Route } = await import('react-router-dom');
  const { default: ReportBatchPage } = await import('../src/components/Report/ReportBatchPage');
  createRoot(document.getElementById('root')).render(
    <MemoryRouter initialEntries={[`/report-batch/${batch}`]}>
      <Routes><Route path="/report-batch/:campaignId" element={<ReportBatchPage />} /></Routes>
    </MemoryRouter>
  );
} else {
  const { default: AdminDashboard } = await import('../src/components/Admin/AdminDashboard');
  // ?canDelete=0 — son 계정 화면(삭제 버튼 숨김, SPEC-org-edition §4)
  const canDelete = params.get('canDelete') !== '0';
  createRoot(document.getElementById('root')).render(<AdminDashboard onLogout={() => {}} canDelete={canDelete} />);
}
