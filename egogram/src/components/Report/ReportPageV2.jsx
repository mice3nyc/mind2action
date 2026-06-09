import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { lookupReport, EGO_STATES, EGO_LABELS, needsCoaching } from '../../lib/cmLookup';
import { getSuccessRange } from '../../lib/scoreEngine';
import uiTexts from '../../data/ui_texts.yaml';

// ─────────────────────────────────────────────────────────────
// ReportPageV2 — 리포트 리디자인 프로토타입 무대 (26.0528~)
//   v1(ReportPage)을 복제한 뒤, 작성 가이드가 확정된 섹션부터 하나씩 개조한다.
//   기획·원칙: [[리포트 설계 원칙]] / 실행 단계: [[리포트 리디자인 작업 계획]]
//   진행: §1 성향분석 = 가이드 적용 완료(척도 한 줄 + 강점우선 cm1 진입 레이어).
//        §2~ = 아직 v1과 동일(가이드 미확정).
// ─────────────────────────────────────────────────────────────

// 본문 안의 에고 라벨 "XX(한글,한글)"을 §1과 동일한 에고 색으로 입힌다.
//   - 색·표기는 코드(CP/NP/A/FC/AC) 기준 → 손소장 본문의 FC(배려,공감) 오타가 화면에선 FC(친화·표현)로 자동 교정
//   - 쉼표는 §1처럼 가운뎃점(·)으로 통일 (EGO_PLAIN_LABEL 사용)
//   - 코드+한글을 한 덩어리로 색칠 → 조사(가/의)는 손대지 않아 문장 자연스러움 유지
const EGO_LABEL_RE = /(CP|NP|FC|AC|A)\([가-힣,·]+\)/g;
function colorizeEgo(text, kp) {
  const parts = [];
  let last = 0, i = 0, m;
  EGO_LABEL_RE.lastIndex = 0;
  while ((m = EGO_LABEL_RE.exec(text)) !== null) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    const code = m[1];
    parts.push(
      <span key={`${kp}-e${i++}`} style={{ color: EGO_COLORS[code], fontWeight: 600 }}>
        {code}({EGO_PLAIN_LABEL[code]})
      </span>
    );
    last = m.index + m[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts.length ? parts : [text];
}

// breaks=true: 문단 안의 단일 줄바꿈도 <br>로 보존 (말투/화법 샘플이 개별 라인으로 보이게).
//   기본(false)은 단일 줄바꿈을 공백으로 합쳐 산문 한 흐름으로 렌더.
function Paragraphs({ text, breaks }) {
  if (!text) return null;
  const paragraphs = text.split(/\n\s*\n/).map(p => p.trim()).filter(Boolean);
  if (breaks) {
    return paragraphs.map((p, i) => {
      const lines = p.split('\n').map(l => l.trim()).filter(Boolean);
      return <p key={i}>{lines.flatMap((line, j) => {
        const content = colorizeEgo(line, `c${i}-${j}`);
        return j === 0 ? content : [<br key={`b${i}-${j}`} />, ...content];
      })}</p>;
    });
  }
  return paragraphs.map((p, i) => <p key={i}>{colorizeEgo(p.replace(/\n/g, ' ').trim(), `c${i}`)}</p>);
}

// 손소장 26.0607(4): CM4-2 본문에 "조율이 필요없는 구간" / "성향 에너지가 다소 강하지만 조율은 필요없는 구간"
// 으로 표기한 높은/중간 점수대 = 조율 포인트 아님 → §3 카드에서 제외하는 센티넬.
function isNoAdjust(text) {
  return !!text && /조율[이은]?\s*필요\s*없는\s*구간/.test(text);
}

// 본문 첫머리의 조회 키/분류 메타 괄호 제거 (원칙 2 — 내부 키·분류 노출 금지)
// 예: "(CP 통제적부모 & NP ...강점으로 발현됨.)" / "(원칙이 아주 강하고...성향)"
function stripMeta(text) {
  if (!text) return text;
  return text.replace(/^\s*\([^)]*(?:성향|첫번째|두번째|높아|발현|BOTTOM|TOP)[^)]*\)\s*/g, '').trim();
}

const EGO_COLORS = {
  CP: '#ef4444',
  NP: '#f59e0b',
  A: '#38bdf8',
  FC: '#10b981',
  AC: '#8b5cf6',
};

