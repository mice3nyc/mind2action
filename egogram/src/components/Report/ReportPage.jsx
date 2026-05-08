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
        <ol>
          <li>거울로 얼굴을 보듯이 성향리포트로 나의 성향을 발견할 수 있습니다. 이후 다섯가지의 성향을 조절해서 사용할 수 있습니다.</li>
          <li>나를 진심으로 알게 되면 각성과 성찰을 통해 에고상태의 의식적인 조절과 수정을 실천해 나가게 됩니다. 결국 점점 체득화 되고 습관이 바뀌어 원만한 인간관계와 성공적인 비지니스를 달성할 수 있습니다.</li>
          <li>특히 비지니스를 하는 사람은 "왜 흔들리는 지"를 알게 하고 "어떻게 다시 중심을 잡을 지"를 스스로 알게 되어 상담을 원하는 방향으로 이끌 수 있고 슬럼프에 빠지는 것을 예방할 수 있습니다.</li>
          <li>궁극적으로 인생 전반에 거쳐 지금보다 나은 삶을 영위할 수 있으며 특히 사랑하는 사람들과의 좋은 관계를 잘 유지해 나갈 수 있습니다.</li>
        </ol>
        <h3>우수 보험설계사는?</h3>
        <p><strong>신뢰를 먼저 세워야 합니다.</strong> 보험은 상품이 아니라 약속입니다. 사람이 믿어야 계약이 이어지고, 믿음이 쌓여야 소개가 생깁니다.</p>
        <p><strong>고객의 상황을 이해해야 합니다.</strong> 내가 하고 싶은 말을 하기보다, 지금 이 사람이 왜 고민하는지 먼저 알아야 길이 보입니다.</p>
        <p><strong>쉽게 설명할 수 있어야 합니다.</strong> 어려운 말은 전문가의 언어이고, 쉬운 말은 고객의 언어입니다. 이해되면 결정은 빨라집니다.</p>
        <p><strong>끝까지 책임져야 합니다.</strong> 계약은 시작일 뿐입니다. 보험금 청구, 관리까지 함께할 때 고객은 평생을 맡깁니다.</p>
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
        <p style={{ whiteSpace: 'pre-line' }}>{report.cm3}</p>
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
          <p style={{ whiteSpace: 'pre-line' }}>{report.cm6}</p>
        </Section>
      )}

      {report.cm7 && (
        <Section number={7} title="신인 리크루팅 레벨업">
          <div className="report-combination">
            TOP1 {top1} + TOP2 {top2} + BOTTOM {bottom}
          </div>
          <p style={{ whiteSpace: 'pre-line' }}>{report.cm7}</p>
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
        <p>{report.name}님은 한 가정의 미래를 지키는 사람입니다. 언제 올지 모르는 위험과 질병, 사고 앞에서 누군가가 무너지지 않도록 미리 길을 준비해 두는 일, 그것이 바로 {report.name}님이 하시는 일입니다. 눈에 보이는 물건이 아닌 약속과 책임을 설명해야 하기에, 지식만으로는 부족하고 사람의 품격과 태도가 함께 필요합니다.</p>
        <p>고객은 설명을 듣고 판단하지만, 선택을 할 때는 결국 사람을 믿습니다. 그래서 한마디 말, 한 번의 방문, 작은 배려가 모여 깊은 신뢰가 됩니다. 그리고 그 신뢰 위에서 {report.name}님은 단순한 상담자가 아니라 가족의 일을 함께 걱정해 주는 든든한 동반자가 됩니다.</p>
        <p>계약 이후에도 연락을 받고, 어려움이 생기면 가장 먼저 떠오르는 이름으로 남는 사람. 끝까지 책임지겠다는 마음으로 자리를 지키는 사람. 그런 분들이 있기에 많은 가정이 다시 일어설 힘을 얻습니다.</p>
        <p>오늘도 누군가의 내일을 대신 준비하며 묵묵히 걸어가는 {report.name}님의 수고는 숫자로 다 표현할 수 없습니다. 삶의 불안을 희망으로 바꾸는 고귀한 일을 하는 분들, 진심으로 존경받아 마땅합니다.</p>
        <div className="report-signature">
          <p>손용배 올림</p>
          <p>egogram.son@gmail.com</p>
        </div>
      </div>
    </div>
  );
}
