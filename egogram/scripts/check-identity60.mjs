// 인물상 60 대조 — yaml 값이 CSV 값과 «같은지»(존재 여부 아님). SPEC §13-5.
import { readFileSync } from 'node:fs';
import yaml from 'js-yaml';
import { parseCsv, identityRow } from './lib/csv.mjs';
import { identityKey } from '../src/lib/identityKey.js';

const csv = parseCsv(readFileSync(new URL('../docs/source/손소장_인물상60_260918.csv', import.meta.url), 'utf8')).map(identityRow);
const data = yaml.load(readFileSync(new URL('../src/data/identity60.yaml', import.meta.url), 'utf8'));
let fail = 0;
const bad = (m) => { fail++; console.log('⛔', m); };

if (csv.length !== 60) bad(`CSV ${csv.length}행 (60 아님)`);
if (Object.keys(data).length !== 60) bad(`yaml ${Object.keys(data).length}키 (60 아님)`);
for (const r of csv) {
  const d = data[r.key];
  if (!d) { bad(`${r.key} 없음`); continue; }
  if (d.title !== r.title) bad(`${r.key} title 다름: ${d.title} ≠ ${r.title}`);
  if (d.desc !== r.desc) bad(`${r.key} desc 다름`);
}
const titles = new Set(Object.values(data).map(d => d.title));
if (titles.size !== 60) bad(`제목 중복 (${titles.size}종)`);

// 동점 가장자리 (§13-4) — 최저점 4~5개 동점이면 scoreEngine bottom이 top과 겹친다
const TIE = yaml.load(readFileSync(new URL('../src/data/ego_terms.yaml', import.meta.url), 'utf8')).tie_priority;
const EGOS = ['CP', 'NP', 'A', 'FC', 'AC'];
function rank(scores) {
  const d = [...EGOS].sort((a, b) => scores[b] - scores[a] || TIE.indexOf(a) - TIE.indexOf(b));
  const a = [...EGOS].sort((x, y) => scores[x] - scores[y] || TIE.indexOf(x) - TIE.indexOf(y));
  return { scores, top1: d[0], top2: d[1], bottom: a[0] };
}
const cases = [
  { CP: 0, NP: 0, A: 0, FC: 0, AC: 0 },
  { CP: 0, NP: 0, A: 0, FC: 0, AC: 1 },
  { CP: 5, NP: 5, A: 5, FC: 5, AC: 12 },
  { CP: 14, NP: 3, A: 9, FC: 3, AC: 3 },
];
for (const s of cases) {
  const r = rank(s);
  const k = identityKey(r, TIE);
  const parts = k.split('_');
  if (new Set(parts).size !== 3 || !data[k]) bad(`동점 ${JSON.stringify(s)} → ${k}`);
}
// 전수: 0~20 점수 전 조합에서 키가 항상 존재
let miss = 0;
for (let i = 0; i < 21 ** 5; i += 7) {   // 7 간격 표본(58만) — 전수는 느리다
  let n = i; const s = {};
  for (const e of EGOS) { s[e] = n % 21; n = Math.floor(n / 21); }
  if (!data[identityKey(rank(s), TIE)]) miss++;
}
if (miss) bad(`표본 중 키 없음 ${miss}건`);

console.log(fail ? `⛔ 실패 ${fail}` : `✅ 60조합 CSV와 동일 · 동점 ${cases.length}건 · 표본 전건 키 존재`);
process.exit(fail ? 1 : 0);
