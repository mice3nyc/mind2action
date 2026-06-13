# MIND2ACTION — 기술 명세 (SPEC)

> **현재 빌드: v0.10** (6/9, 세션453) — 손소장 26.0607 미반영 진단 + 3건 수정 배포. 빌드식별자 "v0.10 · 0609-1650 · 77f2fcb", 라이브 번들 `index-BZs4tR0k.js`. 상세 = §10 "v0.10 후속".
> 이전: v0.10 (6/9, 세션451) — 손소장 26.0607 수정 14건. 이전: v0.7 (5/25) — 손소장 26.0525 수정 5건 + 리포트 헤더·마무리 정리. 역할별 안전구간 테이블(§1 그래프 경계선 + §3 조율 발동 통합), 컨설턴트 CM6 공통 3섹션, "코칭"→"조율" 라벨, 결과화면 총점·재시도 삭제. 호칭 일원화(②)는 드라이브 "에고그램 리포트 콘텐츠 데이터" 시트 수령 후 보류.
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

**안전구간 (조율 불필요, v0.11 전 역할 통일)** — §1 그래프 경계선 밴드 + §3 조율 발동 로직이 공유하는 단일 기준 (`scoreEngine.SAFE_RANGES`). **cm4_3(`all_no_coaching`) 표시 조건은 화면 §3 조율 needs와 정확히 일치** — `allNoCoaching` = 모든 ego가 `!needsDetailedCoaching && !(needsCoaching && !isNoAdjust(cm4_2))`. v0.10 후속에서 단일화 완료.

| 역할 | CP | NP | A | FC | AC |
|------|----|----|---|----|----|
| 세 역할 공통 (v0.11) | 11-20 | 11-20 | 11-20 | 11-20 | 8-16 |

> **v0.11 (손소장 26.0611 item 10·11)**: v0.7의 역할별 표를 폐기하고 세 역할 공통 CP·NP·A·FC=11-20, AC=8-16으로 통일. 손소장이 제시한 두 옵션(그래프 점선 제거 / 구간 통일) 중 통일을 채택 — 26.0611 xlsx CM4-2 시트의 빈 셀 패턴(본문이 있는 셀 = CP·NP·A·FC 8-10, AC 17-20뿐)이 정확히 이 구간을 전제하고 있고, item 10(리더 AC 14-16 조율 카드 제거)도 함께 해소된다. 그래프 점선 밴드는 새 구간으로 유지.
> 구버전 표(v0.7 역할별): 컨설턴트 CP/NP/FC 11-16·A 14-20·AC 8-16, 리더 CP/FC 11-16·NP/A 14-20·AC 8-13, 코치 CP/FC/AC 11-16·NP 14-20·A 11-20.
> 점수가 구간 밖이면 조율 필요. `getSuccessRange(ego, jobType)` / `needsCoaching(ego, score, jobType)` 모두 이 표를 참조한다. jobType→role은 `roleFromJobType` (sales_leader 등 잔여 키 → manager).

### TOP / BOTTOM 결정
- **동점 우선순위**: A > CP > NP > FC > AC (TOP, BOTTOM 모두 동일) — v0.11 손소장 26.0611 item 1로 변경 (구: CP > A > NP > AC > FC)

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
- `/#/report/:id` — 개인 리포트. **ReportPageV2 = 최종 형태** (26.0604 확정, v1/v3 폐기)
- `/#/report-batch/:campaignId` — 단체 일괄 PDF (ReportBatchPage → ReportViewV2, 단일 리포트와 v2 공유)

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

### 빌드 식별자 (v0.10 후속 추가)

