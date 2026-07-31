// buildSimhwa — M2A 성향별 심화코칭 리포트 조립 규칙엔진 (cmLookup 옆, 병렬 오버레이).
//   기존 성향리포트 엔진(scoreEngine)을 재사용하고, 심화 전용 데이터셋 3종을 조립한다.
//   [고정] simhwa_static / [규칙] simhwa_lowtrait / [생성] simhwa_gen(코덱스 v0.2 12조합).
//   SPEC: docs/simhwa/SPEC.md §5 (규칙 엔진). 강점키 규칙(AC 억제)=SPEC §1-B / 핸드오프 §3-B.
import staticData from '../data/simhwa_static.yaml';
import lowtraitData from '../data/simhwa_lowtrait.yaml';
import genData from '../data/simhwa_gen.yaml';
import energyData from '../data/simhwa_energy.yaml';
import { EGO_STATES } from './scoreEngine';
import { EGO_ORDER, TIE_PRIORITY, customerTitle, customerRecognizeTitle } from './egoTerms';

// 표지 평균 비교 기준값 (손소장 항목 7). 표본이 갱신될 값이라 용어 사전이 아니라 심화 데이터에 둔다.
export const BENCHMARK = staticData.benchmark;

// 강점 조합키 후보 = 비-AC 4성향. AC는 강점으로 세우지 않는다(SPEC §1-B).
const NON_AC = ['CP', 'NP', 'A', 'FC'];
// ③~⑦ 고객유형 등장 순서. 유형 구분은 색으로(이모지 미사용, SPEC §14).
const CUSTOMER_ORDER = EGO_ORDER;
// 생성 yaml synergy/core_customer의 고객유형 키(metadata.customer_keys).
const CUSTOMER_GENKEY = { CP: 'CP고객', NP: 'NP고객', A: 'A고객', FC: 'FC고객', AC: 'AC고객' };
// 저성향 판정 경계 — 0~10점이면 조율 대상(지침 §6).
const LOW_MAX = 10;

// 블록 스칼라 문자열을 줄 배열로 (빈 줄 제거).
function lines(block) {
  return block ? String(block).split('\n').map(s => s.trim()).filter(Boolean) : [];
}

// {이름}·{호칭} 전역 슬롯 치환. name="김정임", honorificLabel="님".
function tokens(text, name, honorificLabel) {
  if (typeof text !== 'string') return text;
  return text.replace(/\{이름\}/g, name).replace(/\{호칭\}/g, honorificLabel);
}

// ② 에너지 발현 — 점수구간 매핑(내림차순 min 경계). score>=min이면 그 구간(7/13 수정요청 #4).
function energyBandIndex(score) {
  const bands = energyData.bands || [];
  for (let i = 0; i < bands.length; i++) {
    if (score >= bands[i].min) return i;
  }
  return Math.max(0, bands.length - 1);
}

// ── 안전구간(코칭이 필요 없는 구간) — 심화코칭 전용 (SPEC §17-0, §18-1) ────────────
// 손소장 7/30 정리: CP·NP·A·FC 11~16 / AC 8~16.
// 2026-07-30 저녁 수정요청 항목 1·4: 손소장이 AC를 8~13으로 좁혔다(8~16도 손소장이 준 값이었다).
// ⚠️ scoreEngine.UNIFIED_RANGES(성향리포트 공용)는 CP·NP·A·FC=[11,20]이고 6/11 손소장 확정분이다.
//    거기를 16으로 내리면 CM4-2 17~20 칸이 CP=센티넬·NP/A/FC=빈칸이라 성향리포트에 빈 조율 카드가 나간다.
//    그래서 엔진을 건드리지 않고 심화 전용 상수로 둔다("여기서만 해줘", 피터공 2026-07-30).
export const SIMHWA_SAFE_RANGES = { CP: [11, 16], NP: [11, 16], A: [11, 16], FC: [11, 16], AC: [8, 13] };
export const SCORE_MAX = 20;

// 근접(③)으로 볼 폭 — 하한 아래 3점까지. CP류 8~10, AC 5~7.
const NEAR_SPAN = 3;

// 두 축(자동성 × 적정성)을 갈라 네 상태로 (SPEC §17-5).
// 옛 5단계 문구는 자동성 축 넷에 적정성 축 하나("매우 강하게"=과함)가 섞여 있어 혼돈이었다.
export function energyState(trait, score) {
  const [low, high] = SIMHWA_SAFE_RANGES[trait] || [11, 16];
  if (score > high) return 'over';
  if (score >= low) return 'ok';
  if (score >= low - NEAR_SPAN) return 'near';
  return 'low';
}