// 점수 → cm1 구간 (cmLookup.scoreRange와 동일 기준)
function scoreRange(score) {
  if (score >= 17) return '17-20';
  if (score >= 14) return '14-16';
  if (score >= 11) return '11-13';
  if (score >= 8) return '8-10';
  return '0-7';
}

// 강점우선 1차 손질 (가이드 규칙 3 — 낮은 점수대 부정어 → 중립/강점).
// cm1 원본의 부정어 구간만 덮어쓴다. 프로토타입 인라인 — 4단계 역설계 때 데이터로 추출.
// 검토 대상: 피터공. 같은 사실을 깎아내리지 않고 다시 본 표현인지.
const STRENGTH_REFRAME = {
  '0-7': {
    CP: '부드럽고 · 수용적이며 · 상대를 앞세운다',
    NP: '담백하고 · 군더더기 없으며 · 사실 중심이다',
    A: '직관적이고 · 즉각적이며 · 감성이 풍부하다',
    FC: '감정을 절제하고 · 차분하며 · 진중하다',
    AC: '소신 있고 · 솔직하며 · 자기 기준이 또렷하다',
  },
  '8-10': {
    NP: '차분하고 · 담백하며 · 실무 중심이다',
    A: '느낌을 먼저 받아들이고 · 공감이 빠르며 · 사람 중심이다',
    FC: '조용하고 · 신중하며 · 진지하다',
  },
};

// cm1 원본 문자열 → "구 · 구 · 구" 형태로 정돈 (강점우선 손질 대상이 아닐 때)
function formatKeywords(raw) {
  if (!raw) return '';
  return raw
    .split(/[,，.]/)
    .map(s => s.trim())
    .filter(Boolean)
    .join(' · ');
}

// 각 ego의 강점우선 한 줄 평이 번역
function plainTranslation(ego, score, cm1) {
  const range = scoreRange(score);
  const reframed = STRENGTH_REFRAME[range]?.[ego];
  if (reframed) return reframed;
  return formatKeywords(cm1?.[ego]);
}

// ── 정체성 레이어 (원칙 6·7) ───────────────────────────────────
// top1+top2 조합(20종) → "당신은 ___한 분" 명명 + 짧은 설명.
// 점수에서 결정론적으로 조합이 정해지므로 고정 텍스트도 개인화돼 보인다(원칙 5의 나).
// 프로토타입 1차 — 비교 케이스(컨설턴트) 우선 인라인. 4단계서 cm3 도입부 역설계 + 손소장 샘플로 20조합 yaml화.
const IDENTITY = {
  CP_NP: { title: '기준이 또렷하면서도 사람을 먼저 챙기는 분', desc: '무엇이 맞는지 분명히 말해 방향을 잡아 주고, 동시에 상대의 마음을 살펴 안심시킵니다. 단단함과 따뜻함을 함께 가졌습니다.' },
  CP_A:  { title: '기준과 분석이 함께 단단한 분', desc: '원칙이 또렷하고 판단이 냉철해, 복잡한 상황에서도 흔들리지 않고 방향을 제시합니다.' },
  CP_AC: { title: '분명한 기준을 갖되 상대에 맞춰 조율하는 분', desc: '결정의 중심은 또렷한데, 밀어붙이기보다 상황과 상대를 살펴 속도를 맞춥니다. 신뢰를 주면서도 부담을 주지 않습니다.' },
  NP_CP: { title: '따뜻하게 품으면서 기준도 분명한 분', desc: '상대를 먼저 이해하고 보듬되, 필요한 자리에서는 분명한 방향을 짚어 줍니다.' },
  NP_FC: { title: '따뜻하게 공감하고 밝게 다가가는 분', desc: '상대의 마음을 먼저 읽고, 환하고 편안한 분위기로 거리를 좁힙니다. 함께 있으면 마음이 놓이는 사람입니다.' },
  NP_AC: { title: '깊이 공감하며 세심하게 맞춰 주는 분', desc: '상대의 감정을 먼저 살피고 조심스럽게 보폭을 맞춥니다. 곁에서 끝까지 함께해 줄 사람이라는 신뢰를 줍니다.' },
  A_CP:  { title: '냉철하게 분석하고 기준이 또렷한 분', desc: '사실과 흐름을 차분히 정리해 핵심을 짚고, 그 위에 분명한 기준을 세웁니다.' },
  FC_NP: { title: '밝은 에너지로 다가가 따뜻하게 품는 분', desc: '먼저 웃으며 다가가 분위기를 열고, 상대의 마음을 따뜻하게 감싸 안습니다.' },
  AC_CP: { title: '상대에 맞춰 조율하되 자기 기준이 또렷한 분', desc: '상황과 상대를 세심히 살펴 맞추면서도, 중요한 자리에서는 자기 중심을 지킵니다.' },
};

