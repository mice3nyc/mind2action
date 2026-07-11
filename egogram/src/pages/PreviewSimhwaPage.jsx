import { useSearchParams } from 'react-router-dom';
import { SimhwaView } from '../components/Report/SimhwaReportView';

// 테스트 전용 — 설문 없이 심화코칭 리포트 레이아웃/회귀를 확인한다. 어디에도 링크되지 않음.
//   /#/preview/simhwa            (김정임 샘플)
//   /#/preview/simhwa?s=이서연    (5샘플 프리셋 — 회귀 정답지 source/sample_*.md 대조용)
//   /#/preview/simhwa?cp=14&np=13&a=18&fc=14&ac=6&name=홍길동&honorific=TCR  (임의 점수)
// 실데이터 노출 없음(가짜 점수).

// 대장 부록 5샘플 점수표 (회귀 정답지).
const SAMPLES = {
  김정임: { CP: 14, NP: 13, A: 18, FC: 14, AC: 6, honorific: 'PA' },
  이서연: { CP: 6, NP: 16, A: 8, FC: 14, AC: 17, honorific: 'PA' },
  이선규: { CP: 17, NP: 8, A: 13, FC: 20, AC: 9, honorific: 'PA' },
  이영수: { CP: 17, NP: 11, A: 4, FC: 10, AC: 12, honorific: 'PA' },
  허진랑: { CP: 18, NP: 18, A: 16, FC: 18, AC: 10, honorific: 'TCR' },
};

const TIE_PRIORITY = ['A', 'CP', 'NP', 'FC', 'AC'];
const EGO = ['CP', 'NP', 'A', 'FC', 'AC'];

// 점수 → top1/top2/bottom (scoreEngine과 동일 tie-break).
function rank(scores) {
  const desc = [...EGO].sort((a, b) =>
    scores[b] !== scores[a] ? scores[b] - scores[a] : TIE_PRIORITY.indexOf(a) - TIE_PRIORITY.indexOf(b));
  const asc = [...EGO].sort((a, b) =>
    scores[a] !== scores[b] ? scores[a] - scores[b] : TIE_PRIORITY.indexOf(a) - TIE_PRIORITY.indexOf(b));
  return { top1: desc[0], top2: desc[1], bottom: asc[0] };
}

export default function PreviewSimhwaPage() {
  const [params] = useSearchParams();
  const sampleName = params.get('s');
  const sample = sampleName && SAMPLES[sampleName];

  const scores = sample
    ? { CP: sample.CP, NP: sample.NP, A: sample.A, FC: sample.FC, AC: sample.AC }
    : {
        CP: Number(params.get('cp') ?? SAMPLES['김정임'].CP),
        NP: Number(params.get('np') ?? SAMPLES['김정임'].NP),
        A: Number(params.get('a') ?? SAMPLES['김정임'].A),
        FC: Number(params.get('fc') ?? SAMPLES['김정임'].FC),
        AC: Number(params.get('ac') ?? SAMPLES['김정임'].AC),
      };

  const name = params.get('name') || sampleName || '김정임';
  const honorific = params.get('honorific') || (sample ? sample.honorific : 'PA');
  const { top1, top2, bottom } = rank(scores);

  const row = {
    id: `preview-${name}`,
    name,
    honorific,
    company: params.get('company') || '테스트 고객사',
    department: params.get('department') || '',
    score_cp: scores.CP, score_np: scores.NP, score_a: scores.A, score_fc: scores.FC, score_ac: scores.AC,
    top1, top2, bottom,
  };

  return <SimhwaView row={row} />;
}
