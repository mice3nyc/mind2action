# SPEC — 고객사별 설문 캠페인 시스템 (mind2action 에고그램)

> 작성: 아리공, 2026-05-31 · 상태: 진행 (선문후코, 코드 전)
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

### Phase 1 — MVP (척추, 실사용 가능)
- [ ] 1-1. SQL 마이그레이션 (campaigns 테이블 + RPC + responses.campaign_id) — **피터공 Supabase SQL Editor 실행**
- [ ] 1-2. `lib/campaigns.js` — list/create/update/close + 코드 발급, `getCampaignByCode` RPC 래퍼
- [ ] 1-3. LandingPage 재작성 (URL ?g 파싱 + RPC + 상태 게이팅, VALID_CODES 제거)
- [ ] 1-4. SurveyApp/storage — campaign_id 전달·저장
- [ ] 1-5. AdminDashboard 탭 분리 + 캠페인 목록·생성·링크 카피
- [ ] 1-6. 결과 탭 필터 캠페인 기반화 (GROUP_COLORS 폐기)
- [ ] 1-7. 빌드·배포·테스트 (캠페인 생성→링크→설문 제출→결과 묶임 확인)

### Phase 2 — 심화
- [ ] 참여기간 자동 차단 (period_start/end 게이팅 + 마감 UI)
- [ ] 진행상황 대시보드 (참여율·기간 D-day·교육일 카운트다운)
- [ ] 단체별 리포트 일괄 PDF 저장 (기존 로드맵 항목)

## 8. 기술 주의
- **HashRouter + 쿼리**: 링크는 `/?g=code` (해시 앞). `window.location.search`로 파싱. `#/?g=` 아님.
- **코드 발급**: 클라 랜덤 생성 + unique 제약. 충돌 시 재시도. (Math.random 사용 — 워크플로 아닌 앱 런타임이라 무관)
- **레거시 호환**: 기존 group_name 응답(망원동 등 더미·실데이터)은 campaign_id null로 남고 결과 탭에 group_name으로 표시.

## 미확정 / 다음 결정
- [ ] 캠페인 색 팔레트 자동 배정 방식 (순환 vs 고객사 지정)
- [ ] 캠페인 "수정" 범위 (기간·교육일·상태만 vs 고객사명도)
- [ ] 참여수 카운트 쿼리 (매번 count vs 캐시) — MVP는 매번 count
