// 직군 → 리포트 종류, 심화 대상 판정 — 한 곳에서 (SPEC simhwa §23-2).
//   관리자 표의 심화 버튼과 심화 일괄 출력이 같은 판정을 써야 한다. 따로 적으면 한쪽만 바뀐다.
//   직군 미상은 보험설계사로 본다(기존 관리자 표의 기본값 그대로).
//   표 자체는 lib/edition의 역할 표 한 벌에서 (SPEC-org-edition §2).
import { JOB_TO_REPORT } from './edition';
export { JOB_TO_REPORT };

export const reportTypeOf = (jobType) => JOB_TO_REPORT[jobType] || '보험설계사';

// 심화코칭은 보험설계사(sales) 전용 (SPEC §11 D5)
export const isSimhwaTarget = (jobType) => reportTypeOf(jobType) === '보험설계사';
