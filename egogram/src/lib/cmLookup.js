import cmInsurance from '../data/cm_insurance.json';
import cmManager from '../data/cm_manager.json';
import cmCoach from '../data/cm_coach.json';
import { EGO_STATES, EGO_LABELS } from './scoreEngine';

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

function needsCoaching(ego, score) {
  if (['CP', 'NP', 'A'].includes(ego)) return score < 11 || score > 16;
  if (ego === 'FC') return score < 8 || score > 16;
  if (ego === 'AC') return score < 8 || score > 13;
  return false;
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

  const allNoCoaching = EGO_STATES.every(ego => !needsCoaching(ego, scores[ego]));

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
    cm4_3: allNoCoaching ? cm.cm4_3.all_no_coaching : cm.cm4_3.some_coaching,
    cm4_4: cm4_4_items,
    cm5: cm.cm5[top1top2bottom] || null,
    cm6: cm6val,
    cm7: cm7val,
    cm8: cm8val,
  };
}

export { EGO_STATES, EGO_LABELS, getScoreRange, needsCoaching };
