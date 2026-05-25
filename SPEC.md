# MIND2ACTION — 기술 명세 (SPEC)

> **현재 빌드: v0.7** (5/25 기록됨) — 손소장 26.0525 수정 5건 + 리포트 헤더·마무리 정리. 역할별 안전구간 테이블(§1 그래프 경계선 + §3 조율 발동 통합), 컨설턴트 CM6 공통 3섹션, "코칭"→"조율" 라벨, 결과화면 총점·재시도 삭제. 호칭 일원화(②)는 드라이브 "에고그램 리포트 콘텐츠 데이터" 시트 수령 후 보류.
> 이전 안정 빌드: v0.5 (`_dev/mind2action/egogram-v0.5/`)

> Phase 1~2 반영. 이후 Phase 진입 시 확장.

## §1 설문 구조

### 기본정보 필드

| # | 필드 | 타입 | 필수 | 비고 |
|---|------|------|------|------|
| 1 | 이름 | text | Y | |
| 2 | 생년월일 | text (8자리) | Y | YYYYMMDD |
| 3 | 경력 | number (개월) | Y | |
| 4 | 회사 | text | Y | 회사명 |
| 5 | 소속 | text | Y | OO지점 |
| 6 | 성향 코칭을 받고 싶은 역할 | select | Y | 고객 컨설팅 영업 / 신인 육성 코칭 / 조직운영 리더 |
| 7 | 직전 3개월 평균 소득 | select | N | 200만원 미만 ~ 2000만원 이상 |
| 8 | 직전 1년 리크루팅 수 | number | N | |

### 설문 문항

- **총 50문항**, 5개 자아상태 × 10문항
- **응답 형식**: 3점 리커트 ("그렇다" 2 / "어느 쪽도 아니다" 1 / "그렇지 않다" 0)
- **페이지네이션**: 5문항씩 10페이지

### 문항 → 자아상태 매핑

| 자아상태 | 약어 | 문항 ID | 한글명 |
|----------|------|---------|--------|
| Critical Parent | CP | Q1~Q10 | 통제적 부모 |
| Nurturing Parent | NP | Q11~Q20 | 자상한 부모 |
| Adult | A | Q21~Q30 | 어른 자아 |
| Free Child | FC | Q31~Q40 | 자유로운 아이 |
| Adapted Child | AC | Q41~Q50 | 순응하는 아이 |

출처: `Assets/incoming/에고그램/설문지 .xlsx` > "각 유형 별 항목" 시트.
앱 데이터: `src/data/questions.json`

### 문항 표시 순서

질문은 교차 배치로 표시된다. 한 페이지(5문항)에 CP→NP→A→FC→AC 순서로 각 1문항씩.
10라운드 × 5개 에고 상태 = 50문항. 참여자가 같은 유형 문항이 연속되는 것을 인지하지 못하도록 설계.
scoreEngine은 문항 ID가 아니라 `egoState` 필드 기반으로 점수를 합산한다.

### 문항 수정 워크플로우

1. **내보내기**: `Assets/incoming/에고그램/에고그램_설문문항_50.csv` (번호, 유형, 유형명, 문항)
2. **수정**: 손소장이 문항 텍스트/유형 수정 후 CSV 반환
3. **반영**: CSV 파싱 → `src/data/questions.json` 갱신 (유형별 순서 → 교차 배치 자동 변환)
4. **배포**: `cd egogram && npm run deploy`

CSV→JSON 변환 스크립트:
```bash
cd egogram && node -e "
const fs = require('fs');
const rows = fs.readFileSync('CSV경로', 'utf8').split('\n').slice(1).filter(Boolean);
const groups = { CP: [], NP: [], A: [], FC: [], AC: [] };
for (const row of rows) {
  const m = row.match(/^(\d+),(\w+),[^,]+,\"(.+)\"\s*$/);
  if (!m) continue;
  groups[m[2]].push({ id: 'Q' + m[1], egoState: m[2], text: m[3].replace(/\"\"/g, '\"') });
}
const interleaved = [];
for (let i = 0; i < 10; i++) {
  for (const ego of ['CP', 'NP', 'A', 'FC', 'AC']) interleaved.push(groups[ego][i]);
}
fs.writeFileSync('src/data/questions.json', JSON.stringify(interleaved, null, 2));
console.log(interleaved.length + '문항 반영 완료');
"
```

