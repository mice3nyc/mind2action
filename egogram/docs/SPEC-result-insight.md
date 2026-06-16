# SPEC — 결과 화면 성향 인사이트 팝업 (검토 프로토타입)

> v1, 2026-06-16 (세션492). 상태: **검토용 프로토타입**. 라이브 리포트(ReportPageV2)·점수 로직 무변.
> 결과 화면(ResultPage)에서 버튼으로 열어보고, 괜찮으면 나중에 리포트에 편입 검토.
> 요청 노트 [[요청.26.0616.1620-결과화면인사이트팝업]].

## 목적

개인 리포트의 유일한 시각 요소가 가로 막대 하나뿐이라, 유형 결과의 만족도("이게 나구나")를 올릴 두 그래프를 시험한다.
- 펜타곤 레이더 = "내 성향의 모양" (한눈에 기억되는 실루엣)
- 그룹 평균 비교 = "전체 속 내 위치" (남들과 어떻게 다른가)

## 배치 / 진입

> ⚠️ 26.0616 정정: 참가자 결과 화면(ResultPage)이 아니라 **관리자 페이지**에 둔다. 설문 참가자에게는 노출 금지. ResultPage/SurveyApp/PreviewResultPage 변경은 원복함.

- 관리자 결과 테이블(`components/Admin/AdminDashboard.jsx`, 결과 확인 탭)의 **개인 행마다** "리포트 보기" 옆에 버튼 **"그래프 보기"**. 클릭 → 그 개인의 모달.
- 모달 = `components/Result/ResultInsightModal.jsx`. 탭 2개. 오버레이 클릭/× 로 닫음. (Result 폴더에 두되 admin이 import)
- 차트 = `components/Result/InsightCharts.jsx` (MyRadar · GroupRadar · DiffBars · diffHeadline).
- 진입: `#/admin` 로그인(supabase auth) → 결과 확인 탭 → 행의 "그래프 보기". 각 행 `r`(loadResults)에서 scores·top1·top2·bottom·jobType·name·group·campaignId 전달.
- 그룹 평균은 그 개인의 `campaignId`로 실데이터 조회. campaignId 없으면 그룹 탭은 "데이터 없음".
- **이전/다음 이동**: 모달에 `position`·`onPrev`·`onNext` props. 상단 nav 바("‹ 이전 / N / M / 다음 ›") + 키보드 ← → 이동, Esc 닫기. admin은 `filtered` 배열 인덱스(`insightIdx`)로 추적. 끝에서 해당 화살표 비활성. 같은 campaignId면 그룹 평균 미재조회(useEffect deps).
- **결과 테이블 CSS**: `.admin-table-wrap` 중복 규칙(`overflow-x: visible`) 제거 → `overflow-x: auto; max-width:100%`로 창 폭 초과 방지(영역 내 가로 스크롤). 소속(부서) 셀 `.td-dept`(white-space:normal·word-break:keep-all·max-width 140px)만 줄바꿈 허용. "그래프 보기" 버튼은 `그래프<br/>보기` 2줄로 폭 절약(`.btn-graph-action`).

## 데이터

- 개인 5축: `result.scores`(CP/NP/A/FC/AC, 0~20) — 이미 있음.
- 조율 불필요 구간: `getSuccessRange(ego, jobType)` (scoreEngine) — 레이더 가이드 밴드로 재사용.
- 그룹 평균: `loadCampaignAverage(campaignId)`(storage.js 신설). `responses`에서 캠페인별 5축 평균 + 표본 수 `n` 집계만 조회(타인 개별 데이터 비노출).
  - `campaignId`는 SurveyApp이 `campaign?.id`로 ResultPage에 전달.
  - 프리뷰엔 campaignId 없음 → `fallbackGroupAvg`(예시) 사용, "예시 데이터" 배너 표시.

## 탭1 — 내 성향의 모양 (MyRadar)

- 300×300 펜타곤 레이더. 축 순서 위 꼭짓점부터 CP·NP·A·FC·AC 시계방향.
- 동심 펜타곤 그리드(점선) + 축선.
- **조율 불필요 구간 밴드**: 직무별 [low, high] 펜타곤 두 개 사이를 옅은 초록 링(fillRule evenodd)으로.
- 개인 폴리곤: 강조색(`#0012de`) 채움 + 꼭짓점에 에고색 점.
- 축 라벨: 평이 라벨(기준·결단 등, 에고색) + 점수.
- 캡션: 밴드 범례 + "다섯 성향의 균형이 만드는 나만의 모양" 한 줄.

## 탭2 — 전체 속 내 위치 (GroupRadar + DiffBars)

- 한 줄 요약(`diffHeadline`): 평균 대비 가장 큰 +축·−축 (차이 |1.5| 이상일 때만). 다섯 라벨 모두 받침으로 끝나 조사는 '이'/'은' 고정.
- 오버레이 레이더: 나(강조색 채움) + 그룹 평균(점선 회색). 범례 + 표본 수.
- 축별 차이 막대(DiffBars): 축마다 내 막대(에고색) + 평균 세로선 + "나 N · 평균 M · ±D"(양수 초록·음수 빨강).
- 표본 경고: 실데이터 `n < 5` 또는 예시 데이터면 상단 배너.
- 그룹 데이터 없음: "아직 비교할 그룹 데이터가 없습니다" 안내.

## 스타일

- 흰 모달, radius 16, maxWidth 440, 모바일 폭 우선. 얇은 점선 그리드(미술관 톤).
- 색: 에고 5색(ReportPageV2와 동일) + 강조 `#0012de`(분석 레이더와 동일 톤). 인라인 스타일(CampaignAnalytics 관례).

## 검증 (세션492)

- vite build 통과(97모듈). CDP 헤드리스(프리뷰 경로로 모달 단독 검증): 버튼→모달→두 탭 렌더, 레이더 폴리곤(shape 5·group 6), 헤드라인 생성, JS 에러 0.
- 관리자 배치 후 재빌드 통과(97모듈). admin은 supabase 로그인이라 헤드리스 미검증 — 피터공 로그인 후 육안 검토.

## 미결 / 다음

- [ ] 피터공 육안 검토 → 두 그래프 유지/가감, 리포트 편입 여부.
- [ ] (편입 시) 리포트(ReportPageV2) §1 또는 별도 섹션에 정적 삽입 + PDF 렌더 확인.
- [ ] 정통 에고그램 연결선·에너지 분포 등 다른 후보는 검토 후 추가 여부 결정.
