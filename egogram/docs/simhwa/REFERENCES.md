---
author: 아리공
project: M2A 성향별 심화코칭 리포트 생성기
created: 2026-07-11
type: 레퍼런스 인덱스 (read-first)
---

## M2A 심화코칭 리포트 생성기 — 레퍼런스 인덱스

> **이 파일을 맨 처음 읽는다.** 이 프로젝트에 필요한 모든 레퍼런스(소스 텍스트·기존 설계문서·재사용 코드·판단 노트)를 한곳에 모은 인덱스다. 뒤늦게 자료를 재발견하지 않기 위한 단일 진입점.
>
> 프로젝트 홈: `_dev/mind2action/egogram/docs/simhwa/`
> 3계층 문서: `PLAN.md`(계획) · `SPEC.md`(명세, 선문) · `TASKS.md`(작업). 코드 착수 전 SPEC 먼저.

---

### 0. 한 줄 요약

기존 M2A 성향리포트 엔진(scoreEngine + cmLookup + yaml 데이터셋, 결정적) **위에 병렬 오버레이로** 손소장 "성향별 심화코칭 리포트"(보험설계사 9섹션)를 자동 생성한다. 새 엔진 아님 — 새 렌더 레이아웃 + 새 데이터셋 + 재사용 규칙엔진.

---

### 1. 소스 텍스트 (이 폴더 `source/` — 동결 스냅샷)

손소장이 준 원자료. 인박스 원본(`Assets/incoming/MIND2ACTION/inbox/성향별 심화코칭 샘플/`)의 프리즈 사본이다.

| 파일 | 무엇 | 쓰임 |
|------|------|------|
| `source/지침_손소장_최종지침서.txt` | 손소장 ChatGPT 14항 최종지침서 | **사실상 스펙.** 리포트 구조·순서·금지사항·저성향 코칭 규칙(§6)의 정본 |
| `source/sample_김정임.md` | 완성 리포트 (A18 top / AC6 low, PA) | 고정블록 정본 + 생성슬롯 톤 정답지 |
| `source/sample_이서연.md` | (AC17 top / CP6 low, PA) | **약한 성향 우회 케이스**(CP6→CP고객) |
| `source/sample_이선규.md` | (FC20 top / NP8 low, PA) | 저-NP 코칭 실현 |
| `source/sample_이영수.md` | (CP17 top / A4 low, PA) | **저-A 화법 스왑 케이스** |
| `source/sample_허진랑.md` | (CP·NP·FC 18 tie / AC10, TCR) | 균형 최고 + TCR 호칭 케이스 |
| `source/고정블록대장.md` | 5샘플 기계 대조 → [고정]/[규칙]/[생성] 판정 + 고정 블록 전문 + 저성향 5세트 + 생성슬롯 G1~G12 규칙 | **콘텐츠 구축의 핵심 재료.** 복붙 가능한 문자열 대장 |

> 인박스 원본은 canonical 드롭 위치라 그대로 둔다(손소장 자료 규칙). 여기 사본은 프로젝트 동결본.

### 2. 기존 설계 문서 (mind2action 루트 — canonical, 이동 안 함)

기존 성향리포트가 어떻게 만들어졌는지. 심화코칭이 그 위에 얹히므로 반드시 참조.

| 경로 | 무엇 | 왜 중요 |
|------|------|---------|
| `_dev/mind2action/REPORT-V3-LLM.md` | v3 LLM 톤 리포트 시도 → **폐기** 이력 | "실시간 LLM 개인화 재현 불가·불필요, 정적 데이터로 70~80% 재현" 결정. 심화도 실시간 LLM 아님 |
| `_dev/mind2action/인물상 20조합 데이터화 작업 계획.md` | 성향 정의 2층위 + 섹션별 차원표 + 20조합 identity 구축 | **리포트 구조의 정본 지도.** 어느 섹션이 top1/top1_top2/top1_top2_bottom 축인지 |
| `_dev/mind2action/LLM리포트 데이터화 분석지시.md` | 손소장 원본 LLM 리포트 → 조합키 데이터화 백도 지시 | 콘텐츠 데이터화 방법론(개인변주 제거·강점우선·조합 일반화) |
| `_dev/mind2action/리포트 설계 원칙.md` | 강점우선 프레이밍 등 리포트 원칙 | 저성향을 부정직술 말고 강점 프레이밍으로(지침 §6과 일치) |
| `_dev/mind2action/SPEC.md` (51KB) | 성향리포트 전체 명세 | §10 데이터 계약·조합키 구조. 심화 SPEC이 참조·확장 |
| `_dev/mind2action/리포트 리디자인 작업 계획.md` | v2 리디자인 계획 | 역설계(cm3 도입부→인물상) 방법 |
| `_dev/mind2action/에고그램 인물상 20조합 검토 요청 - 손소장.md` | 20조합 인물상 리스트(손소장 승인본) | identity 축 어휘 |

### 3. 재사용 코드 (egogram/src — 심화 생성기가 얹힘)

