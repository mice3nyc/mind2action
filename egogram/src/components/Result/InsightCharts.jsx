import { getSuccessRange } from '../../lib/scoreEngine';
import { EGO_ORDER, EGO_COLOR, EGO_LABEL } from '../../lib/egoTerms';

// 결과 화면 인사이트 팝업용 시각화 (검토 프로토타입, 26.0616).
//   - MyRadar: 개인 5축 펜타곤 레이더 ('내 성향의 모양') + 조율 불필요 구간 가이드 밴드
//   - GroupCompare: 개인 vs 그룹 평균 오버레이 레이더 + 축별 차이 막대 ('전체 속 내 위치')
// 라이브 리포트/설문 점수 로직엔 영향 없음. 색·라벨은 용어 사전(data/ego_terms.yaml)에서 온다.

const EGO_KEYS = EGO_ORDER;
const EGO_COLORS = EGO_COLOR;
const EGO_PLAIN_LABEL = EGO_LABEL;
const ACCENT = '#0012de'; // 개인 점수 강조색 (분석 레이더와 동일 톤)
const MAX = 20;
// 심화 표지 전용 (SPEC §20). 셋 다 코드베이스에 이미 있던 값을 가져온 것이다 — 새로 정하지 않았다.
const AVG_LINE = '#9aa0a6';      // 평균 점선 = GroupRadar 그룹 평균과 같은 회색
// 링 색 (§20-4): 처음엔 테두리·막대용 어두운 값(#2f7d54·#b4231f)을 재활용했는데 탁했다.
//   얇은 획 하나로 쓰는 자리라 같은 계열이라도 더 밝고 채도가 높아야 한다.
//   성향 점 색(CP #ef4444 · FC #10b981)과 계열이 겹치지만 둘 다 그보다 채도가 높아 앞으로 나온다.
const DOT_RING_OK = '#00c853';   // 칭찬(ok)
const DOT_RING_COACH = '#ff1744';// 코칭 필요(over/near/low)

// 펜타곤 좌표 계산기 — 위 꼭짓점(-90도)에서 시계방향.
function makeGeo(size, R) {
  const cx = size / 2, cy = size / 2;
  const angle = (i) => (Math.PI * 2 * i) / 5 - Math.PI / 2;
  const pt = (i, v) => {
    const r = (v / MAX) * R, a = angle(i);
    return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
  };
  const axisEnd = (i, mul = 1) => {
    const a = angle(i);
    return [cx + R * mul * Math.cos(a), cy + R * mul * Math.sin(a)];
  };
  return { cx, cy, pt, axisEnd };
}

const polyStr = (scores, geo) => EGO_KEYS.map((k, i) => geo.pt(i, scores[k]).join(',')).join(' ');

// 그리드(동심 펜타곤 + 축선)
function Grid({ geo }) {
  return (
    <>
      {[0.25, 0.5, 0.75, 1].map((m) => (
        <polygon key={m}
          points={EGO_KEYS.map((_, i) => geo.axisEnd(i, m).join(',')).join(' ')}
          fill="none" stroke="#e8e8e8" strokeWidth="1" strokeDasharray="2 3" />
      ))}
      {EGO_KEYS.map((k, i) => {
        const [x, y] = geo.axisEnd(i);
        return <line key={k} x1={geo.cx} y1={geo.cy} x2={x} y2={y} stroke="#ececec" strokeWidth="1" />;
      })}
    </>
  );
}

// 축 라벨 (평이 라벨 + 점수)
function AxisLabels({ geo, scores }) {
  return EGO_KEYS.map((k, i) => {
    const [lx, ly] = geo.axisEnd(i, 1.26);
    return (
      <text key={k} x={lx} y={ly} textAnchor="middle" dominantBaseline="middle"
        fontSize="12" fontWeight="700" fill={EGO_COLORS[k]}>
        <tspan x={lx} dy="-0.35em">{EGO_PLAIN_LABEL[k]}</tspan>
        {scores && <tspan x={lx} dy="1.25em" fontSize="11" fill="#888">{scores[k]}</tspan>}
      </text>
    );
  });
}

// ── 내 성향의 모양 ───────────────────────────────────────────
export function MyRadar({ scores, jobType }) {
  const size = 300, R = 92;
  const geo = makeGeo(size, R);

  // 조율 불필요(정상) 구간을 밴드로 — 직무별 [low, high]. 바깥(high)−안쪽(low) 링.
  const lowScores = {}, highScores = {};
  EGO_KEYS.forEach((k) => {
    const [lo, hi] = getSuccessRange(k, jobType);
    lowScores[k] = lo; highScores[k] = hi;
  });
  const bandPath = `M${polyStr(highScores, geo).replace(/ /g, 'L')}Z M${polyStr(lowScores, geo).replace(/ /g, 'L')}Z`;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ display: 'block', margin: '0 auto', maxWidth: '100%' }}>
      <Grid geo={geo} />
      <path d={bandPath} fillRule="evenodd" fill="#10b98114" stroke="none" />
      <polygon points={polyStr(scores, geo)} fill={`${ACCENT}1f`} stroke={ACCENT} strokeWidth="2.5" strokeLinejoin="round" />
      {EGO_KEYS.map((k, i) => {
        const [px, py] = geo.pt(i, scores[k]);
        return <circle key={k} cx={px} cy={py} r="4" fill={EGO_COLORS[k]} stroke="#fff" strokeWidth="1.5" />;
      })}
      <AxisLabels geo={geo} scores={scores} />
    </svg>
  );
}