// 미충원 조합 fallback — 두 강점을 합성 (빈 화면 방지)
const EGO_STRENGTH = { CP: '또렷한 기준', NP: '따뜻한 공감', A: '차분한 분석', FC: '밝은 표현력', AC: '세심한 조율' };

function getIdentity(top1, top2, name) {
  const hit = IDENTITY[`${top1}_${top2}`];
  if (hit) return hit;
  return {
    // 손소장 26.0607(14): EGO_STRENGTH 다섯 값 모두 받침으로 끝나 조사는 항상 '과' → 플레이스홀더 '과(와)' 고정
    title: `${EGO_STRENGTH[top1]}과 ${EGO_STRENGTH[top2]}이 함께 도드라지는 분`,
    desc: '',
    fallback: true,
  };
}

// 그래프 라벨 — "통제적 부모" 같은 코드 정식명 대신 강점 평이어 (제안 2, 미스리딩 제거)
const EGO_PLAIN_LABEL = { CP: '기준·결단', NP: '배려·공감', A: '이성·판단', FC: '친화·표현', AC: '협조·조율' };

// 유형 강점 명칭 ("~의 힘", 26.0528 피터공 선택). 가장 강한 유형(top1)을 이 이름으로 부각 — 손소장 강조점.
// 부모/아이 메타포 제거, 강점 프레이밍. 프로토타입 인라인 — 4단계서 데이터화.
const EGO_TYPE_NAME = { CP: '기준을 세우는 힘', NP: '마음을 살피는 힘', A: '흐름을 읽는 힘', FC: '분위기를 여는 힘', AC: '보폭을 맞추는 힘' };

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
              <strong>{EGO_PLAIN_LABEL[ego]}</strong>
              <span className="report-chart-code">{ego}</span>
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

