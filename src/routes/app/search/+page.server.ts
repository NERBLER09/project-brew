import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async (event) => {
	const { request } = event;
	const { session, supabaseClient } = await getSupabase(event);
	if (!session) {
		// the user is not signed in
		error(403, { message: 'Unauthorized' });
	}

	const query = event.url.searchParams.get('query')?.toLocaleLowerCase();
	console.log(query);

	const { data: projects } = await supabaseClient
		.from('projects')
		.select()
		.textSearch('all_project_new', `'${query}'`);

	return {
		search: {
			query,
			projects: projects ?? []
		}
	};
}) satisfies PageServerLoad;
