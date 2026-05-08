import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { lookupReport, EGO_STATES, EGO_LABELS, getScoreRange, needsCoaching } from '../../lib/cmLookup';
import { getSuccessRange } from '../../lib/scoreEngine';

const EGO_COLORS = {
  CP: '#ef4444',
  NP: '#f59e0b',
  A: '#38bdf8',
  FC: '#10b981',
  AC: '#8b5cf6',
};

function Section({ number, title, children }) {
  return (
    <div className="report-section">
      <h2 className="report-section-title">
        {number && <span className="report-section-num">{number}.</span>}
        {title}
      </h2>
      {children}
    </div>
  );
}

function ScoreChart({ scores }) {
  const maxScore = 20;
  return (
    <div className="report-chart">
      {EGO_STATES.map(ego => {
        const [sLow, sHigh] = getSuccessRange(ego);
        return (
          <div key={ego} className="report-chart-row">
            <div className="report-chart-label" style={{ color: EGO_COLORS[ego] }}>
              <strong>{ego}</strong>
              <span>{EGO_LABELS[ego]}</span>
            </div>
            <div className="report-chart-bar-wrap">
              <div
                className="report-chart-success"
                style={{
                  left: `${(sLow / maxScore) * 100}%`,
                  width: `${((sHigh - sLow + 1) / maxScore) * 100}%`
                }}
              />
              <div
                className="report-chart-bar"
                style={{
                  width: `${(scores[ego] / maxScore) * 100}%`,
                  backgroundColor: EGO_COLORS[ego],
                }}
              />
            </div>
            <div className="report-chart-score">{scores[ego]}</div>
          </div>
        );
      })}
    </div>
  );
}

