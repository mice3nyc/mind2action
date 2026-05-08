# MIND2ACTION — 기술 명세 (SPEC)

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
| 6 | 직무 | select | Y | 영업 / 코치·멘토 / 영업팀장·센터장 / 지점장·지사장 / 교육팀장·지원팀장 / 사업단장·부장 / 본부장 |
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

**성공구간**: CP/NP/A: 14~16점, FC/AC: 11~13점

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

> Phase 3 진입 시 상세화. 현재는 구조 참조용.

CM1~CM8 조회 테이블. 직군별 3종.
조회 키: 점수 구간(CM1,2,4계열) 또는 TOP/BOTTOM 조합(CM3,5,6,7,8).
상세: `ARCHITECTURE.md` + `current_projects/_에고그램/에고그램_리포트 자동화 - 데이터 구조 분석.md`
