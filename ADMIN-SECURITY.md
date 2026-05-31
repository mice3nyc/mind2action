# SPEC — admin 보안 강화 + survey 서브도메인 (mind2action 에고그램)

> 작성: 아리공, 2026-05-30 · 상태: 진행 중 (선문후코)
> 배경 런북: [[_dev/mind2action/DOMAIN-MIGRATION]] §6 (admin 무방비 진단)
> 피터공 결정 (5/30): ① admin = 공유 계정 1개 ② 보안 수준 = 제대로 (Supabase Auth)

---

## 0. 현재 상태 (코드 실측)

- **admin 로그인**: `AdminLogin.jsx`에 `const ADMIN_PASS = 'sonson'` 클라이언트 하드코딩. UI 가림막일 뿐, 데이터는 못 막음.
- **데이터 접근** (`lib/storage.js`):
  - `saveResult` → `responses` insert (설문 참여자, 공개 유지 OK)
  - `loadResults` → `responses` select '*' (전체 조회)
  - `deleteResult` / `clearResults` → `responses` delete
- **RLS 정책** (`supabase-schema.sql`): insert/select/delete 셋 다 `true` = 전면 개방.
  - → 공개 anon 키로 누구나 전 응답자 개인정보(이름·생년·회사·부서·점수) 덤프/삭제 가능.
- **Supabase Auth 미사용** (grep 확인, supabase.auth 호출 0건). supabase-js ^2.58.0 = Auth 지원 충분.

## 1. 목표 보안 모델

| 동작 | 누가 | 방법 |
|------|------|------|
| 설문 제출 (insert) | 누구나 (참여자) | anon 키 + RLS insert(true) 유지 |
| 응답 조회 (select) | 로그인한 admin만 | RLS select `auth.role()='authenticated'` |
| 응답 삭제 (delete) | 로그인한 admin만 | RLS delete `auth.role()='authenticated'` |

- admin 계정 = Supabase Auth 이메일/비번 **공유 계정 1개** (피터공·손소장 공유).
- 클라 하드코딩 비번 `'sonson'` 제거 → 실제 Supabase Auth 로그인으로 교체.

## 2. 작업 단계

### Phase A — Supabase 콘솔 (피터공/아리공) ✅ 5/30 완료
- [x] A1. admin 계정 1개 생성 — `admin@mind2action.kr` (Confirmed at 5/30 21:56, Email provider Enabled). SMTP 미설정이라 자동 confirmed. 비번은 피터공·손소장 공유, 코드 미보관.
- [x] A2. SQL Editor에서 RLS 정책 교체 완료 ("Success. No rows returned").

### Phase B — 코드 (아리공) ✅ 5/30 완료
- [x] B1. `AdminLogin.jsx`: 하드코딩 비번 제거 → 이메일+비번 폼 → `supabase.auth.signInWithPassword()`.
- [x] B2. `AdminApp.jsx`: `session` state + `getSession()` + `onAuthStateChange` (새로고침 유지·로그아웃 정상).
- [x] B3. 로그아웃 = `supabase.auth.signOut()` (AdminApp에서 onLogout으로 전달).
- [x] B4. storage.js 변경 불필요 확인 — 같은 supabase 클라이언트가 세션 토큰 자동 전달.

### Phase C — 검증 ✅ 5/30 완료
- [x] C1. 로그인 전 anon select → `[]` 빈 배열 (개인정보 차단 확인).
- [x] C2. 로컬 로그인 성공 → 대시보드 조회 정상.
- [x] C3. anon insert → HTTP 201 (설문 제출 정상). ⚠️ 검증용 더미행 `__TEST__/보안검증` 1건 삽입됨 → admin에서 삭제할 것.
- [x] C4. 라이브 배포 완료 (`npm run deploy`, 소스 커밋 `2b926b7` push). 라이브 번들에 signInWithPassword 반영·sonson 제거 확인.
- [ ] C5. ⚠️ **라이브 로그인 실패 (내일 진입점)** — 로컬은 성공, 라이브는 실패.
  - 실측: 라이브 번들 정상(Auth코드 O, sonson X), 같은 Supabase 프로젝트·키, Auth 엔드포인트 살아있음(틀린 비번 → invalid_credentials 정상 응답).
  - **남은 가설 2개**: (a) 브라우저 CDN 캐시 = 옛 번들(비번 한 칸) → Cmd+Shift+R 강력 새로고침으로 해소 / (b) 비번 불일치 → Supabase 콘솔에서 비번 재설정.
  - **가르는 질문**: 라이브 admin 화면 입력칸이 1개(비번만=옛 캐시)인지 2개(이메일+비번=새 코드, 비번 문제)인지.
  - **내일 첫 동작**: 라이브 admin Cmd+Shift+R → 입력칸 개수 확인 → 1개면 캐시(새로고침 후 재시도), 2개면 콘솔서 비번 재설정.

