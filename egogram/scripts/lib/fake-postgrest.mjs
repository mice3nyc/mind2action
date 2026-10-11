// 가짜 PostgREST — 검사용 (SPEC §15-8). node와 브라우저 양쪽에서 돈다.
//   실제 supabase-js가 보내는 요청을 그대로 받는다: select · eq · is.null · order · offset/limit · count=exact · HEAD.
//   서버 상한(serverCap)을 흉내 낸다 — limit을 안 주거나 크게 줘도 serverCap행까지만.
//   stats.rowsServed = 지금까지 본문으로 내준 응답 행 수. 「무엇을 내려받았나」를 검사가 이것으로 센다.

const EGOS = ['CP', 'NP', 'A', 'FC', 'AC'];
const JOBS = ['sales', 'coach', 'sales_leader'];
const INCOMES = ['under200', '200-400', '400-600', '600-800', '800-1000', '1000-1500'];

// 표본: A 1,300명(상한 초과) · B 40명 · C 0명 · D 73명(가장 최근 생성) · 캠페인 없음 18명 = 1,431
export function buildDataset() {
  const campaigns = [
    { id: 'camp-a', code: 'AAA111', client_name: '가나 사업단', status: 'active', period_start: '2026-06-01', created_at: '2026-06-01T00:00:00Z', expected_count: 1200, n: 1300 },
    { id: 'camp-b', code: 'BBB222', client_name: '다라 사업단', status: 'active', period_start: '2026-07-01', created_at: '2026-07-01T00:00:00Z', expected_count: 50, n: 40 },
    { id: 'camp-c', code: 'CCC333', client_name: '마바 사업단', status: 'draft', period_start: null, created_at: '2026-10-09T00:00:00Z', expected_count: 30, n: 0 },
    { id: 'camp-d', code: 'DDD444', client_name: '사아 사업단', status: 'active', period_start: '2026-10-06', created_at: '2026-10-06T00:00:00Z', expected_count: 200, n: 73 },
  ];
  const plan = [[null, 18], ...campaigns.map((c) => [c, c.n])];
  const responses = [];
  let seq = 0;
  // 캠페인끼리 시각이 섞이게 번갈아 넣는다
  const left = plan.map(([c, n]) => ({ c, n }));
  while (left.some((x) => x.n > 0)) {
    for (const x of left) {
      if (x.n <= 0) continue;
      x.n--;
      const i = seq++;
      const scores = EGOS.map((_, k) => 8 + ((i * (k + 3)) % 12));
      const order = EGOS.map((e, k) => [e, scores[k]]).sort((p, q) => q[1] - p[1]);
      responses.push({
        id: `resp-${String(i).padStart(5, '0')}`,
        created_at: new Date(Date.UTC(2026, 5, 1) + i * 60000).toISOString(),
        campaign_id: x.c ? x.c.id : null,
        group_name: x.c ? x.c.client_name : '테스트',
        name: `응답자${i}`,
        birth_date: '1980-01-01',
        career_months: String(12 + (i % 100)),
        company: '가짜생명',
        department: `지점${i % 7}`,
        job_type: JOBS[i % 3],
        income_range: INCOMES[i % INCOMES.length],
        recruit_count: String(i % 5),
        score_cp: scores[0], score_np: scores[1], score_a: scores[2], score_fc: scores[3], score_ac: scores[4],
        total: scores.reduce((s, v) => s + v, 0),
        top1: order[0][0], top2: order[1][0], bottom: order[4][0],
        grades: Object.fromEntries(EGOS.map((e) => [e, 'mid'])),
      });
    }
  }
  return { campaigns: campaigns.map(({ n, ...c }) => c), responses, expected: Object.fromEntries(campaigns.map((c) => [c.id, c.n])) };
}

export function makeFakeBackend({ campaigns, responses, serverCap = 1000 }) {
  const stats = { requests: 0, headRequests: 0, rowsServed: 0, log: [] };
  const control = { failMatching: null }; // (url, method) => boolean — 걸리면 500

  function handle(url, method, headers) {
    const table = url.pathname.split('/').pop();
    const source = table === 'responses' ? responses : table === 'campaigns' ? campaigns : null;
    if (!source) return { status: 404, body: { message: `fake: ${table} 없음` } };
    let rows = source.slice();
    for (const [k, v] of url.searchParams) {
      if (['select', 'order', 'offset', 'limit'].includes(k)) continue;
      if (v === 'is.null') rows = rows.filter((r) => r[k] == null);
      else if (v.startsWith('eq.')) rows = rows.filter((r) => String(r[k]) === v.slice(3));
      else return { status: 400, body: { message: `fake: 모르는 필터 ${k}=${v}` } };
    }
    const order = url.searchParams.get('order');
    if (order) {
      const keys = order.split(',').map((s) => { const [col, dir] = s.split('.'); return [col, dir === 'desc' ? -1 : 1]; });
      rows.sort((a, b) => { for (const [col, d] of keys) { const c = String(a[col]).localeCompare(String(b[col])); if (c) return c * d; } return 0; });
    }
    const total = rows.length;
    const offset = Number(url.searchParams.get('offset') || 0);
    const limit = Math.min(Number(url.searchParams.get('limit') || serverCap), serverCap);
    const page = rows.slice(offset, offset + limit);
    const wantsCount = /count=exact/.test(headers.get('prefer') || '');
    const range = `${page.length ? `${offset}-${offset + page.length - 1}` : '*'}/${wantsCount ? total : '*'}`;
    if (method === 'HEAD') return { status: 200, body: null, range };
    const select = url.searchParams.get('select') || '*';
    const cols = select === '*' ? null : select.split(',').map((s) => s.trim());
    const out = cols ? page.map((r) => Object.fromEntries(cols.map((c) => [c, r[c]]))) : page;
    if (table === 'responses') stats.rowsServed += out.length;
    return { status: 200, body: out, range };
  }

  async function fetch(input, init = {}) {
    const url = new URL(typeof input === 'string' ? input : input.url);
    const method = (init.method || 'GET').toUpperCase();
    const headers = new Headers(init.headers || {});
    stats.requests++;
    if (method === 'HEAD') stats.headRequests++;
    stats.log.push(`${method} ${url.pathname.split('/').pop()}${url.search}`);
    const res = control.failMatching && control.failMatching(url, method)
      ? { status: 500, body: { message: '가짜 실패' } }
      : handle(url, method, headers);
    const h = { 'content-type': 'application/json' };
    if (res.range) h['content-range'] = res.range;
    return new Response(method === 'HEAD' || res.body == null ? null : JSON.stringify(res.body), { status: res.status, headers: h });
  }

  return { fetch, stats, control };
}
