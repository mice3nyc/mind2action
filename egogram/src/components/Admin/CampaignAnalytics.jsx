import { useMemo } from 'react';
import { EGO_LABELS } from '../../lib/scoreEngine';
import { EGO_ORDER, EGO_COLOR } from '../../lib/egoTerms';

// 캠페인 분석 페이지 (강사 사전 준비용) — 추가 모니터링 화면.
// 라이브 설문/리포트에 영향 없음. SPEC: docs/SPEC-analytics.md (v1, 2026-06-16).

const EGO_KEYS = EGO_ORDER;
const EGO_COLORS = EGO_COLOR;   // 용어 사전이 단일 출처
const JOB_LABELS = {
  sales: '고객 컨설팅 영업', coach: '신인 육성 코칭', sales_leader: '조직운영 리더',
  branch_manager: '지점장/지사장', training_leader: '교육팀장/지원팀장',
  division_head: '사업단장/부장', executive: '본부장',
};
const ROLE_OF = {
  sales: '컨설턴트', coach: '코치', sales_leader: '리더', branch_manager: '리더',
  training_leader: '리더', division_head: '리더', executive: '리더',
};
const INCOME_ORDER = ['under200', '200-400', '400-600', '600-800', '800-1000', '1000-1500', '1500-2000', 'over2000'];
const INCOME_LABELS = {
  under200: '200만 미만', '200-400': '200~400만', '400-600': '400~600만', '600-800': '600~800만',
  '800-1000': '800~1000만', '1000-1500': '1000~1500만', '1500-2000': '1500~2000만', over2000: '2000만 이상',
};

const mean = (arr) => (arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : 0);
const r1 = (x) => Math.round(x * 10) / 10;
const std = (arr) => {
  if (arr.length < 2) return 0;
  const m = mean(arr);
  return Math.sqrt(mean(arr.map((x) => (x - m) ** 2)));
};
function parseRecruit(text) {
  if (text == null || text === '') return null;
  const m = String(text).match(/\d+/);
  return m ? parseInt(m[0], 10) : null;
}
function avgScores(rows) {
  const a = {};
  EGO_KEYS.forEach((k) => { a[k] = mean(rows.map((r) => r.scores?.[k] ?? 0)); });
  return a;
}