`vite.config.js`의 `define`으로 `__BUILD_ID__` 자동 주입 — `"v{버전} · {빌드시각} · {커밋해시7자리}"`. 리포트 footer-bar 우측 `.report-footer-build`(작은 회색 글씨)에 표시. "어느 빌드를 봤나" 라이브 추적용(구버전 캐시 오인 방지).

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
| `src/data/cm_insurance.yaml` | 컨설턴트(sales) | v0.8 전체 재변환 + **5/25 CM6 클로징 재정정**(9조합), cm6 조합 20 + cm7 60 |
| `src/data/cm_manager.yaml` | 리더(manager) | v0.8 전체 재변환 (cm1·cm8만 보존) |
| `src/data/cm_coach.yaml` | 코치(coach) | v0.8 전체 재변환 (cm1·cm8만 보존) |
| `src/data/cm6_common_consultant.yaml` | 컨설턴트 CM6 공통 | **5/25 재정정** — 소제목을 시트 좌열로 교체(고객의 실제 심리 해석/재질문 및 재결정 유도/최종 진행 멘트), 본문 2섹션 갱신 |
| `src/data/identity.yaml` | 인물상 (직군 공통) | **26.0611 신설** — §1·§2 첫 정의 "OOO님은 ___한 분". top1_top2 20조합 `{title, desc}`. 원본: [[에고그램 인물상 20조합 검토 요청 - 손소장]](9 기존 + 11 신규, 손소장 26.0611 ㅇㅋ). `ReportPageV2`의 인라인 `IDENTITY` 폐지, yaml import로 교체. 미충원 조합 fallback 합성(`EGO_STRENGTH`)은 안전망으로 유지 |

> **5/25 CM6 재정정**: 손소장 새 파일 `Assets/incoming/에고그램/data/컨설턴트로 수정 - 손소장.xlsx`(CM6 시트 + CM6 공통적용 시트 추가). CM6만 정정 요청 — cm6 클로징 9조합("고객님은~" → "이 상황에서 컨설턴트는~" 화자 정정) + cm6_common 3섹션(좌열=소제목, 우열=본문). cm2~cm5·cm7은 현재 yaml과 동일 확인하고 건드리지 않음. cm4_2 2셀("코칭이 필요없는 구간"→"조율이 필요없는 구간")은 별도 발견, 반영 여부 피터공 확인 대기

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

**v0.9 재변환 (6/4 회의 — convert_cm.py 확장)**:
- **xlsx 경로**: `Archives/{role}.xlsx` → `data_260604_{role}.xlsx` (BASE 변수)
- **신규 시트 파서 3개**: CM4-5(`A1` 단일셀 → `cm4_5` 문자열), 마지막글(`A1` 단일셀 → `closing` 문자열), CM5-1(combo_block 재사용, 본문 1행 → `cm5_1` 60조합 맵)
- **CM6공통적용 → cm6_common**: 신 시트에서 (소제목 좌열, 본문 우열) 재추출 → `cm6_common_consultant.yaml` 갱신(2섹션). 계약체결 행 제거됨
- **cm7 폐기**: 컨설턴트 CM7 시트·코치/리더 CM6(리크루팅) 시트 모두 사라짐 → `cm7= {}` 빈 객체. 렌더는 이미 폐기 상태라 무영향
- **시트명 변화**: CM5 = 컨설턴트 "CM5"/리더 "CM5추가"/코치 "CM5 코칭 추가"(접두어 매칭 유지). CM3 = "CM3강점 추가"(공백 포함, 정규화 매칭)

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
- **인쇄 페이지 나눔 (v0.8 정밀화)**: `@media print`에서 `break-inside: avoid`를 섹션 통째가 아니라 **원자 단위**에만 적용 — `.report-cover`·`.report-intro`·`.report-chart`·`.report-trait-item`(자아상태 항목)·`.report-strength-badge`·`.report-coaching-item`(코칭 항목)·`.report-coaching-message`·`.report-combination`·`.report-cm6-common-item`(CM6 카드)·`.report-closing`·`.report-footer-bar`. 항목 하나가 페이지 경계에서 쪼개지지 않으면서, 단위가 작아 남은 공간을 채우므로 빈 공간도 최소화. 제목 고립 방지로 `break-after: avoid`를 `.report-section-title`·`.report-intro h2`에 적용. 문단 고아·과부 줄은 `orphans: 2; widows: 2`
- **인쇄 컬러 바 출력 (5/25)**: 브라우저는 기본적으로 배경색을 인쇄하지 않아 그래프 컬러 바·색 라벨이 흰색으로 빠짐. `@media print`에서 `-webkit-print-color-adjust: exact; print-color-adjust: exact`를 `.report-container`(전체 캐스케이드) + `.report-chart-bar`·`.report-chart-success`·`.report-score-cell-label`(명시)에 적용
- **§4(성향의 조율) 소제목 삭제 (5/25)**: cm5 블록의 `s5_manner`("이 성향의 말투와 태도")·`s5_improvement`("개선이 되는 코칭 내용") h4 두 개 제거. manner 본문 → `.report-cm5-improvement`(margin-top 16) 안의 improvement 본문 순서로 흐름. 두 텍스트 사이 16px 간격만으로 구분
- **신인 리크루팅 레벨업(cm7) 섹션 삭제 (5/25)**: `s7_title` "신인 리크루팅 레벨업" 섹션 렌더 폐기(cm7 yaml/lookup 데이터는 보존). cm7은 항상 마지막 섹션이었으므로 번호 시프트 없음 → 보험설계사 최대 §5(cm6), 코치/리더 최대 §4(cm5)

