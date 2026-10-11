import { useState, useEffect } from 'react';
import { loadResultsByKey } from './storage.js';

// 고른 캠페인의 응답만 읽는다 — SPEC §15-3.
//   key     캠페인 id | NO_CAMPAIGN | null(읽지 않음)
//   version 바뀌면 같은 키를 다시 읽는다(삭제·새로고침 뒤). 그동안은 지난 목록을 그대로 돌려준다.
//   돌려주는 것: { rows, loading, error } — rows는 키가 바뀐 직후 null(지난 캠페인 것을 보여 주지 않는다)
export function useCampaignRows(key, version) {
  const [state, setState] = useState({ key: null, version: null, rows: null, error: false });

  useEffect(() => {
    if (!key) return undefined;
    let alive = true;
    loadResultsByKey(key)
      .then((rows) => { if (alive) setState({ key, version, rows, error: false }); })
      .catch(() => { if (alive) setState((prev) => ({ key, version, rows: prev.key === key ? prev.rows : null, error: true })); });
    return () => { alive = false; };
  }, [key, version]);

  if (!key) return { rows: null, loading: false, error: false };
  const sameKey = state.key === key;
  const fresh = sameKey && state.version === version;
  return { rows: sameKey ? state.rows : null, loading: !fresh, error: fresh && state.error };
}