function analyze(rows) {
  if (!rows.length) return null;
  const n = rows.length;
  const avg = avgScores(rows);
  const strongest = EGO_KEYS.reduce((a, b) => (avg[a] >= avg[b] ? a : b));
  const weakest = EGO_KEYS.reduce((a, b) => (avg[a] <= avg[b] ? a : b));
  const avgTotal = mean(rows.map((r) => r.total ?? 0));

  // 분포
  const top1Dist = {}, bottomDist = {}, comboDist = {};
  EGO_KEYS.forEach((k) => { top1Dist[k] = 0; bottomDist[k] = 0; });
  for (const r of rows) {
    if (r.top1) top1Dist[r.top1] = (top1Dist[r.top1] || 0) + 1;
    if (r.bottom) bottomDist[r.bottom] = (bottomDist[r.bottom] || 0) + 1;
    const combo = `${r.top1}+${r.top2}`;
    comboDist[combo] = (comboDist[combo] || 0) + 1;
  }
  const missingTypes = EGO_KEYS.filter((k) => !top1Dist[k]);
  const topCombos = Object.entries(comboDist).sort((a, b) => b[1] - a[1]);
  const mostBottom = EGO_KEYS.reduce((a, b) => (bottomDist[a] >= bottomDist[b] ? a : b));

  // 개인 점 (분포 스트립)
  const indiv = {};
  EGO_KEYS.forEach((k) => { indiv[k] = rows.map((r) => r.scores?.[k] ?? 0); });

  // 채움률
  const fill = {
    recruit: rows.filter((r) => parseRecruit(r.recruitCount) != null).length / n,
    income: rows.filter((r) => r.incomeRange && INCOME_ORDER.includes(r.incomeRange)).length / n,
    career: rows.filter((r) => typeof r.careerMonths === 'number' && r.careerMonths > 0).length / n,
  };

  // 직무 역할별 평균
  const byRole = {};
  for (const r of rows) {
    const role = ROLE_OF[r.jobType] || '기타';
    (byRole[role] = byRole[role] || []).push(r);
  }
  const roleProfiles = Object.entries(byRole)
    .map(([role, rs]) => ({ role, n: rs.length, avg: avgScores(rs) }))
    .sort((a, b) => b.n - a.n);

  // 경력 구간
  const careerBuckets = { 신입: [], 중견: [], 베테랑: [] };
  for (const r of rows) {
    const m = r.careerMonths;
    if (typeof m !== 'number' || m <= 0) continue;
    if (m <= 12) careerBuckets['신입'].push(r);
    else if (m <= 36) careerBuckets['중견'].push(r);
    else careerBuckets['베테랑'].push(r);
  }
  const careerProfiles = Object.entries(careerBuckets)
    .filter(([, rs]) => rs.length > 0)
    .map(([label, rs]) => ({ label, n: rs.length, avg: avgScores(rs) }));

  // 리크루팅 상위/하위 대조
  let recruitSplit = null;
  const withRecruit = rows.filter((r) => parseRecruit(r.recruitCount) != null)
    .map((r) => ({ ...r, _rec: parseRecruit(r.recruitCount) }));
  if (withRecruit.length >= 4) {
    const sorted = [...withRecruit].sort((a, b) => b._rec - a._rec);
    const half = Math.floor(sorted.length / 2);
    const high = sorted.slice(0, half);
    const low = sorted.slice(sorted.length - half);
    recruitSplit = {
      high: { n: high.length, avg: avgScores(high), label: `상위 (평균 ${r1(mean(high.map((x) => x._rec)))}건)` },
      low: { n: low.length, avg: avgScores(low), label: `하위 (평균 ${r1(mean(low.map((x) => x._rec)))}건)` },
    };
  }

  // 소득 상위/하위 대조
  let incomeSplit = null;
  const withIncome = rows.filter((r) => r.incomeRange && INCOME_ORDER.includes(r.incomeRange))
    .map((r) => ({ ...r, _inc: INCOME_ORDER.indexOf(r.incomeRange) }));
  if (withIncome.length >= 4) {
    const sorted = [...withIncome].sort((a, b) => b._inc - a._inc);
    const half = Math.floor(sorted.length / 2);
    const high = sorted.slice(0, half);
    const low = sorted.slice(sorted.length - half);
    incomeSplit = {
      high: { n: high.length, avg: avgScores(high), label: `상위 소득` },
      low: { n: low.length, avg: avgScores(low), label: `하위 소득` },
    };
  }

  // 발견 카드
  const withSpread = rows.map((r) => ({ r, sd: std(EGO_KEYS.map((k) => r.scores?.[k] ?? 0)) }));
  const balanced = withSpread.reduce((a, b) => (a.sd <= b.sd ? a : b));
  const extreme = withSpread.reduce((a, b) => (a.sd >= b.sd ? a : b));
  const rareCombo = topCombos.filter(([, c]) => c === 1).map(([k]) => k);

  return {
    n, avg, strongest, weakest, avgTotal, top1Dist, bottomDist, mostBottom,
    missingTypes, topCombos, indiv, fill, roleProfiles, careerProfiles,
    recruitSplit, incomeSplit, balanced, extreme, rareCombo,
  };
}

// ── 시각화 ──────────────────────────────────────────────

