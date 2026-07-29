---
author: 아리공
project: M2A 성향별 심화코칭 리포트 생성기
created: 2026-07-11
type: SPEC (선문후코 — 뼈대 착수 반영)
status: v0.3 (2026-07-15 — 손소장 7/13 수정요청 반영: 9섹션→4섹션 재구성, ② 에너지 발현 테이블)
---

## SPEC — M2A 성향별 심화코칭 리포트 생성기

> 선문후코. 이 문서 확정 후 코드 착수. 레퍼런스 전량은 `REFERENCES.md`. 고정 문자열·저성향 세트·생성슬롯 규칙 원본은 `source/고정블록대장.md`.

> ⚠️ **2026-07-15 구조 변경 — §13 참조.** 손소장 7/13 수정요청으로 **9섹션(①~⑨) → 4섹션(1~4)** 재구성. ② "강점·조율"(생성문단)이 성향리포트와 중복이라 삭제되고, **CM2 시트의 "성향 점수별 에너지 발현 상태"(5성향×5구간 결정적 조회, `simhwa_energy.yaml`)로 대체.** ⑧ 거절 심화 삭제. 아래 §3·§5의 ②·⑧ 관련 서술은 옛 구조 기준(생성엔진 이력 보존) — 현행은 §13이 정본.

### 1. 목적·아키텍처

손소장 "성향별 심화코칭 리포트"(보험설계사 9섹션, 상담현장 실전형)를 5점수 입력에서 자동 생성한다. **새 엔진이 아니라 기존 성향리포트 엔진 위의 병렬 오버레이.**

재사용(손대지 않음): `scoreEngine.calculateScores`(top1/top2/bottom·tie-break), `cmLookup`(조합키 조회·변주 UUID 해시), 공용 자산(`EGO_COLORS`·`colorizeEgo`·`ScoreChart`·`deepReplaceOOO`·`resultLabels`·praxi.css print).

신설: ①심화 9섹션 렌더러 ②심화 전용 데이터셋(yaml) ③조립 규칙(랭킹→고정/규칙/생성 배치). 접합 선례 = `lookupReportLLM`(base 위에 새 데이터셋 덮어쓰기).

**콘텐츠 정책(확정)**: 실시간 LLM 개인화 아님(REPORT-V3-LLM 폐기 선례). 생성 슬롯은 오프라인 배치로 yaml 채워 동결 → 런타임은 결정적 조회.

### 2. 입력 스키마

기존 `responses`에서 전부 파생. 심화 리포트가 쓰는 필드:

| 필드 | 출처 | 비고 |
|------|------|------|
| 이름 | `name` | `deepReplaceOOO` 치환 |
| 호칭 | 신규 입력 or job_type 매핑 | **PA님 / TCR님** 2종(지침 첫 페이지). 전역 슬롯 `{호칭}` |
| 경력(개월) | 신규 or profile | 첫 페이지 표기 |
| 월소득 | `income`/profile | `INCOME_LABELS` |
| CP/NP/A/FC/AC | `score_*` | 0~20 |
| top1·top2·bottom | scoreEngine | 조합키·랭킹 |

> 미확정: 호칭·경력·월소득이 현재 responses 스키마에 있는지 확인(§11 D1). 없으면 admin 입력 필드 또는 리포트 파라미터로 보강.

### 3. 리포트 구조 — 9섹션 블록 분해

각 블록에 판정 태그 + 데이터 소스. 상세 문자열은 `고정블록대장.md` 참조.