// 응답 행(supabase snake_case) 하나를 받아 v2 리포트 본문을 렌더.
// 단일 리포트(ReportPageV2)와 단체 배치(ReportBatchPage)가 공유한다 — v1 ReportView와 같은 인터페이스.
export function ReportViewV2({ row, showToggle = true }) {
  const [bling, setBling] = useState(false);

  const result = {
    scores: { CP: row.score_cp, NP: row.score_np, A: row.score_a, FC: row.score_fc, AC: row.score_ac },
    top1: row.top1,
    top2: row.top2,
    bottom: row.bottom,
    total: row.total,
    grades: row.grades,
  };

  const report = lookupReport(result, row.job_type);
  report.name = row.name;

  const data = { ...row, result };
  const { scores, top1, top2, bottom } = result;
  const identity = getIdentity(top1, top2, report.name);

  return (
    <div className={`report-container ${bling ? 'report-bling' : ''}`}>
      {showToggle && (
        <button className="bling-toggle" onClick={() => setBling(!bling)}>
          {bling ? '기본' : 'bling'}
        </button>
      )}
      <div className="report-cover">
        <div className="report-cover-title">
          <h1><span className="report-cover-brand">MIND2ACTION</span> 성향 코칭 리포트</h1>
        </div>
        <div className="report-cover-id">
          <div className="report-cover-name">{report.name}님</div>
          <div className="report-cover-meta">
            {data.company && <span>{data.company}</span>}
            {data.department && <span>{data.department}</span>}
          </div>
        </div>
      </div>

      {/* intro — 번호 리스트 대신 서술형 (제안 1) */}
      <div className="report-intro report-intro-v2">
        <h2>{uiTexts.report.intro.title}</h2>
        <p>성향 리포트는 나를 더 잘 이해하고, 다섯 가지 성향을 상황에 맞게 활용할 수 있도록 돕는 안내서입니다.</p>
        <p>자신의 강점과 조율할 점을 알게 되면 인간관계와 비즈니스가 더욱 안정적으로 이루어지고, 흔들릴 때 다시 중심을 잡는 데 도움이 됩니다.</p>
        <p>궁극적으로 더 나은 삶과 좋은 관계를 만들어 가도록 돕는 리포트입니다.</p>
      </div>

      {/* ── §1 성향분석 — v2 가이드 2차 (원칙 6·7) ─────────────────
          종합 정체성 먼저 → 소제목 → 그래프(평이 라벨, 보조) → 자아상태별 깊은 본문. */}
      <Section number={1} title={`${report.name}${uiTexts.report.sections.s1_title}`}>
        {/* 1. 종합 성향 정체성 — 가장 강한 힘(top1) 부각(손소장 강조점) + 종합 인물상 */}
        <div className="report-identity">
          <p className="report-identity-toplabel">가장 강한 힘</p>
          <p className="report-identity-top">{EGO_TYPE_NAME[top1]}</p>
          <p className="report-identity-line">
            {report.name}님은 <strong>{identity.title}</strong>입니다.
          </p>
          {identity.desc && <p className="report-identity-desc">{identity.desc}</p>}
        </div>

        {/* 2. 한눈에 보는 다섯 성향 (그래프 보조, 평이 라벨) */}
        <h3 className="report-subhead">한눈에 보는 다섯 성향</h3>
        <p className="report-scale-note">각 성향 0~20점</p>
        <ScoreChart scores={scores} jobType={data.job_type} />
        {/* 손소장 26.0607(4): 점선 밴드가 무엇인지 알 수 있게 범례 표시 */}
        <p className="report-chart-legend"><span className="report-chart-legend-mark" /> 점선 안 = 조율이 필요없는 구간</p>

        {/* 3. 성향별로 자세히 보기 — 강약 차등(원칙 8, 26.0529): 두드러진 성향(top1·top2)은 깊게,
            나머지는 점수 순 한 줄 묶음. 다섯 평등 리스트 → 인물 초상으로 흐르게. */}
        <h3 className="report-subhead">성향별로 자세히 보기</h3>
        {(() => {
          const ranked = [...EGO_STATES].sort((a, b) => scores[b] - scores[a]);
          const deep = ranked.filter(ego => ego === top1 || ego === top2);
          const rest = ranked.filter(ego => ego !== top1 && ego !== top2);
          return (
            <>
              <div className="report-traits">
                {deep.map(ego => (
                  <div key={ego} className="report-trait-item">
                    <div className="report-trait-ego" style={{ borderColor: EGO_COLORS[ego] }}>
                      {EGO_PLAIN_LABEL[ego]} <span>{scores[ego]}점</span>
                    </div>
                    <p className="report-trait-plain">{plainTranslation(ego, scores[ego], report.cm1)}</p>
                    <Paragraphs text={report.cm2[ego]} />
                  </div>
                ))}
              </div>
              {rest.length > 0 && (
                <div className="report-traits-rest">
                  {rest.map(ego => (
                    <p key={ego} className="report-trait-rest-line">
                      <strong style={{ color: EGO_COLORS[ego] }}>{EGO_PLAIN_LABEL[ego]}</strong>
                      <span className="report-trait-rest-score">{scores[ego]}점</span>
                      <span className="report-trait-rest-text">{plainTranslation(ego, scores[ego], report.cm1)}</span>
                    </p>
                  ))}
                </div>
              )}
            </>
          );
        })()}
      </Section>

      <Section number={2} title={uiTexts.report.sections.s3_title}>
        <p className="report-strength-lead">
          {report.name}님은 <strong>{identity.title}</strong>. 그 성향은 이런 강점으로 드러납니다.
        </p>
        <Paragraphs text={stripMeta(report.cm3)} />
      </Section>

      {/* ── §3 조율 포인트 — v2: 조율 필요한 성향만 카드, 나머지는 한 줄 (텍스트 절감) ── */}
      {(() => {
        const coaching = [];
        const okEgos = [];
        EGO_STATES.forEach(ego => {
          const detailed = report.cm4_4.find(item => item.ego === ego);
          // 손소장 26.0607(4): cm4_2가 '조율 필요없는 구간' 센티넬이면 조율 포인트 아님 (17점↑ 강점 등 오노출 차단).
          // detailed(cm4_4)는 우선이라 영향 없음 — AC 과조율 상세 카드는 유지.
          const needs = needsCoaching(ego, scores[ego], data.job_type) && !isNoAdjust(report.cm4_2[ego]);
          if (detailed || needs) coaching.push({ ego, detailed, needs });
          else okEgos.push(ego);
        });
        return (
          <Section number={3} title={uiTexts.report.sections.s4_title}>
            {coaching.map(({ ego, detailed, needs }) => (
              <div key={ego} className="report-coaching-item">
                <h4 style={{ color: EGO_COLORS[ego] }}>{EGO_PLAIN_LABEL[ego]} <span className="report-coaching-score">{scores[ego]}점</span></h4>
                {detailed ? (
                  <div className="report-coaching-detailed">
                    <div className="report-detailed-trait">{stripMeta(detailed.trait)}</div>
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
                    <Paragraphs text={stripMeta(report.cm4_1[ego])} />
                    {report.cm4_2[ego] && <div className="report-coaching-detail"><Paragraphs text={stripMeta(report.cm4_2[ego])} /></div>}
                  </>
                ) : null}
              </div>
            ))}

            {/* 조율 필요없는 성향 나열 줄 — 손소장 26.0604: 표기 안 함 (삭제) */}

            {report.cm4_3 && (
              <div className="report-coaching-message">
                {/* 손소장 26.0607(5): 'OOO님은…' + 다단락 + ⚠️ 블록 한 셀 → 이름 치환 + 줄바꿈 보존 */}
                <Paragraphs text={report.cm4_3.replace(/OOO/g, report.name)} />
              </div>
            )}

            {report.cm4_5 && coaching.length > 0 && (
              <div className="report-cm4-5">
                <Paragraphs text={stripMeta(report.cm4_5).replace(/OOO/g, report.name)} />
              </div>
            )}
          </Section>
        );
      })()}

      {report.cm5 && (
        <Section number={4} title={report.isInsurance ? uiTexts.report.sections.s5_title_insurance : report.jobLabel === '관리자' ? uiTexts.report.sections.s5_title_manager : uiTexts.report.sections.s5_title_coach}>
          {report.cm5_1 && (
            <p className="report-cm5-oneliner">{stripMeta(report.cm5_1).replace(/OOO/g, report.name)}</p>
          )}
          <div className="report-cm5">
            {/* 손소장 26.0607(8·10): 컨설턴트 §4 소제목 두 개 (리디자인 때 빠진 것 복원) */}
            {report.isInsurance && <h4 className="report-cm5-subhead">제안시 이 성향의 태도</h4>}
            <Paragraphs text={report.cm5.manner} breaks />
            <div className="report-cm5-improvement">
              {report.isInsurance && <h4 className="report-cm5-subhead">개선에 도움이 되는 코칭과 화법예시</h4>}
              <Paragraphs text={report.cm5.improvement} breaks />
            </div>
          </div>
        </Section>
      )}

      {report.isInsurance && (
        <Section number={5} title={uiTexts.report.sections.s6_title}>
          {report.cm6 && (
            <Paragraphs text={stripMeta(report.cm6)} />
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

      {/* 신인 리크루팅 레벨업(cm7) 섹션 — v1과 동일하게 렌더 제거(데이터는 보존) */}

      <div className="report-closing">
        {report.closing ? (
          <div className="report-closing-message">
            <Paragraphs text={report.closing.replace(/OOO/g, report.name)} />
          </div>
        ) : (
          <p className="report-closing-greeting">{uiTexts.report.closing.greeting}</p>
        )}
      </div>

      <div className="report-footer-bar">
        <span className="report-footer-copyright">© 2026 MIND2ACTION</span>
        {uiTexts.report.closing.contact.email && (
          <span className="report-footer-email">✉&nbsp;&nbsp;{uiTexts.report.closing.contact.email}</span>
        )}
      </div>
    </div>
  );
}

export default function ReportPageV2() {
  const { id } = useParams();
  const [row, setRow] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      const { data: r, error: err } = await supabase
        .from('responses')
        .select('*')
        .eq('id', id)
        .single();

      if (err || !r) {
        setError('리포트를 찾을 수 없습니다.');
        setLoading(false);
        return;
      }
      setRow(r);
      setLoading(false);
    }
    load();
  }, [id]);

  if (loading) return <div className="report-loading">리포트 생성 중...</div>;
  if (error) return <div className="report-error">{error}</div>;
  if (!row) return null;

  return <ReportViewV2 row={row} />;
}
