// 렌더 덤프 두 벌을 낱말 단위로 대조한다. (SPEC-ego-terms §8)
//   사용: node scripts/compare-render.mjs <before디렉토리> <after디렉토리>
//   빌드 식별자(v0.12 · MMDD-HHmm · hash)는 매 빌드 달라지므로 대조에서 뺀다.

import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const [BEFORE, AFTER] = process.argv.slice(2);
if (!BEFORE || !AFTER) { console.error('사용: node scripts/compare-render.mjs <before> <after>'); process.exit(1); }

const scrub = (s) => s.replace(/v\d+\.\d+ · \d{4}-\d{4} · \w+/g, '<빌드ID>');

let diffCount = 0;
for (const f of readdirSync(BEFORE).filter(f => f.endsWith('.json') && !f.startsWith('_')).sort()) {
  const b = JSON.parse(scrub(readFileSync(join(BEFORE, f), 'utf-8')));
  const a = JSON.parse(scrub(readFileSync(join(AFTER, f), 'utf-8')));
  const notes = [];

  if (b.text !== a.text) {
    const bw = b.text.split(' '), aw = a.text.split(' ');
    let i = 0;
    while (i < bw.length && i < aw.length && bw[i] === aw[i]) i++;
    notes.push(`글자 다름 (첫 지점 ${i}번째 낱말)\n     전: …${bw.slice(Math.max(0, i - 8), i + 8).join(' ')}…\n     후: …${aw.slice(Math.max(0, i - 8), i + 8).join(' ')}…`);
  }
  const bc = JSON.stringify(b.colored), ac = JSON.stringify(a.colored);
  if (bc !== ac) {
    const changed = b.colored.filter((x, i) => a.colored[i] !== x).slice(0, 4);
    notes.push(`색 다름 ${b.colored.length}→${a.colored.length}개\n     ${changed.join('\n     ')}`);
  }
  if (JSON.stringify(b.svgFills) !== JSON.stringify(a.svgFills)) notes.push('SVG 채움/선 다름');

  if (notes.length) { diffCount++; console.log(`✗ ${f}\n   ${notes.join('\n   ')}`); }
  else console.log(`✓ ${f}`);
}

console.log(diffCount ? `\n${diffCount}개 화면이 달라졌다.` : '\n전 화면 동일.');
process.exit(diffCount ? 1 : 0);