| 섹션 | 블록 | 판정 | 데이터 소스 / 축 |
|------|------|------|------------------|
| ① 목적 | 3문단 | 고정 | static, `{이름}{호칭}` 치환 |
| ② 강점·조율 | 강점 문단 | 생성 G1 | top1_top2 (identity/cm3 재활용 후보) |
| | 조율 문단 | 생성 G2 | bottom |
| | 저성향 '의식적 ✔' 메뉴 | 규칙 | bottom→5세트 중 삽입 (지침 §6) |
| | 📌 핵심코칭 | 생성 G3 | top+bottom |
| ③~⑦ 성향별 고객(5) | 고객특징 도입부 🔴🟠🔵🟢🟣 | 고정 | static, 고객유형별 5문자열 |
| | 🌿 잘 맞는 부분 | 생성 G4 | **고객유형 × PA top1_top2 — 신규 축** |
| | 💼 마음가짐 | 고정(느슨)/생성 G5 | 고객유형별. 표준화 시 고정 승격 |
| | 🗣 화법 (5줄) | 규칙 | 고객유형별 고정 풀 + 저-A 스왑 |
| | 🚫 거절 대응 | 규칙 | 고객유형별 고정 풀 + 저성향 변형 |
| | 📌 핵심코칭 | 생성 G6 | 고객유형 × PA top |
| ⑧ 거절 심화 | 도입부 | 고정 | static |
| | 강·약점 진단 | 생성 G7 | top+bottom |
| | 질문/공감/방향 스톡 | 고정 | static 3×3 풀 |
| | 저성향 삽입 | 규칙 | bottom |
| | 📌 핵심코칭 | 생성 G8 | top+bottom |
| ⑨ 소개 | 도입부 | 고정 | static |
| | 강점 문단 | 생성 G9 | 관계형 상위(NP·FC·A) |
| | 저성향 보완 | 생성 G10 | bottom(AC·CP) |
| | 요청멘트 3 / 체크리스트 6 / 감사멘트 2 | 고정 | static 풀 |
| | 📌 핵심코칭 | 생성 G11 | top+bottom |
| | 🍀 클로버 멘트 | 생성 G12 | top |

### 4. 데이터 모델 (신규 yaml)

> **뼈대 착수 시 확정된 실제 키 형태 (2026-07-11, 코덱스 v0.2 출력 대조).** 아래 조회 규칙이 정본.
> - `strength`(G1)·`referral_strength`(G9)·`clover`(G12): `{strengthKey}` → string
> - `adjust`(G2)·`referral_lowtrait`(G10): `{trait}` → string — **조합키 아님, bottom 트레잇 단일키**
> - `core_section2`(G3)·`reject_diagnosis`(G7)·`core_reject`(G8)·`core_referral`(G11): `{strengthKey}.{bottom}` → string
> - `synergy`(G4)·`core_customer`(G6): `{strengthKey}.{유형고객}` → string (유형키=`CP고객`…`AC고객`)
> - `strengthKey` = AC 억제 비-AC 순서쌍 12개(§1-B). `bottom`·`유형` 변주는 항상 채워짐(5샘플 커버리지 100% 검증).
> - ⚠️ G3 `core_section2`는 **존재함**(초안에서 누락 의심했으나 코덱스 v0.2에 포함). 💼 마음가짐(G5)은 미생성 → 뼈대에서 렌더 생략(표준화 시 추가).

기존 방식 계승. 위치 `egogram/src/data/`. Vite yaml 플러그인 정적 import.

- **`simhwa_static.yaml`** — [고정] 블록 전량(고객유형 무관 or 고객유형별). 키: `purpose`, `customer_intro.{CP|NP|A|FC|AC}`, `talk_pool.{유형}`, `reject_pool.{유형}`, `reject_deep.intro`, `reject_deep.stock`, `referral.intro/request/checklist/thanks`. 값=고정블록대장 §2 그대로.
- **`simhwa_lowtrait.yaml`** — [규칙] 저성향 5세트. 키: `low.{CP|NP|A|FC|AC}` = {menu:[], mentions:[]}. 값=대장 §3.
- **`simhwa_gen.yaml`** — [생성] 슬롯. 조합키 이산. 키 예: `strength.{top1}_{top2}`(G1), `adjust.{bottom}`(G2), `synergy.{유형}.{top1}_{top2}`(G4), `core.*`, `clover.{top1}_{top2}`(G12). **변주 배열 허용**(대장 톤). 초안=오프라인 배치 생성(§8).
- **재활용**: G1 강점·G2 조율·G9는 기존 `cm_insurance.yaml`(cm3/cm4)에 데이터화된 손소장 원문이 있으니 우선 매핑 → 부족분만 신규 생성.

