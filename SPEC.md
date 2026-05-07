# MIND2ACTION — 기술 명세 (SPEC)

> Phase 1 중심. 이후 Phase 진입 시 확장.

## §1 설문 구조

### 기본정보 필드

| # | 필드 | 타입 | 필수 | 비고 |
|---|------|------|------|------|
| 1 | 이름 | text | Y | |
| 2 | 생년월일 | text (8자리) | Y | YYYYMMDD |
| 3 | 경력 | number (개월) | Y | |
| 4 | 소속 | text | Y | |
| 5 | 직무 | select | Y | 보험설계사 / 관리자(지점장) / 코치,멘토 |
| 6 | 직전 3개월 평균 소득 | select | N | 200만원 미만 ~ 2000만원 이상 (미결 #3) |
| 7 | 직전 1년 리크루팅 수 | number | N | 미결 #6 |

### 설문 문항

- **총 50문항**, 5개 자아상태 × 10문항
- **응답 형식**: 3점 리커트
  - "그렇다" = 2점
  - "어느 쪽도 아니다" = 1점
  - "그렇지 않다" = 0점

### 문항 → 자아상태 매핑

| 자아상태 | 약어 | 문항 번호 | 한글명 |
|----------|------|-----------|--------|
| Critical Parent | CP | Q1~Q10 | 통제적 부모 |
| Nurturing Parent | NP | Q11~Q20 | 자상한 부모 |
| Adult | A | Q21~Q30 | 어른 자아 |
| Free Child | FC | Q31~Q40 | 자유로운 아이 |
| Adapted Child | AC | Q41~Q50 | 순응하는 아이 |

### 문항 텍스트 (50개)

출처: `Assets/incoming/에고그램/설문지 .xlsx` > "각 유형 별 항목" 시트.
React 앱에서는 `src/data/questions.json`으로 관리.

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
| 중 | 11~13 | 보통 (유연/균형) |
| 저 | 8~10 | 해당 성향 약함 |
| 극저 | 0~7 | 해당 성향 매우 약함 |

**성공구간** (리포트 참조용):
- CP / NP / A: 14~16점
- FC / AC: 11~13점

**코칭 불필요 구간** (CM4-2 기준):
- CP / NP / A: 11~16점
- FC / AC: 8~13점

### TOP / BOTTOM 결정

- **TOP1**: 5개 자아상태 중 최고 점수
- **TOP2**: 두 번째 높은 점수
- **BOTTOM**: 최저 점수
- **동점 우선순위**: CP > A > NP > AC > FC (TOP, BOTTOM 모두 동일 규칙)

### 결과 객체

```javascript
{
  scores: { CP: 14, NP: 18, A: 12, FC: 9, AC: 11 },
  grades: { CP: "고", NP: "극고", A: "중", FC: "저", AC: "중" },
  top1: "NP",
  top2: "CP",
  bottom: "FC",
  total: 64
}
```

## §3 React 앱 구조

```
_dev/mind2action/
├── PLAN.md
├── SPEC.md
├── TASKS.md
├── package.json
├── src/
│   ├── App.jsx                  # 라우팅
│   ├── components/
│   │   ├── Survey/
│   │   │   ├── SurveyForm.jsx   # 기본정보 + 50문항 폼
│   │   │   └── QuestionCard.jsx # 개별 문항 카드
│   │   ├── Result/
│   │   │   ├── ResultPage.jsx   # 결과 화면
│   │   │   └── ScoreChart.jsx   # 막대 그래프
│   │   └── Layout/
│   │       ├── Header.jsx       # MIND2ACTION 헤더
│   │       └── Footer.jsx
│   ├── lib/
│   │   └── scoreEngine.js       # 점수 계산 로직
│   ├── data/
│   │   └── questions.json       # 50문항 데이터
│   └── styles/
│       └── praxi.css            # PRAXI 기반 스타일
└── public/
    └── index.html
```

## §4 디자인 명세

PRAXI 스타일 기반 (`style-collection/praxi/README.md` 참조).

### 색상

| 용도 | 값 |
|------|-----|
| 배경 | `#ffffff` |
| 텍스트 | `#19191ad9` |
| 강조 | `#19191ae6` |
| 보조 배경 | `#fafafa60` |
| 버튼 배경 | `#19191ad9` |
| 버튼 텍스트 | `#ffffff` |

### 폰트

| 용도 | 폰트 | 굵기 |
|------|-------|------|
| 헤더 | Urbanist | 700 |
| 본문 | Work Sans | 400 |
| 보조 | Albert Sans | — |

### 레이아웃

- 콘텐츠 최대 너비: 760px
- 와이드 최대 너비: 1200px
- 모바일 대응: clamp() 기반 반응형

## §5 데이터 스키마 (Phase 2 — Supabase)

> Phase 1에서는 로컬 state만 사용. Phase 2 진입 시 아래 스키마로 마이그레이션.

### organizations (조직/그룹)

```sql
id uuid PRIMARY KEY,
name text NOT NULL,
created_at timestamptz DEFAULT now()
```

### participants (참여자)

```sql
id uuid PRIMARY KEY,
org_id uuid REFERENCES organizations,
name text NOT NULL,
birth_date text,          -- YYYYMMDD
career_months integer,
department text,
job_type text,            -- insurance / manager / coach
income_range text,
recruit_count integer,
email text,               -- 인증용
created_at timestamptz DEFAULT now()
```

### responses (설문 응답 + 점수)

```sql
id uuid PRIMARY KEY,
participant_id uuid REFERENCES participants,
answers jsonb NOT NULL,   -- { "Q1": 2, "Q2": 1, ... }
scores jsonb NOT NULL,    -- { "CP": 14, "NP": 18, ... }
grades jsonb,             -- { "CP": "고", ... }
top1 text,
top2 text,
bottom text,
total integer,
completed_at timestamptz DEFAULT now()
```

## §6 CM 데이터 구조 (Phase 3)

> Phase 3 진입 시 상세화. 현재는 구조 참조용.

CM1~CM8 조회 테이블. 직군별 3종.
조회 키: 점수 구간(CM1,2,4계열) 또는 TOP/BOTTOM 조합(CM3,5,6,7,8).
상세: `ARCHITECTURE.md` + `current_projects/_에고그램/에고그램_리포트 자동화 - 데이터 구조 분석.md`
