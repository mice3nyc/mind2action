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

### 빌드 기록
- 2026-07-11 뼈대 착수 — 신규 파일 6종: `src/data/simhwa_static.yaml`·`simhwa_lowtrait.yaml`·`simhwa_gen.yaml`(101KB, 코덱스 v0.2), `src/lib/buildSimhwa.js`, `src/components/Report/SimhwaReportView.jsx`, `src/pages/PreviewSimhwaPage.jsx`. 수정: `App.jsx`(라우트 2·isReport), `styles/praxi.css`(.simhwa-* +print). `vite build` clean(103 modules, css 37KB).
- 2026-07-11 커밋·배포 — commit `6a292d4`(main push), `npm run deploy` gh-pages `--add`. 라이브 = `survey.mind2action.kr/#/simhwa/:id`(실데이터)·`/#/preview/simhwa?s=이름`(MOCK). 번들 index-DMu057IO.js. 라이브 렌더 검증: 이서연 9섹션 정상·AC억제·콘솔에러 0·푸터 6a292d4. **생성슬롯 미동결(손소장 톤 검토 전) — 리뷰 배포 성격.**
