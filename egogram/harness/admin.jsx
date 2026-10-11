// 관리자 화면 하니스 무대 — 실제 AdminDashboard를 가짜 PostgREST 위에 띄운다. SPEC §15-8.
//   로그인 없이 화면 배선을 보려는 것. 실서비스 경로가 아니다(vite build 엔트리는 index.html 하나).
//   ⚠️ 진짜 Supabase에 닿는 길을 끊는다 — /rest/v1/ 은 전부 가짜가 받고, 그 밖의 supabase 요청은 막고 센다.
import { buildDataset, makeFakeBackend } from '../scripts/lib/fake-postgrest.mjs';

const data = buildDataset();
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

// fetch를 바꾼 «뒤에» 앱을 불러온다
const { createRoot } = await import('react-dom/client');
const { default: AdminDashboard } = await import('../src/components/Admin/AdminDashboard');
await import('../src/styles/praxi.css');
createRoot(document.getElementById('root')).render(<AdminDashboard onLogout={() => {}} />);
