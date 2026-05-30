## 도메인 이전 + admin 보안 런북 (mind2action.kr)

> 작성: 아리공, 2026-05-26 · 상태: **조사 완료 / 착수 대기**
> 피터공 지시(2026-05-26): "서브도메인으로 분리해 둘 거야. 지금은 아니고 진입 가능하게 기록해 두자." → 이 문서는 피터공이 돌아와 "도메인 작업 하자"고 하면 바로 착수할 수 있도록 조사 내용 전부를 담은 재진입용 런북이다.

---

### 1. 결정된 라우팅 구조 (피터공 2026-05-26)

| 주소 | 용도 | 호스팅 |
|------|------|--------|
| `mind2action.kr` (apex) | **메인 / 홍보 페이지** | 별도 결정 (아래 ⚠️) |
| `survey.mind2action.kr` | **설문 = 현재 에고그램 앱** (아마도, 피터공 "아마도") | GitHub Pages (현 repo) |
| admin | 관리자 화면 | survey 서브도메인 내 `/#/admin` 경로 (현재 구조 유지) |

**핵심 제약 — GitHub Pages는 repo당 커스텀 도메인 1개.** 따라서:
- `survey.mind2action.kr` = 현 `mice3nyc/mind2action` repo의 커스텀 도메인으로 설정 가능.
- `mind2action.kr` 홍보 페이지는 **같은 repo에 못 얹는다.** 별도 repo의 GitHub Pages이거나, Vercel/Netlify/카페24 등 다른 호스팅. → ⚠️ **홍보 페이지 호스팅 위치는 미결정**, 착수 시 먼저 정한다.

---

### 2. 도메인 정보 (라이브 확인 완료 2026-05-26)

- **도메인**: mind2action.kr
- **등록인**: 이승택 (서울 마포구 월드컵북로9길 43-3, 성산동 = 놀공 사옥 인근)
- **등록대행자**: (주)후이즈 — http://whois.co.kr
- **등록일**: 2026-03-18 / **만료일**: 2028-03-18
- **네임서버**: ns1.whoisdomain.kr, ns2.whoisdomain.kr
- DNS 관리: 후이즈 콘솔(whois.co.kr 로그인)에서 레코드 추가.
- 손소장과 공동 도메인. nolgong.com / nolgongschool.com과는 별도 관리.

---

### 3. 현재 코드베이스 사실 (조사 결과 — 이전이 쉬운 이유)

- **repo**: `mice3nyc/mind2action` (origin, main 브랜치). 앱 경로 `_dev/mind2action/egogram/`.
- **현재 배포 주소**: https://mice3nyc.github.io/mind2action/egogram/
- **빌드**: Vite. `vite.config.js` → `base: '/mind2action/egogram/'`
- **배포 스크립트** (`package.json`): `"deploy": "vite build && gh-pages -d dist --dest egogram"` → gh-pages 브랜치 `egogram/` 하위로 publish.
- **하드코딩 절대 URL 0건**: src 전체에 `github.io`/`mice3nyc`/하드코딩 도메인 참조 없음. 앱이 전부 상대경로 + Vite base로 동작 → **도메인이 바뀌어도 소스에서 고칠 URL이 없다.**
- **CNAME 파일 없음**: dist에도, gh-pages 브랜치에도 없음. 커스텀 도메인 미설정 상태.
- 버전: package.json v0.8.0.

---

### 4. 실행 체크리스트 — survey.mind2action.kr 설정

착수 시 순서대로. (에고그램을 서브도메인 루트에 두는 안 = 가장 깔끔)

- [ ] **vite base 변경**: `vite.config.js` `base: '/mind2action/egogram/'` → `base: '/'` (서브도메인 루트 서빙)
- [ ] **CNAME 파일 신설**: `egogram/public/CNAME` 에 한 줄 `survey.mind2action.kr` (public/에 두면 빌드 시 dist 루트로 복사 → publish됨)
- [ ] **배포 스크립트 변경**: `gh-pages -d dist --dest egogram` → `gh-pages -d dist` (repo 루트로 publish, 서브경로 제거)
- [ ] **DNS (후이즈 콘솔)**: CNAME 레코드 추가 — 호스트 `survey`, 값 `mice3nyc.github.io` (apex A레코드 불필요. 서브도메인은 CNAME 한 줄)
- [ ] **GitHub repo Settings → Pages**: Custom domain 칸에 `survey.mind2action.kr` 입력 + "Enforce HTTPS" 체크 (인증서 발급에 수 분~수십 분)
- [ ] **버전 분기 점검** (메모리 [[feedback_version_branch_checklist]]): storageKey/eventLogKey/sessionIdKey는 도메인과 무관(브라우저 origin이 바뀌므로 기존 mice3nyc.github.io localStorage는 자연 분리). 다만 도메인 이전 = 기존 응답자 localStorage 단절 → 진행 중 세션 없는 시점에 이전.
- [ ] **이전 후 확인**: survey.mind2action.kr/ 설문 동작 + /#/admin 진입 + Supabase 저장/조회 동작 + HTTPS 정상.
- [ ] 기존 mice3nyc.github.io/mind2action/egogram/ 는 살려둘지/리다이렉트할지 결정.