### 리포트 렌더링 변경 (v0.9 — 손소장 26.0604)

> 원본: `Assets/incoming/에고그램/data/data_260604_{리더|컨설턴트|코치}.xlsx` (직군당 10~12시트). 회의 메모: 같은 폴더 `26.0604 수정 사항 회의 내용.md`. 신규 시트 3개(CM4-5·CM5-1·마지막글) + 기존 시트 본문 교체. **리쿠르팅(cm7) 시트 전 직군에서 사라짐 → cm7 데이터·렌더 완전 폐기.**

- **콘텐츠 전면 교체 (구조 동일)**: CM2·CM3·CM4-1·CM4-2·CM4-4·CM5·CM6·CM6공통 = 가독성 다듬기·서술형화. 변환기로 재변환만 하면 됨. CM4-1-1은 피터공이 CM4-1로 합쳐 신규 시트 아님. CM4-4 "D5 화법" 삭제는 시트에 이미 반영됨
- **CM5 한글 괄호 (리더·코치)**: cm5 본문 셀 안에 에고 코드 뒤 한글 표기 추가(예: `CP(기준,결단)`). 본문 텍스트라 변환기가 그대로 가져옴. 별도 렌더 분기 불필요
- **CM4-5 신규 (단일 블록)**: 시트 1셀 = 모든 대상 공통 안내문("현재 조율 포인트를 이미 인식하고 계시고…"). yaml `cm4_5`(문자열). **§3 조율 포인트 카드들 다음, 섹션 끝에 렌더.** 조건: `!allNoCoaching`일 때만(조율 필요 성향이 하나도 없는 사람은 제외 — allNoCoaching이면 기존 `cm4_3.all_no_coaching`만 표시). `.report-cm4-5`
- **CM5-1 신규 (60조합 한 줄)**: 시트 = `구분 TOP1/TOP2/BOTTOM` 3행 + 본문 1행, top1_top2_bottom 키 60조합(cm5와 동일 키). yaml `cm5_1`(문자열 맵). **§4 제목 바로 아래, cm5.manner 위에 한 줄로 렌더.** `.report-cm5-oneliner`
- **컨설턴트 §4 제목 변경**: `s5_title_insurance` "보장에 대한 제안을 할 때" → **"상품 제안을 할 때"** (ui_texts.yaml)
- **CM6 공통 계약체결 삭제**: cm6_common 3섹션 → **2섹션**(고객의 실제 심리 해석 / 재질문 및 재결정 유도). "최종 진행 멘트(계약체결)" 행 제거. 신 xlsx의 CM6공통적용 시트로 재변환
- **마지막글 신규 (단일 블록)**: 시트 1셀 = 직군별 닫는 글(🍀…🌱, 여러 문단). yaml `closing`(문자열). **`.report-closing` 안, 기존 generic greeting 대신 이 본문을 렌더**(있으면 우선, 없으면 greeting fallback). 푸터 바(이메일·카피라이트)는 유지. 이모지는 손소장 원본 그대로 보존
- **§3 조율 불필요 성향 나열 줄 삭제**: "지금 균형이 좋아 따로 조율할 것이 없는 성향: …"(`.report-coaching-ok-line`, okEgos 나열) 제거 — 손소장 "조율이 필요없는 성향은 표기하지 않았으면". `cm4_3.all_no_coaching`(전원 안전구간일 때 메시지)은 유지. (okEgos 변수는 IIFE에 남아있으나 미사용)
- **OOO 치환**: cm5_1·cm4_5·closing 본문의 `OOO` 플레이스홀더는 렌더 시 `report.name`으로 치환(`.replace(/OOO/g, report.name)`)
- **§4 말투/화법 샘플 개별 라인 렌더 (6/5)**: `Paragraphs` 컴포넌트에 `breaks` prop 추가 — 기본은 문단 내 단일 줄바꿈을 공백으로 합치지만(산문 한 흐름), `breaks`면 단일 줄바꿈을 `<br>`로 보존. **cm5.manner·cm5.improvement에만 적용**(`<Paragraphs ... breaks />`). 리더·코치 manner의 따옴표 말투 샘플, 컨설턴트 improvement의 🗣 화법 샘플이 한 줄로 합쳐지던 것을 각 샘플 개별 라인으로 분리. **yaml은 이미 줄바꿈 보유 — 데이터 변경 없이 렌더러만 수정.** manner 산문은 각 문장이 한 줄로 작성돼 있어 영향 없음(소프트랩 0)
- **본문 에고 라벨 색 코딩 (6/5)**: 본문 안 인라인 라벨 `XX(한글,한글)`(손소장이 cm3·cm5 본문에 직접 써넣음)을 §1과 동일한 `EGO_COLORS`로 색칠. `colorizeEgo()` 헬퍼가 `Paragraphs` 안에서 정규식 `(CP|NP|FC|AC|A)\([가-힣,·]+\)` 매칭. **색·표기는 코드 기준**(`EGO_PLAIN_LABEL`) → ① 쉼표를 §1처럼 가운뎃점(·)으로 통일 ② **손소장 본문의 `FC(배려,공감)` 오타(코치 cm3 2곳)가 화면에서 `FC(친화·표현)`로 자동 교정**(FC=친화·표현, 배려·공감은 NP). 코드+한글을 한 덩어리로 색칠하므로 조사(가/의)는 손대지 않아 문장 자연스러움 유지. 데이터 무변경. **남은 일: 손소장 원본 xlsx의 FC(배려,공감) 2곳 정정 권유**(재변환 전까지는 화면 교정으로 가려짐)
- **에고 라벨 중립 통일 (`EGO_LABELS`)**: TA 정식명(통제적 부모·자상한 부모·어른 자아·자유로운 아이·순응하는 아이)이 부정적으로 읽혀 → 리포트가 이미 쓰던 중립 키워드(`기준·결단`/`배려·공감`/`이성·판단`/`친화·표현`/`협조·조율`)로 `scoreEngine.EGO_LABELS` 교체. 결과 화면(ResultPage)·admin CSV가 이 라벨을 쓰며 리포트(EGO_PLAIN_LABEL)와 일치. 손소장 데이터 라벨 셀의 `CP(기준,결단)` 한글은 같은 의도이며, 변환기 `ego_code()`가 조회 키에서는 코드만 추출
- **조회 키 정규화 (변환기)**: 리더·코치 일부 콤보 시트 라벨 셀에 `CP(기준,결단)` 한글이 섞임 → `ego_code()`로 코드만 뽑아 키 오염 방지(`CP_NP_A`로 정규화)

