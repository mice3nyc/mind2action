# REPORT-V3-LLM — LLM 톤 반영 리포트 (세 번째 타입)

> 상태: SPEC 초안 (26.0531). 선문후코 — 이 문서 확정 후 PoC 코드 착수.
> 관련: [[리포트 리디자인 작업 계획]] (PLAN) · [[리포트 설계 원칙]] · [[26.0531 에고그램 LLM 리포트 데이터화 — 세 직군 종합과 스키마 함의]] (분석 근거)

## 1. 목적과 배경

손소장이 LLM으로 직군별 60여개씩 직접 써온 성향분석 리포트가 있다. 전반적으로 잘 읽히고 개인화된 듯한 톤을 가졌다. 그 톤을 우리 시스템에 가져오되 — **실시간 LLM 개인화는 재현 불가**(개인 사실·풍부한 분량). 가능한 것은 "점수 조합에 따른 묘사의 자연스러움"이고, 손소장 60개는 조합키당 평균 4~6건의 **실제 변주 풀**이라 정적 데이터로 그 톤의 70~80%는 재현 가능하다(근거: 분석 종합 노트).

**핵심 제약: 기존 v1/v2를 손대지 않는다.** v3는 세 번째 리포트 타입으로 나란히 추가하고, 같은 응답 한 건을 v1·v2·v3로 동시 생성해 비교한 뒤 최종 선택한다.

## 2. 아키텍처 — v2 패턴 그대로 (정찰 26.0531 기반)

기존 파이프라인에서 **재사용하는 것** (손대지 않음):
- `scoreEngine.js` `calculateScores()` — top1·top2·bottom 계산, tie-break
- `cmLookup.js` `lookupReport(result, jobType)` — 조합키(top1_top2, top1_top2_bottom) 조회. 입출력 구조 유지
- Vite yaml 플러그인 (`@modyfi/vite-plugin-yaml`) — yaml 정적 import
- 기존 `cm_insurance/manager/coach.yaml` — v1/v2 데이터, 그대로 둠

**새로 만드는 것:**
1. **LLM 톤 데이터셋** — `src/data/cm_llm_sales.yaml`(PoC), 이후 manager/coach. **기존 cm과 동일한 키 구조**(cm1[ego][구간], cm3[top1_top2], cm5[top1_top2_bottom] …), 값만 LLM 톤 + 변주 배열.
2. **LLM 조회 함수** — `cmLookup.js`에 `lookupReportLLM(result, jobType)` 추가(또는 `lookupReport`에 `dataset` 파라미터). LLM 세트에서 조회 + 변주 선택. 데이터 없는 키는 기존 cm으로 **fallback**(PoC 미완 구간 빈 화면 방지).
3. **`ReportPageV3.jsx`** — `ReportPageV2.jsx` 복제. 섹션 구조·레이아웃은 v2와 동일하게 유지하고(공정 비교: 톤만 다르게), 데이터 소스만 LLM 세트로.
4. **라우트** — `App.jsx`에 `import ReportPageV3` + `<Route path="/report-v3/:id" element={<ReportPageV3 />} />`. `isReport`는 `/report` 접두라 자동 포함.
5. **admin 버튼** — `AdminDashboard.jsx` line 318 블록에 `<a href={`#/report-v3/${r.id}`} target="_blank">v3</a>` 한 줄.

`ReportBatchPage`(단체 일괄 PDF)는 **PoC 범위 밖** — v1만 계속 사용. v3 채택 확정 후 batch 반영 결정.

## 3. 데이터셋 스키마 — 변주 풀

기존 cm yaml: 조합키 → 문자열 1개. LLM 세트: 조합키 → **문자열 배열**(변주 2~3개) 허용. 단일 문자열도 허용(변주 없는 칸).

```yaml
cm3:
  NP_A:
    - "사람을 안정시키면서 결과까지 만들어내는 …"   # 변주1
    - "공감으로 신뢰를 쌓고 정확한 판단으로 …"       # 변주2
  NP_FC:
    - "…"
```

**변주 선택**: 정적 데이터라 런타임 랜덤은 새로고침마다 바뀌어 부적절. **응답 UUID 해시 → 변주 인덱스**(결정론적). 같은 사람은 항상 같은 변주, 다른 사람은 분산. `lookupReportLLM`에서 처리.

```js
const idx = hashToIndex(result.id, variants.length);  // UUID → 0..n-1
```

## 4. 데이터 구축 방법 (콘텐츠 작업 — 진짜 무게)

손소장 txt(`Assets/incoming/에고그램/AI생성 리포트/txt/`)에서 백도로 추출:
1. 직군 txt를 조합키(top1_top2)로 묶음 → 조합키당 실제 사례 모음
2. 개인 사실(이름·경력 개월·소득·실적) **제거**
3. **강점우선 원칙 정제** — 낮은 점수 칸의 부정 직술("적다/늦다/흔들린다")을 강점 프레이밍으로 다시 씀([[리포트 설계 원칙]] 원칙 1·3). v2의 `STRENGTH_REFRAME`과 같은 방향
4. 조합키별로 자연스러운 변주 2~3개를 yaml 칸에 배치

## 5. PoC 범위 (못박기)

- **직군**: 컨설턴트(sales) 1개만
- **조합키**: 가장 흔한 것 우선 — NP_A, NP_FC, A_CP(+ 가능하면 CP_NP). 나머지는 fallback
- **섹션**: §1 성향분석(ego 평이 번역) + §2 강점 우선. §3~ 화법·조율은 후속
- **목표**: admin 결과 행에서 한 사람을 [리포트][v2][v3] 새 탭으로 띄워 **세 버전 나란히 비교** → "톤이 사는가 + 변주가 충분한가" 눈으로 확인
- **라이브**: PoC도 `egogram/`에서 `npm run deploy`로 라이브 배포. 손소장·애련공이 admin 공유계정(admin@mind2action.kr)으로 로그인해 직접 비교

## 6. 결정 대기 / 열린 항목

- [ ] 변주 풀 크기 — 조합키당 2개 vs 3개 (샘플 수 보고 결정, PoC에서 가늠)
- [ ] 비교 접근 — admin 로그인(추천, 즉시 가능) vs 별도 공개 비교 링크(추후)
- [ ] `IDENTITY`(top1_top2 정체성 명명, v2는 9/20 채움) — v3에서 LLM 세트로 확장할지
- [ ] batch(단체 PDF) v3 반영 — 채택 확정 후

## 7. 작업 순서 (TASKS)

1. [ ] 이 SPEC 확정 (피터공 검토)
2. [ ] 데이터 추출 백도 — 컨설턴트 PoC 조합키 변주 풀 → `cm_llm_sales.yaml`(부분)
3. [ ] `lookupReportLLM` + 변주 선택 + fallback
4. [ ] `ReportPageV3.jsx`(v2 복제) + 라우트 + admin v3 버튼
5. [ ] 빌드·라이브 배포 → 한 사람 v1/v2/v3 비교 확인
6. [ ] 피터공·손소장·애련공 비교 검토 → 확장 또는 방향 수정 결정
