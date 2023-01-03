import { createClient } from '@supabase/supabase-js';

let supabase = createClient(import.meta.env.VITE_PUBLIC_SUPABSE_URL, import.meta.env.VITE_PUBLIC_SUPABSE_ANON_KEY);

export { supabase };