## §2 점수 계산 엔진

### 합산
```
자아상태 점수 = SUM(해당 10문항의 응답 점수)
범위: 0 ~ 20 (각 자아상태별)
총합: 0 ~ 100
```

### 점수 구간 분류

| 구간 | 범위 | 의미 |
|------|------|------|
| 극고 | 17~20 | 해당 성향 매우 강함 |
| 고 | 14~16 | 해당 성향 강함 |
| 중 | 11~13 | 보통 |
| 저 | 8~10 | 해당 성향 약함 |
| 극저 | 0~7 | 해당 성향 매우 약함 |

**안전구간 (조율 불필요, v0.7 역할별)** — §1 그래프 경계선 밴드 + §3 조율 발동 로직이 공유하는 단일 기준 (`scoreEngine.SAFE_RANGES`, 손소장 26.0525 확정):

| 역할 (코드 키) | CP | NP | A | FC | AC |
|----------------|----|----|---|----|----|
| 컨설턴트 (`sales`) | 11-16 | 11-16 | 14-20 | 11-16 | 8-16 |
| 리더 (`manager`) | 11-16 | 14-20 | 14-20 | 11-16 | 8-13 |
| 코치 (`coach`) | 11-16 | 14-20 | 11-20 | 11-16 | 11-16 |

> 점수가 해당 역할×자아상태 구간 밖이면 조율 필요. `getSuccessRange(ego, jobType)` / `needsCoaching(ego, score, jobType)` 모두 이 표를 참조한다. jobType→role은 `roleFromJobType` (sales_leader 등 잔여 키 → manager).

### TOP / BOTTOM 결정
- **동점 우선순위**: CP > A > NP > AC > FC (TOP, BOTTOM 모두 동일)

## §3 참여자 플로우

```
랜딩 (참여 코드 입력)
  → 기본정보 입력 (그룹 뱃지 표시)
    → 50문항 설문 (10단계 서클 스텝)
      → 결과 화면 (점수 + 막대 + TOP/BOT)
        → DB 저장 (Supabase)
```

### 참여 코드 (그룹 분리)
현재 하드코딩 3개: `망원동`, `서교동`, `합정동`
Phase 2 후속: 동적 그룹 생성

## §4 관리자 플로우

```
/#/admin → 비밀번호 입력 (현재: sonson)
  → 결과 테이블 (전 컬럼 + 바 그래프)
    → 그룹 필터 / CSV 다운로드 / 삭제
```

### 테이블 컬럼
그룹 | 이름 | 생년월일 | 경력 | 회사 | 소속 | 직무 | 소득 | 리크루팅 | CP | NP | A | FC | AC | 총점 | TOP1 | BOT | 일시

## §5 라우팅

HashRouter 기반 (`react-router-dom`)
- `/` — 참여자 플로우 (SurveyApp)
- `/#/admin` — 관리자 플로우 (AdminApp)

관리자 화면은 max-width 제한 없음 (테이블 풀 너비)

## §6 디자인 명세

### 색상

| 용도 | 값 |
|------|-----|
| 배경 | `#ffffff` |
| 텍스트 | `#1a1a1a` |
| 액센트 파랑 | `#0012de` |
| 액센트 노랑 | `#f3e700` |
| 버튼 | `#0012de` 배경 + 흰 텍스트 |

### 에고 유형 컬러

