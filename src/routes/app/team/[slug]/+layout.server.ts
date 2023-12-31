import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { error, redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load = (async (event) => {
	const { session, supabaseClient } = await getSupabase(event);
	if (!session) {
		redirect(303, '/');
	}

	const params = event.params;
	const teamId = params.slug;

	event.depends('app:team');

	const { data: team, error: err } = await supabaseClient
		.from('teams')
		.select()
		.eq('id', teamId)
		.limit(1)
		.single();

	const { data: team_members } = await supabaseClient
		.from('team_members')
		.select()
		.eq('team', teamId);

	const { data: role } = await supabaseClient
		.from('team_members')
		.select('role')
		.eq('user_id', session.user.id)
		.eq('team', teamId)
		.limit(1)
		.single();

	const { data: projects } = await supabaseClient.from('projects').select().eq('team', teamId);

	if (!err) {
		return {
			team: {
				...team,
				team_members: team_members ?? [],
				projects: projects ?? []
			},
			role: role?.role
		};
	}

	error(400, err.message);
}) satisfies LayoutServerLoad;
