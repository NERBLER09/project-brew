import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async (event) => {
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
		.textSearch('all_milestone', `'${query}'`);

	const { data: teams } = await supabaseClient
		.from('teams')
		.select()
		.textSearch('all_team', `'${query}'`);

	return {
		search: {
			query,
			projects: projects ?? [],
			milestones: milestones ?? [],
			teams: teams ?? []
		}
	};
}) satisfies PageServerLoad;