// 첫줄 상태 문장 — 다섯 성향 모두 구간 표 조회 (SPEC §19-1).
// 2026-07-31: AC만 표였던 것을 전부 표로 통일했다. 손소장이 안전구간 안을 둘로 갈라 달라고 했고
// (AC 8~10 vs 11~13, CP류 11~13 vs 14~16) 안전구간 전체가 energyState의 `ok` 하나라
// 계산으로는 재현할 수 없다. 요구한 경계가 energy.yaml bands 경계와 일치해 표로 합쳤다.
// 반환: { state, text }. state는 표가 정하고, CSS 상태 클래스(is-over 등)에 그대로 쓴다.
export function energyStatus(trait, score) {
  const table = (energyData.state_text_bands || {})[trait]
             || (energyData.state_text_bands || {}).common
             || [];
  const row = table[energyBandIndex(score)];
  if (row && row.text) return { state: row.state, text: row.text };
  // 표가 비면 계산 상태만이라도 넘긴다 — 조용히 빈 줄이 나가지 않게.
  return { state: energyState(trait, score), text: '' };
}

// 원문(손소장 verbatim) 첫 문장 = 옛 5단계 상태 선언. 새 상태 문구와 같은 말이라 표시에서만 뗀다.
// 25개(5성향×5구간) 전부 이 형태임을 확인했다. 안 걸리면 원문을 그대로 둔다 — 조용히 자르지 않는다.
const LEAD_STATE_RE = /^(?:매우 강하게|안정적으로|필요할 때|의식해야|노력해야)[^.]*발현[^.]*\.\s*/;

export function stripLeadState(text) {
  return typeof text === 'string' ? text.replace(LEAD_STATE_RE, '') : text;
}

// 본문 앞에 이름 붙이기 (SPEC §18-2, 손소장 7/30 항목 2). "OOO님은 책임감 있고…"
// 25칸 첫 문장을 전부 검사했고 주어가 생략된 서술문이라 접두가 문법을 깨지 않는다.
// 이름이 없으면(관리자 미리보기 등) 그대로 둔다. 호칭 뒤라 조사는 항상 '은'.
// 띄어쓰기는 리포트 관행을 따른다 — 다른 자리가 "{이름} {호칭}"("김정임 님의 점수")이라
// 여기만 붙여 쓰면 한 리포트 안에서 갈린다. 손소장 원문 "OOO님은"은 슬롯 표기로 본다.
export function prefixName(text, name, honorificLabel) {
  if (typeof text !== 'string' || !text || !name) return text;
  return `${name} ${honorificLabel}은 ${text}`;
}

// 강점 조합키 산출 (SPEC §1-B, AC 억제). 비-AC 4성향 중 점수 상위 2 → `top_second`.
//   AC가 원점수 1·2위여도 강점키에 들어가지 않는다. 유효 조합은 비-AC 순서쌍 12개뿐.
export function strengthKeyOf(scores) {
  const sorted = [...NON_AC].sort((a, b) =>
    scores[b] !== scores[a]
      ? scores[b] - scores[a]
      : TIE_PRIORITY.indexOf(a) - TIE_PRIORITY.indexOf(b)
  );
  return `${sorted[0]}_${sorted[1]}`;
}