| 유형 | 컬러 | 용도 |
|------|------|------|
| CP | `#ef4444` 빨강 | 바 그래프 배경 + TOP/BOT 태그 |
| NP | `#f59e0b` 주황 | |
| A | `#38bdf8` 하늘 | |
| FC | `#10b981` 초록 | |
| AC | `#8b5cf6` 보라 | |

### 그룹 뱃지 컬러

| 그룹 | 컬러 |
|------|------|
| 망원동 | `#0012de` 파랑 |
| 서교동 | `#e11d48` 분홍 |
| 합정동 | `#059669` 초록 |

### 폰트
Paperlogy (CDN: `fonts-archive/Paperlogy`). 전체 통일. 굵기 400~800 사용.

### 레이아웃
- 참여자: max-width 680px
- 관리자: max-width 제한 없음 (좌우 24px 패딩)

## §7 Supabase 스키마

### responses 테이블 (현재 사용 중)

```sql
id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
created_at timestamptz DEFAULT now(),
group_name text NOT NULL,
name text NOT NULL,
birth_date text,
career_months text,
company text,
department text,
job_type text,
income_range text,
recruit_count text,
score_cp integer NOT NULL,
score_np integer NOT NULL,
score_a integer NOT NULL,
score_fc integer NOT NULL,
score_ac integer NOT NULL,
total integer NOT NULL,
top1 text NOT NULL,
top2 text NOT NULL,
bottom text NOT NULL,
grades jsonb
```

### RLS 정책 (현재)
- insert: 누구나 (설문 참여자)
- select: 누구나 (관리자 — 후속 인증 추가 시 제한)
- delete: 누구나 (후속 제한)
- **update: 없음** — API로 기존 데이터 수정 불가. 수정 필요 시 Supabase SQL Editor에서 직접 실행

### 스키마 변경 시
- anon 키로는 DDL(ALTER TABLE 등) 실행 불가
- Supabase SQL Editor에서 직접 실행 필요
- 변경 후 `supabase-schema.sql` + SPEC §7 동기화

## §8 배포

### GitHub Pages 배포 구조

```
GitHub Pages source: gh-pages 브랜치, / (root)
리포 이름: mind2action → 기본 URL: mice3nyc.github.io/mind2action/

gh-pages 브랜치 구조:
├── egogram/           ← vite dist 산출물이 여기에 들어감
│   ├── index.html
│   ├── favicon.svg
│   ├── icons.svg
│   └── assets/
│       ├── index-{hash}.js
│       └── index-{hash}.css
└── (향후 다른 프로젝트 추가 가능)
```

### 배포 명령

```bash
cd egogram/
npm run deploy    # = vite build && gh-pages -d dist --dest egogram
```

`--dest egogram`이 핵심. 이것 없으면 dist가 gh-pages 루트에 올라가서 `/egogram/` 경로가 404.

### Vite base path

`vite.config.js`의 `base: '/mind2action/egogram/'`는 HTML 내 에셋 참조 경로를 결정한다.
- 리포 이름(`/mind2action/`) + 서브폴더(`/egogram/`) = 전체 경로
- 이 값을 변경하면 배포 경로도 맞춰야 함

### 배포 후 확인

배포 후 반드시 확인할 3가지:
1. `curl -sI https://mice3nyc.github.io/mind2action/egogram/` → 200 OK
2. `gh api repos/mice3nyc/mind2action/git/trees/gh-pages:egogram --jq '.tree[].path'` → index.html, assets/ 존재
3. 브라우저 Cmd+Shift+R (GitHub Pages 캐시 최대 10분)

## §9 React 앱 구조

