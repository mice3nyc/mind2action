const STORAGE_KEY = 'm2a_egogram_results';

export function saveResult(profile, result) {
  const existing = loadResults();
  const entry = {
    id: crypto.randomUUID(),
    timestamp: new Date().toISOString(),
    group: profile.group || '',
    name: profile.name,
    birthDate: profile.birthDate,
    careerMonths: profile.careerMonths,
    department: profile.department,
    jobType: profile.jobType,
    incomeRange: profile.incomeRange || '',
    recruitCount: profile.recruitCount || '',
    ...result,
  };
  existing.push(entry);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
  return entry;
}

export function loadResults() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
}

export function clearResults() {
  localStorage.removeItem(STORAGE_KEY);
}

export function deleteResult(id) {
  const results = loadResults().filter(r => r.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(results));
  return results;
}