// result = { scores{CP..AC}, top1, top2, bottom, id?, name?, honorific? }
//   honorific: 'PA' | 'TCR' (없으면 PA). D1: responses 스키마에 PA/TCR 필드 없음 → 파라미터로 보강.
export function buildSimhwa(result) {
  const { scores, top1, top2, bottom } = result;
  const name = result.name || '';
  const honorificLabel = '님';                // 7/13 수정요청 #1: PA님/TCR님 → 님
  const tk = (t) => tokens(t, name, honorificLabel);

  const strengthKey = strengthKeyOf(scores);
  const lowTraits = EGO_STATES.filter(e => scores[e] <= LOW_MAX);
  const isLowA = scores.A <= LOW_MAX;

  // ② 성향 점수별 에너지 발현 상태 — 5성향 각각 점수→구간→문장(7/13 수정요청 #4, CM2 시트).
  // 2026-07-30(§17-5): 구간 라벨(band)을 표시에서 뺐다 — "14~16점 · 14점"이 정보처럼 보이지만
  // 내 점수가 든 구간일 뿐이라 혼돈이었다. 대신 상태(state) + 안전구간(safe) + 만점(max)을 넘긴다.
  // 2026-07-30 저녁(§18-1·§18-2): AC 첫줄 문장은 구간 표에서 오고(state까지 표가 정한다),
  //   본문 앞에는 이름을 붙인다("OOO님은 책임감 있고…", 손소장 항목 2).
  const energyStates = CUSTOMER_ORDER.map(trait => {
    const idx = energyBandIndex(scores[trait]);
    const score = scores[trait];
    const status = energyStatus(trait, score);
    return {
      trait,
      score,
      max: SCORE_MAX,
      safe: SIMHWA_SAFE_RANGES[trait] || [11, 16],
      state: status.state,
      stateText: status.text,
      band: (energyData.bands[idx] || {}).label || '',   // 데이터 보존(렌더에선 안 씀)
      text: prefixName(stripLeadState((energyData.energy[trait] || [])[idx] || ''), name, honorificLabel),
    };
  });

  const gen = genData;
  // 생성 슬롯 fallback: 조합키·변주 누락 시 빈 문자열(렌더러가 스킵 → 빈 화면 방지, SPEC §5.2).
  const g = (obj, ...path) => {
    let cur = obj;
    for (const k of path) { if (cur == null) return ''; cur = cur[k]; }
    return cur || '';
  };

  // [규칙] 저성향 세트 — 낮은 트레잇마다 {label, menu[], mentions[]} (지침 §6).
  const lowMenus = lowTraits.map(trait => {
    const set = lowtraitData.low[trait] || {};
    return {
      trait,
      label: set.label || trait,
      menu: lines(set.menu),
      mentions: lines(set.mentions),
    };
  });

  //  화법 — 유형별 고정 풀 + 저-A 스왑(A 낮으면 CP·NP·FC 풀 마지막 줄을 '이유 강조'로 교체, 대장 §3).
  const talkOf = (type) => {
    const pool = lines(staticData.talk_pool[type]).map(tk);
    if (isLowA && (type === 'CP' || type === 'NP' || type === 'FC') && pool.length > 0) {
      return [...pool.slice(0, -1), lowtraitData.talk_swap.low_a_line];
    }
    return pool;
  };

  const customers = CUSTOMER_ORDER.map(type => ({
    type,
    title: customerTitle(type),                                              // 사전 틀로 조립(옛 이름 박제 방지)
    recognizeTitle: customerRecognizeTitle(type),                            // 소제목 — 옛 큰 제목이 내려온 자리
    intro: tk(staticData.customer_intro[type]),                              // [고정] 10분 만에 알아보는 방법(항목 6)
    guide: tk(staticData.customer_guide[type]),                              // [고정] 상담을 효과적으로 하는 방법(항목 3)
    synergy: tk(g(gen.synergy, strengthKey, CUSTOMER_GENKEY[type])),         // G4 잘 맞는 부분
    talk: talkOf(type),                                                      // 상담 화법 [규칙] — 2026-07-30 렌더에서 뺌(데이터 보존)
    reject: lines(staticData.reject_pool[type]).map(tk),                     // 거절 대응 [규칙] — 위와 같음
    core: tk(g(gen.core_customer, strengthKey, CUSTOMER_GENKEY[type])),      // G6 핵심 코칭
  }));

  return {
    meta: { strengthKey, top1, top2, bottom, lowTraits, name, honorificLabel, scores },

    // ① 목적 [고정]
    purpose: tk(staticData.purpose),

    // ② 상담 시 성향 점수별 에너지 발현 상태 (7/13 수정요청 #4 — 기존 강점·조율 대체)
    //   성향리포트와 중복이라 삭제, CM2 시트의 점수구간별 에너지 발현으로 교체.
    section2: {
      energyStates,                                              // 5성향 × 점수구간 조회
    },

    // ③~⑦ 다섯 고객유형별 상담코칭
    customers,

    // ⑧ 고객 거절 대응 심화
    rejectDeep: {
      intro: tk(staticData.reject_deep.intro),                    // [고정]
      diagnosis: tk(g(gen.reject_diagnosis, strengthKey, bottom)),// G7 강·약점 진단
      questions: lines(staticData.reject_deep.questions).map(tk), // [고정] 질문 3
      empathy: lines(staticData.reject_deep.empathy).map(tk),     // [고정] 공감 3
      direction: lines(staticData.reject_deep.direction).map(tk), // [고정] 방향 3
      // [규칙] 저성향 삽입 — A 낮음→이유설명, AC 낮음→확인질문(대장 블록#16).
      lowInserts: lowMenus.filter(m => m.trait === 'A' || m.trait === 'AC'),
      core: tk(g(gen.core_reject, strengthKey, bottom)),          // G8 
    },

    // ⑨ 소개를 만드는 고객관리
    referral: {
      intro: tk(staticData.referral.intro),                      // [고정]
      strength: tk(g(gen.referral_strength, strengthKey)),       // G9 강점 문단
      lowtrait: tk(g(gen.referral_lowtrait, bottom)),            // G10 저성향 보완
      request: lines(staticData.referral.request).map(tk),       // [고정] 요청 멘트 3
      checklist: lines(staticData.referral.checklist),           // [고정] 체크리스트 6
      thanks: lines(staticData.referral.thanks).map(tk),         // [고정] 감사 멘트 2
      core: tk(g(gen.core_referral, strengthKey, bottom)),       // G11 
      clover: tk(gen.clover || ''),                              // [고정] 마무리 코칭 (§19-2)
      //   2026-07-31: 조합키 12문장(G12 생성 슬롯) → 공통 한 문단. 옛 12문장은 gen.clover_retired
    },
  };
}