> 어휘 매핑(생성 보조): 대장 §4 "생성 슬롯 공통 어휘 매핑"(CP상위→명확한 방향제시…). 생성 프롬프트 재료.

### 5. 규칙 엔진 (조립)

`buildSimhwa(result)` (신규, cmLookup 옆). 순서:
1. `calculateScores` 재사용 → top1/top2/bottom, 5점수, tie=`['A','CP','NP','FC','AC']`.
1-B. **강점 조합키 산출 (AC 억제 — 2026-07-11 확정, 5샘플 대조 근거)**: 강점 슬롯(G1·G3·G7·G8·G9·G11·G12·조합키)의 키는 점수순 top1_top2가 아니라 **AC를 제외한 상위 2 비-AC 성향**이다. `strengthKey = 점수desc([CP,NP,A,FC]).slice(0,2)`. AC는 강점키에 절대 등장 안 함(유효 12조합). AC가 원점수 top1/top2여도 배제: AC-top1이면 조율포인트로 능동 역전, AC-top2면 "기본 균형"으로 강등. **조율포인트(약점)는 별개 축** — 최저 성향(0~10)을 AC 포함 정상 처리. 근거: 이서연(AC17→강점 NP_FC)·이영수(AC12 top2→강점 CP_NP 헤드라인 CP). 상세 = `생성_핸드오프_패키지.md §3-B`.
2. 각 섹션을 §3 판정대로 조립: 고정=static yaml 삽입 / 규칙=bottom·유형 키로 세트 삽입 / 생성=조합키로 `simhwa_gen` 조회(없으면 cm 재활용 fallback→그도 없으면 파라미터 합성). **강점 슬롯은 1-B의 strengthKey로 조회.**
3. **저성향 트리거**: 트레잇 0~10점이면 해당 위치에 `low.{trait}` 삽입(②·③~⑦마음가짐·⑧). 지침 §6.
4. **화법 A-스왑**: A가 낮으면 유형별 화법 풀의 1~2줄을 "이유 쉽게 설명" 라인으로 교체(대장 §3 화법 스왑 규칙).
5. **변주 선택**: 기존 `hashToIndex(result.id, n)` 결정론적.

### 6. 렌더

- 신규 `SimhwaReportView({ row })` (ReportViewV2 형제). 9섹션 렌더러. 공용 `EGO_COLORS`·`colorizeEgo`·`Paragraphs`·`ScoreChart`·`deepReplaceOOO` 재사용. 룩=🍀 샘플 md(이모지 소제목 🔴🌿💼🗣🚫📌🍀 컬러 헤더, 컴팩트 줄간격, A4 print).
- 라우트 `/simhwa/:id` (HashRouter), 배치 `/simhwa-batch/:campaignId`(후순위).
- **admin 진입 (2026-07-11 배선)**: `AdminDashboard.jsx` 리포트 셀 `report-action-group`에 `[심화코칭]` 링크(`#/simhwa/:id`, 새 탭) — [리포트 보기] 옆. **sales(보험설계사)만 노출**(D5: 심화는 sales 전용). manager/coach는 심화 없음.
- 프로토타이핑 진입점 = `PreviewResultPage` 패턴 재사용(설문 없이 MOCK 5점수로 레이아웃 확인). **5샘플 점수를 MOCK으로 넣어 원본 md와 대조 검증**(회귀 정답지).
- print: praxi.css `@media print` 심화 섹션 추가(`print-color-adjust:exact`).

### 7. 문체 제약 (지침 §12·§13 — 린터화)

`**볼드` 금지 / 줄간격 최소·컴팩트 / 같은 내용 반복 금지 / "전문가" 남발 금지 / 추상 코칭 금지 / 중학생 이해 수준. → 렌더·생성 산출에 텍스트 린터(볼드·중복 문장 검출) 적용.

### 8. 콘텐츠 구축 방법 (생성 슬롯 채우기 — 진짜 무게)

