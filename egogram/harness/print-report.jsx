// 인쇄 하니스 무대 — 영업성향(일반) 리포트 한 사람을 앱과 같은 컴포넌트·같은 CSS로 띄운다.
//   SPEC §14-2. 실서비스 경로가 아니다: responses가 anon으로 안 열려 /report/:id로는 못 잰다.
//   vite dev가 루트의 html을 그대로 서빙하므로 `vite build`(index.html 단일 엔트리)에는 딸려 나가지 않는다.
//   사용: /harness/print-report.html?s=이영화
import { createRoot } from 'react-dom/client';
import { ReportViewV2 } from '../src/components/Report/ReportPageV2';
import { SAMPLES, deriveRow } from './report-samples.js';
import '../src/styles/praxi.css';

const q = new URLSearchParams(location.search);
const want = q.get('s');
// ?scores=CP,NP,A,FC,AC&job=org_leader — 표본에 없는 점수(동점 가장자리)를 직접 넣는다. SPEC §13-4 check:ties
const custom = q.get('scores')?.split(',').map(Number);
const sample = custom?.length === 5
  ? { name: q.get('name') || '시험', job_type: q.get('job') || 'sales', company: '', department: '',
      scores: { CP: custom[0], NP: custom[1], A: custom[2], FC: custom[3], AC: custom[4] } }
  : SAMPLES.find(s => s.name === want) || SAMPLES[0];

// showToggle=false — bling 버튼은 인쇄에서 숨겨지지만 레이아웃 판정에 끼어들 여지를 아예 없앤다.
createRoot(document.getElementById('root')).render(
  <ReportViewV2 row={deriveRow(sample)} showToggle={false} />
);
document.title = `print-harness · ${sample.name}`;
