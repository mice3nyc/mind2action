---
author: 아리공
project: M2A 성향별 심화코칭 리포트 생성기
created: 2026-07-11
type: TASKS (진행 작업, live 체크리스트)
---

## TASKS — M2A 심화코칭 생성기

> 에이전트가 이것 + `SPEC.md`만 보고 작업 가능해야 함. 빌드 완료 시 바이트·해시·날짜 append.

### Phase 0 — 선문 (완료 2026-07-11)
- [x] 5샘플·지침 대조 → `source/고정블록대장.md`
- [x] 레퍼런스 수집 `simhwa/` + `REFERENCES.md`
- [x] `SPEC.md` v0.1 초안 + D2·D4·D6 확정 반영
- [x] `PLAN.md`·`TASKS.md`
- [x] **D6 생성 핸드오프 패키지 저작** `생성_핸드오프_패키지.md` (외부 LLM용, 자체완결) + Downloads 사본

### Phase 1 — 착수 전 확인 (완료 2026-07-11)
- [x] **D1** responses 스키마 확인 — career_months·income_range 존재, 호칭(PA/TCR)은 파라미터 보강(기본 PA). SPEC §11
- [x] **D3** 심화 화법/거절(고객유형 축) vs 기존 cm5(top1_top2_bottom PA축) — 별개 확정, 신규 이식
- [x] **D2·D4·D6** 피터공 확정(이산·JSX통합·외부LLM위임) — SPEC §11

### Phase 2 — 고정·규칙 이식 (완료 2026-07-11, 집필 아님·추출)
- [x] `src/data/simhwa_static.yaml` — 대장 §2 전량(purpose·customer_title/intro 5·talk_pool·reject_pool·reject_deep·referral). 블록 스칼라(quote-free)
- [x] `src/data/simhwa_lowtrait.yaml` — 대장 §3 저성향 5세트(label+menu+mentions) + talk_swap
- [x] Vite yaml import 배선(@modyfi/vite-plugin-yaml) — build 103 modules OK

### Phase 3 — 규칙엔진 + 렌더러 (완료 2026-07-11)
- [x] `src/lib/buildSimhwa.js` — strengthKeyOf(AC억제)·§3 조립·저성향 트리거·화법 A-스왑·토큰치환·fallback
- [x] `src/components/Report/SimhwaReportView.jsx` — 9섹션, 이모지 컬러 헤더, 🍀 샘플 룩
- [x] `/simhwa/:id` + Preview MOCK `/preview/simhwa?s=이름` (App.jsx 라우트, isReport 확장). ~~simhwa-batch~~는 후순위
- [x] praxi.css `.simhwa-*` + `@media print`(color-adjust:exact)

### Phase 4 — 회귀 검증 (완료 2026-07-11, 5샘플 정답지)
- [x] 5샘플 강점키 AC억제 정답 5/5(이서연 NP_FC·이영수 CP_NP)·전 슬롯 커버리지 100%·런타임 예외 0·build clean
- [x] 이서연(AC17 top1) 실렌더로 억제 실증(콘솔 에러 0). 볼드 없음(고정블록), 중복 린터=코덱스 QA에서 처리

### Phase 5 — 생성 슬롯 (코덱스 v0.2 통합 완료, 손소장 검토 대기)
- [x] 외부 LLM(코덱스) v0.2 12조합 생성 → `src/data/simhwa_gen.yaml`(101KB) 이식·파싱 OK
- [x] AC억제 강점키 12조합 정합(FC_CP=이선규 정답 포함)
- [ ] 손소장 톤 검토 → 동결 (💼 마음가짐 G5 미생성분 포함 여부 결정)

### Phase 6 — 배포·검토
- [ ] 자가검증(예외0·린터·fallback무결·build clean)
- [ ] `npm run deploy` 라이브 → 손소장·애련공 admin 검토
- [ ] 손소장 회신 반영 → 생성슬롯 동결

