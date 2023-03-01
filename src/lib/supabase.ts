import { createClient } from '@supabase/auth-helpers-sveltekit';

const supabase = createClient(
	import.meta.env.VITE_PUBLIC_SUPABSE_URL,
	import.meta.env.VITE_PUBLIC_SUPABSE_ANON_KEY,
	{
		realtime: {
			params: {
				eventsPerSecond: 10
			}
		}
	}
);

export { supabase };