### 리포트 렌더링 변경 (v0.10 — 손소장 26.0607)

> 원본: `Assets/incoming/에고그램/data/260609_{리더로 수정 - 손소장|컨설턴트로 수정 - 손소장|코치로 통합 수정-손소장}.xlsx`. 수정 목록: 같은 폴더 `260609_수정사항.md`(14건). 변환기 입력 경로를 `ROLE_FILE` 딕셔너리로 교체(파일명 패턴이 직군마다 달라 명시 매핑). 구조는 v0.9와 동일 — 재변환만으로 콘텐츠 8건 반영.

- **콘텐츠 자동 교체 (재변환)**: CM2 부드럽게(1)·CM3 단어(2)·CM4-1 부드럽게(3)·CM4-5 추가(7)·CM5 수정(9)·CM5-1 수정(11)·마지막글 짧게(13). CM4-4 재작성+'화법예시 삭제'(6) → script 칸이 비어 렌더가 조건부로 숨김(`{detailed.script && …}`), 코드 변경 불필요. 컨설턴트 CM6 '첫째/둘째/셋째' 삭제(12) → 손소장이 xlsx에서 제거, 재변환으로 0건, 코드 변경 불필요
- **item 5 — CM4-3 이름 치환 + 다단락**: `cm4_3.all_no_coaching` 셀이 "OOO님은 모든 점수가 '조율이 필요 없는 구간'에 있습니다." + 다단락 + ⚠️(17점↑ 강점·최저 성향 조언) 블록을 한 셀에 담음. 렌더를 `<p>{report.cm4_3}</p>` → **`<Paragraphs text={report.cm4_3.replace(/OOO/g, report.name)} />`** 로 교체(이름 치환 + 줄바꿈 보존). 조건은 기존대로 `allNoCoaching`일 때만
- **item 4 — '조율이 필요없는 구간' 센티넬 제외**: 손소장이 CM4-2 본문에 높은/중간 점수대를 **"조율이 필요없는 구간"** / **"성향 에너지가 다소 강하지만 조율은 필요없는 구간"** 으로 표기(17점↑·강점이 조율 포인트로 잘못 노출되던 문제 차단). §3 루프에서 `cm4_2[ego]`가 이 센티넬이면 그 성향을 조율 포인트 카드에서 제외(okEgos로). 헬퍼 `isNoAdjust(text)` = `/조율[이은]?\s*필요\s*없는\s*구간/`. **단 `detailed`(cm4_4: AC≥17 / 그 외≤7)는 우선이라 영향 없음** — AC 과조율은 여전히 상세 카드로 표시. 0-7·8-10 실제 조율 본문은 센티넬 아님 → 그대로 노출
- **item 4 — 그래프 점선 재표시**: `.report-chart-success`(SAFE_RANGE 밴드, 양끝 1px dashed)가 컬러 막대에 가려 안 보이던 것 → `z-index`로 막대 위에 올리고, 차트 아래 범례 "점선 안 = 조율이 필요없는 구간" 추가. (밴드 기준은 SAFE_RANGE 유지 — 17점↑까지 확장 여부는 피터공 확인 대기)
- **item 8·10 — 컨설턴트 §4 소제목 두 개**: §4(제목 "상품 제안을 할 때") manner 위 **"제안시 이 성향의 태도"**(손소장: '…태도와 말투'에서 '말투' 제거) + improvement 위 **"개선에 도움이 되는 코칭과 화법예시"**. **컨설턴트(isInsurance)만**. 리디자인(ReportPageV2) 때 빠져 있던 것 복원 — git 어디에도 없어 신규 추가. `.report-cm5-subhead`
- **item 14 — 조사 고정**: `getIdentity` fallback 타이틀 `${EGO_STRENGTH[top1]}과(와) ${EGO_STRENGTH[top2]}이…` → **`과`로 고정**(EGO_STRENGTH 다섯 값 전부 받침으로 끝나 항상 '과'). 라이브에 "차분한 분석과(와)…"로 노출되던 버그

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
  "cm5_1": { "CP_NP_A": "한 줄 특징...", ... },  // 60 조합 (v0.9 신규, §4 제목 아래)
  "cm6": { "CP_NP": "클로징 텍스트...", ... },  // 20 조합 (컨설턴트만)
  "cm4_5": "조율 필요 시 공통 안내문...",        // v0.9 신규, 단일 문자열, §3 끝
  "closing": "마지막글 본문...",                  // v0.9 신규, 단일 문자열, .report-closing
  "cm7": { ... },   // v0.9 폐기 — 리쿠르팅 시트 사라짐. 빈 객체 유지(렌더 없음)
  "cm8": { "CP": { "encourage": "...", "improve": "..." }, ... }  // TOP 5유형 (BOTTOM 무관, 렌더 폐기)
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