```
egogram/
├── index.html
├── package.json
├── vite.config.js          # base: /mind2action/egogram/
├── supabase-schema.sql
├── .env                    # VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY
├── src/
│   ├── App.jsx             # HashRouter 라우팅
│   ├── main.jsx
│   ├── pages/
│   │   ├── SurveyApp.jsx   # 참여자 플로우
│   │   └── AdminApp.jsx    # 관리자 플로우
│   ├── components/
│   │   ├── Landing/
│   │   │   └── LandingPage.jsx    # 참여 코드 입력
│   │   ├── Survey/
│   │   │   ├── SurveyIntro.jsx    # 기본정보 입력
│   │   │   └── SurveyForm.jsx     # 50문항 + 스텝 마커
│   │   ├── Result/
│   │   │   └── ResultPage.jsx     # 점수 + 그래프
│   │   ├── Admin/
│   │   │   ├── AdminLogin.jsx     # 비밀번호 입력
│   │   │   └── AdminDashboard.jsx # 테이블 + 필터 + CSV
│   │   └── Layout/
│   │       ├── Header.jsx
│   │       └── Footer.jsx
│   ├── lib/
│   │   ├── scoreEngine.js  # 점수 계산
│   │   ├── storage.js      # Supabase CRUD
│   │   └── supabase.js     # Supabase 클라이언트
│   ├── data/
│   │   ├── questions.json       # 50문항
│   │   └── sampleResults.json   # 샘플 20명
│   └── styles/
│       └── praxi.css
└── dist/                   # 빌드 산출물 (gitignore)
```

## §10 CM 데이터 구조 (Phase 3)

### CM 데이터 파일 (현행 — yaml)

| 파일 | 직군 | 비고 |
|------|------|------|
| `src/data/cm_insurance.yaml` | 컨설턴트(sales) | v0.8 전체 재변환, cm6 조합 20 + cm7 60 |
| `src/data/cm_manager.yaml` | 리더(manager) | v0.8 전체 재변환 (cm1·cm8만 보존) |
| `src/data/cm_coach.yaml` | 코치(coach) | v0.8 전체 재변환 (cm1·cm8만 보존) |
| `src/data/cm6_common_consultant.yaml` | 컨설턴트 CM6 공통 | v0.7, 3섹션(title·body) |

### 원본 데이터 출처 + v0.8 재변환 (5/25 완료)

손소장 전체 새 데이터 = `Assets/incoming/에고그램/data/Archives/{코치,리더,컨설턴트}.xlsx` (호칭 일원화 완료: 컨설턴트 "고객님"·코치 "신인"·리더 "구성원")
- 코치·리더: 8시트 (CM2·CM3강점추가·CM4-1·CM4-2·CM4-3·CM4-4·CM5코칭추가|CM5추가·CM6)
- 컨설턴트: 9시트 (+CM7)

**v0.8 완료**: 변환기 `scripts/convert_cm.py`로 위 xlsx 전 시트 → cm_*.yaml 통째 재변환. cm1(자아상태 키워드)·cm8(명언, 렌더 폐기)은 xlsx에 시트가 없어 기존 yaml에서 보존. 결과: 본문 옛 호칭(설계사·지점장·멘토) 0건.

**변환 주의 (convert_cm.py 설계 근거)**:
- **행 위치가 직군마다 다름** → 행 번호 하드코딩 금지, 라벨 앵커 스캔("점수구간"·"구분 TOP 1/2/BOTTOM"·"에고그램 유형"). 예: CM3강점추가 TOP1 행이 코치/리더=행3, 컨설턴트=행5
- **시트→yaml키 매핑 직군별 상이**: 코치/리더 CM6(리크루팅)→`cm7` / 컨설턴트 CM6(클로징)→`cm6`·CM7(리크루팅)→`cm7`. 코치/리더 `cm6`은 비어있음
- **CM5 시트명**: 코치="CM5 코칭 추가" / 리더="CM5추가" / 컨설턴트="CM5" → 접두어 매칭. 컨설턴트만 본문 2행(manner+improvement), 코치/리더는 1행(manner)
- **CM4-4 AC 이중 컬럼**: 시트에 AC가 0~7점·17점이상 두 컬럼 → 트리거 조건(CP/NP/A/FC=0-7, AC=17+)에 맞는 컬럼만 채택
- **CM4-2 "코칭이 필요없는 구간"**: 셀이 빈칸이거나 리터럴 "코칭이 필요없는 구간" 텍스트 → 원본 그대로 보존(기존 동작과 동일)
- **some_coaching**: 5/18 폐기, cmLookup.js 미참조 → 빈 문자열 처리(옛 호칭 잔존 죽은 데이터 제거)

