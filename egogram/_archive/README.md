# _archive — 폐기 보존

번들에서 제외된(src 밖) 참고용 보존 파일. 어디서도 import되지 않는다.

- **ReportPage.jsx** — v1 원본 리포트(+ `ReportView`). 26.0604 v2를 최종 리포트로 확정하며 `/report/:id` 라우트가 `ReportPageV2`로 바뀌어 폐기. 일괄 PDF도 `ReportViewV2`로 통일됨.
- **ReportPageV3.jsx** — v3 LLM 톤 비교 리포트. 비교 무의미로 폐기 종결(기존 cm이 곧 손소장 LLM 데이터화본). 배경: [[REPORT-V3-LLM]].

> 되살릴 일은 없을 것으로 보이나, v1↔v2 디자인 비교나 cm 톤 참고가 필요하면 여기서 본다. cmLookup.js의 `lookupReportLLM`·`cm_llm_sales.yaml`도 v3 잔재(현재 미사용).
