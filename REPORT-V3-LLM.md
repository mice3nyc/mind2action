# REPORT-V3-LLM — LLM 톤 반영 리포트 (세 번째 타입)

> 상태: SPEC 초안 (26.0531). 선문후코 — 이 문서 확정 후 PoC 코드 착수.
> 관련: [[리포트 리디자인 작업 계획]] (PLAN) · [[리포트 설계 원칙]] · [[26.0531 에고그램 LLM 리포트 데이터화 — 세 직군 종합과 스키마 함의]] (분석 근거)

> ## 상태 갱신 (26.0604): v3 폐기 종결, v2가 최종 리포트로 확정
>
> v3 비교 결과가 무의미했다 — 기존 cm_insurance가 이미 손소장 LLM 리포트의 데이터화본이었기 때문([[26.0601 에고그램 LLM 리포트 재점검 — 기존 데이터가 곧 그 LLM 리포트였다]]). 피터공 결정으로 **v2를 단일 최종 리포트 형태로** 굳힌다.
>
> **이번 단계 반영 (1·2번 — 관리자 단일 리포트 진입):**
> - 정식 경로 `/report/:id` → `ReportPageV2` 렌더 (기존 v1 `ReportPage` 라우트 대체). 버튼 href는 정식 경로(`#/report/:id`) 그대로, 내용만 v2.
> - admin 곁버튼 v2·v3 제거, 리포트 좌상단 "v2" 깃발 제거 (최종이니 버전 표식 불필요).
> - `/report-v2`·`/report-v3` 라우트 제거. `ReportPageV3.jsx`·`ReportPage.jsx`(default export)는 파일만 잔존(라우트 없음) — 추후 삭제 후보. `ReportView` named export는 `ReportBatchPage`가 아직 import하므로 `ReportPage.jsx` 파일 자체는 보존.
>
> **완료 (26.0604 후속):** 일괄 PDF(`ReportBatchPage`)도 v2 통일. `ReportPageV2`에서 `ReportViewV2`(row 받는 렌더부)를 추출해 단일·배치가 공유 → 모든 리포트가 v2 한 형태. v1 `ReportPage`(`ReportView` 포함)·v3 `ReportPageV3`는 이제 어디서도 import되지 않는 dead file(삭제 후보). admin 버튼명도 설명적으로(설문결과 데이터 보기 / 전체리포트 PDF 출력하기 / 캠페인설정변경).
>
> **미해결 (손소장 논의 후):**
> - §1 문장형(cm 키워드 → 문장) v2 흡수 (재료는 `cm_llm_sales.yaml`에 보존).

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

1. [x] 이 SPEC 확정
2. [x] 데이터 추출 — 컨설턴트 PoC 조합키 변주 풀 → `cm_llm_sales.yaml` (cm1 25칸 + cm3 4조합키)
3. [x] `lookupReportLLM` + 변주 선택(id 해시) + fallback
4. [x] `ReportPageV3.jsx`(v2 복제) + `/report-v3` 라우트 + admin v3 버튼
5. [x] 빌드·라이브 배포 (커밋 508b503, `npm run deploy`)
6. [ ] 피터공·손소장·애련공 비교 검토 → 확장 또는 방향 수정 결정

## 8. PoC 빌드 메모 (26.0531)

- `lookupReportLLM(result, jobType)` = `lookupReport` 결과 위에 `llm.cm1`(ego×구간)·`llm.cm3`(top1_top2)만 덮어씀. 변주 배열은 `pickVariant(value, id)` → `hashToIndex`(id 문자열 해시 % 길이). result에 id를 넣어 호출(`ReportPageV3`에서 `{ ...result, id }`).
- `ReportPageV3`의 `plainTranslation`은 v2와 달리 LLM cm1을 우선(STRENGTH_REFRAME은 미추출 ego fallback). 나머지 섹션(§3~)·레이아웃은 v2와 동일 — 공정 비교.
- cm2(§1 deep 본문)는 PoC 미추출 → 기존 cm fallback. 확장 시 추가 대상.
- 확장 경로: 조합키 더 채우기(cm3) → cm2 deep 본문 → manager/coach 직군(`CM_LLM_DATA`에 추가). batch(단체 PDF) v3는 채택 확정 후.