## 3. RLS 교체 SQL (Phase A2)

```sql
-- 기존 개방 정책 제거
drop policy if exists "Anyone can read responses" on responses;
drop policy if exists "Anyone can delete responses" on responses;

-- insert는 그대로 (설문 참여자) — "Anyone can insert responses" 유지

-- 조회: 인증된 사용자만
create policy "Authenticated can read responses"
  on responses for select
  to authenticated
  using (true);

-- 삭제: 인증된 사용자만
create policy "Authenticated can delete responses"
  on responses for delete
  to authenticated
  using (true);
```

> 주의: insert 정책 "Anyone can insert responses" (`with check(true)`)는 **건드리지 않는다.** 설문 참여자는 비로그인 상태로 제출해야 하므로 anon insert 유지.

## 4. 도메인: survey.mind2action.kr (진행 — 5/31)

### 결정 (5/31, 피터공)
- **설문 = `survey.mind2action.kr`** (루트). **관리자 = `survey.mind2action.kr/#/admin`** (해시 포함 OK로 확정 — BrowserRouter 전환은 안 함).
- `mind2action.kr/admin`은 **불가**: GitHub Pages는 repo당 커스텀 도메인 1개 + 관리자는 설문과 같은 SPA(한 빌드, `mind2action` repo). 관리자는 설문이 사는 도메인을 따라간다. 랜딩 `mind2action.kr`은 별도 repo(`mind2action-home`)라 apex 경로에 egogram을 못 올림.
- 관리자가 공개 도메인 경로에 노출돼도 Supabase Auth(§2) 걸려 있어 데이터는 안전.

### 루트 배포 안전 확인 (5/31)
- gh-pages 루트 = `index.html`·`assets`·`favicon.svg`·`icons.svg`·`egogram/` — 전부 egogram 관련. 루트 `index.html`은 에셋을 `/mind2action/egogram/`로 가리키는 **옛 빌드 스테일 복제**. 별개 프로젝트 없음 → 루트 재배포해도 잃을 것 없음.

### 코드/설정 (아리공)
- [x] vite.config base `/mind2action/egogram/` → `/` (5/31)
- [x] `egogram/public/CNAME` = `survey.mind2action.kr` (5/31)
- [x] package.json deploy `gh-pages -d dist --dest egogram` → `gh-pages -d dist` (루트 배포) (5/31)
- [ ] `npm run deploy` (DNS 선행 후 실행 — 아래 순서)

### 피터공이 콘솔에서 (순서 중요 — DNS 먼저)
- [ ] 1. 후이즈 DNS: `survey` CNAME → `mice3nyc.github.io` 추가 (DNS 먼저여야 HTTPS 인증서 깔끔히 발급)
- [ ] 2. (아리공 배포 후) GitHub repo `mice3nyc/mind2action` Settings → Pages: Custom domain = `survey.mind2action.kr` 자동 표시 확인 + 인증서 뜨면 Enforce HTTPS 체크

### 참고
- localStorage/세션 영향 없음 (origin 바뀜 = 자연 분리). 진행 중 세션 없는 때 이전.
- 옛 URL `mice3nyc.github.io/mind2action/egogram/`은 커스텀 도메인 설정되면 survey로 301 리다이렉트.

> ⚠️ 순서 주의: 보안(Phase A~C)을 **먼저** 끝내고(완료) 도메인(§4)을 붙인다. 배포 순서도 **DNS 먼저 → 배포** 라야 다운타임/인증서 문제 없음.

## 미확정 / 다음 결정
- [ ] Supabase Auth 계정 생성을 피터공이 직접 할지, 아리공에게 콘솔 자격 공유할지
- [ ] survey 서브도메인 이전 시 기존 mice3nyc.github.io/mind2action/egogram/ 살릴지/리다이렉트할지