### 리포트 렌더링 변경 (5/18 회의 반영)

- **도입부**: "성향 코칭 리포트의 목적" 1블록만 유지. "우수 보험설계사는?" sub 블록 통째 삭제
- **§1 통합**: 기존 §1(님의 성향, CM1 한 줄)과 §2(자아상태의 성향과 말투, CM2 큰 텍스트)를 §1로 통합. CM1 짧은 한 줄 삭제, CM2 본문을 각 ego 점수 표시 바로 아래에 표시. 이후 섹션 번호 -1 시프트
- **§3(이전 §4) 코칭 포인트**: (1) CM4-3 some_coaching ("코치님의 영향력이 줄어드는 것은 아닙니다" 안내 멘트) 삭제 — `allNoCoaching` 일 때 `all_no_coaching`만 표시 (2) CM4-4(세밀한 코칭) 해당 ego는 CM4-1·CM4-2(일반 코칭) 대신 CM4-4 텍스트로 대치 — 별도 detailed 섹션 폐지, 각 ego 카드 안에서 분기
- **명언 §8 삭제**: cm8 렌더 폐기 (yaml/lookup 데이터는 보존)
- **마무리 (closing)**: "마지막으로 드리고 싶은 말씀" 4문단 + 시그니처 폐기 → 한두 줄 인사 + 연락처 (이름·이메일·인스타·전화). 인스타·전화는 빈 문자열일 때 미렌더 (손소장님 답 대기)
- **설문 필드**: "직전 1년 리크루팅 수" 입력 삭제 (옛 데이터는 admin 표·CSV에 유지)

### 리포트 렌더링 변경 (v0.7 — 손소장 26.0525)

- **상단 커버**: 기존 badge "MIND2ACTION" + h1 "성향 코칭 리포트" 2줄 → **한 줄** `<h1><span class="report-cover-brand">MIND2ACTION</span> 성향 코칭 리포트</h1>` (브랜드만 accent 색)
- **§1 성향 그래프 경계선**: `getSuccessRange`가 역할(jobType) 인자를 받아 §2 안전구간 표 적용. ScoreChart에 `jobType={data.job_type}` 전달
- **§3 라벨**: `s4_title` "내 성향의 코칭 포인트" → "내 성향의 조율 포인트", `s4_no_coaching` "코칭이 필요 없는 구간입니다." → "조율을 하지 않아도 되는 성향"
- **CM6 공통 블록**: 컨설턴트 리포트는 cm6 조합 텍스트 유무와 무관하게 §5 렌더 + 하단에 `cm6_common` 3섹션(title h4 + body) 추가. `.report-cm6-common`
- **마무리(closing)**: 시그니처 이름(손용배) 제거 + 이메일 표기 `✉  {email}` (레이블 "이메일:" 폐기, `.report-contact-email` 중앙). `ui_texts.closing.contact.name` 빈 값으로
- **하단 카피라이트**: report-container 맨 아래 `<div class="report-copyright">© 2026 MIND2ACTION</div>` (작은 회색 중앙)
- **참여자 결과화면(ResultPage)**: 총점(`result-total`) + "처음부터 다시" 버튼 삭제 (총점 높낮이 ≠ 성향 우열 / 재시도 = 성향 왜곡). 그래프 경계선은 `profile?.jobType` 반영

### 리포트 렌더링 변경 (v0.8 — 손소장 26.0525 라이브 확인)