## 9. 결론 (26.0531) — v3 폐기 방향

비교 검토 결과 **별도 v3 타입은 무의미**. 핵심 이유: `cm_insurance.yaml`이 손소장 작업물에서 변환된 데이터라, 우리가 LLM에서 가져오려던 자연스러운 톤이 이미 기존 cm에 들어 있다. §2 강점(cm3)은 기존이 오히려 더 풍부(3문단 vs LLM 2문장). v2의 stripMeta(앞머리 메타 괄호 제거)만으로 이미 LLM처럼 읽힌다.

**유일하게 건진 것**: §1 "성향별로 자세히 보기"의 한 줄이 키워드 나열("결정력 있음, 믿음직한")보다 문장형("기준이 분명하고 · 결론을 낼 수 있으며")이 더 잘 읽힌다(피터공). 별도 타입 유지 이유가 아니라, v2의 cm1 한 줄을 문장형으로 바꾸는 작은 개선으로 흡수할 것.

**내일 결정 대기**: ① v3 코드/데이터 revert + 재배포 ② §1 문장형을 v2에 반영(컨설턴트 cm1 문장형 25칸은 cm_llm_sales.yaml에 이미 있음 → 재료 재활용 후 파일 정리). 결정 전까지 라이브에 [v3] 임시 잔존.

**프로세스 교훈**: 소스(LLM 원본)만 분석하고 타깃(기존 cm)을 나란히 대조하지 않은 채 빌드·배포까지 갔다. 김정임 1명 v2/v3 비교(1분)면 착수 전에 판명될 일. → [[memory/feedback_compare_source_and_target_first]]

## 10. 재점검 결과 (26.0601) — v3 폐기 확정 + 처리 보류

피터공이 "결과가 이해 안 된다"며 재점검 요청. 어제 빠졌던 소스↔기존 cm 대조를 수행한 결과:

- **원본 txt 섹션 = cm1~cm8 구조 일대일** (성향분석/강점/조율/거절대응/화법).
- **본문 어휘가 원본 txt에 그대로** 등장("내 이야기를 잘 들어준다", "충분히 고민되실 수 있습니다").
- **닫는 문장만 정제됨**("힘들 때 생각나는 전문가" 등은 원본에 그 형태로는 없음) = 큐레이션 흔적.
- **결론**: 기존 `cm_insurance.yaml`은 바로 이 손소장 LLM 리포트(컨설턴트 45편·관리자 26편)를 조합키별 canonical 1편으로 다듬은 데이터화본. "뽑을 게 없다"가 아니라 "이미 v1 때 뽑혀 라이브에 들어가 있다". 기존이 더 풍부한 것도 설명됨(v1=정성 7문단 1편 / 어제=빠른 3문장 변주).
- **새로 뽑을 가치 = 변주뿐**: 기존은 조합키당 1편이라 같은 유형끼리 같은 글. 원본엔 사람마다 다른 사례(조합키당 평균 2~3건). 단체 일괄 PDF에서 반복이 눈에 띌 때만 의미, 개별 리포트엔 무의미.

**피터공 결정(6/1)**: §1 문장형 v2 흡수 여부는 **손소장과 논의로 보류**. v3 잔재 정리(코드 revert)도 그 논의에 묶어 대기 — 합의 시 §1 흡수 + 정리 한 번에. cm1 문장형 25칸은 `cm_llm_sales.yaml`에 재료로 보존. 라이브 [v3] 임시 잔존.

→ 재점검 노트: [[26.0601 에고그램 LLM 리포트 재점검 — 기존 데이터가 곧 그 LLM 리포트였다]]
