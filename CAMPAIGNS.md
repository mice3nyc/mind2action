# SPEC — 고객사별 설문 캠페인 시스템 (mind2action 에고그램)

> 작성: 아리공, 2026-05-31 · 상태: **Phase 1 + UI 조정 라이브 (5/31)**. Phase 2 진행 — 참여기간 자동 차단(`80400ad`) + 캠페인 수정 기능(`4c299f6`) 라이브. 남음: 진행상황 대시보드 / 일괄 PDF
> 요청 배경: 단일 설문 → 고객사별 설문 캠페인 플랫폼. 설문 생성·링크 카피·고객사별 결과·진행상황/기간/교육일 관리.
> 결정 (5/31, 피터공): ① 1차 = MVP ② 링크 코드 = 짧은 랜덤 ③ 진입 = 링크 전용 + 랜덤 코드 + 상태 게이팅 (타이핑 코드 중복이라 안 씀)

---

## 0. 현재 상태 (코드 실측)

- **진입 코드가 이미 하드코딩**: `LandingPage.jsx`의 `VALID_CODES`(망원동/서교동/합정동 더미) — 응답자가 "참여 코드" 타이핑 → 그룹명 매핑. `AdminDashboard.jsx`의 `GROUP_COLORS`도 같은 3개 하드코딩.
- **그룹 흐름**: `SurveyApp` stage landing→intro→survey→result. group이 `saveResult`까지 전달돼 `responses.group_name`에 저장.
- **관리자 결과**: `loadResults()` 전체 조회 → 그룹 필터 칩(`r.group`) + CSV + 리포트 링크 + 삭제. 그룹은 자유문자열(코드 게이팅만).
- **데이터**: `responses` 테이블(group_name·name·birth·company·dept·jobType·점수…). 캠페인/메타데이터 없음.

> 즉 "코드 → 고객사" 자리가 이미 뼈대에 있다. 하드코딩을 테이블 + 관리자 + URL로 끌어올리는 작업.

## 1. 개념

**캠페인** = 고객사 설문 한 건. 각 캠페인이 고유 링크·참여기간·교육일·상태를 가지고, 그 링크로 들어온 응답이 자동으로 그 고객사로 묶인다.

- 링크: `https://survey.mind2action.kr/?g={code}` (쿼리는 해시 앞 — HashRouter 주의)
- 응답자: 링크 클릭 → "○○ 설문입니다" → 개인정보 입력 → 설문 → 결과. 고객사명 타이핑 없음.
- 관리자: 캠페인 생성·링크 발급·고객사별 결과·진행상황.

## 2. 데이터 모델

### 새 테이블 `campaigns`
```sql
create table if not exists campaigns (
  id uuid primary key default gen_random_uuid(),
  code text unique not null,             -- URL ?g=code, 짧은 랜덤 (6~7자, 혼동문자 제외)
  client_name text not null,             -- 고객사/대상명 (응답 group 표시값)
  target text,                           -- 대상 설명 (예: "FC 신입 1기")
  status text not null default 'active', -- draft / active / closed
  period_start date,                     -- 참여 시작 (선택)
  period_end date,                       -- 참여 종료 (선택)
  education_date date,                   -- 교육일 (선택, 교육 연결 시)
  expected_count int,                    -- 참여 예상 인원 (선택, 진행률 기준값) — Phase 2 추가
  memo text,
  created_at timestamptz default now()
);
```

### `responses` 변경
```sql
alter table responses add column if not exists campaign_id uuid references campaigns(id);
```
- 신규 응답: `campaign_id` + `group_name`(= client_name) 둘 다 세팅. 고객사 이름 바뀌어도 campaign_id로 안 깨짐.
- 기존 응답: campaign_id null, group_name 유지(레거시 표시).

## 3. RLS / 접근 (보안)

캠페인 목록(어떤 고객사와 일하는지)이 anon에 통째로 노출되면 안 됨 → **단건 조회 RPC**로 분리.

