import cmInsurance from '../data/cm_insurance.yaml';
import cmManager from '../data/cm_manager.yaml';
import cmCoach from '../data/cm_coach.yaml';
import cm6Common from '../data/cm6_common_consultant.yaml';
import cmLlmSales from '../data/cm_llm_sales.yaml';
import { EGO_STATES, EGO_LABELS, SAFE_RANGES, roleFromJobType } from './scoreEngine';

const CM_DATA = {
  sales: cmInsurance,
  manager: cmManager,
  coach: cmCoach,
};

const JOB_TO_CM = {
  sales: 'sales',
  coach: 'coach',
  sales_leader: 'manager',
  branch_manager: 'manager',
  training_leader: 'manager',
  division_head: 'manager',
  executive: 'manager',
};

function getScoreRange(score) {
  if (score >= 17) return '17-20';
  if (score >= 14) return '14-16';
  if (score >= 11) return '11-13';
  if (score >= 8) return '8-10';
  return '0-7';
}

function needsCoaching(ego, score, jobType) {
  const role = roleFromJobType(jobType);
  const [low, high] = SAFE_RANGES[role]?.[ego] || [11, 16];
  return score < low || score > high;
}

function needsDetailedCoaching(ego, score) {
  if (ego === 'AC') return score >= 17;
  return score <= 7;
}

export function lookupReport(result, jobType) {
  const cmKey = JOB_TO_CM[jobType] || 'sales';
  const cm = CM_DATA[cmKey];
  if (!cm) return null;

  const { scores, top1, top2, bottom } = result;

  const cm1 = {};
  const cm2 = {};
  const cm4_1 = {};
  const cm4_2 = {};
  const cm4_4_items = [];

  for (const ego of EGO_STATES) {
    const range = getScoreRange(scores[ego]);
    cm1[ego] = cm.cm1[range]?.[ego] || '';
    cm2[ego] = cm.cm2[range]?.[ego] || '';
    cm4_1[ego] = cm.cm4_1[range]?.[ego] || '';
    cm4_2[ego] = cm.cm4_2[range]?.[ego] || '';

    if (needsDetailedCoaching(ego, scores[ego])) {
      cm4_4_items.push({ ego, ...cm.cm4_4[ego] });
    }
  }

  const allNoCoaching = EGO_STATES.every(ego => !needsCoaching(ego, scores[ego], jobType));

  const top1top2 = `${top1}_${top2}`;
  const top1top2bottom = `${top1}_${top2}_${bottom}`;

  const isInsurance = cmKey === 'sales';

  let cm6val = '';
  let cm7val = '';
  let cm8val = null;

  if (isInsurance) {
    cm6val = cm.cm6[top1top2] || '';
    cm7val = cm.cm7[top1top2bottom] || '';
    cm8val = cm.cm8[top1] || null;
  } else {
    cm7val = cm.cm7[top1top2bottom] || '';
    const cm8key = `${top1}_${bottom}`;
    cm8val = cm.cm8[cm8key] || null;
  }

  return {
    jobLabel: cm.job_label,
    name: '',
    isInsurance,
    cm1,
    cm2,
    cm3: cm.cm3[top1top2] || '',
    cm4_1,
    cm4_2,
    cm4_3: allNoCoaching ? cm.cm4_3.all_no_coaching : '',
    cm4_4: cm4_4_items,
    cm4_5: cm.cm4_5 || '',
    cm5: cm.cm5[top1top2bottom] || null,
    cm5_1: cm.cm5_1?.[top1top2bottom] || '',
    closing: cm.closing || '',
    cm6: cm6val,
    cm6_common: isInsurance ? (cm6Common?.items || []) : null,
    cm7: cm7val,
    cm8: cm8val,
  };
}

// ── v3 LLM 톤 리포트 ─────────────────────────────────────────────
// 기존 lookupReport 결과 위에, LLM 데이터셋(cm_llm_*.yaml)이 채운 칸만 덮어쓴다.
// 미추출 칸은 base(기존 cm) 그대로 fallback → 빈 화면 방지.
// 변주 배열은 응답 id 해시로 선택(결정론적: 같은 사람=같은 문장, 다른 사람=분산).
const CM_LLM_DATA = { sales: cmLlmSales };

function hashToIndex(id, n) {
  if (n <= 1) return 0;
  const s = String(id || '');
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h % n;
}

function pickVariant(value, id) {
  if (Array.isArray(value)) {
    if (value.length === 0) return '';
    return value[hashToIndex(id, value.length)];
  }
  return value;
}

export function lookupReportLLM(result, jobType) {
  const base = lookupReport(result, jobType);
  if (!base) return null;
  const cmKey = JOB_TO_CM[jobType] || 'sales';
  const llm = CM_LLM_DATA[cmKey];
  if (!llm) return base;

  const { scores, top1, top2, id } = result;
  const out = { ...base };

  // §1 성향분석 cm1 (ego × 점수구간) — LLM 톤 한 줄로 덮어쓰기
  if (llm.cm1) {
    const cm1 = { ...base.cm1 };
    for (const ego of EGO_STATES) {
      const range = getScoreRange(scores[ego]);
      const v = llm.cm1[range]?.[ego];
      if (v) cm1[ego] = pickVariant(v, id);
    }
    out.cm1 = cm1;
  }

  // §2 강점 cm3 (top1_top2 조합키) — 변주 풀에서 id로 선택
  if (llm.cm3) {
    const v = llm.cm3[`${top1}_${top2}`];
    if (v) out.cm3 = pickVariant(v, id);
  }

  return out;
}

export { EGO_STATES, EGO_LABELS, getScoreRange, needsCoaching };
