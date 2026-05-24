import { EGO_STATES, EGO_LABELS, getSuccessRange } from '../../lib/scoreEngine';

export default function ResultPage({ result, profile, onRestart }) {
  const { scores, grades, top1, top2, bottom, total } = result;
  const maxScore = 20;

  return (
    <section className="result-section">
      <h1>{profile?.name}님의 에고그램</h1>
      <p className="result-summary">
        가장 강한 성향은 <strong>{EGO_LABELS[top1]}</strong>({top1}),
        두 번째는 <strong>{EGO_LABELS[top2]}</strong>({top2})입니다.
        가장 약한 성향은 <strong>{EGO_LABELS[bottom]}</strong>({bottom})입니다.
      </p>

      <div className="score-grid">
        {EGO_STATES.map(ego => {
          const [sLow, sHigh] = getSuccessRange(ego);
          const isTop = ego === top1 || ego === top2;
          const isBot = ego === bottom;
          let barClass = 'score-bar-fill';
          if (isTop) barClass += ' is-top';
          else if (isBot) barClass += ' is-bottom';
          else barClass += ' is-normal';

          return (
            <div key={ego} className="score-row">
              <div className="score-label">
                <div className="score-label-ego">{ego}</div>
                <div className="score-label-kr">{EGO_LABELS[ego]}</div>
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
                <span className="score-grade">{grades[ego]}</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="result-tags">
        <div className="result-tag tag-top">TOP1 <span>{top1}</span> {EGO_LABELS[top1]}</div>
        <div className="result-tag tag-top">TOP2 <span>{top2}</span> {EGO_LABELS[top2]}</div>
        <div className="result-tag tag-bottom">BOTTOM <span>{bottom}</span> {EGO_LABELS[bottom]}</div>
      </div>

      <div className="result-total">
        <div className="result-total-label">총점</div>
        <div className="result-total-value">{total}</div>
        <div className="result-total-label">/ 100</div>
      </div>

      <button type="button" className="btn btn-secondary btn-full" onClick={onRestart}>
        처음부터 다시
      </button>
    </section>
  );
}
