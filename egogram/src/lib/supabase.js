import { createClient } from '@supabase/supabase-js';

// `?.` — 검사 스크립트가 node에서 이 파일을 그대로 불러온다(node에는 import.meta.env가 없다). SPEC §15-8

// 기본값은 보험판 DB다. 일반판은 기본값으로 떨어지면 안 된다 — 보험 응답에 붙는다(SPEC-org-edition §10-8).
//   빌드는 vite.config가 막고, 여기서 한 번 더 막는다.
const isOrg = import.meta.env?.VITE_EDITION === 'org';
if (isOrg && !import.meta.env?.VITE_SUPABASE_URL) throw new Error('일반판인데 VITE_SUPABASE_URL이 없다 — .env.org.local');
const supabaseUrl = import.meta.env?.VITE_SUPABASE_URL || 'https://dkpsbsmpizjnukkpmgrq.supabase.co';
const supabaseKey = import.meta.env?.VITE_SUPABASE_ANON_KEY || 'sb_publishable_HB51IVJn5yV1OpsieMN7PA_Y5JPUFN8';

export const supabase = createClient(supabaseUrl, supabaseKey);