```sql
alter table campaigns enable row level security;

-- 테이블 직접 접근: 로그인 admin만 (목록·생성·수정·삭제)
create policy "Authenticated manage campaigns" on campaigns
  for all to authenticated using (true) with check (true);

-- 설문 진입용: code 단건만 anon 조회 (전체 목록 비노출)
create or replace function get_campaign_by_code(p_code text)
returns table (id uuid, client_name text, status text, period_start date, period_end date)
language sql security definer stable
as $$
  select id, client_name, status, period_start, period_end
  from campaigns where code = p_code;
$$;
grant execute on function get_campaign_by_code(text) to anon, authenticated;
```
- `responses` insert는 기존 "Anyone can insert" 유지(설문 제출). campaign_id 포함 insert 허용.
- select/delete는 [[_dev/mind2action/ADMIN-SECURITY]] §2대로 authenticated만 (이미 적용).

## 4. 설문 진입 흐름 (LandingPage 재작성)

1. 마운트 시 `window.location.search`에서 `g` 파싱 (해시 앞 쿼리).
2. code 있으면 `get_campaign_by_code(code)` RPC 호출.
   - **없음** → "유효하지 않은 설문 링크입니다."
   - **status ≠ 'active'** → "현재 진행 중인 설문이 아닙니다." (상태 게이팅 = MVP 안전장치)
   - **(Phase 2) 기간 밖** → "설문 참여 기간이 아닙니다 (MM.DD ~ MM.DD)."
   - **정상** → `onEnter(campaign)` (client_name 배지 "○○ 설문입니다" + intro로).
3. code 없음 → "발급된 설문 링크로 참여해 주세요." (링크 전용, 입력칸 없음)
4. 하드코딩 `VALID_CODES` 제거.

## 5. 응답 저장 (SurveyApp / storage)

- `SurveyApp`이 group 문자열 대신 `campaign`(id+client_name) 보유.
- `saveResult(profile, result)`에 `campaign_id` 추가 → `responses.campaign_id` + `group_name = client_name`.
- storage `loadResults` 매핑에 campaign_id 노출.

## 6. 관리자 (AdminDashboard 확장 — 탭 2개)

상단 탭: **[캠페인] [결과]**

### 6-1. 캠페인 탭 (신설)
- **목록 테이블**: 고객사명 · 상태(진행/준비/마감 뱃지) · 기간 · 교육일 · **참여수**(responses count by campaign_id) · 액션.
  - 액션: **[링크 카피]**(`navigator.clipboard.writeText('https://survey.mind2action.kr/?g='+code)`) · [수정] · [마감](status→closed).
- **생성 폼**: 고객사명* · 대상 · 참여기간(start/end) · 교육일 · 메모 → **코드 자동 발급**(랜덤 6~7자, 혼동문자 0/O/1/I/l 제외) → insert. unique 충돌 시 재발급.
- 색은 캠페인별 자동 배정(고정 팔레트 순환) — 하드코딩 `GROUP_COLORS` 폐기.

### 6-2. 결과 탭 (기존 확장)
- 필터 칩 = 하드코딩 그룹 → **캠페인 목록 기반**. "전체" + 캠페인별.
- 표·CSV·리포트·삭제는 기존 유지. group 표시는 campaign_id → client_name(없으면 레거시 group_name).

## 7. 단계 (Phasing)

### Phase 1 — MVP (척추, 실사용 가능) ✅ 5/31 완료·라이브
- [x] 1-1. SQL 마이그레이션 (campaigns 테이블 + RPC + responses.campaign_id) — 피터공 Supabase SQL Editor 실행. ⚠️ 1차에 1개 statement만 실행돼 컬럼·RPC 누락 → 전체 재실행으로 해결. anon RPC·RLS 차단·컬럼 3중 검증 통과.
- [x] 1-2. `lib/campaigns.js` — list/create/update + 랜덤 코드 발급(혼동문자 제외, unique 재시도), `getCampaignByCode` RPC 래퍼, `campaignLink()`
- [x] 1-3. LandingPage 재작성 (URL ?g 파싱 + RPC + 상태 게이팅, VALID_CODES 제거)
- [x] 1-4. SurveyApp/storage — campaign_id 전달·저장 (group_name=client_name 자동)
- [x] 1-5. AdminDashboard 탭 분리 + CampaignManager(생성·목록·링크 카피)
- [x] 1-6. 결과 탭 필터 캠페인 기반화 (GROUP_COLORS 하드코딩 → 동적 colorFor)
- [x] 1-7. 빌드·배포·테스트 — 피터공 라이브 한 바퀴 OK (캠페인 생성→링크→소속 표시→제출→결과 묶임)