### Phase 7 — 손소장 7/13 수정요청 (2026-07-15, v0.3 — SPEC §13)
- [x] 요청노트 `요청.26.0715.0635` + SPEC §13 정본화
- [x] #1 호칭 `PA님`→`님` (buildSimhwa)
- [x] #2 표지 중앙·하향 (praxi.css)
- [x] #3 ① 목적 3→2문단 (simhwa_static.yaml)
- [x] #4 ② 에너지 발현 테이블 — 신규 `simhwa_energy.yaml`(CM2 verbatim 25셀) + `energyBandIndex`·`section2.energyStates`, 기존 강점·조율 렌더 제거
- [x] #5 성향명 컬러 (② 헤더 EGO_COLORS)
- [x] #6 ③~⑦→3. / #8 ⑨→4. (Section num)
- [x] #7 ⑧ 거절 심화 삭제 (렌더+LowTraitSet 제거)
- [x] #9 줄간격 1.62→1.85 (praxi.css)
- [x] 자가검증 — build clean·헤드리스 preview 5/5 구간매핑·콘솔0
- [x] 피터공 승인 → 커밋 `0cfae33`·`npm run deploy` 라이브 배포·검증(이서연 5/5·푸터 0cfae33)
- [x] CM2 원문 오타 3곳 수정(피터공 지시, 7/15) — 커밋 `8262932`·배포·라이브 검증(footer 8262932·3곳 반영)

> 수정요청 10~12번(검토필요)은 내용이 비어 있는 빈 행 — 손소장이 채우면 그때 새 요청. 추적/대기 대상 아님.

### Phase 8 — 손소장 추가 수정요청 (2026-07-15 오후, v0.4 — SPEC §14, 요청.26.0715.1249)
- [x] ① 성향명 색상 — **이미 구현 확인**. EGO_COLORS(CP 빨강·NP 오렌지·A 파랑…)가 손소장 지시와 일치, 표지·②헤드·③타이틀 전부 적용. 추가 조치 없음(본문 산문 낱말 색칠은 오발색 위험이라 보류, 피터공 확인 항목)
- [x] ② 이모지 전면 제거 — `SimhwaReportView.jsx`(고객 이모지·IconHead 소제목 이모지), `buildSimhwa.js`(CUSTOMER_EMOJI 제거), `simhwa_static.yaml`(체크리스트 ✔), `simhwa_gen.yaml`(클로버 🍀 12줄→값 single-quote), `simhwa_lowtrait.yaml`(메뉴 ✔). 코드 주석 이모지도 정리
- [x] 엠대시(—) — grep 결과 코드/yaml 주석에만 존재, 리포트 출력엔 원래 없음(출력 클린). 앱 `<title>` "MIND2ACTION — 에고그램 설문"의 —는 리포트 콘텐츠 아님(범위 밖)
- [x] 자가검증 — vite build clean·헤드리스 preview(김정임) 렌더 DOM 이모지 0·성향명 색 rgb 정확(239,68,68/245,158,11/56,189,248)·헤더 전부 텍스트·콘솔0
- [x] 피터공 확인 → 커밋 `6042f77`·main push·`npm run deploy` 라이브. **라이브 검증**(survey.mind2action.kr preview 김정임): 본문 이모지 0·엠대시 0·성향명 색 정상(rgb 239,68,68/245,158,11/56,189,248 각 3)

### 빌드 기록
- 2026-07-15 손소장 추가 수정요청(v0.4, 이모지 제거+색 확인) — 수정: `SimhwaReportView.jsx`(IconHead 이모지 제거·고객 이모지 span 제거), `buildSimhwa.js`(CUSTOMER_EMOJI 상수·emoji 필드 제거), `simhwa_static.yaml`(체크리스트 ✔ 제거), `simhwa_gen.yaml`(클로버 🍀 12줄 제거→값 single-quote, YAML flow-map 오해 방지), `simhwa_lowtrait.yaml`(✔ 제거), `SPEC.md`(§14 신설). `vite build` clean(css 37.62kB). 헤드리스 preview(김정임 CP14·NP13·A18·FC14·AC6) 렌더 DOM: 이모지 0·성향명 색 정확(빨강/오렌지/파랑)·전 헤더 텍스트화·엠대시 0(앱 title 제외). **배포 대기 — 피터공 확인 후.**

