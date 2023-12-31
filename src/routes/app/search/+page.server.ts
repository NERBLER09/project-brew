import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async (event) => {
	const query = event.url.searchParams.get('query')?.toLocaleLowerCase();
	console.log(query);

	return {
		search: {
			query
		}
	};
}) satisfies PageServerLoad;
