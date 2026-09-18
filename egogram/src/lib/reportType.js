// 직군 → 리포트 종류, 심화 대상 판정 — 한 곳에서 (SPEC simhwa §23-2).
//   관리자 표의 심화 버튼과 심화 일괄 출력이 같은 판정을 써야 한다. 따로 적으면 한쪽만 바뀐다.
//   직군 미상은 보험설계사로 본다(기존 관리자 표의 기본값 그대로).
export const JOB_TO_REPORT = {
  sales: '보험설계사',
  coach: '코치/멘토',
  sales_leader: '관리자',
  branch_manager: '관리자',
  training_leader: '관리자',
  division_head: '관리자',
  executive: '관리자',
};

export const reportTypeOf = (jobType) => JOB_TO_REPORT[jobType] || '보험설계사';

// 심화코칭은 보험설계사(sales) 전용 (SPEC §11 D5)
export const isSimhwaTarget = (jobType) => reportTypeOf(jobType) === '보험설계사';
