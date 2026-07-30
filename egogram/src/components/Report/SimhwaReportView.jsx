import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { buildSimhwa } from '../../lib/buildSimhwa';
import { EGO_COLOR, EGO_LABEL, LABEL_TO_CODE, egoTermRe } from '../../lib/egoTerms';
import { GroupRadar } from '../Result/InsightCharts';
import { BENCHMARK } from '../../lib/buildSimhwa';

// ─────────────────────────────────────────────────────────────
// SimhwaReportView — M2A 성향별 심화코칭 리포트 렌더러 (ReportViewV2 형제).
//   병렬 오버레이: 기존 성향리포트 엔진과 별개 데이터셋(simhwa_*.yaml)을 buildSimhwa로 조립.
//   룩: 성향명 색 헤더(EGO_COLORS) + 텍스트 소제목. 이모지·엠대시 미사용(SPEC §14, 손소장 요청).
//   SPEC: docs/simhwa/SPEC.md §6·§14. 스타일: styles/praxi.css .simhwa-*.
// ─────────────────────────────────────────────────────────────

const EGO_COLORS = EGO_COLOR;   // 색·이름은 용어 사전(data/ego_terms.yaml)이 단일 출처
const EGO_PLAIN = EGO_LABEL;

// 본문 성향명 컬러 코딩 + 에고 코드 제거 (SPEC §14-③). **기존 성향리포트 colorizeEgo와 100% 동일 로직**
//   (피터공 확정: 기존 리포트에 맞춤). 심화 확장 = 코드 없는 맨 라벨("기준·결단")도 매칭.
//   두 형태: (1) "CP(기준·결단)" 정순 코드형 → 코드·괄호 제거 / (2) 맨 라벨 "기준·결단".
//   손소장 규칙(base 동일): 라벨만 색칠. 뒤에 '성향'이 이미 있으면 그 '성향'은 무색으로 둠(hasSuffix).
//   '성향'이 없으면 라벨 뒤에 무색 아닌 접미 " 성향"을 붙이고 조사 교정(성향=받침ㅇ).
//   매칭 규칙(코드형 + 맨 라벨 + 옛 표기 별칭)은 용어 사전이 만든다 — 성향리포트와 같은 정규식 하나.
const JOSA_FIX = { '가': '이', '는': '은', '를': '을', '와': '과', '로': '으로' };

//   2026-07-30 항목 2·4: 괄호 없는 맨 코드(`CP의 방향 제시가`)도 색 라벨로 바꾼다.
//   bareCode 옵션은 심화에서만 켠다 — 같은 정규식을 성향리포트(ReportPageV2)가 쓰기 때문이다.
function colorize(text, kp) {
  if (typeof text !== 'string') return text;
  const parts = [];
  let last = 0, i = 0, m;
  const re = egoTermRe({ bareCode: true });
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    const code = m[1] || m[3] || LABEL_TO_CODE[m[2]];
    let end = m.index + m[0].length;
    const hasSuffix = /^ ?성향/.test(text.slice(end));   // 원문에 '성향'이 이어지면 그건 색 밖(무색)에 둔다
    parts.push(
      <span key={`${kp}-e${i++}`} style={{ color: EGO_COLORS[code], fontWeight: 600 }}>
        {EGO_PLAIN[code]}{hasSuffix ? '' : ' 성향'}
      </span>
    );
    if (!hasSuffix && JOSA_FIX[text[end]]) { parts.push(JOSA_FIX[text[end]]); end += 1; }
    last = end;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts.length ? parts : text;
}

// 블록 문단(빈 줄 구분)을 <p>들로.
function Paras({ text, className }) {
  if (!text) return null;
  const paras = String(text).split(/\n\s*\n/).map(p => p.trim()).filter(Boolean);
  return paras.map((p, i) => <p key={i} className={className}>{colorize(p.replace(/\n/g, ' '), `p${i}`)}</p>);
}

// 줄 배열을 목록으로 — 멘트·체크리스트 (SPEC §17-4).
//   2026-07-30: <p> 나열이라 문단처럼 흘러 목록으로 안 읽혔다 → <ul>/<li>로 세운다.
//   variant='check'면 체크박스 마커(인쇄본에 손으로 체크), 아니면 인용 목록.
function LineList({ items, className, variant }) {
  if (!items || items.length === 0) return null;
  return (
    <ul className={`simhwa-linelist${variant === 'check' ? ' is-check' : ''} ${className || ''}`}>
      {items.map((line, i) => <li key={i} className="simhwa-line">{colorize(line, `l${i}`)}</li>)}
    </ul>
  );
}

// ② 에너지 발현 상태 문구 — 두 축(자동성 × 적정성) 분리 (SPEC §17-5).
//   옛 5단계("매우 강하게/안정적으로/…")는 자동성 넷에 적정성 하나가 섞여 있어 혼돈이었다.
const ENERGY_STATE_TEXT = {
  over: '자연스럽게 나오지만, 지금은 조금 강합니다',
  ok:   '자연스럽게 나오는 강점입니다. 지금 이대로 쓰시면 됩니다',
  near: '의식하면 나옵니다. 조금만 더 신경 쓰면 충분합니다',
  low:  '지금은 잘 나오지 않습니다. 연습이 필요한 부분입니다',
};