export default function ReportPage() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      const { data: row, error: err } = await supabase
        .from('responses')
        .select('*')
        .eq('id', id)
        .single();

      if (err || !row) {
        setError('리포트를 찾을 수 없습니다.');
        setLoading(false);
        return;
      }

      const result = {
        scores: { CP: row.score_cp, NP: row.score_np, A: row.score_a, FC: row.score_fc, AC: row.score_ac },
        top1: row.top1,
        top2: row.top2,
        bottom: row.bottom,
        total: row.total,
        grades: row.grades,
      };

      const rpt = lookupReport(result, row.job_type);
      rpt.name = row.name;

      setData({ ...row, result });
      setReport(rpt);
      setLoading(false);
    }
    load();
  }, [id]);

  if (loading) return <div className="report-loading">리포트 생성 중...</div>;
  if (error) return <div className="report-error">{error}</div>;
  if (!report) return null;

  const { result } = data;
  const { scores, top1, top2, bottom } = result;

  return (
    <div className="report-container">
      <div className="report-cover">
        <div className="report-cover-badge">MIND2ACTION</div>
        <h1>성향 코칭 리포트</h1>
        <div className="report-cover-name">{report.name}님</div>
        <div className="report-cover-meta">
          {data.company && <span>{data.company}</span>}
          {data.department && <span>{data.department}</span>}
        </div>
      </div>

      <div className="report-intro">
        <h2>성향 코칭 리포트의 목적</h2>
        <p>이 리포트는 에고그램 검사를 통해 다섯 가지 자아상태의 균형을 파악하고, 현장에서 바로 활용할 수 있는 코칭 포인트를 제공합니다.</p>
        <ul>
          <li><strong>거울</strong> — 자신의 성향을 객관적으로 확인합니다.</li>
          <li><strong>각성</strong> — 강점과 보완점을 인식합니다.</li>
          <li><strong>비즈니스</strong> — 실전에서 성과로 연결되는 코칭을 받습니다.</li>
          <li><strong>궁극적</strong> — 자기 성향을 이해하고 성장의 방향을 잡습니다.</li>
        </ul>
      </div>

      <Section number={1} title={`${report.name}님의 성향`}>
        <ScoreChart scores={scores} />
        <div className="report-traits">
          {EGO_STATES.map(ego => (
            <div key={ego} className="report-trait-item">
              <div className="report-trait-ego" style={{ borderColor: EGO_COLORS[ego] }}>
                {ego} <span>{scores[ego]}점 ({getScoreRange(scores[ego])})</span>
              </div>
              <p>{report.cm1[ego]}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section number={2} title="자아상태의 성향과 말투">
        {EGO_STATES.map(ego => (
          <div key={ego} className="report-cm2-item">
            <h3 style={{ color: EGO_COLORS[ego] }}>{ego} — {EGO_LABELS[ego]} ({scores[ego]}점)</h3>
            <p>{report.cm2[ego]}</p>
          </div>
        ))}
      </Section>

      <Section number={3} title="내 성향의 강점">
        <div className="report-strength-badge">
          TOP1 <strong>{EGO_LABELS[top1]}</strong>({top1}) + TOP2 <strong>{EGO_LABELS[top2]}</strong>({top2})
        </div>
        <p>{report.cm3}</p>
      </Section>

      <Section number={4} title="내 성향의 코칭 포인트">
        <div className="report-score-table">
          {EGO_STATES.map(ego => (
            <div key={ego} className="report-score-cell">
              <div className="report-score-cell-label" style={{ backgroundColor: EGO_COLORS[ego] }}>{ego}</div>
              <div className="report-score-cell-value">{scores[ego]}</div>
            </div>
          ))}
        </div>

        {EGO_STATES.map(ego => {
          const coaching = report.cm4_1[ego];
          const detail = report.cm4_2[ego];
          const needs = needsCoaching(ego, scores[ego]);
          return (
            <div key={ego} className="report-coaching-item">
              <h4 style={{ color: EGO_COLORS[ego] }}>{ego} — {EGO_LABELS[ego]}</h4>
              {needs ? (
                <>
                  <p>{coaching}</p>
                  {detail && <p className="report-coaching-detail">{detail}</p>}
                </>
              ) : (
                <p className="report-coaching-ok">코칭이 필요 없는 구간입니다.</p>
              )}
            </div>
          );
        })}

        <div className="report-coaching-message">
          <p>{report.cm4_3}</p>
        </div>

        {report.cm4_4.length > 0 && (
          <div className="report-detailed-coaching">
            <h3>세밀한 코칭</h3>
            {report.cm4_4.map(item => (
              <div key={item.ego} className="report-detailed-item">
                <h4 style={{ color: EGO_COLORS[item.ego] }}>
                  {item.ego} — {EGO_LABELS[item.ego]} ({item.condition === '0-7' ? '0~7점' : '17점 이상'})
                </h4>
                <div className="report-detailed-trait"><strong>성향:</strong> {item.trait}</div>
                <div className="report-detailed-text">{item.coaching}</div>
                {item.script && (
                  <div className="report-detailed-script">
                    <strong>화법 스크립트:</strong>
                    <p>{item.script}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </Section>

      {report.cm5 && (
        <Section number={5} title="보장에 대한 제안을 할 때">
          <div className="report-combination">
            TOP1 {top1} + TOP2 {top2} + BOTTOM {bottom}
          </div>
          <div className="report-cm5">
            <h4>이 성향의 말투와 태도</h4>
            <p>{report.cm5.manner}</p>
            <h4>개선이 되는 코칭 내용</h4>
            <p>{report.cm5.improvement}</p>
          </div>
        </Section>
      )}

      {report.cm6 && (
        <Section number={6} title="클로징 전 고객님이 거절시">
          <div className="report-combination">
            TOP1 {top1} + TOP2 {top2}
          </div>
          <p>{report.cm6}</p>
        </Section>
      )}

      {report.cm7 && (
        <Section number={7} title="신인 리크루팅 레벨업">
          <div className="report-combination">
            TOP1 {top1} + TOP2 {top2} + BOTTOM {bottom}
          </div>
          <p>{report.cm7}</p>
        </Section>
      )}

      {report.cm8 && (
        <Section number={8} title="명언">
          <div className="report-quotes">
            <div className="report-quote encourage">
              <div className="report-quote-label">격려</div>
              <p>{report.cm8.encourage}</p>
            </div>
            <div className="report-quote improve">
              <div className="report-quote-label">개선</div>
              <p>{report.cm8.improve}</p>
            </div>
          </div>
        </Section>
      )}

      <div className="report-closing">
        <h2>마지막으로 드리고 싶은 말씀</h2>
        <p>
          {report.name}님, 이 리포트가 오늘의 현장에서 작은 변화를 만드는 거울이 되기를 바랍니다.
          점수는 고정된 것이 아니라, 지금 이 순간부터 바꿔 나갈 수 있는 출발점입니다.
        </p>
        <div className="report-signature">
          <p>손용배 올림</p>
          <p>egogram.son@gmail.com</p>
        </div>
      </div>
    </div>
  );
}