| 파일 | 재사용 대상 | 비고 |
|------|-------------|------|
| `egogram/src/lib/scoreEngine.js` | `calculateScores`(top1/top2/bottom), `EGO_LABELS`, `TIE_PRIORITY=['A','CP','NP','FC','AC']`, `SAFE_RANGES` | 유형 판정 그대로 재사용 |
| `egogram/src/lib/cmLookup.js` | `lookupReport`(조합키 조회), `lookupReportLLM`(**오버레이 선례** — base 위에 새 데이터셋 덮어쓰기), 변주 UUID 해시 선택 | 심화 데이터셋도 이 패턴으로 병렬 접합 |
| `egogram/src/lib/resultLabels.js` | `JOB_LABELS`, `INCOME_LABELS`, `INCOME_ORDER`, `sortRows` | 경력·소득 라벨 |
| `egogram/src/components/Report/ReportPageV2.jsx` | `EGO_COLORS`(5색), `colorizeEgo`, `Paragraphs`, `deepReplaceOOO`(이름치환), `ScoreChart` | 룩앤필 핵심. **심화는 새 섹션 렌더러 필요**(9섹션 구조가 기존 §1~§5와 다름) |
| `egogram/src/components/Report/ReportBatchPage.jsx` | 단체 PDF 반복 렌더 | 심화 배치도 동일 패턴 |
| `egogram/src/pages/PreviewResultPage.jsx` | `/#/preview/result?name=&job=&group=` MOCK 진입점 | **설문 없이 레이아웃 프로토타이핑 재사용** |
| `egogram/src/styles/praxi.css` | `.report-*` + `@media print`(color-adjust:exact) | PDF 출력 파이프 |
| `egogram/src/data/identity.yaml` | 20조합 인물상 완성문 | 심화 도입부에 인용/확장 가능 |
| `egogram/src/data/cm_insurance.yaml` (148KB) | cm1~cm8 조합키 데이터(강점 cm3·조율 cm4·화법 cm5·클로징 cm6) | **심화 강점/조율/화법 내용의 상당수가 이미 데이터화돼 있음** — 재활용 대상 |

**데이터셋 두 방식** (심화도 동일 채택): (A) 파라미터 = ego×점수구간(`17-20/14-16/11-13/8-10/0-7`). (B) 이산 조합키 = `{top1}_{top2}`(20조합, 강점·정체성) / `{top1}_{top2}_{bottom}`(60조합, 화법). 언더스코어 대문자 코드.

**입력·빌드·배포**: 입력=supabase `responses`(score_cp/np/a/fc/ac·top/bottom·job_type·name). 라우팅=HashRouter(`/report/:id`). 스택=Vite8+React19. 배포=`npm run deploy`(gh-pages)→`survey.mind2action.kr`. **배포는 egogram/ 폴더에서, 수동.**

### 4. 판단·요청 노트 (볼트 — 의사결정 기록)

| 노트 | 무엇 |
|------|------|
| [[26.0711 M2A 심화코칭 — 시스템화 판단]] | 시스템화 가능 판단 + 3층 구조(고정/규칙/생성) + A안/B안 |
| [[요청.26.0711.1525-M2A심화코칭시스템화]] | 이 작업의 요청 노트(작업축) |
| [[26.0702 Mind2Action 성향별 심화 코칭 — 검토]] | 7/2 초기 검토(당시 "규칙 없음→시스템화 취소", 지침 공식화로 뒤집힘) |

### 5. 확정된 방향 (2026-07-11)

- **엔진 = 결정적(A안).** 실시간 LLM 아님(REPORT-V3-LLM 폐기 선례). 기존 scoreEngine+cmLookup 재사용.
- **콘텐츠 = 3층**: [고정] 고객대면 블록(대장에 추출완료) / [규칙] 저성향 5세트+점수랭킹 / [생성] 20조합 슬롯(G1~G12).
- **생성 슬롯 채우기 = 오프라인 배치 LLM로 yaml 초안 생성 → 손소장 검토 → 동결**(실시간 아님). 5샘플이 톤·규칙·어휘의 정답지(씨앗).
- **접합 = 병렬 오버레이**: 새 심화 데이터셋 + 새 9섹션 렌더러 + 공용 자산(색/차트/라벨/print) 재사용.
- **미확정(피터공/손소장 확인 대기)**: 생성슬롯 A안(수동집필) vs 오프라인LLM 초안 / 직군 확장(현재 보험설계사만) / 5샘플 안 본 조합(NP최고·FC최저) 커버 방식.

### 6. 열린 질문 (SPEC에서 해소할 것)

- 20조합 × 5고객유형 "잘 맞는 부분"(G4)을 이산 조합키로 다 채울지, 파라미터(강조점수 선택+어휘맵)로 압축할지
- 심화 화법/거절대응(고객유형 고정) vs 기존 cm5 화법(PA 키드) — 별개 데이터로 분리 확인
- 출력 형식: 기존 JSX 뷰에 통합 vs .md 산출 → 판단은 SPEC에서