- **§1 점수 뒤 구간 표기 제거**: `report-trait-ego`에서 `{점수}점 (11-13)` → `{점수}점`. 구간 라벨 괄호 삭제. `getScoreRange` import도 ReportPage에서 제거(미사용)
- **상단 커버 재배치**: 두꺼운 선(`.report-cover` border-top 3px) → `.report-cover-title`(제목, border-bottom 3px 두꺼운 선) → `.report-cover-id`(이름·소속, 조금 아래 padding + border-bottom 1px dotted 점선) → 본문 시작. (기존: 제목·이름·소속 후 두꺼운 선 하나)
- **마무리 재배치**: `.report-closing`(인사 한 줄 가운데 `.report-closing-greeting`, 좌측정렬·max-width 520 폐지 → 가운데·max-width 680, 위 점선은 직전 섹션 border-bottom 하나만 — closing 자체 점선 제거로 이중선 해소, `margin-top: -36px`로 인사 위/아래 28px 대칭) → `.report-footer-bar`(두꺼운 선 border-top 3px, flex space-between: 좌측 `© 2026 MIND2ACTION` 굵게 / 우측 `✉ email`). 기존 `.report-copyright` 단독 div + 세로 나열 contact 폐지. 인스타·전화 라인은 새 한 줄 레이아웃에서 제외(빈 값이었음, 필요 시 별도 설계)
- **커버 제목 폰트**: `.report-cover-brand`(MIND2ACTION) font-weight 300(얇게), 뒤 "성향 코칭 리포트"는 800 유지. 커버 상단 `margin-top: 20px`(숨통, 반절로 축소)
- **§1 그래프 아래 박스 — 시도 후 원복**: ScoreChart 뒤 점선+회색 박스(`.report-traits-box`)를 넣어봤으나 원복. 현재 §1은 `ScoreChart` → `.report-traits`(자아상태별 CM2 항목, 각자 border) 원래 구조. 외곽 박스·divider 없음
- **목적(intro) 아래 여백 축소**: `.report-intro` padding-bottom 40px → 20px (목적 내용과 하단 점선 사이 간격 축소)
- **인쇄 페이지 나눔**: `@media print`의 `.report-section { break-inside: avoid }` 제거 → 섹션이 페이지를 채우며 흐름(빈 공간 방지). §1이 커지며 통째로 다음 장 밀리던 문제 해소. **다음 작업 예정**: break-inside 단위를 섹션보다 작은 단위(자아상태 항목·카드 등)로 잡아 깔끔한 출력

### 역할 → CM 매핑 (5/18 3종 축소)

| 설문 역할 (3종) | 코드 키 | CM 리포트 (3종) |
|----------------|--------|----------------|
| 고객 컨설팅 영업 | `sales` | 보험설계사 (`cm_insurance`) |
| 신인 육성 코칭 | `coach` | 코치/멘토 (`cm_coach`) |
| 조직운영 리더 | `sales_leader` | 관리자 (`cm_manager`) |

> 코드 키는 기존 7종(sales / coach / sales_leader / branch_manager / training_leader / division_head / executive)을 유지. 사용자 화면 옵션은 3종으로 축소하되, 잔여 4종(branch_manager·training_leader·division_head·executive)은 AdminDashboard `JOB_LABELS`·`JOB_TO_REPORT`·`cmLookup.JOB_TO_CM`에 보존 — 기존 샘플 데이터 호환용.

### CM JSON 내부 구조

```json
{
  "job_type": "insurance",
  "job_label": "보험설계사",
  "cm1": { "17-20": { "CP": "...", "NP": "...", ... }, "14-16": {...}, ... },
  "cm2": { (cm1과 동일 구조, 장문) },
  "cm3": { "CP_NP": "강점 텍스트...", "CP_A": "...", ... },  // 20 조합
  "cm4_1": { (cm1과 동일 구조) },
  "cm4_2": { (cm1과 동일 구조, 코칭 불필요 구간은 빈 문자열) },
  "cm4_3": { "all_no_coaching": "...", "some_coaching": "..." },
  "cm4_4": { "CP": { "condition": "0-7", "trait": "...", "coaching": "...", "script": "..." }, ... },
  "cm5": { "CP_NP_A": { "manner": "...", "improvement": "..." }, ... },  // 60 조합
  "cm6": { "CP_NP": "클로징 텍스트...", ... },  // 20 조합
  "cm7": { "CP_NP_A": "리크루팅 텍스트...", ... },  // 60 조합
  "cm8": { "CP": { "encourage": "...", "improve": "..." }, ... }  // TOP 5유형 (BOTTOM 무관)
}
```