function Radar({ avg }) {
  const size = 220, cx = 110, cy = 110, R = 80;
  const pt = (i, v) => {
    const a = (Math.PI * 2 * i) / 5 - Math.PI / 2;
    const r = (v / 20) * R;
    return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
  };
  const axis = (i, mul = 1) => {
    const a = (Math.PI * 2 * i) / 5 - Math.PI / 2;
    return [cx + R * mul * Math.cos(a), cy + R * mul * Math.sin(a)];
  };
  const poly = EGO_KEYS.map((k, i) => pt(i, avg[k]).join(',')).join(' ');
  return (
    <svg width={size} height={size} style={{ display: 'block', margin: '0 auto' }}>
      {[0.25, 0.5, 0.75, 1].map((m) => (
        <polygon key={m}
          points={EGO_KEYS.map((_, i) => axis(i, m).join(',')).join(' ')}
          fill="none" stroke="#e5e5e5" strokeWidth="1" strokeDasharray="2 2" />
      ))}
      {EGO_KEYS.map((k, i) => {
        const [x, y] = axis(i);
        return <line key={k} x1={cx} y1={cy} x2={x} y2={y} stroke="#e5e5e5" strokeWidth="1" />;
      })}
      <polygon points={poly} fill="#0012de15" stroke="#0012de" strokeWidth="2" />
      {EGO_KEYS.map((k, i) => {
        const [px, py] = pt(i, avg[k]);
        return <circle key={k} cx={px} cy={py} r="3.5" fill={EGO_COLORS[k]} />;
      })}
      {EGO_KEYS.map((k, i) => {
        const [lx, ly] = axis(i, 1.18);
        return (
          <text key={k} x={lx} y={ly} textAnchor="middle" dominantBaseline="middle"
            fontSize="12" fontWeight="700" fill={EGO_COLORS[k]}>{k}</text>
        );
      })}
    </svg>
  );
}

function StripPlot({ ego, values, avg }) {
  const color = EGO_COLORS[ego];
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '7px 0' }}>
      <div style={{ width: 96, fontSize: 12, color: '#444', flexShrink: 0 }}>
        <b style={{ color }}>{ego}</b> {EGO_LABELS[ego]}
      </div>
      <div style={{ position: 'relative', flex: 1, height: 22, background: '#fafafa', border: '1px solid #eee', borderRadius: 4 }}>
        {values.map((v, i) => (
          <span key={i} style={{
            position: 'absolute', left: `${(v / 20) * 100}%`, top: '50%',
            width: 7, height: 7, marginLeft: -3.5, marginTop: -3.5,
            borderRadius: '50%', background: `${color}66`, transform: `translateY(${((i % 3) - 1) * 4}px)`,
          }} />
        ))}
        <span style={{
          position: 'absolute', left: `${(avg / 20) * 100}%`, top: -2, bottom: -2,
          width: 2, marginLeft: -1, background: color,
        }} />
      </div>
      <div style={{ width: 34, textAlign: 'right', fontSize: 13, fontWeight: 700, color, flexShrink: 0 }}>{r1(avg)}</div>
    </div>
  );
}

