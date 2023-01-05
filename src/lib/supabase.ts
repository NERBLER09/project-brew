import { createClient } from '@supabase/auth-helpers-sveltekit';

let supabase = createClient(import.meta.env.VITE_PUBLIC_SUPABSE_URL, import.meta.env.VITE_PUBLIC_SUPABSE_ANON_KEY);

export { supabase };
