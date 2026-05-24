import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://dkpsbsmpizjnukkpmgrq.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_HB51IVJn5yV1OpsieMN7PA_Y5JPUFN8';

export const supabase = createClient(supabaseUrl, supabaseKey);
