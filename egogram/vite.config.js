import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import yaml from '@modyfi/vite-plugin-yaml'
import { execSync } from 'node:child_process'

// 리포트 하단 빌드 식별 코드(우리만 식별) — "어느 빌드를 봤나" 추적용.
// 버전 라벨은 배포 버전업 시 수동 갱신, 빌드시각·커밋해시는 매 빌드 자동.
const APP_VERSION = 'v0.12'
function buildId() {
  let hash = 'nogit'
  try { hash = execSync('git rev-parse --short=7 HEAD').toString().trim() } catch { /* git 없음 */ }
  const d = new Date()
  const p = (n) => String(n).padStart(2, '0')
  const stamp = `${p(d.getMonth() + 1)}${p(d.getDate())}-${p(d.getHours())}${p(d.getMinutes())}`
  return `${APP_VERSION} · ${stamp} · ${hash}`
}

export default defineConfig({
  plugins: [react(), yaml()],
  base: '/',
  define: { __BUILD_ID__: JSON.stringify(buildId()) },
})
