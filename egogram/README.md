# React + Vite

## 배포 (중요)

라이브: `https://survey.mind2action.kr` (GitHub Pages, gh-pages 브랜치). Actions 없음 — 배포는 수동.

- **`npm run deploy`** — 빌드 + gh-pages에 `--add`로 발행. **옛 해시 에셋을 지우지 않고 누적**한다.
  - 이유: GitHub Pages가 `index.html`을 10분 캐시(`max-age=600`). 기본 배포(`-d dist`만)는 옛 에셋을 삭제하므로, 캐시된 옛 index.html이 가리키는 JS가 사라져 **404 → 흰 화면(블랭크)**. 짧은 간격 연속 배포에서 특히 발생(2026-06-14 사고). `--add`로 옛 에셋을 남겨두면 캐시된 페이지도 끝까지 동작.
- **`npm run deploy:clean`** — 옛 에셋까지 싹 지우는 전체 교체 배포. 누적분 정리용. **활성 사용자가 없는 시간대에만** 쓴다(직후 ~10분 캐시 창에 블랭크 위험 그대로). 평소엔 `deploy`만.
- 배포는 반드시 egogram 폴더(`_dev/mind2action/egogram`)에서. 다른 경로면 ENOENT로 조용히 실패.

---

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
