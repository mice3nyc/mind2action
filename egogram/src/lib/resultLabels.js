// 결과 테이블(AdminDashboard) + 배치 리포트(ReportBatchPage) 공용 — 직무/소득 라벨 + 정렬 로직.
// 두 곳에서 각자 정의하면 라벨이 어긋날 위험이 있어 한 곳으로 모음 (7/3).

export const JOB_LABELS = {
  sales: '고객 컨설팅 영업',
  coach: '신인 육성 코칭',
  sales_leader: '조직운영 리더',
  branch_manager: '지점장/지사장',
  training_leader: '교육팀장/지원팀장',
  division_head: '사업단장/부장',
  executive: '본부장',
};

export const INCOME_LABELS = {
  under200: '200만 미만',
  '200-400': '200~400만',
  '400-600': '400~600만',
  '600-800': '600~800만',
  '800-1000': '800~1000만',
  '1000-1500': '1000~1500만',
  '1500-2000': '1500~2000만',
  over2000: '2000만 이상',
};

// 소득 구간 실제 크기 순서 (사전순 아님 — 1000-1500이 200-400보다 커야 함)
export const INCOME_ORDER = ['under200', '200-400', '400-600', '600-800', '800-1000', '1000-1500', '1500-2000', 'over2000'];

const SORT_KEYS = ['department', 'jobType', 'incomeRange'];

export function isValidSortKey(key) {
  return SORT_KEYS.includes(key);
}

// AdminDashboard(loadResults 매핑 후, camelCase)와 ReportBatchPage(supabase raw row, snake_case)
// 양쪽에서 다 쓰이므로 두 네이밍을 모두 받는다.
function sortValue(r, key) {
  if (key === 'department') return r.department || '';
  if (key === 'jobType') {
    const jobType = r.jobType ?? r.job_type;
    return JOB_LABELS[jobType] || jobType || '';
  }
  if (key === 'incomeRange') return INCOME_ORDER.indexOf(r.incomeRange ?? r.income_range);
  return '';
}

// rows: 정렬할 배열 (department + jobType/job_type + incomeRange/income_range 필드 보유), sortConfig: { key, dir } | null
export function sortRows(rows, sortConfig) {
  if (!sortConfig || !isValidSortKey(sortConfig.key)) return rows;
  return rows.slice().sort((a, b) => {
    const va = sortValue(a, sortConfig.key);
    const vb = sortValue(b, sortConfig.key);
    const cmp = typeof va === 'number' && typeof vb === 'number'
      ? va - vb
      : String(va).localeCompare(String(vb), 'ko');
    return sortConfig.dir === 'asc' ? cmp : -cmp;
  });
}