// ── 심화코칭 표지: 안전구간 띠 레이더 (SPEC §18-4) ──────────────
// 손소장 7/30 항목 4·5: 표지 레이더에 "코칭이 필요 없는 구간"을 초록으로 구분.
//   상한선 하나가 아니라 하한~상한 구간 띠라서 GroupRadar의 점선으로는 표현할 수 없다.
// ⚠️ GroupRadar를 고치지 않고 새로 만든 이유: GroupRadar는 결과화면 인사이트 팝업
//   (ResultInsightModal)이 같이 쓴다. 공용 컴포넌트를 고치면 안 바꾸기로 한 화면까지 바뀐다
//   (Manifesto 2026-07-29 교훈). 띠 방식 자체는 위 MyRadar가 이미 쓰는 정본을 이식했다.
// MyRadar와 다른 점: 구간을 getSuccessRange(엔진 UNIFIED_RANGES)에서 얻지 않고
//   safeRanges 파라미터로 받는다 — 심화는 SIMHWA_SAFE_RANGES를 쓴다(성향리포트와 값이 다르다).
// 2026-07-31(SPEC §20): avgScores(평균 점선) + dotStates(점 상태 링) 두 파라미터를 더했다.
//   둘 다 안 넘기면 7/30 그림 그대로다 — 기본 동작을 보존한다.
export function SafeBandRadar({ scores, safeRanges, avgScores, dotStates }) {
  const size = 300, R = 92;
  const geo = makeGeo(size, R);

  const lowScores = {}, highScores = {};
  EGO_KEYS.forEach((k) => {
    const [lo, hi] = safeRanges[k] || [11, 16];
    lowScores[k] = lo; highScores[k] = hi;
  });
  // 바깥(상한) 다각형에서 안쪽(하한) 다각형을 빼 링을 만든다.
  const bandPath = `M${polyStr(highScores, geo).replace(/ /g, 'L')}Z M${polyStr(lowScores, geo).replace(/ /g, 'L')}Z`;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ display: 'block', margin: '0 auto', maxWidth: '100%' }}>
      <Grid geo={geo} />
      <path d={bandPath} fillRule="evenodd" fill="#10b98114" stroke="none" />
      {/* 평균 점선 (SPEC §20-1) — 색은 GroupRadar의 그룹 평균과 같은 회색. 같은 뜻에 같은 색.
          7/30의 "상한 점선"은 여기서 뺐다: 초록 띠 바깥 경계가 곧 상한이라 중복이고,
          점선 두 개가 서로 다른 뜻(상한/평균)을 갖게 되면 범례로도 못 푼다. */}
      {avgScores && (
        <polygon points={polyStr(avgScores, geo)} fill="none" stroke={AVG_LINE} strokeWidth="2"
          strokeDasharray="5 4" strokeLinejoin="round" />
      )}
      <polygon points={polyStr(scores, geo)} fill={`${ACCENT}1f`} stroke={ACCENT} strokeWidth="2.5" strokeLinejoin="round" />
      {EGO_KEYS.map((k, i) => {
        const [px, py] = geo.pt(i, scores[k]);
        // 상태 링 (SPEC §20-2) — 2장 에너지 발현 상태를 표지 점으로 올린다.
        //   판정은 energyStatus()가 이미 한 것을 받아 쓴다(여기서 다시 계산하면 두 벌이 된다).
        //   §20-4: 점 바깥 끝 4.0(흰 테두리 뺀 값) + 간격 2.0 + 선폭 2.2의 절반 1.1 → r=7.1.
        const st = dotStates && dotStates[k];
        const ring = st ? (st === 'ok' ? DOT_RING_OK : DOT_RING_COACH) : null;
        return (
          <g key={k}>
            {ring && <circle cx={px} cy={py} r="7.1" fill="none" stroke={ring} strokeWidth="2.2" />}
            {/* §20-4: 흰 테두리를 뺐다 — 점 둘레를 파먹어 파랑 실선이 점에 닿기 전에 끊겨 보였다.
                점을 실선보다 나중에 그리므로 선이 점까지 이어지고 점이 그 위에 얹힌다. */}
            <circle cx={px} cy={py} r="4" fill={EGO_COLORS[k]} />
          </g>
        );
      })}
      {/* ⚠️ scores를 넘기지 않는다 — 축 라벨에 점수가 붙으면 표지 점수 칩과 중복된다.
          MyRadar(결과화면)는 넘기지만 심화 표지는 위에 이미 칩이 있다. */}
      <AxisLabels geo={geo} />
    </svg>
  );
}

