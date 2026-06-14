import { EGO_STATES, EGO_LABELS, getSuccessRange } from '../../lib/scoreEngine';

// 리포트(ReportPageV2 EGO_COLORS)와 동일 값을 로컬 복제 — 성향 이름 컬러 표시용
const EGO_COLORS = {
  CP: '#ef4444',
  NP: '#f59e0b',
  A: '#38bdf8',
  FC: '#10b981',
  AC: '#8b5cf6',
};

// 성향 이름 — 리포트처럼 컬러+볼드 (코드 없이)
function EgoName({ ego }) {
  return <strong style={{ color: EGO_COLORS[ego] }}>{EGO_LABELS[ego]}</strong>;
}

export default function ResultPage({ result, profile }) {
  const { scores, top1, top2, bottom } = result;
  const maxScore = 20;

  return (
    <section className="result-section">
      <h1>{profile?.name}님, 감사합니다<br />Mind2Action 성향 설문을 완료했습니다.</h1>
      <p className="result-summary">
        {profile?.name}님, 가장 강한 성향은 <EgoName ego={top1} />,
        두 번째는 <EgoName ego={top2} />입니다.<br />
        가장 약한 성향은 <EgoName ego={bottom} />입니다.
      </p>
      <p className="result-summary-cta">자세한 성향 코칭은 Mind2Action 성향리포트에서 확인하세요.</p>

      <div className="score-grid">
        {EGO_STATES.map(ego => {
          const [sLow, sHigh] = getSuccessRange(ego, profile?.jobType);
          const isTop = ego === top1 || ego === top2;
          const isBot = ego === bottom;
          let barClass = 'score-bar-fill';
          if (isTop) barClass += ' is-top';
          else if (isBot) barClass += ' is-bottom';
          else barClass += ' is-normal';

          return (
            <div key={ego} className="score-row">
              <div className="score-label">
                <div className="score-label-ego" style={{ color: EGO_COLORS[ego] }}>{EGO_LABELS[ego]}성향</div>
              </div>
              <div className="score-bar-wrap">
                <div
                  className="score-bar-success"
                  style={{
                    left: `${(sLow / maxScore) * 100}%`,
                    width: `${((sHigh - sLow + 1) / maxScore) * 100}%`
                  }}
                />
                <div
                  className={barClass}
                  style={{ width: `${(scores[ego] / maxScore) * 100}%` }}
                />
              </div>
              <div className="score-value">
                {scores[ego]}
              </div>
            </div>
          );
        })}
      </div>

      <div className="result-tags">
        <div className="result-tag tag-top">TOP 1. {EGO_LABELS[top1]} 성향</div>
        <div className="result-tag tag-top">TOP 2. {EGO_LABELS[top2]} 성향</div>
        <div className="result-tag tag-bottom">BOTTOM. {EGO_LABELS[bottom]} 성향</div>
      </div>

    </section>
  );
}
