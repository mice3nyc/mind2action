import { createClient } from '@supabase/supabase-js';

// `?.` — 검사 스크립트가 node에서 이 파일을 그대로 불러온다(node에는 import.meta.env가 없다). SPEC §15-8

const supabaseUrl = import.meta.env?.VITE_SUPABASE_URL || 'https://dkpsbsmpizjnukkpmgrq.supabase.co';
const supabaseKey = import.meta.env?.VITE_SUPABASE_ANON_KEY || 'sb_publishable_HB51IVJn5yV1OpsieMN7PA_Y5JPUFN8';

export const supabase = createClient(supabaseUrl, supabaseKey);