1. [고정]·[규칙] = 대장에서 그대로 yaml 이식(집필 아님, 추출).
2. [생성] 20조합 = **오프라인 배치**: 5샘플+지침+어휘맵을 few-shot으로, 슬롯별(G1~G12) 조합키 순회 생성 → `simhwa_gen.yaml` 초안. 개인사실 제거·강점우선.
3. **5샘플 조합은 원문에서 직접 추출**(생성 아님, 정답 보존): 김정임 A_?/AC, 이서연 AC_?/CP, 이선규 FC_?/NP, 이영수 CP_?/A, 허진랑 tie/AC.
4. 안 본 조합(NP최고·FC최저 등)은 규칙+어휘맵으로 생성.
5. **손소장 검토 → 동결.** 이후 수정은 yaml만.

### 9. 검증 범위 (선문후코 — 태울 만큼만)

**[아리공 자가점검]**: 런타임 예외 0 / 5샘플 MOCK 렌더가 원본 md와 구조·고정블록 일치(회귀 정답지) / 볼드·중복 린터 통과 / 조합키 누락 시 fallback 무결(빈 화면 0) / build clean.
**[피터공·손소장 확인]**: 생성 슬롯 톤·정확도(손소장) / 실 데이터 리포트 손맛 / A4 인쇄.

### 10. 산출/배포

egogram/ 에서 `npm run deploy`(gh-pages)→survey.mind2action.kr, 수동. 빌드 기록은 `TASKS.md`에 바이트·해시·날짜.

### 11. 결정 (2026-07-11 피터공 확정 D2·D4·D6 / D1·D3 코드확인 / D5 보류)

- **D1 ✅ 확인 완료 (2026-07-11).** `supabase-schema.sql` responses에 **`career_months`(경력)·`income_range`(월소득) 존재**(storage.js 매핑됨). **호칭(PA/TCR)은 스키마에 없음** → `buildSimhwa`가 `result.honorific`(파라미터) 받고 기본 `'PA'`. admin 입력/리포트 파라미터 보강은 실배포 전 결정(현재 preview는 파라미터, 실 row는 PA 기본·허진랑류 TCR만 수동).
- **D2 ✅ 이산(discrete) 확정.** 조합마다 완성된 실제 코칭 문장을 yaml에 담는다(기존 cm3 방식·손소장 샘플 톤). 어휘맵은 저장 방식이 아니라 **생성 LLM에게 주는 가이드**로만 쓴다. 파라미터 압축 폐기(이유: D6로 외부 LLM이 쓰므로 손 안 들어 압축 불필요, 압축하면 내용이 얇아짐 — 피터공 지적).
- **D3 ✅ 확인 완료 (2026-07-11).** 기존 `cm5`는 `cmLookup`에서 `top1_top2_bottom`(PA 자기 성향 조합) 키드 = **PA 축**. 심화 `talk_pool`/`reject_pool`은 **고객유형(CP/NP/A/FC/AC) 축** — 완전히 다른 축이라 별개 데이터 확정. 재사용 안 하고 `simhwa_static.yaml`에 신규 이식.
- **D4 ✅ JSX 웹 뷰 통합 확정.** 기본 리포트와 같은 웹페이지 형태(색·차트·print·admin 배치 재사용). 샘플이 .md였던 건 손소장 ChatGPT 산출 형식일 뿐.
- **D5** (보류) 직군 확장 — 현재 보험설계사(sales) only. 지침이 sales 전용.
- **D6 ✅ 외부 LLM 위임 확정.** 생성 슬롯 초안은 코덱스/ChatGPT/클로드챗에 위임(백도 아님 — 피터공 외부 분담 의도). **아리공 몫 = 정밀 생성 핸드오프 패키지 저작(`생성_핸드오프_패키지.md`) + 돌아온 결과 yaml 통합·검증.** 실시간 아님(동결).

### 12. 빌드 순서 (→ TASKS)