// 0~20 트랙 위에 안전구간을 띠로 깔고 내 점수에 마커. "만점 20에 14점, 그 자리가 안전구간 안"이 한눈에.
function ScoreBar({ score, max, safe, color }) {
  const [low, high] = safe;
  const pct = (v) => `${Math.max(0, Math.min(100, (v / max) * 100))}%`;
  return (
    <div className="simhwa-scorebar">
      <div className="simhwa-scorebar-track">
        <div
          className="simhwa-scorebar-safe"
          style={{ left: pct(low), width: `${((high - low) / max) * 100}%` }}
        />
        <div className="simhwa-scorebar-mark" style={{ left: pct(score), background: color }} />
      </div>
      <div className="simhwa-scorebar-foot">
        <span className="simhwa-scorebar-score"><b>{score}</b> / {max}</span>
        <span className="simhwa-scorebar-safelabel">코칭이 필요 없는 구간 {low}~{high}</span>
      </div>
    </div>
  );
}

function Section({ num, title, children }) {
  return (
    <div className="simhwa-section">
      <h2 className="simhwa-section-title">
        <span className="simhwa-section-num">{num}</span>
        {title}
      </h2>
      {children}
    </div>
  );
}

// 텍스트 소제목 (이모지 없음, SPEC §14). tint는 색 강조용(트레잇 색 등).
function IconHead({ children, tint }) {
  return (
    <h4 className="simhwa-icon-head" style={tint ? { color: tint } : undefined}>
      {children}
    </h4>
  );
}

// 고객 유형 블록 — 2026-07-30 회의로 두 장으로 갈랐다(SPEC §17-2).
//   3장 = 알아보는 법(RecognizeBlock) 다섯 성향, 4장 = 대응(GuideBlock) 다섯 성향. 성향을 두 바퀴 돈다.
//   근거(피터공): "먼저 어떻게 고객 성향을 확인하라는 건지 알려주고, 그 다음에 유형별 대응 방향."
//   ⚠️ 상담 화법(c.talk)·거절 대응(c.reject)·잘 맞는 부분(c.synergy)은 화면에서 뺐다.
//      데이터(talk_pool·reject_pool·gen.synergy)와 조립은 그대로 둔다 — 되돌릴 수 있게(§16-1·§17-3).
//   제목 색은 성향 이름까지만(항목 5) — inline color를 걷어내고 colorize에 맡긴다.

// 3장 — "○○ 성향 고객을 10분 만에 알아보는 방법". 옛 소제목이 제 장 제목을 되찾아 h3로 올라왔다.
function RecognizeBlock({ c }) {
  return (
    <div className="simhwa-customer is-recognize">
      <h3 className="simhwa-customer-title">
        {colorize(c.recognizeTitle, `rt-${c.type}`)}
      </h3>
      <Paras text={c.intro} className="simhwa-intro" />
    </div>
  );
}

// 4장 — "○○ 성향이 강한 고객과 보험 상담을 효과적으로 하는 방법" + 핵심 코칭.
//   장 제목이 곧 그 말이라 §16-9의 `CUSTOMER_GUIDE_TITLE` 소제목은 중복이 되어 없앴다(§17-2).
function GuideBlock({ c }) {
  return (
    <div className="simhwa-customer">
      <h3 className="simhwa-customer-title">
        {colorize(c.title, `ct-${c.type}`)}
      </h3>

      {c.guide && <Paras text={c.guide} />}

      {c.core && (
        <div className="simhwa-core">
          <IconHead>핵심 코칭</IconHead>
          <Paras text={c.core} />
        </div>
      )}
    </div>
  );
}