### 조회 키 정규화

점수구간 라벨: `17-20` / `14-16` / `11-13` / `8-10` / `0-7`
TOP/BOTTOM 키: `{TOP1}_{TOP2}` 또는 `{TOP1}_{TOP2}_{BOTTOM}` (예: `CP_NP_A`)

### CM 조회 로직

```
입력: { scores: {CP, NP, A, FC, AC}, top1, top2, bottom }

1. 점수 → 구간 분류:
   17+ → "17-20", 14-16 → "14-16", 11-13 → "11-13", 8-10 → "8-10", 0-7 → "0-7"

2. CM1: cm1[구간][유형] × 5
3. CM2: cm2[구간][유형] × 5
4. CM3: cm3[`${top1}_${top2}`]
5. CM4-1: cm4_1[구간][유형] × 5
6. CM4-2: cm4_2[구간][유형] (빈 문자열이면 코칭 불필요)
7. CM4-3: 모든 유형이 조율 불필요 → all_no_coaching (some_coaching은 5/18 폐기)
   조율 불필요 조건: 역할별 안전구간(§2 표) 안. `needsCoaching(ego, score, jobType)` → `SAFE_RANGES[role][ego]` 밖이면 필요
8. CM4-4: CP/NP/A/FC 0-7점 또는 AC 17+일 때만 트리거 (세밀한 코칭 — 17점 초과 대상은 5/18 미결, 손소장 확정 대기)
9. CM5: cm5[`${top1}_${top2}_${bottom}`]
10. CM6 (컨설턴트만): cm6[`${top1}_${top2}`] (조합 텍스트, 없으면 생략) + **cm6_common 3섹션** (점수·조합 무관 공통, `cm6_common_consultant.yaml`의 title·body) 하단 항상 추가. v0.7
11. CM7: cm7[`${top1}_${top2}_${bottom}`]
12. CM8: cm8[`${top1}`] (TOP만으로 조회, BOTTOM 무관)
```

### 엑셀 원본 행 구조 (변환 참조)

> ⚠️ 아래 행 번호는 컨설턴트 기준. **코치/리더는 빈 줄 수가 달라 행이 위로 당겨진다**(예: CM3 TOP1이 컨설턴트 행5 vs 코치/리더 행3). 그래서 `convert_cm.py`는 행 번호가 아니라 라벨("구분 TOP 1" 등)을 앵커로 스캔한다. 이 표는 사람이 구조를 읽는 참조용.

| 시트 | 키 행 | 데이터 행 |
|------|-------|----------|
| CM1 | 행1(점수구간 헤더) | 행2~6 |
| CM2 | 행1 | 행2~6 |
| CM3 | 행5(TOP1), 행6(TOP2) | 행7 |
| CM4-1 | 행1 | 행2~6 |
| CM4-2 | 행1 | 행2~6 |
| CM4-3 | 행1(조건 헤더) | 행2 |
| CM4-4 | 행1(유형), 행2(조건) | 행3(성향), 행4(코칭), 행5(화법) |
| CM5 | 행4(TOP1), 행5(TOP2), 행6(BOTTOM) | 행7(말투), 행8(코칭) |
| CM6 | 행6(TOP1), 행7(TOP2) | 행8 |
| CM7 | 행3(TOP1), 행4(TOP2), 행5(BOTTOM) | 행6 |
| CM8 | 행1(TOP), 행2(BOTTOM) | 행3(격려), 행4(개선) |
