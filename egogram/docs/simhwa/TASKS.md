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
