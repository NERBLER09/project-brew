import { env } from '$env/dynamic/private';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

let supabase: SupabaseClient;

if (env.NODE_ENV === 'dev') {
	supabase = createClient(env.DEV_SUPABSE_URL, env.DEV_SUPABSE_ANON_KEY);
} else {
	supabase = createClient(env.PROD_SUPABASE_URL, env.PROD_SUPABASE_ANON_KEY);
}

export { supabase };
