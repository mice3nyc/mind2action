# Mind2Action (M2A) — 에고그램 리포트 자동화

에고그램 기반 직군별 맞춤 성향 코칭 리포트 자동 생성 시스템.

설문 50문항 → 5개 자아상태 점수 → CM 텍스트 매칭 → PDF 리포트.
현재 수작업(PPT+엑셀 조합)으로 하는 과정을 자동화한다.

## 문서
- [ROADMAP.md](ROADMAP.md) — Phase 0~6 개발 단계 + 미결 사항
- [ARCHITECTURE.md](ARCHITECTURE.md) — 시스템 구조, 데이터 흐름, 기술 선택

## 기술 스택
- 프론트엔드: 바닐라 HTML/JS
- 인증: Supabase Auth (추후, 관리자/사용자 역할 분리)
- 데이터: JSON (엑셀에서 변환) → Supabase DB (추후)
- PDF: TBD (html2pdf / Puppeteer / WeasyPrint)
- 배포: GitHub Pages + 커스텀 도메인

## 현재 상태
Phase 0 미시작. 미결 6건 손소장 확인 필요. 상세: ROADMAP.md
