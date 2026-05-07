import { supabase } from './supabase';

export async function saveResult(profile, result) {
  const row = {
    group_name: profile.group || '',
    name: profile.name,
    birth_date: profile.birthDate,
    career_months: profile.careerMonths,
    department: profile.department,
    job_type: profile.jobType,
    income_range: profile.incomeRange || '',
    recruit_count: profile.recruitCount || '',
    score_cp: result.scores.CP,
    score_np: result.scores.NP,
    score_a: result.scores.A,
    score_fc: result.scores.FC,
    score_ac: result.scores.AC,
    total: result.total,
    top1: result.top1,
    top2: result.top2,
    bottom: result.bottom,
    grades: result.grades,
  };

  const { error } = await supabase.from('responses').insert(row);
  if (error) console.error('Save failed:', error);
  return row;
}

export async function loadResults() {
  const { data, error } = await supabase
    .from('responses')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Load failed:', error);
    return [];
  }

  return (data || []).map(r => ({
    id: r.id,
    timestamp: r.created_at,
    group: r.group_name,
    name: r.name,
    birthDate: r.birth_date,
    careerMonths: r.career_months,
    department: r.department,
    jobType: r.job_type,
    incomeRange: r.income_range,
    recruitCount: r.recruit_count,
    scores: { CP: r.score_cp, NP: r.score_np, A: r.score_a, FC: r.score_fc, AC: r.score_ac },
    grades: r.grades,
    total: r.total,
    top1: r.top1,
    top2: r.top2,
    bottom: r.bottom,
  }));
}

export async function deleteResult(id) {
  const { error } = await supabase.from('responses').delete().eq('id', id);
  if (error) console.error('Delete failed:', error);
  return loadResults();
}

export async function clearResults() {
  const { error } = await supabase.from('responses').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  if (error) console.error('Clear failed:', error);
}
