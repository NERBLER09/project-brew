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

	const { data: projects } = await supabaseClient
		.from('projects')
		.select()
		.textSearch('all_project_new', `'${query}'`);

	const { data: milestones } = await supabaseClient
		.from('milestones')
		.select('*, projects(project_name, id)')
		.textSearch('name', `'${query}'`);
	console.log(milestones);

	return {
		search: {
			query,
			projects: projects ?? [],
			milestones: milestones ?? []
		}
	};
}) satisfies PageServerLoad;
