import { useSearchParams } from 'react-router-dom';
import ResultPage from '../components/Result/ResultPage';

// 테스트 전용 — 설문 없이 결과 화면 레이아웃만 확인한다. 어디에도 링크되지 않음(해시 직접 입력).
//   /#/preview/result            (이름 "테스트")
//   /#/preview/result?name=이승택  (이름 변경)
// 점수는 고정 목 데이터(가짜). 실데이터 노출 없음.
const MOCK_RESULT = {
  scores: { CP: 16, NP: 8, A: 18, FC: 12, AC: 11 },
  top1: 'A',
  top2: 'CP',
  bottom: 'NP',
};

export default function PreviewResultPage() {
  const [params] = useSearchParams();
  const name = params.get('name') || '테스트';
  const jobType = params.get('job') || '관리자';
  return <ResultPage result={MOCK_RESULT} profile={{ name, jobType }} />;
}
