# MIND2ACTION — 개발 계획

> 에고그램 설문 → 맞춤 코칭 리포트 자동화 웹 서비스
> 손소장(손용배)의 에고그램 코칭 20년 노하우를 시스템으로 만든다.

## 브랜딩

- **서비스명**: MIND2ACTION
- **도메인**: mind2action.kr (2028-03 만료)
- **디자인 톤**: 미니멀 + 쨍한 액센트
  - 폰트: Paperlogy (CDN, 전체 통일)
  - 액센트: #0012de (파랑) + #f3e700 (노랑)
  - 배경: #ffffff

## 배포

| 환경 | URL |
|------|-----|
| 프로덕션 | https://mice3nyc.github.io/mind2action/egogram/ |
| 관리자 | https://mice3nyc.github.io/mind2action/egogram/#/admin |
| GitHub | https://github.com/mice3nyc/mind2action |
| Supabase | https://supabase.com/dashboard (프로젝트: Mind2Action) |

배포 방법: `egogram/` 폴더에서 `npm run deploy` (vite build → gh-pages -d dist --dest egogram)
`--dest egogram` 필수 — 없으면 gh-pages 루트에 올라가서 /egogram/ 경로 404.
다른 프로젝트 추가 시 같은 구조로 `/mind2action/다른프로젝트/`에 배포 가능.

## 서비스 구조

**1축: 설문 시스템** — 참여자가 코드 입력 → 기본정보 → 50문항 → 결과
- 그룹별 참여 코드로 분류 (현재: 망원동/서교동/합정동)
- 기본정보 8개 필드 (이름/생년월일/경력/회사/소속/직무/소득/리크루팅)
- 50문항 교차 배치 (CP→NP→A→FC→AC 순 반복) → 5개 자아상태 점수 자동 계산
- 결과 Supabase DB 저장

**2축: 리포트 시스템** (Phase 3) — 저장된 점수 → 개인별 맞춤 코칭 텍스트
- CM 텍스트 조회·조합 → 웹페이지 리포트
- 참여자에게 링크로 제공

**관리자 대시보드** — 전체 결과 테이블 + 그룹 필터 + CSV 다운로드
- 참여자 경로(`/`)와 관리자 경로(`/#/admin`) 분리
- 에고 유형 컬러코딩 + 점수 바 그래프 시각화

## 기술 스택

| 영역 | 선택 |
|------|------|
| 프론트엔드 | React (Vite) |
| 백엔드/DB | Supabase (PostgreSQL + RLS) |
| 배포 | GitHub Pages (gh-pages) |
| 폰트 | Paperlogy (CDN) |
| 라우팅 | react-router-dom (HashRouter) |

## Phase 구조

### Phase 1 ✅: 설문 + 점수 계산
- React 앱 + 50문항 + 점수 엔진 + 결과 화면
- 엑셀 샘플 5명 교차 검증 통과

### Phase 2 부분 완료: Supabase + 관리자 + 배포
- DB 연결 (responses 테이블) ✅
- 관리자 대시보드 (테이블 + 필터 + CSV) ✅
- GitHub Pages 배포 ✅
- 미완: 이메일 OTP 인증 / 그룹 동적 관리 / 관리자 인증 강화

### Phase 3: 리포트 생성
- 엑셀 CM 데이터 → JSON 정규화
- CM 조회 엔진 (점수 + TOP/BOTTOM → 텍스트 매칭)
- 리포트 웹페이지 렌더링 (직군별 템플릿)

### Phase 4: 관리자 고도화
- 조직별 설문 링크 동적 생성
- 리포트 생성 관리
- 통계 요약

## 미결 사항 (손소장 확인 필요)

| # | 항목 | 영향 Phase |
|---|------|-----------|
| ~~1~~ | ~~동점 우선순위~~ → **해결: CP > A > NP > AC > FC** | ~~Phase 1~~ |
| 2 | 관리자 CM1 축소 — 의도적 설계인지 미완성인지 | Phase 3 |
| 3 | 소득 분기 — 텍스트 톤 변형 필요 여부 | Phase 3 |
| 4 | 명언 고정/랜덤 — CM8 운영 방식 | Phase 3 |
| 5 | 생년월일/경력 반영 — 리포트 활용 범위 | Phase 2 |
| 6 | 신인도입수 반영 — 데이터 필드 사용 여부 | Phase 2 |

## 자료 위치

| 자료 | 경로 |
|------|------|
| 엑셀 CM 원본 3종 + 설문 샘플 | `Assets/incoming/에고그램/` |
| 리포트 PDF 시안 3종 | `Assets/incoming/에고그램/` |
| 볼트 분석 노트 20건 | `current_projects/_에고그램/` |
| TM | `_init/TM_에고그램.md` |
| 디자인 레퍼런스 | `~/Desktop/_외근작업/_개발사무실/style-collection/praxi/` |
| 기존 설계서 (참조) | `_dev/mind2action/ROADMAP.md`, `ARCHITECTURE.md` |
