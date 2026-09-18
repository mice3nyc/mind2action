// 따옴표 안 줄바꿈을 품는 구글시트 CSV 파서 (의존성 없이). BOM 제거.
export function parseCsv(text) {
  text = text.replace(/^﻿/, '');
  const rows = [];
  let row = [], field = '', q = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (q) {
      if (c === '"' && text[i + 1] === '"') { field += '"'; i++; }
      else if (c === '"') q = false;
      else field += c;
    } else if (c === '"') q = true;
    else if (c === ',') { row.push(field); field = ''; }
    else if (c === '\n' || c === '\r') {
      if (c === '\r' && text[i + 1] === '\n') i++;
      row.push(field); rows.push(row); row = []; field = '';
    } else field += c;
  }
  if (field !== '' || row.length) { row.push(field); rows.push(row); }
  const [head, ...body] = rows.filter(r => r.some(v => v.trim() !== ''));
  return body.map(r => Object.fromEntries(head.map((h, i) => [h.trim(), r[i] ?? ''])));
}

// 인물상 60 CSV 한 행 → { key, title, desc } (SPEC §13-2)
export function identityRow(r) {
  const key = [r['TOP 1'], r['TOP 2'], r['BOTTOM 1']].map(s => s.trim()).join('_');
  const title = r['나를 표현하는 한마디'].trim();
  const desc = r['생활 속 성향과 행동'].split('\n').map(s => s.trim()).filter(Boolean).join('\n');
  return { key, title, desc };
}