1. ✅ D1·D3 확인(스키마·데이터 분리) — §11
2. ✅ `simhwa_static.yaml`+`simhwa_lowtrait.yaml` 이식(대장→yaml)
3. ✅ `buildSimhwa` 규칙엔진 + fallback (`src/lib/buildSimhwa.js`)
4. ✅ `SimhwaReportView` 렌더러 + `/simhwa/:id` + Preview MOCK(`/preview/simhwa?s=이름`)
5. ✅ 5샘플 MOCK 회귀 대조 — 강점키 AC억제 5/5 정답·슬롯 커버리지 100%·런타임 예외 0·build clean. 이서연(AC17 top1) 실렌더로 억제 실증.
6. `simhwa_gen.yaml` 생성 슬롯 = 코덱스 v0.2 12조합 통합 완료(§8은 이미 외부 생성분). 손소장 톤 검토 대기.
7. 린터(볼드·중복)·라이브 배포 → 손소장 검토

#### 착수 시 확정된 구현 세부 (뼈대)
- **강점키**: `strengthKeyOf(scores)` = 비-AC 4성향 점수 desc top2, tie=`['A','CP','NP','FC','AC']`. AC 무조건 배제.
- **화법 A-스왑**: `scores.A<=10`이면 **CP·NP·FC 고객** 화법 풀 마지막 줄을 `talk_swap.low_a_line`로 교체(A·AC 고객 풀은 유지).
- **저성향 트리거**: `scores[e]<=10`인 트레잇마다 `low.{e}` 세트 삽입(②·⑧). ⑧ lowInserts는 A·AC만.
- **토큰**: `{이름}`→name, `{호칭}`→`${honorific}님`(기본 PA). deepReplace 아닌 정규식 치환. *(→ §13: 호칭은 `님` 고정으로 변경)*
- **fallback**: 생성 슬롯 누락 시 빈 문자열 → 렌더러 조건부 스킵(빈 화면 0).

### 13. 손소장 7/13 수정요청 반영 (2026-07-15, v0.3) — 현행 정본

출처: `Assets/incoming/mind2action/inbox/수정요청/7월13일 수정요청 내용 - 시트1.csv`(9항목) + 링크시트 `컨설턴트로- 심화 코칭 - CM2.csv`. 요청노트 `요청.26.0715.0635`.

**구조: 9섹션(①~⑨) → 4섹션(1~4), 원문자→아라비아 재번호.**
`표지 → 1.리포트의 목적 → 2.상담 시 성향 점수별 에너지 발현 상태 → 3.고객 유형별 상담 코칭 → 4.소개를 만드는 고객관리`

| # | 요청 | 반영 |
|---|------|------|
| 1 | 호칭 `PA님`/`TCR님` → `님` | `buildSimhwa.js` `honorificLabel = '님'` 고정 |
| 2 | 표지 제목·이름 좌상단 → 아래·중앙 | `.simhwa-cover` text-align center + padding-top 52px |
| 3 | ① 목적 세번째 단락 삭제("보험은 상품을 판매하는…") | `simhwa_static.yaml` purpose 3→2문단 |
| **4** | ② "강점·조율" 삭제 → "상담 시 성향 점수별 에너지 발현 상태" | **신규 `simhwa_energy.yaml`**(5성향×5구간=25셀, CM2 verbatim). `energyBandIndex(score)` 내림차순 경계(17/14/11/8/0). `section2.energyStates`=CP·NP·A·FC·AC 순 5블록. **기존 gen.strength/adjust/core_section2·lowMenus 렌더 제거**(gen yaml은 ③~⑦·④가 계속 사용) |
| 5 | 성향 흑백 → 컬러 `예) FC(친화,표현)` | ② 블록 헤더 `EGO_COLORS` + `CP(기준·결단)` 라벨 |
| 6 | `③~⑦` → `3.` | Section num |
| 7 | ⑧ 고객 거절 대응 심화 삭제 | 렌더 제거(`buildSimhwa.rejectDeep`는 잔존, 미사용). `LowTraitSet` 컴포넌트 제거 |
| 8 | `⑨` → `4.` | Section num |
| 9 | 줄간격 넓히기(성향리포트 수준) | `.simhwa-container` line-height 1.62→1.85, p margin 8→11px |