### 리포트 렌더링 변경 (v0.10 후속 — 손소장 26.0607 미반영 진단)

> 세션453. 손소장이 "(3)(4)(6)+모은경 CM4-3 누락"이 반영 안 됐다 했으나 대조 결과 (4)CM4-2 센티넬·(6)CM4-4 화법예시 삭제·그래프 점선은 세션451 빌드에 이미 반영돼 있었음(손소장이 구버전 캐시를 본 것으로 추정). 실제 미해결은 모은경 CM4-3 누락 하나뿐이었고 이번에 수정. 커밋 `77f2fcb`, 라이브 번들 `index-BZs4tR0k.js`.

- **cm4_3 누락 버그 수정**: `cmLookup.js`의 `allNoCoaching` 판정이 `needsCoaching`(SAFE_RANGE 기준)만 보고, 화면 §3 조율카드 판정(`isNoAdjust` 센티넬 + `needsDetailedCoaching`)을 반영하지 않았음. 17점↑ 성향이 있는 경우(예: 모은경) 화면엔 5개 다 조율 불요인데 cm4_3 안내문이 누락되던 버그. 수정: `allNoCoaching = every ego: !needsDetailedCoaching && !(needsCoaching && !isNoAdjust(cm4_2))`. `isNoAdjust` 함수를 `ReportPageV2`에서 `cmLookup`으로 이관해 단일 소스 공유.
- **손소장 수정사항(3) 반영**: §1 "성향별로 자세히 보기"의 나머지 성향(top1·top2 제외) 한 줄에 들어가던 `plainTranslation`(cm1 키워드 축약)을 `cm4_1` 텍스트(손소장이 다듬은 성향×점수구간별 한 줄 묘사)로 교체. top1·top2는 cm2 본문이 있어 그대로.
- **리포트 하단 빌드 식별자**: `vite.config.js` `define`으로 `__BUILD_ID__` 자동 주입("v0.10 · 빌드시각 · 커밋해시7자리"). 리포트 footer-bar 우측 `.report-footer-build`(작은 회색 글씨). 라이브 구버전 캐시 오인 방지용.
- **cm4_3/cm4_5 ⚠️ 블록 개인화** (`d36946b`): cm4_3(조율불요 안내문)·cm4_5(조율 포인트 있음) 끝의 고정 "⚠️ 만약 17점 이상…/가장 낮은 성향…" 블록을 점수 기반 동적 생성으로 교체. (1) ⚠️ 이모지 제거 (2) 앞 본문과 한 줄 띄워 별도 문단(`.report-adjust-note`, margin-top 18px) (3) 실제 17점↑ 성향을 이름(§1 `EGO_PLAIN_LABEL`)으로 명시 — 없으면 단락·"또한" 자동 생략, 최저 성향(`bottom`)도 구체화. 구현: yaml 본문 끝 ⚠️ 블록을 `stripWarnBlock(/⚠️[\s\S]*$/)`로 제거 + `buildAdjustNote(scores, bottom, name)` append. 손소장 데이터(yaml)는 무수정 — 코드에서 strip+동적 생성. 복수 17점↑은 `joinEgoLabels`(2개="A과 B", 3+=", " 나열).
- **본문 에고 라벨 코드 제거** (`7b9c45b`): `colorizeEgo`가 본문의 "AC(협조·조율)"류를 그릴 때 코드(`AC`)·괄호를 빼고 한글 유형명("협조·조율")만 표시(색·볼드 유지). 출력 `{code}({EGO_PLAIN_LABEL[code]})` → `{EGO_PLAIN_LABEL[code]}`. `colorizeEgo` 쓰는 §2·§3·§4 전 본문 공통. 매치 정규식은 코드 기준 유지(손소장 FC 오타 자동교정 효과 그대로), 뒤 조사는 원문 유지.

