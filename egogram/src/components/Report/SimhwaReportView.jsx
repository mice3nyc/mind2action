import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { buildSimhwa } from '../../lib/buildSimhwa';

// ─────────────────────────────────────────────────────────────
// SimhwaReportView — M2A 성향별 심화코칭 리포트 9섹션 렌더러 (ReportViewV2 형제).
//   병렬 오버레이: 기존 성향리포트 엔진과 별개 데이터셋(simhwa_*.yaml)을 buildSimhwa로 조립.
//   룩: 🍀 샘플 md 계승 — 이모지 컬러 헤더(🔴🟠🔵🟢🟣 / 🌿💼🗣🚫📌🍀), 컴팩트 줄간격, A4 print.
//   SPEC: docs/simhwa/SPEC.md §6. 스타일: styles/praxi.css .simhwa-*.
// ─────────────────────────────────────────────────────────────

const EGO_COLORS = { CP: '#ef4444', NP: '#f59e0b', A: '#38bdf8', FC: '#10b981', AC: '#8b5cf6' };
const EGO_PLAIN = { CP: '기준·결단', NP: '배려·공감', A: '이성·판단', FC: '친화·표현', AC: '협조·조율' };

// 블록 문단(빈 줄 구분)을 <p>들로.
function Paras({ text, className }) {
  if (!text) return null;
  const paras = String(text).split(/\n\s*\n/).map(p => p.trim()).filter(Boolean);
  return paras.map((p, i) => <p key={i} className={className}>{p.replace(/\n/g, ' ')}</p>);
}

// 줄 배열을 개별 라인(<p>)으로 — 화법·멘트·체크리스트 등.
function LineList({ items, className }) {
  if (!items || items.length === 0) return null;
  return (
    <div className={className}>
      {items.map((line, i) => <p key={i} className="simhwa-line">{line}</p>)}
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

// 이모지 소제목 (🌿/🗣/🚫/📌/🍀 등).
function IconHead({ icon, children, tint }) {
  return (
    <h4 className="simhwa-icon-head" style={tint ? { color: tint } : undefined}>
      <span className="simhwa-icon">{icon}</span>{children}
    </h4>
  );
}

function CustomerBlock({ c, nameLabel }) {
  return (
    <div className="simhwa-customer">
      <h3 className="simhwa-customer-title" style={{ color: EGO_COLORS[c.type] }}>
        <span className="simhwa-icon">{c.emoji}</span>{c.title}
      </h3>
      <Paras text={c.intro} className="simhwa-intro" />

      {c.synergy && (
        <div className="simhwa-block">
          <IconHead icon="🌿" tint="#10b981">{nameLabel}과 잘 맞는 부분</IconHead>
          <Paras text={c.synergy} />
        </div>
      )}

      {c.talk.length > 0 && (
        <div className="simhwa-block">
          <IconHead icon="🗣">상담 화법</IconHead>
          <LineList items={c.talk} className="simhwa-talk" />
        </div>
      )}

      {c.reject.length > 0 && (
        <div className="simhwa-block">
          <IconHead icon="🚫">고객 거절 대응</IconHead>
          <LineList items={c.reject} className="simhwa-reject" />
        </div>
      )}

      {c.core && (
        <div className="simhwa-core">
          <IconHead icon="📌">핵심 코칭</IconHead>
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
      </div>

      {/* 1. 리포트의 목적 */}
      <Section num="1." title="리포트의 목적">
        <Paras text={r.purpose} />
      </Section>

      {/* 2. 상담 시 성향 점수별 에너지 발현 상태 (7/13 수정요청 #4) */}
      <Section num="2." title="상담 시 성향 점수별 에너지 발현 상태">
        {r.section2.energyStates.map(es => (
          <div className="simhwa-energy" key={es.trait}>
            <h3 className="simhwa-energy-head" style={{ color: EGO_COLORS[es.trait] }}>
              <span className="simhwa-energy-name">{es.trait}({EGO_PLAIN[es.trait]})</span>
              <span className="simhwa-energy-band">{es.band} · {es.score}점</span>
            </h3>
            <Paras text={es.text} className="simhwa-intro" />
          </div>
        ))}
      </Section>

      {/* 3. 다섯 고객유형별 상담코칭 */}
      <Section num="3." title="고객 유형별 상담 코칭">
        {r.customers.map(c => <CustomerBlock key={c.type} c={c} nameLabel={nameLabel} />)}
      </Section>

      {/* 4. 소개를 만드는 고객관리 */}
      <Section num="4." title="소개를 만드는 고객관리">
        <Paras text={rf.intro} />
        {rf.strength && (
          <div className="simhwa-block"><Paras text={rf.strength} /></div>
        )}
        {rf.lowtrait && (
          <div className="simhwa-block"><Paras text={rf.lowtrait} /></div>
        )}
        <div className="simhwa-block">
          <IconHead icon="🗣">소개 요청 멘트</IconHead>
          <LineList items={rf.request} className="simhwa-talk" />
        </div>
        <div className="simhwa-block">
          <IconHead icon="✔">고객관리 체크리스트</IconHead>
          <LineList items={rf.checklist} className="simhwa-checklist" />
        </div>
        <div className="simhwa-block">
          <IconHead icon="💌">감사 멘트</IconHead>
          <LineList items={rf.thanks} className="simhwa-talk" />
        </div>
        {rf.core && (
          <div className="simhwa-core">
            <IconHead icon="📌">핵심 코칭</IconHead>
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