**②의 성격 전환**: 옛 ②는 강점키(AC억제) 기반 **개인별 생성문단**(성향리포트와 중복). 신규 ②는 각 성향 점수를 구간에 매핑하는 **결정적 조회 테이블** — 외부 LLM 불필요, `simhwa_energy.yaml`만 수정하면 문구 갱신. `strengthKeyOf`·AC억제 규칙(§1-B)은 ③~⑦ synergy/core에서 계속 사용(존치).

**검증(2026-07-15)**: vite build clean(css 37.62kB) / 헤드리스 preview(김정임 CP14·NP13·A18·FC14·AC6) 구간매핑 5/5 정확·호칭 "님"·목적 2문단·②5블록 컬러·⑧부재·1~4번호·콘솔에러0.

**미해결**: CM2 원문 오타 3곳(NP0~10 "관게/뷰드러", A0~7 "받아드리지", FC11~13 "전문가 답다") verbatim 보존 — 손소장 확인 후 수정. 수정요청 항목 10~12(검토필요)는 내용 도착 시 처리.

### 14. 손소장 추가 수정요청 (2026-07-15 오후, v0.4) — 이모지 제거 + 성향명 색상

출처: 피터공 전달. 요청노트 `요청.26.0715.1249`.

**① 성향명 색상 — 확인 결과 이미 구현 상태.** 손소장 요청("기준·결단=빨강, 배려·공감=오렌지, 이성·판단=파랑 등")은 `EGO_COLORS`(CP `#ef4444`·NP `#f59e0b`·A `#38bdf8`·FC `#10b981`·AC `#8b5cf6`)와 정확히 일치. 성향명 구조 출현부(표지 칩·② 에너지 헤드·③ 고객 타이틀) 전부 색 적용됨(v0.3 배포분). **본문 산문 속 낱말은 자연어라 자동 색칠 안 함**(오발색 위험). 추가 조치 없음.

**② 이모지 전면 제거 (린터 §7 확장).** 손소장: "절대 이모지와 긴 엠대시는 쓰지 않는다. 그것이 AI라는 표시다." 리포트 출력에서 이모지 제거:
- `SimhwaReportView.jsx`: 고객 이모지(🔴🟠🔵🟢🟣) + `IconHead` 소제목 이모지(🌿🗣🚫📌✔💌) 전부 제거. IconHead는 텍스트 헤더만.
- `simhwa_static.yaml`: `referral.checklist` ✔ prefix 제거.
- `simhwa_gen.yaml`: `clover.*` 🍀 prefix 제거(12줄).
- `simhwa_lowtrait.yaml`: `low.*.menu`/일부 mentions ✔ 제거(현행 4섹션 미렌더지만 [규칙] 소스 청소).
- `buildSimhwa.js`: `CUSTOMER_EMOJI` 상수·`emoji` 필드 제거.
- **엠대시(—)**: grep 결과 코드/yaml 주석 줄에만 존재 → 리포트 출력엔 원래 없음. 출력 클린(주석 무관).
- 소제목 이모지 제거 후 시각 마커는 색 헤더가 대신함(고객 타이틀 색·소제목 볼드). 체크리스트 ✔ 제거 후 마커 부재 → 필요 시 중립 불릿(비이모지) 후속.