### 리포트 렌더링 변경 (v0.11 — 손소장 26.0611, 수정요청 11건)

> 원본: `Assets/incoming/에고그램/data/26.0611_{리더로 수정 - 손소장|컨설턴트로 수정 - 손소장|코치로 통합 수정-손소장}.xlsx` + 수정요청 목록 `6월11일 수정요청 내용 - 정리.csv`(11건). 시트 구조는 v0.9·v0.10과 동일 — 변환기 `ROLE_FILE`만 26.0611 파일명으로 교체해 재변환.

**데이터 (재변환으로 반영 — item 2 일부·5·6·7·9 본문)**:
- **호칭 OOO화**: CM3(20조합 전부 "OOO님은…"으로 시작)·CM5·CM6(컨설턴트)에 OOO 플레이스홀더 대량 유입(리더 CM5 252개 등). "이 성향의 리더님/코치님/컨설턴트님" → 이름 직접 호명. CM4-3도 "OOO님은 모든 점수가…"로 재작성
- **CM4-2 구조 개편 (item 8·9·10의 데이터 면)**: 본문 있는 셀 = CP·NP·A·FC 8-10점 + **AC 17점이상(신규 조율 멘트)**. 17점이상 CP는 센티넬("조율이 필요없는 구간"), 나머지 셀 전부 빈칸. 0~7점 행 빈칸(CM4-4가 담당). 컨설턴트 AC 0~7 셀의 "조율이 필요함 - 신설"은 손소장 주석 — 렌더에서 미사용(AC 0-7은 cm4_4가 우선)이라 그대로 보존
- **CM4-4 전원 0~7점 (item 9)**: AC 컬럼이 17점이상 → 0~7점으로 교체(이중 컬럼 폐지). 다섯 성향 모두 0~7 조건 + 본문 재작성. script 행은 빈칸 유지

