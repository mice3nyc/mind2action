---
author: 아리공
project: M2A 성향별 심화코칭 리포트 생성기
created: 2026-07-11
type: PLAN (개발 계획, live)
---

## 개발 계획 — M2A 성향별 심화코칭 리포트 생성기

> 엔트리 포인트. 돌아오면 이 노트 → `TASKS.md` → `ls -lt` 순. 레퍼런스 전량 `REFERENCES.md`.

### 목적·의도

손소장이 ChatGPT로 개인별 수기 작성하던 "성향별 심화코칭 리포트"(보험설계사 상담 실전형, 9섹션)를 5점수 입력에서 **자동 생성**한다. 기본 성향리포트가 시스템화된 것처럼, 심화코칭도 손소장 손을 떼게 한다.

### 왜 지금 가능한가 (7/2→7/11 전환)

7/2엔 "손소장 수기·규칙 없음→시스템화 취소"였다. 7/11 손소장이 **답변 지침을 14항 최종지침서로 공식화**하고 일관된 샘플 5개를 냄 → 지침서가 사실상 스펙, 샘플이 정답지. 판단 뒤집힘. 근거 [[26.0711 M2A 심화코칭 — 시스템화 판단]].

### 설계 방향 (확정)

- **기존 엔진 위 병렬 오버레이.** 새 엔진 아님. scoreEngine+cmLookup+공용자산 재사용, 새 데이터셋+9섹션 렌더러만 신설. (근거: 기존 리포트가 이미 조합키 yaml 결정적 방식 — REFERENCES §3)
- **결정적(A안).** 실시간 LLM 아님(REPORT-V3-LLM 폐기 선례). 생성 슬롯은 오프라인 배치로 yaml 채워 동결.
- **콘텐츠 3층**: [고정] 고객대면 블록(대장 추출완료) / [규칙] 저성향 5세트+랭킹 / [생성] 20조합 슬롯 G1~G12. 생성이 유일한 집필 무게, 그것도 cm_insurance 기존 데이터 상당수 재활용.

### 현재 상태 (2026-07-11 — 선문 완료, 코드 미착수)

- 5샘플·지침 대조 → `고정블록대장.md` 완성(고정 8·규칙 6·생성 12).
- 레퍼런스 한곳 수집(`simhwa/`) + `REFERENCES.md` 인덱스.
- `SPEC.md` 초안 v0.1 작성(선문).
- **다음(새 세션)**: SPEC §12 빌드 순서 1번(D1·D3 스키마 확인)부터. 코드 착수.

### 재사용 vs 신설 (한눈)

| 재사용 | 신설 |
|--------|------|
| scoreEngine·cmLookup·resultLabels | `buildSimhwa` 규칙엔진 |
| EGO_COLORS·colorizeEgo·ScoreChart·deepReplaceOOO | `SimhwaReportView` 9섹션 렌더러 |
| praxi.css print·PreviewResultPage MOCK | `simhwa_static/lowtrait/gen.yaml` |
| cm_insurance cm3/cm4(강점·조율 재활용) | `/simhwa/:id` 라우트 |

### 인계 내역 (비개발자용)
- (착수 후 채움)