**③ 본문 성향명 컬러 코딩 + 에고 코드 제거 (v0.5, 2026-07-15).** 피터공 재지시: 색을 헤더뿐 아니라 **읽는 문장 안 성향명**에 입히고("기준·결단 성향이 높은 고객은…"의 "기준·결단 성향"을 색), 성향리포트처럼 **영문 에고 코드(CP/NP/A/FC/AC) 병기는 제거**. 기존 성향리포트 `colorizeEgo`(ReportPageV2)와 동일 로직 채택(손소장 26.0609·0611 승인분: 코드·괄호 제거, 한글 라벨만 색, "성향" 접미, 조사 교정).
- 심화 데이터의 코드 출현 3형태: (A) `CP(기준·결단)` 정순 — gen 54곳 / (B) `기준·결단(CP)` 역순 — static customer_title 5곳 / (C) 코드 없는 맨 라벨 `기준·결단 성향이…` — customer_intro. 맨 코드(괄호 없는 CP 단독)는 렌더 데이터에 없음(주석·yaml 키뿐, 안전).
- **처리**: (A)·(C)는 렌더러 `colorize()`가 정순+맨라벨 둘 다 매칭해 색 span·코드 제거. (B) customer_title는 데이터에서 `(CODE)` 제거(h3 전체가 이미 트레잇 색). ② 에너지 헤드 jsx `{code}({라벨})` → 코드 빼고 색 라벨만.
- `SimhwaReportView.jsx`에 `colorize(text)` 추가(정순 `CODE(라벨)` + 맨 `라벨` 매칭), Paras·LineList에 적용. `EGO_PLAIN`·`EGO_COLORS` 재사용.
- **색칠 범위 = 기존 성향리포트 `colorizeEgo`와 100% 동일 (2026-07-15 피터공 확정)**: **라벨만 색칠**. 뒤에 '성향'이 이미 이어지면 그 '성향'은 **무색**(예: "<span>기준·결단</span> 성향이 높은"). '성향' 없으면 라벨 뒤에 접미 " 성향"을 색 안에 붙이고 조사 교정. 처음엔 "라벨 성향" 통째 색으로 만들었으나 기존 리포트와 어긋나 base 로직으로 되돌림(hasSuffix 분기).
- **소제목 색 = 전부 검정 볼드 통일 (2026-07-15 피터공 지적).** "…과 잘 맞는 부분" 소제목이 녹색 tint(`#10b981`)였는데 FC(친화·표현) 유형색과 동일해 혼동 → tint 제거(나머지 소제목은 이미 무tint 검정). **컬러 코딩은 본문 성향명에만, 소제목은 검정 볼드로 절제** — 성향명 색 위계 보존.

### 15. 손소장 7/28 수정요청 — 착수 전 제약 (2026-07-29)

출처: `Assets/incoming/MIND2ACTION/inbox/수정요청/7월28일 수정 요청.xlsx`(9항목) + 링크 시트 `5가지 성향 고객 응대 방법.xlsx`(시트1=항목3 본문 / 시트2=항목6 본문). 요청노트 `요청.26.0729.1520`.

**⛔ MBTI 대응 줄은 반영하지 않는다 (피터공 결정, 2026-07-29).** 링크 시트1의 각 편 2번째 줄에 `(MBTI 에서는 J 와 T의 핵심 성향과 가깝습니다.)` 형태로 5줄이 파란 글씨로 들어 있다. **과학적 근거가 없는 프레임을 리포트에 실으면 놀공 산출물의 신뢰를 깎는다**는 것이 이유. 시트1 본문을 옮길 때 이 다섯 줄을 떼고 옮긴다 — 문단 머리에 붙어 있어 통째로 복사하면 딸려 들어간다. 현재 미반영(항목 3 미착수).

**라벨 변경은 보류.** 손소장 새 표기(CP 원칙·결단 / NP 공감·배려 / A 이성·판단~분석 / FC 친화·표현 / AC 순응·협조)는 **피터공이 손소장과 확인 후 결정**. 바꾸면 네 리포트+결과화면+admin CSV가 전부 바뀌고, 이미 공유한 리포트 링크도 새 이름으로 다시 그려진다. 확인 항목 4가지(NP 뒤집기가 의도인지 / A는 판단인지 분석인지 / 전면 교체가 맞는지 / MBTI 줄) → 요청노트.
변경이 확정되면 작업은 **용어 사전 한 곳**(`src/data/ego_terms.yaml` label 5줄 + aliases에 옛 표기 + `check-ego-terms.mjs`의 `FROZEN` 스냅샷)에서 끝난다 — `docs/SPEC-ego-terms.md` 참조.

**★ 새 라벨 둘은 받침이 없다** — `공감·배려`(려)·`순응·협조`(조). 현행 코드가 깔고 있던 "성향 이름은 항상 받침으로 끝난다" 전제가 정확히 깨지는 조합. 2026-07-29 용어 사전의 조사 자동 교정(`src/lib/josa.js`)이 이걸 막는다.
