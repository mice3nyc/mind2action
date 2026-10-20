import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import yaml from '@modyfi/vite-plugin-yaml'
import { execSync } from 'node:child_process'
import process from 'node:process'

// 리포트 하단 빌드 식별 코드(우리만 식별) — "어느 빌드를 봤나" 추적용.
// 버전 라벨은 배포 버전업 시 수동 갱신, 빌드시각·커밋해시는 매 빌드 자동.
const APP_VERSION = 'v0.13'
function buildId() {
  let hash = 'nogit'
  try { hash = execSync('git rev-parse --short=7 HEAD').toString().trim() } catch { /* git 없음 */ }
  const d = new Date()
  const p = (n) => String(n).padStart(2, '0')
  const stamp = `${p(d.getMonth() + 1)}${p(d.getDate())}-${p(d.getHours())}${p(d.getMinutes())}`
  return `${APP_VERSION} · ${stamp} · ${hash}`
}

// 에디션 — `--mode org`면 일반 조직판(SPEC-org-edition §10). 보험판은 모드 없이 현행 그대로.
//   .env(보험 DB)는 모든 모드에서 읽히므로, 일반판이 DB 주소를 따로 안 받으면 조용히 보험 DB에 붙는다.
//   그래서 일반판은 주소가 없거나 보험 주소와 같으면 빌드를 멈춘다.
const INSURANCE_DB_HOST = 'dkpsbsmpizjnukkpmgrq'
function checkEdition(mode) {
  const env = loadEnv(mode, process.cwd(), 'VITE_')
  const isOrg = env.VITE_EDITION === 'org'
  if (mode === 'org' && !isOrg) throw new Error('[edition] --mode org인데 VITE_EDITION=org가 없다 (.env.org)')
  if (mode !== 'org' && isOrg) throw new Error('[edition] 보험판 빌드에 VITE_EDITION=org가 섞였다')
  if (isOrg) {
    const url = env.VITE_SUPABASE_URL || ''
    if (!url || url.includes(INSURANCE_DB_HOST)) {
      throw new Error('[edition] 일반판 DB 주소가 없거나 보험판 DB다 — .env.org.local에 VITE_SUPABASE_URL·VITE_SUPABASE_ANON_KEY')
    }
  }
  return isOrg
}

export default defineConfig(({ mode }) => {
  const isOrg = checkEdition(mode)
  return {
    plugins: [react(), yaml()],
    base: isOrg ? '/org/' : '/',
    build: { outDir: isOrg ? 'dist-org' : 'dist' },
    define: { __BUILD_ID__: JSON.stringify(buildId()) },
  }
})