// row: supabase snake_case 응답 행. honorific(PA/TCR)은 스키마에 없어 파라미터로 보강(기본 PA).
export function SimhwaView({ row }) {
  const result = {
    scores: { CP: row.score_cp, NP: row.score_np, A: row.score_a, FC: row.score_fc, AC: row.score_ac },
    top1: row.top1,
    top2: row.top2,
    bottom: row.bottom,
    id: row.id,
    name: row.name || '',
    honorific: row.honorific || 'PA',
  };
  const r = buildSimhwa(result);
  const { name, honorificLabel, scores } = r.meta;
  const nameLabel = `${name} ${honorificLabel}`;
  const rf = r.referral;

  return (
    <div className="simhwa-container">
      {/* 표지 */}
      <div className="simhwa-cover">
        <h1 className="simhwa-cover-title">
          <span className="simhwa-cover-brand">MIND2ACTION</span> 성향별 심화코칭 리포트
        </h1>
        <div className="simhwa-cover-id">
          {(row.company || row.department) && (
            <span className="simhwa-cover-meta">{[row.company, row.department].filter(Boolean).join(' ')}</span>
          )}
          <span className="simhwa-cover-name">{nameLabel}</span>
        </div>
        {/* 입력 점수 요약(작게) */}
        <div className="simhwa-scoreline">
          {['CP', 'NP', 'A', 'FC', 'AC'].map(e => (
            <span key={e} className="simhwa-score-chip" style={{ color: EGO_COLORS[e] }}>
              {EGO_PLAIN[e]} <b>{scores[e]}</b>
            </span>
          ))}
        </div>

        {/* 평균 비교 레이더 (손소장 항목 7, 2026-07-30) — 결과화면 GroupRadar 재사용 */}
        <div className="simhwa-cover-radar">
          <GroupRadar scores={scores} groupAvg={BENCHMARK.scores} />
          {/* 2026-07-30(§17-1): 점선이 실측 평균 → 코칭이 필요 없는 구간의 상한(16)으로 바뀌었다.
              "평균" 하드코딩을 뺀다 — 16은 평균이 아니다. 문구는 benchmark.label이 온전히 정한다. */}
          <p className="simhwa-cover-radar-legend">
            <span className="simhwa-legend-mine">실선</span> {nameLabel}의 점수
            <span className="simhwa-legend-sep">·</span>
            <span className="simhwa-legend-avg">점선</span> {BENCHMARK.label}
          </p>
        </div>
      </div>

      {/* 1. 리포트의 목적 */}
      <Section num="1." title="리포트의 목적">
        <Paras text={r.purpose} />
      </Section>

      {/* 2. 상담 시 성향 점수별 에너지 발현 상태 (7/13 수정요청 #4) */}
      <Section num="2." title="상담 시 성향 점수별 에너지 발현 상태">
        {/* 2026-07-30(§17-5): 구간 라벨("14~16점")을 뺐다 — 내 점수가 든 구간일 뿐인데 정보처럼 보였다.
            대신 상태 한 줄(두 축 분리) + 0~20 막대에 안전구간 띠. */}
        {r.section2.energyStates.map(es => (
          <div className={`simhwa-energy is-${es.state}`} key={es.trait}>
            <h3 className="simhwa-energy-head" style={{ color: EGO_COLORS[es.trait] }}>
              <span className="simhwa-energy-name">{EGO_PLAIN[es.trait]} 성향</span>
            </h3>
            <ScoreBar
              score={es.score}
              max={es.max}
              safe={es.safe}
              color={EGO_COLORS[es.trait]}
            />
            <p className="simhwa-energy-state">{ENERGY_STATE_TEXT[es.state]}</p>
            <Paras text={es.text} className="simhwa-intro" />
          </div>
        ))}
      </Section>

      {/* 3. 고객 성향을 10분 만에 알아보는 방법 (2026-07-30 회의, §17-2) */}
      <Section num="3." title="고객 성향을 10분 만에 알아보는 방법">
        {r.customers.map(c => <RecognizeBlock key={c.type} c={c} />)}
      </Section>

      {/* 4. 고객 유형별 상담 코칭 (2026-07-30 회의로 3장에서 갈라져 나옴, §17-2) */}
      <Section num="4." title="고객 유형별 상담 코칭">
        {r.customers.map(c => <GuideBlock key={c.type} c={c} />)}
      </Section>

      {/* 5. 소개를 만드는 실천 전략 (손소장 항목 8로 개명, 2026-07-30 회의로 4→5장) */}
      <Section num="5." title="소개를 만드는 실천 전략">
        <Paras text={rf.intro} />
        {rf.strength && (
          <div className="simhwa-block"><Paras text={rf.strength} /></div>
        )}
        {rf.lowtrait && (
          <div className="simhwa-block"><Paras text={rf.lowtrait} /></div>
        )}
        <div className="simhwa-block">
          <IconHead>소개 요청 멘트</IconHead>
          <LineList items={rf.request} className="simhwa-talk" />
        </div>
        <div className="simhwa-block">
          <IconHead>소개를 만드는 고객관리 체크리스트</IconHead>
          <LineList items={rf.checklist} className="simhwa-checklist" variant="check" />
        </div>
        <div className="simhwa-block">
          <IconHead>감사 멘트</IconHead>
          <LineList items={rf.thanks} className="simhwa-talk" />
        </div>
        {rf.core && (
          <div className="simhwa-core">
            <IconHead>핵심 코칭</IconHead>
            <Paras text={rf.core} />
          </div>
        )}
        {rf.clover && (
          <div className="simhwa-clover">
            <Paras text={rf.clover} />
          </div>
        )}
      </Section>

      <div className="simhwa-footer-bar">
        <span>© 2026 MIND2ACTION</span>
        <span className="simhwa-footer-build">{typeof __BUILD_ID__ !== 'undefined' ? __BUILD_ID__ : ''}</span>
      </div>
    </div>
  );
}

export default function SimhwaReportPage() {
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

  if (loading) return <div className="report-loading">심화코칭 리포트 생성 중...</div>;
  if (error) return <div className="report-error">{error}</div>;
  if (!row) return null;

  return <SimhwaView row={row} />;
}