### Phase 9 — 본문 성향명 컬러 코딩 + 에고 코드 제거 (2026-07-15, v0.5 — SPEC §14-③)
- [x] 피터공 재지시: 색을 헤더뿐 아니라 본문 문장 성향명에("기준·결단 성향이 높은…"), 영문 코드(CP/NP…) 병기 제거
- [x] `colorize()` 추가 — 정순 `CODE(라벨)` + 코드 없는 맨 `라벨` 매칭, Paras·LineList 적용
- [x] ② 에너지 헤드 코드 제거 / customer_title 역순 `(CODE)` 데이터 제거
- [x] **색칠 범위 = 기존 성향리포트 colorizeEgo와 동일** (피터공 확정) — 라벨만 색, 뒤 '성향' 이어지면 무색. 첫 구현(라벨+성향 통째 색)에서 되돌림
- [x] 커밋 `fae5049`·push·deploy. 라이브 검증(preview 김정임): 색span "기준·결단"+무색 " 성향이 높은"·에고코드 0·이모지 0

- [x] 소제목 녹색 제거(피터공 지적) — "…과 잘 맞는 부분"이 FC 유형색(#10b981)과 겹쳐 혼동 → tint 제거·검정 볼드 통일. 커밋 `3f203a9`·배포·라이브 검증(소제목 inline색 0)

### 빌드 기록 (v0.5)
- 2026-07-15 본문 색칠+코드제거(v0.5) — `SimhwaReportView.jsx` colorize() 추가(기존 colorizeEgo 동일 로직, 맨라벨 확장)·② 헤드 코드제거, `simhwa_static.yaml` customer_title (CODE) 제거, `SPEC.md §14-③`. `vite build` clean. 헤드리스 preview(김정임): 본문 성향명 색span(라벨만·뒤 성향 무색)·에고코드 0·이모지 0·이중성향 0. **커밋 `fae5049`·main push·`npm run deploy`·라이브 검증 완료.**

### 빌드 기록 (이전)
- 2026-07-15 손소장 7/13 수정요청 반영(v0.3) — 신규 `src/data/simhwa_energy.yaml`(5성향×5구간 CM2 verbatim). 수정: `buildSimhwa.js`(호칭 님·energyBandIndex·section2.energyStates), `SimhwaReportView.jsx`(4섹션 재번호·② 에너지렌더·⑧ 제거·LowTraitSet 제거), `simhwa_static.yaml`(purpose 3→2문단), `praxi.css`(표지 중앙·line-height 1.85·.simhwa-energy). `vite build` clean(104 modules, css 37.62kB, js 1233kB). 헤드리스 preview(김정임) 구간매핑 5/5·호칭 님·콘솔0. **커밋 `0cfae33`(main push, mice3nyc/mind2action)·`npm run deploy` gh-pages `--add`.** 라이브 검증 = 이서연(CP6·NP16·A8·FC14·AC17) 구간매핑 5/5·4섹션·⑧부재·푸터 0cfae33. 라이브 `survey.mind2action.kr/#/simhwa/:id`(admin)·`/#/preview/simhwa?s=이름`(MOCK).
- 2026-07-11 뼈대 착수 — 신규 파일 6종: `src/data/simhwa_static.yaml`·`simhwa_lowtrait.yaml`·`simhwa_gen.yaml`(101KB, 코덱스 v0.2), `src/lib/buildSimhwa.js`, `src/components/Report/SimhwaReportView.jsx`, `src/pages/PreviewSimhwaPage.jsx`. 수정: `App.jsx`(라우트 2·isReport), `styles/praxi.css`(.simhwa-* +print). `vite build` clean(103 modules, css 37KB).
- 2026-07-11 커밋·배포 — commit `6a292d4`(main push), `npm run deploy` gh-pages `--add`. 라이브 = `survey.mind2action.kr/#/simhwa/:id`(실데이터)·`/#/preview/simhwa?s=이름`(MOCK). 번들 index-DMu057IO.js. 라이브 렌더 검증: 이서연 9섹션 정상·AC억제·콘솔에러 0·푸터 6a292d4. **생성슬롯 미동결(손소장 톤 검토 전) — 리뷰 배포 성격.**
- 2026-07-11 admin 진입 버튼 — commit `c4fb0c4`, 배포(번들 index-Zbg3AajX.js 전파 확인). `AdminDashboard.jsx` 리포트 셀에 `[심화코칭]`(→`#/simhwa/:id`, 새 탭, 핑크 톤) — sales만 노출. 빌드 clean. **admin 로그인 게이트라 아리공 실확인 불가 → 피터공 admin에서 확인.**

### Phase 11 — 손소장 7/28 수정요청 남은 8항목 (2026-07-30, v0.14 — SPEC §16·§16-9)
- [x] 착수 전 확인 3건 — 피터공 확정: "10분 만에" 제목은 소제목(h4)으로 / 큰 제목도 성향명만 색 / 레이더는 심화에만
- [x] 항목 3 — 3장 전면교체. `[상담 화법]`·`[고객 거절 대응]` 렌더 제거(데이터 보존) + 시트1 본문 5종 신설 + 큰 제목 교체 + 인쇄 성향당 1페이지
- [x] 항목 6 — `customer_intro` 5종을 시트2 관찰 서술로 전면 교체. 옛 큰 제목이 소제목으로 내려옴
- [x] 항목 5 — 제목 색을 성향명까지만(h3 inline color 제거 → colorize 위임). 큰 제목·소제목 규칙 통일
- [x] 항목 2·4 — 맨 에고 코드 색 라벨화. `egoTermRe({bareCode})` 옵션 신설, **심화에서만 켬**(성향리포트 공용)
- [x] 항목 7 — 표지 평균 비교 레이더. `GroupRadar` 재사용 + `simhwa_static.benchmark`(109명)
- [x] 항목 8 — 4장 제목 `소개를 만드는 고객관리` → `소개를 만드는 실천 전략`
- [x] 항목 9 — 소제목 `소개를 만드는 고객관리 체크리스트` + 체크리스트 "축하와" 삭제
- [x] 자가검증 — check:terms 통과 · build clean(107 modules) · lint 신규 0 · **result 화면 2개 렌더 완전 동일(회귀 0)** · 항목별 판정 5명×16건 전건 PASS · 콘솔 0 · 인쇄 PDF 9페이지
- [ ] **피터공 확인 → 커밋·배포** (미커밋·미배포). 확인분 4 = 3장 읽기 무게 / 소제목 넷 모양 / 인쇄 미리보기 페이지 배치 / 레이더 크기·위치

### 빌드 기록 (v0.14)
- 2026-07-30 손소장 7/28 수정요청 8항목(v0.14) — 수정: `src/data/ego_terms.yaml`(templates 3종), `src/lib/egoTerms.js`(`customerRecognizeTitle`·`CUSTOMER_GUIDE_TITLE`·`egoTermRe({bareCode})`), `src/data/simhwa_static.yaml`(customer_intro 교체·customer_guide 신설·benchmark 신설·체크리스트 문구), `src/lib/buildSimhwa.js`(recognizeTitle·guide·BENCHMARK), `src/components/Report/SimhwaReportView.jsx`(CustomerBlock 재편·제목 colorize·표지 레이더·4장 제목·체크리스트 소제목), `src/styles/praxi.css`(.simhwa-cover-radar 신설·icon-head/customer-title flex 해제·print 페이지 나눔), `docs/simhwa/SPEC.md §16-9`. `vite build` clean(107 modules). 헤드리스 CDP 렌더 덤프 7화면 대조 = **result 2화면 완전 동일**, simhwa 5화면은 의도한 곳만 변경. 항목별 판정 하니스 5명×16건 전건 PASS. `--print-to-pdf` 9페이지. **배포 대기 — 피터공 확인 후.**
  ⚠️ `check:terms` §5 금지 어휘 검사는 **yaml 주석까지 본다**. 데이터 파일 주석에 경위를 적으려다 걸렸다 — 금지 어휘는 SPEC·source 머리말에만 적는다.

- [x] **커밋·push·배포·라이브 검증 ✅** (2026-07-30) — 커밋 `cdbbc07`(v0.14 8항목) + `9f843ac`(루트 SPEC 7/29 미커밋분). main push `f88571e..cdbbc07`. `npm run deploy` gh-pages `--add` Published. **번들 `index-DY4UAClB.js` 전파 20초 만에 확인**(배포 직후 해시 curl 먼저 — 어제 CDN이 옛 빌드를 준 교훈). **라이브 검증 = 항목별 판정 5명 x 16건 전건 PASS · 라이브 7화면이 로컬 덤프와 완전 동일 · 성향코칭 리포트 배포 전후 완전 동일(회귀 0) · 콘솔 0.** 라이브 `survey.mind2action.kr/#/simhwa/:id`(admin)·`/#/preview/simhwa?s=이름`(MOCK).

### 빌드 기록 (v0.15) — 7/30 회의 반영 5건
- 2026-07-30 오후 회의 5건(SPEC §17) — 수정: `src/data/simhwa_static.yaml`(benchmark 값·label 교체, 옛 실측치 주석 보존), `src/lib/buildSimhwa.js`(`SIMHWA_SAFE_RANGES`·`SCORE_MAX`·`energyState()`·`stripLeadState()` 신설, energyStates에 state/safe/max 추가), `src/components/Report/SimhwaReportView.jsx`(`CustomerBlock`→`RecognizeBlock`+`GuideBlock` 분리, 3·4·5장 재편, `ScoreBar`·`ENERGY_STATE_TEXT` 신설, `LineList` ul/li 전환, synergy 렌더 제거, 표지 범례 '평균' 제거), `src/styles/praxi.css`(scorebar·energy-state·linelist 마커 신설, 인쇄 페이지 나눔을 4장으로 한정), `docs/simhwa/SPEC.md §17`.
- **검증**: `check:terms` 전부 통과 · `vite build` clean · **lint 16건 = 수정 전 기준선과 동일(신규 0)** · 렌더 덤프 전후 대조에서 **성향리포트 2화면(result_김정임·result_이서연) 바이트 단위 완전 동일** = 심화 변경이 공용 코드로 새지 않았다 · 항목별 판정 5명 × 18건 **90/90 PASS** · **상태 판정 25/25 정확**(over/ok/near/low) · 콘솔 에러 0 · 인쇄 PDF 10페이지(3장 신설로 9→10).
- ⚠️ `SIMHWA_SAFE_RANGES`는 **심화 전용**이다. `scoreEngine.UNIFIED_RANGES`(성향리포트 공용, CP·NP·A·FC=[11,20])는 건드리지 않았다 — 피터공 "여기서만 해줘". 통합은 손소장에게 CP·NP·A·FC 17점 이상 본문을 받은 뒤(SPEC §17-0·§17-6).
- **미커밋·미배포 — 피터공 확인 후.**
- [x] **커밋·push·배포·라이브 검증 ✅** (2026-07-30 오후) — 커밋 `e363c77`(v0.15 회의 5건) main push. `npm run deploy` gh-pages Published. **번들 `index-BzwD68Ke.js` 전파 4초 만에 확인**(해시 먼저, 렌더 검증은 그다음). **라이브 = 로컬 덤프와 전 화면 동일 · 항목별 50/50 PASS · 성향리포트 2화면은 오전 배포본과 바이트 단위 동일(회귀 0) · 콘솔 0.**

### 빌드 기록 (v0.16 후보) — 손소장 7/30 저녁 수정요청 6건
- 2026-07-30 저녁 수정요청 6항목(SPEC §18) — 수정 파일 6개:
  - `src/data/simhwa_energy.yaml` — `state_text`(CP류 공용 4상태) + `ac_state_text`(AC 5구간, 손소장 verbatim) 신설. 뷰에 하드코딩돼 있던 `ENERGY_STATE_TEXT`가 데이터로 내려왔다.
  - `src/data/simhwa_static.yaml` — `purpose` 2문단 → 4문단(항목 6), `benchmark.label` 성향별 표기로 교체. `benchmark.scores`는 렌더에서 물러남(주석 보존).
  - `src/lib/buildSimhwa.js` — `SIMHWA_SAFE_RANGES.AC` `[8,16]`→`[8,13]`(항목 1·4), `energyStatus()`·`prefixName()` 신설, energyStates에 `stateText` 추가.
  - `src/components/Result/InsightCharts.jsx` — `SafeBandRadar` **신설 export**(항목 4·5). `GroupRadar`·`MyRadar`는 **한 줄도 안 건드렸다**.
  - `src/components/Report/SimhwaReportView.jsx` — 표지 레이더 교체 + 범례 문구, `ScoreBar` 렌더 제거(함수·CSS 보존), `ENERGY_STATE_TEXT` 제거 → `es.stateText`, 성향명 옆 `14 / 20` 칩.
  - `src/styles/praxi.css` — `.simhwa-legend-band`·`.simhwa-energy-score` 신설, 인쇄에서 에너지 블록 여백 축소.
- **검증**: `check:terms` 전부 통과 · `vite build` clean 107 modules · **lint 16건 = 기준선과 동일(신규 0)** · 렌더 덤프 전후 대조에서 **성향리포트 2화면 바이트 단위 완전 동일**(회귀 0, 공용 코드로 안 샘) · **상태 판정 25/25 정확**(AC 17→많이 / 14~16→조금 / 11~13·8~10→강점 2종 / 0~7→의식하면, CP류는 현행 유지) · **이름 접두 25/25**(5명 × 5성향) · §1 4문단 확인 · 콘솔 에러 0 · **인쇄 = 5명 전건 다섯 성향이 2페이지 한 장에**(전체 9~10페이지).
- ⚠️ 검증 중 잡은 것 하나: `SafeBandRadar`에 처음 `scores`를 넘겨 축 라벨에 점수가 붙었다(표지 점수 칩과 중복, 요청에 없는 변경). 렌더 대조의 첫 diff 지점이 그 자리라 바로 잡았다. **덤프 대조가 잡아낸 회귀다.**
- **명세와 달라진 곳 1**: 막대를 빼면서 `14 / 20`이 갈 자리가 없어져 성향명 옆 작은 숫자로 남겼다. 손소장이 없애라고 한 것은 그래프이고 점수 자체는 본문 해석의 기준이라 지운다고 읽지 않았다. 되돌리기 쉬운 한 줄(`.simhwa-energy-score`).
- **미커밋·미배포 — 피터공 확인 후.** 로컬 확인: `http://localhost:4173/#/preview/simhwa?s=김정임`
- [x] **커밋·push·배포·라이브 검증 ✅** (2026-07-30 저녁) — 커밋 `ac17df5`(v0.16 손소장 7/30 저녁 6건) main push. `npm run deploy` gh-pages Published. **번들 `index-CD7snYJS.js` 전파 25초 만에 확인**(해시 먼저, 렌더 검증은 그다음). **라이브 = 로컬 덤프와 7화면 전부 동일 · 성향리포트 2화면은 배포 전 HEAD와도 바이트 단위 동일(회귀 0) · 콘솔 0 · 라이브 인쇄 9페이지, 다섯 성향이 2페이지 한 장에.**
- 범위 확정(SPEC §18-7): **기본 성향 코칭 리포트는 건드리지 않는다**(피터공 "아무것도 건들지마시요"). `scoreEngine.UNIFIED_RANGES` 무변경 — 렌더 대조로 실측 확인. CM4-2 빈칸은 미제가 아니라 범위 밖으로 내렸다.

### 빌드 기록 (v0.17) — 손소장 7/31 아침 수정요청 5건
- 2026-07-31 아침 수정요청 5항목(SPEC §19) — 원본 `Assets/incoming/mind2action/inbox/수정요청/7월31일 수정 요청.xlsx`(08:27). **어제 6건과 행이 겹치지 않는 새 5건**이다(누적판 아님). 수정 파일 5개:
  - `src/data/simhwa_energy.yaml` — `state_text`(CP류 4상태 맵) + `ac_state_text`(AC 5구간) → **`state_text_bands`{common, AC} 하나로 통일.** 항목 1·2로 안전구간 안이 둘로 갈렸다(CP류 11~13 / 14~16, AC 8~10 / 11~13). 손소장이 말한 경계(8·11·14)가 기존 `bands` 경계와 정확히 일치해 **7/30의 "AC만 표" 특례가 없어졌다.**
  - `src/lib/buildSimhwa.js` — `energyStatus()`에서 `trait === 'AC'` 분기 제거, 다섯 성향 모두 표 조회(성향별 표 없으면 `common`). `clover`는 조합키 조회 → 단일 문자열.
  - `src/data/simhwa_gen.yaml` — `clover` 12키(강점 조합별 개인화) → **공통 한 문단**(항목 3). 옛 12문장은 `clover_retired`로 보존(키 이름만 되돌리면 복구).
  - `src/data/simhwa_static.yaml` — `benchmark.label` 영문 약어 → 한글 성향명(항목 4, **숫자는 §18-4 그대로**). `purpose` 첫 문장 `에고성향을 바탕으로 고객의 성향` → `에고성향과 고객의 성향을`(항목 5).
  - `src/components/Report/SimhwaReportView.jsx` — 마무리 코칭 박스에 `IconHead` 추가. 손소장 원문 머리 `마무리 코칭-`을 본문에서 떼어 제목으로(위 "핵심 코칭"과 같은 위계).
- **xlsx 3단 추출이 잡은 것**: 항목 5의 셀에는 4문단 전문이 들어와 있지만 **리치텍스트 빨강(`FFFF0000`)으로 표시된 실제 변경분은 한 구절뿐**이었다. 텍스트만 읽고 문단을 갈아끼웠으면 §18-6(2→4문단)을 되돌릴 뻔했다. 내장 코멘트·도형 없음.
- **검증**: `vite build` clean · **lint 신규 0**(`__BUILD_ID__` 1건은 vite define, 기존) · **구간 문구 25/25 채워짐 · 0~20 전 점수 빈 칸 0** · 표 `state` vs `energyState()` 계산 **불일치 1건 = AC 0~7(§18-1에서 정한 의도된 예외)** · **샘플 5인 문구 배치 5/5 정확**(김정임 NP13·이선규 A13/AC9·이영수 NP11·허진랑 AC10에 신규 문구, 14~16과 AC 11~13은 옛 문구 유지, 옛 AC 8~10 문구 5화면 전부에서 0건) · 렌더 덤프 전후 대조에서 **성향리포트 2화면(result_김정임·result_이서연) 완전 동일**(회귀 0, §18-7 범위 지켜짐) · 콘솔 에러 0.
- [x] **커밋·push·배포·라이브 검증 ✅** (2026-07-31 오전) — 커밋 `f1ffffa`(v0.17 손소장 7/31 5건) main push. `npm run deploy` gh-pages Published. **번들 `index-BRmoSGYj.js` 전파 확인 후**(해시 먼저, 렌더 검증은 그다음) 라이브 덤프 → **로컬과 7화면 전부 동일 · 콘솔 0.**
- ⚠️ **잃은 것 하나(기록)**: 마무리 글의 개인화가 사라졌다. 상위 두 성향 조합별 12문장 → 모두에게 같은 한 문단. 손소장 콘텐츠 판단이라 그대로 반영했고, `clover_retired`로 되돌릴 수 있게 남겼다.

### 빌드 기록 (v0.18) — 피터공 7/31 저녁, 표지 레이더 마감
- 피터공 요청 2건(SPEC §20). 표지 오각형 자리만. 수정 파일 4개 + SPEC:
  - `src/data/simhwa_static.yaml` — `benchmark.avg`/`avg_label`/`avg_n` 신설. 주석에만 남아 있던 실측 평균(월소득 1천만원 이상 109명: CP 13.4 / NP 15.9 / A 13.1 / FC 12.6 / AC 13.2)을 데이터로 올렸다.
  - `src/components/Result/InsightCharts.jsx` — `SafeBandRadar`에 `avgScores`·`dotStates` 두 prop 추가(안 넘기면 7/30 그림 그대로). 상한 초록 점선은 뺐다. 색 상수 3개(`AVG_LINE` `#9aa0a6` / `DOT_RING_OK` `#2f7d54` / `DOT_RING_COACH` `#b4231f`)는 전부 코드베이스에 이미 있던 값.
  - `src/components/Report/SimhwaReportView.jsx` — 범례 한 줄 → **3줄 블록**. `dotStates`는 `r.section2.energyStates`를 성향키로 뒤집은 것(판정을 새로 하지 않는다 — 두 벌이 되면 표지와 본문이 어긋난다).
  - `src/styles/praxi.css` — `.simhwa-legend-row{display:block}` 신설, `.simhwa-legend-mine` 색 `#1f2733` → ACCENT `#0012de`(그래프의 실선과 같은 색).
- ⚠️ **요청 문구와 그림이 어긋나 있었다** — 피터공이 "점선 = 월소득 1천만원이상자의 평균"이라 적어 달라 했는데 그 자리 점선은 **안전구간 상한**이었다(§18-4가 *"label에 '평균'을 쓰지 않는다"*고 못 박은 자리). 물어서 **평균선 복원**으로 결정. §17-1의 원 요청(손소장 "1천만원 이상자들의 평균점수와 내 점수 비교")이 상한선 → 초록 띠로 바뀌는 사이 평균 비교 자체가 화면에서 사라져 있었던 것이라, 이번 수정으로 되돌아왔다.
- 범례 3번째 줄(초록 띠)은 **지우지 않았다.** 피터공은 두 줄만 지정했지만 그 줄은 §18-4에서 손소장 요청으로 들어간 기존 줄이고, 지우면 화면의 초록 띠가 설명 없는 색이 된다. 새로 더한 건 점선 줄 하나다.
- **검증**: `vite build` clean · **lint 신규 0**(HEAD 대조 — 기존 2건 `__BUILD_ID__`·`react-refresh/only-export-components` 그대로) · **링 색 ↔ 2장 `is-{state}` 25/25 일치**(샘플 5인 × 5성향, CDP로 렌더된 DOM에서 대조) · `over`/`near`/`low` 세 상태 모두 빨강으로 나오는 샘플 최소 1건씩 확인 · **회귀 = 결과화면 `result_김정임`·`result_이서연` 렌더 덤프 완전 동일**(`GroupRadar`·`MyRadar` 무변경) · 심화 5화면 변화는 범례 텍스트 + `실선` 색 + 없어진 `·` 구분자 + SVG(평균 점선 1 + 링 5 추가, 상한 점선 1 제거)뿐 · **인쇄 10쪽 = 배포 전과 동일**(범례가 한 줄 늘었지만 표지 하단에 여유가 컸다) · 콘솔 에러 0.
- [ ] 커밋·push·배포·라이브 검증 — **피터공 화면 확인 후.** 배포 시 번들 해시 전파 확인 → 그다음 라이브 렌더 검증(순서 뒤집으면 옛 빌드를 검증한다).