**변환기 (`convert_cm.py`)**:
- `ROLE_FILE` → `26.0611_*` 파일명
- `parse_cm4_4` TRIGGER: AC `'17+'` → `'0-7'` (전 성향 0-7 단일 조건)

**코드**:
- **item 1 — 동점 우선순위 변경**: `scoreEngine.TIE_PRIORITY` `['CP','A','NP','AC','FC']` → `['A','CP','NP','FC','AC']` (TOP·BOTTOM 공통). 손소장: 어려우면 원안 유지 가능했으나 단순 변경이라 적용
- **item 8·9 — AC 상세조율 트리거 반전**: `cmLookup.needsDetailedCoaching` = 전 성향 `score <= 7` (기존: CP/NP/A/FC ≤7 또는 AC ≥17). AC 0-7 → cm4_4 상세 카드, AC 17+ → 일반 needsCoaching 경로로 cm4_2['17-20']['AC'] 신규 멘트 표시
- **item 10·11 — 안전구간 통일**: `SAFE_RANGES` 세 역할 공통 CP·NP·A·FC=[11,20], AC=[8,16] (§2 표 참조). 리더 AC 14-16 조율 카드 자동 소멸. 그래프 점선 밴드는 새 구간으로 유지(손소장 두 옵션 중 통일 채택)
- **item 4 — 본문 에고 라벨 "성향" 접미 + 조사 교정**: `colorizeEgo` 출력 `{한글라벨}` → `{한글라벨} 성향`(색·볼드는 라벨+성향 한 덩어리). 원문에서 라벨 바로 뒤가 "성향"이면 중복 방지로 접미 생략. 라벨 뒤 조사는 '성향'(받침 ㅇ) 기준으로 교정: 가→이, 는→은, 를→을, 와→과, 로→으로 (이미 맞는 이/은/을/과는 그대로)
- **item 3 — CM4-5 동적 안내문 컬러**: `buildAdjustNote`가 성향 이름을 평문 대신 `CODE(라벨)` 패턴으로 출력 → `Paragraphs`→`colorizeEgo` 기존 파이프라인이 색·"성향" 접미 처리. 템플릿의 리터럴 " 성향"은 제거(접미와 중복 방지). cm4_3 블록의 동적 안내문도 동일 적용(item 4 "리포트 전체"와 일관)
- **item 2 — CM4-5 두 단락 순서 교체**: `.report-cm4-5` 블록에서 동적 조율 안내(`buildAdjustNote`)를 먼저, 기본 격려 단락(cm4_5 본문 "이미 인식하고 계시다면…")을 나중에 렌더. ⚠️ 해석 주의: 참고 링크(구글 시트 CM4-5 탭)가 비공개라 직접 확인 못 함. xlsx CM4-5 본문은 현행과 동일 → "두 단락" = 화면의 두 단락(기본 단락 ↔ 동적 안내)으로 해석. 조율 안내 먼저 → 격려로 마무리. cm4_3 블록은 대상 아님(언급 없음)
- **item 5·6·7 — OOO 치환 전역화**: 개별 `.replace(/OOO/g, name)` 산재(cm4_3·cm4_5·cm5_1·closing) → `ReportViewV2`에서 lookup 직후 report 객체 전 텍스트 필드 일괄 치환(`deepReplaceOOO`). cm3·cm5·cm6 등 신규 OOO 유입 섹션 자동 커버, 기존 산재 replace 제거

### 리포트 렌더링 변경 (v0.12 — 피터공 26.0613, 섹션 폭 통일)

- **본문 문단 폭 통일 (④)**: 리포트 섹션 본문이 섹션 구분 점선(`.report-section` border-bottom, 컨테이너 폭 `.main-report` 720px − 좌우 패딩 24px = 약 672px) 끝까지 가지 못하고 우측에 갭이 생기던 문제. 원인 = 전역 `p { max-width: 600px }`(`praxi.css` line 62, 설문·랜딩·결과 페이지 가독 줄길이용)가 리포트 문단에도 적용돼 600px에서 조기 줄바꿈. **수정**: `.report-container p { max-width: none }` 추가(line 759 직후) — 리포트 안에서만 전역 제한 해제, 다른 페이지 무영향. 가운데 정렬 마무리(`.report-closing p { max-width: 680px }`, line 911)는 더 뒤 규칙이라 그대로 유지. CSS 한 줄 변경, 데이터·JSX 무변경