// ── 전체 속 내 위치: 오버레이 레이더 ──────────────────────────
export function GroupRadar({ scores, groupAvg }) {
  const size = 300, R = 92;
  const geo = makeGeo(size, R);
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ display: 'block', margin: '0 auto', maxWidth: '100%' }}>
      <Grid geo={geo} />
      {/* 그룹 평균 — 점선 회색, 채움 없음 */}
      <polygon points={polyStr(groupAvg, geo)} fill="none" stroke="#9aa0a6" strokeWidth="2" strokeDasharray="5 4" strokeLinejoin="round" />
      {/* 나 — 강조색 채움 */}
      <polygon points={polyStr(scores, geo)} fill={`${ACCENT}1f`} stroke={ACCENT} strokeWidth="2.5" strokeLinejoin="round" />
      {EGO_KEYS.map((k, i) => {
        const [px, py] = geo.pt(i, scores[k]);
        return <circle key={k} cx={px} cy={py} r="4" fill={EGO_COLORS[k]} stroke="#fff" strokeWidth="1.5" />;
      })}
      <AxisLabels geo={geo} />
    </svg>
  );
}

// ── 전체 속 내 위치: 축별 차이 막대 ──────────────────────────
export function DiffBars({ scores, groupAvg }) {
  return (
    <div style={{ marginTop: 4 }}>
      {EGO_KEYS.map((k) => {
        const me = scores[k];
        const avg = groupAvg[k];
        const diff = Math.round((me - avg) * 10) / 10;
        const sign = diff > 0 ? '+' : '';
        const diffColor = diff > 0 ? '#0a7d33' : diff < 0 ? '#b4231f' : '#999';
        return (
          <div key={k} style={{ margin: '11px 0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 4 }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: EGO_COLORS[k] }}>{EGO_PLAIN_LABEL[k]}</span>
              <span style={{ fontSize: 12, color: '#555' }}>
                나 <b style={{ color: EGO_COLORS[k] }}>{me}</b>
                <span style={{ color: '#bbb' }}> · 평균 {Math.round(avg * 10) / 10}</span>
                <b style={{ color: diffColor, marginLeft: 6 }}>{diff === 0 ? '평균' : `${sign}${diff}`}</b>
              </span>
            </div>
            <div style={{ position: 'relative', height: 14, background: '#f4f4f4', borderRadius: 7 }}>
              {/* 내 막대 */}
              <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: `${(me / MAX) * 100}%`, background: EGO_COLORS[k], borderRadius: 7, opacity: 0.85 }} />
              {/* 그룹 평균 눈금 */}
              <div style={{ position: 'absolute', left: `${(avg / MAX) * 100}%`, top: -3, bottom: -3, width: 2, marginLeft: -1, background: '#444' }} />
            </div>
          </div>
        );
      })}
      <div style={{ display: 'flex', gap: 14, marginTop: 12, fontSize: 11, color: '#888' }}>
        <span><span style={{ display: 'inline-block', width: 14, height: 8, background: '#bbb', borderRadius: 4, verticalAlign: 'middle', marginRight: 4 }} />막대 = 내 점수</span>
        <span><span style={{ display: 'inline-block', width: 2, height: 12, background: '#444', verticalAlign: 'middle', marginRight: 4 }} />세로선 = 그룹 평균</span>
      </div>
    </div>
  );
}

// 그룹 평균 대비 두드러진 차이 한 줄 요약 (위로 가장 큰 것 + 아래로 가장 큰 것)
export function diffHeadline(scores, groupAvg) {
  const diffs = EGO_KEYS.map((k) => ({ k, d: scores[k] - groupAvg[k] }));
  const up = [...diffs].sort((a, b) => b.d - a.d)[0];
  const down = [...diffs].sort((a, b) => a.d - b.d)[0];
  const high = up.d >= 1.5 ? EGO_PLAIN_LABEL[up.k] : null;
  const low = down.d <= -1.5 ? EGO_PLAIN_LABEL[down.k] : null;
  // 다섯 평이 라벨은 모두 받침으로 끝남 → 조사는 항상 '이'/'은'
  if (high && low) return `그룹 평균보다 ${high}이 높고, ${low}은 낮은 편입니다.`;
  if (high) return `그룹 평균보다 ${high} 성향이 두드러집니다.`;
  if (low) return `그룹 평균보다 ${low} 성향이 낮은 편입니다.`;
  return '그룹 평균과 전반적으로 비슷한 분포입니다.';
}

export { EGO_COLORS, EGO_PLAIN_LABEL };