---

### 5. Supabase — 데이터 동작은 영향 없음 (설정 거의 no-op)

- Supabase URL: `https://dkpsbsmpizjnukkpmgrq.supabase.co` (`.env` VITE_SUPABASE_URL + supabase.js 폴백)
- 키: anon **publishable** key (`sb_publishable_...`) — 클라이언트 공개용, 번들에 노출되는 게 정상.
- **Supabase Auth 미사용.** DB(설문 결과 저장)만 anon key + PostgREST로 사용.
- PostgREST Data API는 anon key + RLS 기반이라 **CORS가 모든 출처에 열려 있음** → 도메인이 survey.mind2action.kr로 바뀌어도 **데이터 저장/조회는 추가 설정 없이 그대로 동작.**
- 즉 "Supabase 설정"은 **도메인 이전 자체에는 할 게 없다.** (단 아래 6번 보안 강화는 별개로 중요)

---

### 6. ⚠️ admin 보안 — 현재 사실상 무방비 (피터공 "보안 더욱 중요" 지적과 일치)

**현재 상태 (`supabase-schema.sql` + `AdminLogin.jsx` 확인):**
- admin 로그인 = **클라이언트 측 하드코딩 비번** `const ADMIN_PASS = 'sonson'` (소스 보면 그대로 보임). UI만 가릴 뿐 데이터는 못 막는다.
- `responses` 테이블 RLS 정책 **3개 모두 전면 개방**:
  - `insert with check(true)` — 누구나 입력
  - `select using(true)` — **누구나 전체 응답 조회**
  - `delete using(true)` — **누구나 삭제**
- 결과: 공개된 anon key로 누구나 Supabase REST 엔드포인트를 직접 때려서 **전 응답자 개인정보(이름·생년·회사·부서·점수)를 덤프하거나 삭제 가능.** 스키마 주석도 "Phase 2에서 인증 추가 시 정교화 / 삭제는 인증된 사용자만 (지금은 열어둠)"이라 적혀 있음 = 원래 미뤄둔 항목.
- **홍보용 공개 도메인이 붙으면 노출이 커진다** → 도메인 이전과 함께(또는 직전) 손봐야 함.

**강화 방안 (착수 시 선택):**
- (a) **Supabase Auth 도입** — admin 계정 로그인 후 select/delete를 `auth.role() = 'authenticated'` 정책으로 제한. insert만 anon 개방 유지(설문 참여자). 가장 정석.
- (b) **읽기/삭제를 막고 별도 경로로** — 응답 조회를 Edge Function/service_role 뒤로 숨기고 admin은 서버 검증.
- (c) 최소 조치 — 최소한 `select`/`delete` 정책을 인증 기반으로 좁히고, 클라 하드코딩 비번은 제거.

> 이 항목은 도메인 이전과 독립적으로도 우선순위 높음. 착수 시 (a) 권장.

---

### 7. 다음 admin 개발 (피터공 2026-05-26 언급)

- **단체별 리포트 PDF 일괄 저장**: admin에서 group_name 단위로 묶어 여러 리포트를 한 번에 PDF로 저장하는 기능. (현재 리포트는 개별 화면 + 브라우저 인쇄. 일괄/서버사이드 PDF 생성 방식 검토 필요 — 예: 클라 print-to-PDF 반복 / jsPDF / Puppeteer 서버 렌더)
- 이 기능은 admin 보안 강화(6번) 이후 또는 병행.

---

### 8. 재진입 가이드 (피터공이 "도메인 작업 하자"고 하면)

1. 이 문서 §1 라우팅 + §4 체크리스트부터 펼친다.
2. 먼저 결정 2개: ① 홍보 페이지(apex) 호스팅 위치(§1 ⚠️) ② admin 보안 강화 동시 진행 여부(§6).
3. 코드 변경은 §4 순서대로 (vite base → CNAME → 배포 스크립트), DNS는 후이즈 콘솔.
4. 선문후코: 변경 전 SPEC/TASKS 갱신 (메모리 [[feedback_spec_before_code]]).
5. 빌드 올리면 커밋+푸시 (메모리 [[feedback_commit_push_after_build]]).

### 관련 문서
- 에고그램 프로젝트: [[_dev/mind2action/PLAN|PLAN]] / [[_dev/mind2action/SPEC|SPEC]] / [[_dev/mind2action/TASKS|TASKS]] / ROADMAP
- 도메인 메모리: mind2action.kr (후이즈, 2028-03 만료)
