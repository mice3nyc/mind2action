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
- [ ] 수정요청 10~12(검토필요) = 손소장이 채울 빈 행 — 내용 도착 시 처리 (7/15 16시 M2A 회의)

### 빌드 기록
- 2026-07-15 손소장 7/13 수정요청 반영(v0.3) — 신규 `src/data/simhwa_energy.yaml`(5성향×5구간 CM2 verbatim). 수정: `buildSimhwa.js`(호칭 님·energyBandIndex·section2.energyStates), `SimhwaReportView.jsx`(4섹션 재번호·② 에너지렌더·⑧ 제거·LowTraitSet 제거), `simhwa_static.yaml`(purpose 3→2문단), `praxi.css`(표지 중앙·line-height 1.85·.simhwa-energy). `vite build` clean(104 modules, css 37.62kB, js 1233kB). 헤드리스 preview(김정임) 구간매핑 5/5·호칭 님·콘솔0. **커밋 `0cfae33`(main push, mice3nyc/mind2action)·`npm run deploy` gh-pages `--add`.** 라이브 검증 = 이서연(CP6·NP16·A8·FC14·AC17) 구간매핑 5/5·4섹션·⑧부재·푸터 0cfae33. 라이브 `survey.mind2action.kr/#/simhwa/:id`(admin)·`/#/preview/simhwa?s=이름`(MOCK).
- 2026-07-11 뼈대 착수 — 신규 파일 6종: `src/data/simhwa_static.yaml`·`simhwa_lowtrait.yaml`·`simhwa_gen.yaml`(101KB, 코덱스 v0.2), `src/lib/buildSimhwa.js`, `src/components/Report/SimhwaReportView.jsx`, `src/pages/PreviewSimhwaPage.jsx`. 수정: `App.jsx`(라우트 2·isReport), `styles/praxi.css`(.simhwa-* +print). `vite build` clean(103 modules, css 37KB).
- 2026-07-11 커밋·배포 — commit `6a292d4`(main push), `npm run deploy` gh-pages `--add`. 라이브 = `survey.mind2action.kr/#/simhwa/:id`(실데이터)·`/#/preview/simhwa?s=이름`(MOCK). 번들 index-DMu057IO.js. 라이브 렌더 검증: 이서연 9섹션 정상·AC억제·콘솔에러 0·푸터 6a292d4. **생성슬롯 미동결(손소장 톤 검토 전) — 리뷰 배포 성격.**
- 2026-07-11 admin 진입 버튼 — commit `c4fb0c4`, 배포(번들 index-Zbg3AajX.js 전파 확인). `AdminDashboard.jsx` 리포트 셀에 `[심화코칭]`(→`#/simhwa/:id`, 새 탭, 핑크 톤) — sales만 노출. 빌드 clean. **admin 로그인 게이트라 아리공 실확인 불가 → 피터공 admin에서 확인.**
