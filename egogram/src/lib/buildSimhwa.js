// buildSimhwa — M2A 성향별 심화코칭 리포트 조립 규칙엔진 (cmLookup 옆, 병렬 오버레이).
//   기존 성향리포트 엔진(scoreEngine)을 재사용하고, 심화 전용 데이터셋 3종을 조립한다.
//   [고정] simhwa_static / [규칙] simhwa_lowtrait / [생성] simhwa_gen(코덱스 v0.2 12조합).
//   SPEC: docs/simhwa/SPEC.md §5 (규칙 엔진). 강점키 규칙(AC 억제)=SPEC §1-B / 핸드오프 §3-B.
import staticData from '../data/simhwa_static.yaml';
import lowtraitData from '../data/simhwa_lowtrait.yaml';
import genData from '../data/simhwa_gen.yaml';
import energyData from '../data/simhwa_energy.yaml';
import { EGO_STATES } from './scoreEngine';

// 동점 우선순위 — scoreEngine.TIE_PRIORITY와 동일(A 최우선).
const TIE_PRIORITY = ['A', 'CP', 'NP', 'FC', 'AC'];
// 강점 조합키 후보 = 비-AC 4성향. AC는 강점으로 세우지 않는다(SPEC §1-B).
const NON_AC = ['CP', 'NP', 'A', 'FC'];
// ③~⑦ 고객유형 등장 순서(대장 §2-2 헤더). 유형 구분은 EGO_COLORS 색으로(이모지 미사용, SPEC §14).
const CUSTOMER_ORDER = ['CP', 'NP', 'A', 'FC', 'AC'];
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
  const energyStates = CUSTOMER_ORDER.map(trait => {
    const idx = energyBandIndex(scores[trait]);
    return {
      trait,
      score: scores[trait],
      band: (energyData.bands[idx] || {}).label || '',
      text: (energyData.energy[trait] || [])[idx] || '',
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
    title: tk(staticData.customer_title[type]),
    intro: tk(staticData.customer_intro[type]),                              // [고정] 도입부
    synergy: tk(g(gen.synergy, strengthKey, CUSTOMER_GENKEY[type])),         // G4 잘 맞는 부분
    talk: talkOf(type),                                                      // 상담 화법 [규칙]
    reject: lines(staticData.reject_pool[type]).map(tk),                     // 거절 대응 [규칙]
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
      clover: tk(g(gen.clover, strengthKey)),                    // G12 
    },
  };
}
