---
created: 2026-06-04
author: 아리공
tags:
  - mind2action
  - 에고그램
  - SPEC
---

# DATA-IMPORT — 외부 설문 CSV → M2A 일괄 적재 (SPEC + 절차)

> 선문후코 문서. 손소장 구글폼 등 외부에서 받은 설문 응답을 supabase `responses`에 캠페인 단위로 적재해, **실제 설문 응답과 같은 collection**에서 집계·리포트하게 한다. 첫 적용: [[요청.26.0604.2154-손소장데이터적재]] (DB손해보험_260320, 112명).
> 코드: `_dev/mind2action/scripts/import_survey_csv.py` · 관련: [[SPEC]](§5 라우팅) · [[CAMPAIGNS]](캠페인/responses 스키마) · scoreEngine.js(점수 로직)

## 1. 목적과 원칙

- 외부 설문(구글폼 CSV)을 운영 DB에 넣어 **앞으로의 실제 응답과 함께** 관리화면·리포트·일괄 PDF에서 다룬다.
- **점수는 받은 집계값을 신뢰**(재계산 안 함). `top1/top2/bottom`·`grades`만 우리 로직으로 채운다.
- **마치 설문받은 것처럼**: `campaign_id` 부여 + 원본 타임스탬프 보존 → 신규 응답과 구분 없이 collection 편입.
- 직군 매핑처럼 **추측이 위험한 결정은 피터공/손소장 확인**(리포트 종류가 갈리므로).

## 2. 입력 CSV 포맷 (구글폼 기준 가정)

64컬럼. 인덱스(0-base):

| idx | 내용 | → responses |
|-----|------|-------------|
| 0 | 타임스탬프 "2026. 3. 26 오후 3:44:01" | created_at (파싱) |
| 1 | 이름 | name |
| 2 | 생년월일 8자리 | birth_date |
| 3 | 경력 "178개월" | career_months (숫자만) |
| 4 | 소속 "DB손해보험 광주서부지점 1팀" | company + department (분리) |
| 5 | 직무 (자유텍스트) | job_type (매핑표) |
| 6 | 직전 3개월 소득 | income_range (근사 매핑) |
| 7 | 신인 도입 수 | (미사용 — 리쿠르팅 필드 폐지) |
| 8~57 | 설문 50문항 ("그렇다/그렇지 않다") | (점수 재계산 안 하므로 미사용) |
| 58~62 | 점수 CP·NP·A·FC·AC | score_cp~ac |
| 63 | 점수합 | total |

> 컬럼 구조가 다른 CSV가 오면 인덱스 상수를 먼저 맞춘다. 헤더 마지막 6컬럼이 `CP,NP,A,FC,AC,점수합`인지 확인.

## 3. 변환 규칙

- **점수**: CSV col58~63 그대로. `total != sum(5점수)`면 경고 출력(전건 일치 확인).
- **top1/top2/bottom**: scoreEngine 재현. 내림차순(top)·오름차순(bottom), 동점 시 `TIE_PRIORITY = [CP, A, NP, AC, FC]` 인덱스 작은 쪽 우선.
- **grades**: ego별 `getGrade` (17+ 극고 / 14+ 고 / 11+ 중 / 8+ 저 / else 극저).
- **company / department**: 회사는 `DB손해보험`으로 통일(표기 흔들림 "디비손해보험/DB손보/Db손해보헌" 등 정규화). 소속 앞 회사명 패턴을 떼고 남은 것이 department. 회사명 없으면 소속 전체를 department.
- **job_type** (직무 텍스트 → 설문 직군 코드). 설문 직군은 3종:
  - `sales` = 고객 컨설팅 영업 = **컨설턴트** ← 영업·설계사·팀원·신입
  - `sales_leader` = 조직운영 리더 = **리더** ← 영업팀장·센터장·팀장·교육팀장·매니저 (+오타)
  - `coach` = 신인 육성 코칭 = **코치** ← 멘토·육성멘토
  - 매핑 불명(TCR·PA·빈값)은 임시 `sales` + 리포트에 별도 표시 후 확인. job_type만 고치면 리포트 즉시 반영.
- **income_range**: 코드값 `under200 / 200-400 / 400-600 / 600-800 / 800-1000 / 1000-1500 / 1500-2000 / over2000`. 구글폼이 "이상" 표기면 하한 기준 근사. 리포트엔 무관(점수만 리포트), admin 보조표시용.
- **career_months**: 숫자만 추출(admin이 `{값}개월`로 표시).
- **recruit_count**: 빈값(리쿠르팅 필드 폐지 방침, 회의 26.0604).

## 4. 캠페인

한 적재 = 한 캠페인(`campaigns` 1건) + 응답 N건(`campaign_id` 부여 + `group_name = client_name`).
- `client_name`: 예 "DB손해보험_260320"
- `code`: unique(설문 진입 ?g=). 일회성 데이터면 임의 고정값.
- `status`: 이미 받은 과거 데이터는 `closed`.
- `expected_count`: 실제 인원(진행률 표시 기준).

## 5. 적재 절차

1. `scripts/import_survey_csv.py` 상단 상수 수정 — `CSV_FILE` · `CLIENT` · `CODE` · `MEMO`.
2. (CSV 구조 다르면) 컬럼 인덱스·매핑표 확인.
3. `python3 import_survey_csv.py` → `import_<client>.sql` 생성 + 리포트 출력(직군 분포·애매 항목·점수합 일치·검증 샘플 3명).
4. **검증**(필수, 세션406 교훈): 점수합 전건 일치 확인 + 샘플 몇 명 CSV원본↔SQL 수기 대조(top/bottom·소속 분리·직군).
5. **Supabase SQL Editor에서 실행**(피터공). 생성 SQL은 `begin/commit` 트랜잭션 — 실패 시 자동 롤백.
   - ⚠️ **권한**: `campaigns` insert는 RLS상 authenticated 전용. anon 키(클라이언트 `.env`)로는 불가 → **SQL Editor(service role) 필수**. 로컬 스크립트가 직접 DB에 넣지 못하는 이유.
6. 실행 후 관리화면 캠페인 탭에서 캠페인·인원 확인.

## 6. 재사용·확장 메모

- 다음 손소장 데이터: 상수만 바꿔 재실행. 직군/소득 매핑표는 같은 폼이면 그대로.
- 직군 애매값(TCR/PA 등)은 손소장 확인 후 `JOB_MAP`에 확정 매핑 추가.
- 신규 응답은 설문 폼이 직접 `responses`에 쌓으므로 이 절차와 무관 — 외부 일괄 데이터에만 사용.

## 7. 변경 이력

| 날짜 | 내용 |
|------|------|
| 26.0604 | 신설 + 첫 적용 DB손해보험_260320(112명). `import_survey_csv.py` 작성. 직군 리더55·컨설턴트48·코치9, 애매10(TCR·PA·".") 임시 sales |
