// 인물상 60조합 yaml 생성 — 손으로 옮기지 않는다 (SPEC §13-2).
//   node scripts/build-identity60.mjs  → src/data/identity60.yaml
import { readFileSync, writeFileSync } from 'node:fs';
import yaml from 'js-yaml';
import { parseCsv, identityRow } from './lib/csv.mjs';

export const CSV_PATH = new URL('../docs/source/손소장_인물상60_260918.csv', import.meta.url);
const OUT = new URL('../src/data/identity60.yaml', import.meta.url);

const rows = parseCsv(readFileSync(CSV_PATH, 'utf8')).map(identityRow);
const data = Object.fromEntries(rows.map(({ key, title, desc }) => [key, { title, desc }]));
const head = [
  '# 인물상 (top1_top2_bottom 60조합, 직군 공통) — 리포트 §1 박스·§2 첫 줄 "OOO님은 ___입니다"',
  '# 생성물이다. 손으로 고치지 말 것 → docs/source/손소장_인물상60_260918.csv 를 고치고',
  '#   node scripts/build-identity60.mjs 로 다시 만든다. 대조: node scripts/check-identity60.mjs',
  '# 원본: 손소장 9/17 수정요청 2번 · 9/18 수정본(링크_2.1). SPEC(mind2action) §13',
  '# desc = 두 줄 (첫 줄 = top1_top2 20종, 둘째 줄 = bottom 5종)',
  '',
].join('\n');
writeFileSync(OUT, head + yaml.dump(data, { lineWidth: -1 }));
console.log(`identity60.yaml ${rows.length}조합`);