### Phase 1.5 — UI 조정 (5/31, 피터공 피드백 반영) ✅
- [x] 탭 라벨: 캠페인 → **캠페인 관리** / 결과 → **결과 확인**
- [x] 생성 폼 3 fieldset 그룹화(기본정보/일정/메모) + 칸별 가시성 안내(고객사명=참여자 표시, 대상설명·메모=관리자만)
- [x] 캠페인 화면 **2단 레이아웃**: 좌측 세로 생성박스(sticky 330px) + 우측 넓은 목록
- [x] 목록 컬럼: 고객사·상태·참여시작·참여종료·교육일·참여수·링크복사·**[설문 결과](그 캠페인 필터로 점프)**·관리(마감). 레이블·데이터 중앙정렬
- [x] **결과 확인 필터 = 드롭다운**(캠페인 많아져도 OK). **일정(참여시작)순 정렬**
- [x] **샘플 로더 = 캠페인 생성 연동**: 샘플 그룹(망원동·서교동·합정동)을 캠페인으로 자동 생성(재사용)+응답 campaign_id 연결, 일정 staggered
- [x] 브랜딩 정리: 헤더 MIND2ACTION만(weight 700, 좌정렬)·"에고그램" 노출 전면 제거·EGOGRAM 배지→"소속:{고객사}"·결과 "성향 진단 결과"·"나를 알면 행동이 바뀝니다" 한 줄

### Phase 2 — 심화
- [x] 참여기간 자동 차단 (period_start/end 게이팅) — 5/31, LandingPage 날짜 분기
- [x] 캠페인 수정 기능 — 5/31, 생성 폼 재사용 (code·status 불변)
- [~] 진행상황 대시보드 — 5/31 코드 완료(커밋 `2d4d4ae`), ⚠️ DB 마이그레이션(expected_count 컬럼) 실행 후 배포 대기. 스타일은 라이브 보며 조정 예정
- [ ] 단체별 리포트 일괄 PDF 저장 (기존 로드맵 항목)

## 8. 기술 주의
- **HashRouter + 쿼리**: 링크는 `/?g=code` (해시 앞). `window.location.search`로 파싱. `#/?g=` 아님.
- **코드 발급**: 클라 랜덤 생성 + unique 제약. 충돌 시 재시도. (Math.random 사용 — 워크플로 아닌 앱 런타임이라 무관)
- **레거시 호환**: 기존 group_name 응답(망원동 등 더미·실데이터)은 campaign_id null로 남고 결과 탭에 group_name으로 표시.

## 미확정 / 다음 결정
- [x] 캠페인 색 → 고객사명 해시 기반 동적 `colorFor`(팔레트 8색 순환) 적용
- [x] 참여수 카운트 → results 기준 매번 count (MVP)
- [ ] 캠페인 **수정 기능** 미구현 — 현재 마감/재개(status)만. 기간·교육일·고객사명 인라인 수정 필요 시 추가
- [ ] "주식회사 대한민국" 문구는 코드에 없어 EGOGRAM 배지를 소속 표기로 대체함 — 피터공이 다른 화면 의도였는지 확인 대기

## Phase 2 — 심화 (다음)

### 설계 메모 (5/31, Phase 2 착수 전 정리)

**[마감] vs 참여기간 자동 차단 — 보완 관계 (겹치지 않음):**
- **[마감]** = 수동 즉시 스위치(status=closed). 날짜 무관, "지금 당장 닫기"·조기종료·준비 상태(draft). 강제 오버라이드.
- **참여기간 자동 차단** = period_start/end 날짜 기반 자동. 관리자 손 안 대도 시작 전/종료 후 자동 차단.
- **게이팅 로직(Phase 2)**: 접수 허용 = `status==='active'` **AND** (기간 없음 OR `period_start <= 오늘 <= period_end`). 시작 전 → "아직 시작 전", 종료 후 → "기간 종료" 안내. 현재는 status만 검사(LandingPage·RPC) → 날짜 조건 추가.
- RPC `get_campaign_by_code`가 이미 period_start·period_end 반환하므로 LandingPage에서 날짜 비교만 추가하면 됨(서버 시간 아닌 클라 today 기준 — 엄밀 차단 필요 시 RPC/DB레벨로).

