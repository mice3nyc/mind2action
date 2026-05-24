import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { lookupReport, EGO_STATES, EGO_LABELS, getScoreRange, needsCoaching } from '../../lib/cmLookup';
import { getSuccessRange } from '../../lib/scoreEngine';
import uiTexts from '../../data/ui_texts.yaml';

function Paragraphs({ text }) {
  if (!text) return null;
  const paragraphs = text.split(/\n\s*\n/).map(p => p.replace(/\n/g, ' ').trim()).filter(Boolean);
  return paragraphs.map((p, i) => <p key={i}>{p}</p>);
}

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

function ScoreChart({ scores, jobType }) {
  const maxScore = 20;
  return (
    <div className="report-chart">
      {EGO_STATES.map(ego => {
        const [sLow, sHigh] = getSuccessRange(ego, jobType);
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

  const [bling, setBling] = useState(false);

  if (loading) return <div className="report-loading">리포트 생성 중...</div>;
  if (error) return <div className="report-error">{error}</div>;
  if (!report) return null;

  const { result } = data;
  const { scores, top1, top2, bottom } = result;

  return (
    <div className={`report-container ${bling ? 'report-bling' : ''}`}>
      <button className="bling-toggle" onClick={() => setBling(!bling)}>
        {bling ? '기본' : 'bling'}
      </button>
      <div className="report-cover">
        <h1><span className="report-cover-brand">MIND2ACTION</span> 성향 코칭 리포트</h1>
        <div className="report-cover-name">{report.name}님</div>
        <div className="report-cover-meta">
          {data.company && <span>{data.company}</span>}
          {data.department && <span>{data.department}</span>}
        </div>
      </div>

      <div className="report-intro">
        <h2>{uiTexts.report.intro.title}</h2>
        <ol>
          {uiTexts.report.intro.items.map((item, i) => <li key={i}>{item}</li>)}
        </ol>
      </div>

      <Section number={1} title={`${report.name}${uiTexts.report.sections.s1_title}`}>
        <ScoreChart scores={scores} jobType={data.job_type} />
        <div className="report-traits">
          {EGO_STATES.map(ego => (
            <div key={ego} className="report-trait-item">
              <div className="report-trait-ego" style={{ borderColor: EGO_COLORS[ego] }}>
                {ego} — {EGO_LABELS[ego]} <span>{scores[ego]}점 ({getScoreRange(scores[ego])})</span>
              </div>
              <Paragraphs text={report.cm2[ego]} />
            </div>
          ))}
        </div>
      </Section>

      <Section number={2} title={uiTexts.report.sections.s3_title}>
        <div className="report-strength-badge">
          TOP1 <strong>{EGO_LABELS[top1]}</strong>({top1}) + TOP2 <strong>{EGO_LABELS[top2]}</strong>({top2})
        </div>
        <Paragraphs text={report.cm3} />
      </Section>

      <Section number={3} title={uiTexts.report.sections.s4_title}>
        <div className="report-score-table">
          {EGO_STATES.map(ego => (
            <div key={ego} className="report-score-cell">
              <div className="report-score-cell-label" style={{ backgroundColor: EGO_COLORS[ego] }}>{ego}</div>
              <div className="report-score-cell-value">{scores[ego]}</div>
            </div>
          ))}
        </div>

        {EGO_STATES.map(ego => {
          const detailed = report.cm4_4.find(item => item.ego === ego);
          const needs = needsCoaching(ego, scores[ego], data.job_type);
          return (
            <div key={ego} className="report-coaching-item">
              <h4 style={{ color: EGO_COLORS[ego] }}>{ego} — {EGO_LABELS[ego]}</h4>
              {detailed ? (
                <div className="report-coaching-detailed">
                  <div className="report-detailed-trait"><strong>성향:</strong> {detailed.trait}</div>
                  <Paragraphs text={detailed.coaching} />
                  {detailed.script && (
                    <div className="report-detailed-script">
                      <strong>화법 스크립트:</strong>
                      <p>{detailed.script}</p>
                    </div>
                  )}
                </div>
              ) : needs ? (
                <>
                  <Paragraphs text={report.cm4_1[ego]} />
                  {report.cm4_2[ego] && <div className="report-coaching-detail"><Paragraphs text={report.cm4_2[ego]} /></div>}
                </>
              ) : (
                <p className="report-coaching-ok">{uiTexts.report.sections.s4_no_coaching}</p>
              )}
            </div>
          );
        })}

        {report.cm4_3 && (
          <div className="report-coaching-message">
            <p>{report.cm4_3}</p>
          </div>
        )}
      </Section>

      {report.cm5 && (
        <Section number={4} title={report.isInsurance ? uiTexts.report.sections.s5_title_insurance : report.jobLabel === '관리자' ? uiTexts.report.sections.s5_title_manager : uiTexts.report.sections.s5_title_coach}>
          <div className="report-combination">
            TOP1 {top1} + TOP2 {top2} + BOTTOM {bottom}
          </div>
          <div className="report-cm5">
            <h4>{uiTexts.report.sections.s5_manner}</h4>
            <Paragraphs text={report.cm5.manner} />
            <h4>{uiTexts.report.sections.s5_improvement}</h4>
            <Paragraphs text={report.cm5.improvement} />
          </div>
        </Section>
      )}

      {report.isInsurance && (
        <Section number={5} title={uiTexts.report.sections.s6_title}>
          {report.cm6 && (
            <>
              <div className="report-combination">
                TOP1 {top1} + TOP2 {top2}
              </div>
              <Paragraphs text={report.cm6} />
            </>
          )}
          {report.cm6_common && report.cm6_common.length > 0 && (
            <div className="report-cm6-common">
              {report.cm6_common.map((item, i) => (
                <div key={i} className="report-cm6-common-item">
                  <h4>{item.title}</h4>
                  <Paragraphs text={item.body} />
                </div>
              ))}
            </div>
          )}
        </Section>
      )}

      {report.cm7 && (
        <Section number={report.isInsurance ? 6 : 5} title={uiTexts.report.sections.s7_title}>
          <div className="report-combination">
            TOP1 {top1} + TOP2 {top2} + BOTTOM {bottom}
          </div>
          <Paragraphs text={report.cm7} />
        </Section>
      )}

      <div className="report-closing">
        <p className="report-closing-greeting">{uiTexts.report.closing.greeting}</p>
        <div className="report-contact">
          {uiTexts.report.closing.contact.email && <p className="report-contact-email">✉&nbsp;&nbsp;{uiTexts.report.closing.contact.email}</p>}
          {uiTexts.report.closing.contact.instagram && <p className="report-contact-email">인스타그램  {uiTexts.report.closing.contact.instagram}</p>}
          {uiTexts.report.closing.contact.phone && <p className="report-contact-email">전화  {uiTexts.report.closing.contact.phone}</p>}
        </div>
      </div>

      <div className="report-copyright">© 2026 MIND2ACTION</div>
    </div>
  );
}