function DistBar({ dist, total, order = EGO_KEYS, colorMap }) {
  const max = Math.max(1, ...order.map((k) => dist[k] || 0));
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      {order.map((k) => {
        const c = dist[k] || 0;
        const color = colorMap ? colorMap(k) : EGO_COLORS[k] || '#888';
        return (
          <div key={k} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 96, fontSize: 12, color: '#444', flexShrink: 0 }}>
              <b style={{ color }}>{k}</b> {EGO_LABELS[k]}
            </div>
            <div style={{ flex: 1, height: 18, background: '#fafafa', borderRadius: 3 }}>
              <div style={{ width: `${(c / max) * 100}%`, height: '100%', background: `${color}cc`, borderRadius: 3, minWidth: c ? 3 : 0 }} />
            </div>
            <div style={{ width: 64, fontSize: 12, color: '#666', flexShrink: 0 }}>
              {c}명 {total ? `(${Math.round((c / total) * 100)}%)` : ''}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// 두 그룹 5축 평균 대조 (성과의 결)
function CompareRow({ groups }) {
  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
        <thead>
          <tr>
            <th style={thS}>그룹</th>
            <th style={thS}>N</th>
            {EGO_KEYS.map((k) => (
              <th key={k} style={{ ...thS, color: EGO_COLORS[k] }}>{k}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {groups.map((g, gi) => (
            <tr key={gi}>
              <td style={{ ...tdS, fontWeight: 600, textAlign: 'left' }}>{g.label}</td>
              <td style={tdS}>{g.n}{g.n < 5 ? ' ⚠' : ''}</td>
              {EGO_KEYS.map((k) => {
                // 그룹 간 최댓값 강조
                const vals = groups.map((x) => x.avg[k]);
                const isMax = groups.length > 1 && g.avg[k] === Math.max(...vals) && Math.max(...vals) !== Math.min(...vals);
                return (
                  <td key={k} style={{ ...tdS, fontWeight: isMax ? 800 : 400, color: isMax ? EGO_COLORS[k] : '#333', background: isMax ? `${EGO_COLORS[k]}12` : 'transparent' }}>
                    {r1(g.avg[k])}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const thS = { padding: '6px 8px', borderBottom: '1.5px solid #e5e5e5', fontSize: 12, color: '#888', fontWeight: 600, textAlign: 'center' };
const tdS = { padding: '6px 8px', borderBottom: '1px dotted #eee', textAlign: 'center' };

function Card({ title, hint, children }) {
  return (
    <div style={{ border: '1px dashed #d8d8d8', borderRadius: 10, padding: '18px 20px', background: '#fff' }}>
      <div style={{ marginBottom: 14 }}>
        <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: '#222' }}>{title}</h3>
        {hint && <p style={{ margin: '3px 0 0', fontSize: 12, color: '#999' }}>{hint}</p>}
      </div>
      {children}
    </div>
  );
}

// ── 메인 ────────────────────────────────────────────────

export default function CampaignAnalytics({ campaigns, results, campId, onCampId }) {
  // 응답 수 집계
  const countById = {};
  for (const r of results) if (r.campaignId) countById[r.campaignId] = (countById[r.campaignId] || 0) + 1;
  const options = campaigns
    .filter((c) => countById[c.id] > 0)
    .sort((a, b) => (countById[b.id] || 0) - (countById[a.id] || 0));

  // controlled: 캠페인 관리 화면에서 특정 캠페인 분석으로 진입 가능. 미지정이면 응답 최다 캠페인.
  const effectiveId = (campId && options.some((o) => o.id === campId)) ? campId : (options[0]?.id || '');
  const selected = campaigns.find((c) => c.id === effectiveId);
  const rows = useMemo(() => results.filter((r) => r.campaignId === effectiveId), [results, effectiveId]);
  const A = useMemo(() => analyze(rows), [rows]);

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18, flexWrap: 'wrap' }}>
        <label style={{ fontSize: 13, color: '#666', fontWeight: 600 }}>캠페인</label>
        <select className="form-input" style={{ minWidth: 240 }} value={effectiveId} onChange={(e) => onCampId(e.target.value)}>
          {options.length === 0 && <option value="">응답이 있는 캠페인 없음</option>}
          {options.map((c) => (
            <option key={c.id} value={c.id}>{c.client_name} ({countById[c.id]}명)</option>
          ))}
        </select>
        {selected && <span style={{ fontSize: 12, color: '#aaa' }}>{selected.target || ''}</span>}
      </div>

      {!A ? (
        <div className="admin-empty">이 캠페인에는 아직 응답이 없습니다.</div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* 1. 헤드라인 */}
          <div style={{ border: '1px solid #0012de', borderRadius: 10, padding: '20px 22px', background: '#fbfbff' }}>
            <p style={{ margin: 0, fontSize: 18, fontWeight: 700, color: '#1a1a2e', lineHeight: 1.5 }}>
              {A.n}명, 평균적으로 <span style={{ color: EGO_COLORS[A.strongest] }}>{EGO_LABELS[A.strongest]}({A.strongest})</span>이 강하고{' '}
              <span style={{ color: EGO_COLORS[A.weakest] }}>{EGO_LABELS[A.weakest]}({A.weakest})</span>이 약한 집단
            </p>
            <div style={{ display: 'flex', gap: 28, marginTop: 16, flexWrap: 'wrap' }}>
              <Stat label="참여 인원" value={`${A.n}명`} />
              <Stat label="평균 총점" value={r1(A.avgTotal)} sub="/ 100" />
              <Stat label="가장 강한 축" value={A.strongest} color={EGO_COLORS[A.strongest]} sub={EGO_LABELS[A.strongest]} />
              <Stat label="가장 약한 축" value={A.weakest} color={EGO_COLORS[A.weakest]} sub={EGO_LABELS[A.weakest]} />
            </div>
          </div>

          {/* 2. 집단 자아상태 */}
          <Card title="집단 자아상태" hint="평균 모양(레이더) + 평균 뒤의 다양성(개인 점). 점이 넓게 퍼지면 그 축은 사람마다 편차가 큰 것.">
            <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: 24, alignItems: 'center' }}>
              <Radar avg={A.avg} />
              <div>
                {EGO_KEYS.map((k) => (
                  <StripPlot key={k} ego={k} values={A.indiv[k]} avg={A.avg[k]} />
                ))}
              </div>
            </div>
          </Card>

          {/* 3. 유형 지도 */}
          <Card title="유형 지도" hint="누가 무슨 형(1순위 성향)인가. 이 집단의 캐릭터.">
            <DistBar dist={A.top1Dist} total={A.n} />
            <div style={{ marginTop: 16, display: 'flex', gap: 28, flexWrap: 'wrap' }}>
              <div>
                <div style={{ fontSize: 12, color: '#888', marginBottom: 6 }}>흔한 강점 조합 (1·2순위)</div>
                {A.topCombos.slice(0, 4).map(([combo, c]) => (
                  <div key={combo} style={{ fontSize: 13, color: '#444', marginBottom: 3 }}>
                    <b>{combo}</b> · {c}명
                  </div>
                ))}
              </div>
              <div>
                <div style={{ fontSize: 12, color: '#888', marginBottom: 6 }}>이 집단에 없는 1순위 유형</div>
                {A.missingTypes.length ? (
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                    {A.missingTypes.map((k) => (
                      <span key={k} style={{ fontSize: 12, padding: '3px 9px', borderRadius: 12, border: `1px dashed ${EGO_COLORS[k]}`, color: EGO_COLORS[k] }}>
                        {k} {EGO_LABELS[k]}
                      </span>
                    ))}
                  </div>
                ) : <div style={{ fontSize: 13, color: '#aaa' }}>다섯 유형이 모두 있음</div>}
              </div>
            </div>
          </Card>

          {/* 4. 공통 약점 */}
          <Card title="공통 약점" hint="가장 낮은 성향(bottom)의 분포. 강의에서 짚을 처방 포인트.">
            <div style={{ fontSize: 14, color: '#333', marginBottom: 14, padding: '10px 14px', background: `${EGO_COLORS[A.mostBottom]}10`, borderRadius: 6 }}>
              가장 많은 사람({A.bottomDist[A.mostBottom]}명)이 <b style={{ color: EGO_COLORS[A.mostBottom] }}>{EGO_LABELS[A.mostBottom]}({A.mostBottom})</b>을 최저 성향으로 가진다. 이 집단이 공통으로 약한 자리.
            </div>
            <DistBar dist={A.bottomDist} total={A.n} />
          </Card>

          {/* 5. 성과의 결 */}
          <Card title="성과의 결" hint="무엇이 성과와 함께 가는가. 인원이 적으면(⚠) 우연일 수 있으니 경향으로만 본다. 칸 강조 = 그룹 중 최댓값.">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              <div>
                <SubLabel>직무 역할별 자아상태</SubLabel>
                <CompareRow groups={A.roleProfiles.map((p) => ({ label: p.role, n: p.n, avg: p.avg }))} />
              </div>
              {A.recruitSplit ? (
                <div>
                  <SubLabel>리크루팅 성과 상위 대 하위</SubLabel>
                  <CompareRow groups={[
                    { label: A.recruitSplit.high.label, n: A.recruitSplit.high.n, avg: A.recruitSplit.high.avg },
                    { label: A.recruitSplit.low.label, n: A.recruitSplit.low.n, avg: A.recruitSplit.low.avg },
                  ]} />
                </div>
              ) : (
                <Muted>리크루팅 수 데이터가 부족해 상위/하위 대조를 건너뜀 (채움 {Math.round(A.fill.recruit * 100)}%).</Muted>
              )}
              {A.incomeSplit && (
                <div>
                  <SubLabel>소득 상위 대 하위</SubLabel>
                  <CompareRow groups={[
                    { label: A.incomeSplit.high.label, n: A.incomeSplit.high.n, avg: A.incomeSplit.high.avg },
                    { label: A.incomeSplit.low.label, n: A.incomeSplit.low.n, avg: A.incomeSplit.low.avg },
                  ]} />
                </div>
              )}
              {A.careerProfiles.length > 1 && (
                <div>
                  <SubLabel>경력 구간별 (신입 ≤1년 / 중견 1~3년 / 베테랑 3년+)</SubLabel>
                  <CompareRow groups={A.careerProfiles.map((p) => ({ label: p.label, n: p.n, avg: p.avg }))} />
                </div>
              )}
            </div>
          </Card>

          {/* 6. 발견 카드 */}
          <Card title="강의용 발견" hint="강의에서 바로 쓸 거리.">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12 }}>
              <Discovery title="가장 균형잡힌 사람" name={A.balanced.r.name}
                desc={`다섯 성향이 고르게(편차 ${r1(A.balanced.sd)}). 어느 역할에도 무난.`} />
              <Discovery title="가장 개성이 뚜렷한 사람" name={A.extreme.r.name}
                desc={`${EGO_LABELS[A.extreme.r.top1]}(${A.extreme.r.top1}) 강·${EGO_LABELS[A.extreme.r.bottom]}(${A.extreme.r.bottom}) 약. 편차 ${r1(A.extreme.sd)}.`} />
              <Discovery title="이 집단의 희귀 조합" name={A.rareCombo.length ? A.rareCombo.slice(0, 3).join(', ') : '없음'}
                desc={A.rareCombo.length ? '한 명뿐인 강점 조합. 강의에서 다양성의 예로.' : '조합이 몇 갈래로 모여 있음.'} />
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}

function Stat({ label, value, sub, color }) {
  return (
    <div>
      <div style={{ fontSize: 11, color: '#999', marginBottom: 3 }}>{label}</div>
      <div style={{ fontSize: 24, fontWeight: 800, color: color || '#1a1a2e', lineHeight: 1 }}>
        {value} {sub && <span style={{ fontSize: 12, fontWeight: 500, color: '#aaa' }}>{sub}</span>}
      </div>
    </div>
  );
}
function SubLabel({ children }) {
  return <div style={{ fontSize: 13, fontWeight: 700, color: '#555', marginBottom: 8 }}>{children}</div>;
}
function Muted({ children }) {
  return <div style={{ fontSize: 12, color: '#bbb', fontStyle: 'normal', padding: '4px 0' }}>{children}</div>;
}
function Discovery({ title, name, desc }) {
  return (
    <div style={{ border: '1px dotted #ddd', borderRadius: 8, padding: '12px 14px' }}>
      <div style={{ fontSize: 11, color: '#999', marginBottom: 4 }}>{title}</div>
      <div style={{ fontSize: 15, fontWeight: 700, color: '#222', marginBottom: 4 }}>{name || '-'}</div>
      <div style={{ fontSize: 12, color: '#777', lineHeight: 1.4 }}>{desc}</div>
    </div>
  );
}