### 항목
- [x] **참여기간 자동 차단** ✅ 5/31 — LandingPage 게이팅에 날짜 조건 추가. status==='active' 통과 후 클라 today(`todayStr()`, 로컬 YYYY-MM-DD) vs period_start/end 문자열 비교(사전식==시간순). 분기 2개 신설: `notstarted`("아직 설문 참여 기간이 아닙니다" + 기간 표시), `ended`("설문 참여 기간이 종료되었습니다" + 기간 표시). 기간 null이면 무제한(기존과 동일). [마감](status=closed)은 그대로 즉시 오버라이드로 유지(날짜보다 우선 — status 검사가 먼저). RPC가 이미 period_start·period_end 반환하므로 DB/서버 변경 없음. ⚠️ 클라 시계 기준이라 엄밀 차단 아님(MVP). 엄밀 차단 필요 시 RPC에서 날짜 검사해 status를 동적으로 내려주는 방식으로 승격 가능.
- [~] **진행상황 대시보드** (5/31 코드 완료, 배포 대기) — 관리자 [진행 현황] 탭 신설. 캠페인별 카드: 참여 N / 예상 M (진행률 %, 100% 초과 허용) + 참여기간 종료 D-day + 교육일 D-day. 진행중 먼저 → 종료 임박순 정렬. 예상 미설정이면 진행률 대신 참여 인원만.
  - **결정됨 (피터공)**: 참여 예상 인원 필드 추가 (`expected_count` int). 실제가 예상보다 적어도 많아도 무방(기준값일 뿐). `LandingPage` 게이팅과 무관, 대시보드 진행률 표시용.
  - **⚠️ DB 마이그레이션 필요**: `alter table campaigns add column if not exists expected_count int;` — 피터공 Supabase SQL Editor 실행. 단일 문장. 실행·확인 후 `npm run deploy`. (RLS 변경 없음 — campaigns는 authenticated만, 새 컬럼은 기존 정책 그대로 커버. RPC `get_campaign_by_code`는 설문 진입용이라 expected_count 미포함 = 변경 불필요.)
  - **파일**: `CampaignDashboard.jsx` 신설, `AdminDashboard.jsx` 탭 추가, `CampaignManager.jsx`·`campaigns.js` expected_count 입력. 코드 `2d4d4ae` 푸시 완료.
- [x] **캠페인 수정 폼** ✅ 5/31 (커밋 `4c299f6`, 라이브) — 왼쪽 생성 폼 재사용. 목록 행 [수정] → 그 캠페인 값이 폼에 로드 + `editingId` 세트 → 폼 제목 "캠페인 수정"·버튼 "수정 저장"+[취소]·로드 시 상단 스크롤. 저장 = `updateCampaign(id, {client_name, target, period_start, period_end, education_date, memo})`(snake_case 직접, 빈값 null). **code·status는 수정 대상 아님**(코드=링크 정체성 불변, status는 마감/재개 토글 담당 — 폼에 안내 문구). 저장·취소 후 `EMPTY_FORM` 복귀+editingId 해제. 수정 중인 행 [수정] 버튼은 "수정 중"으로 disabled. DB/마이그레이션 변경 없음(updateCampaign 기존 함수). **해소한 구멍**: 한 번 만든 캠페인을 못 고쳐 오타·기간변경 시 삭제+재생성뿐 → 배포 링크 사망. 이제 링크 유지한 채 수정.
- [ ] **설문 ON/OFF 토글 UI 정리** (선택) — 마감/재개 버튼이 이미 토글(status active↔closed)이나 토글처럼 안 보임. 필요 시 ON/OFF 스위치 모양으로.
- [ ] **단체별 리포트 일괄 PDF 저장** — 한 캠페인 전 참여자 리포트 묶음 PDF(고객사 전달용). 기존 로드맵 항목.

> Phase 2 착수 시 결정: ① 목표 인원 필드 추가 여부 → **추가 결정(expected_count, 5/31)** ② 기간 차단을 클라 today 기준으로 둘지 DB레벨 엄밀 차단까지 갈지 → **클라 today MVP 채택(5/31)** ③ 일괄 PDF 방식(브라우저 인쇄 묶음 vs 서버 생성) → 미정
