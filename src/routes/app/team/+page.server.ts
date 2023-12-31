import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async (event) => {
	const { session, supabaseClient } = await getSupabase(event);
	if (!session) {
		redirect(303, '/');
	}

	event.depends('app:team-members');

	const { data: teams, error: err } = await supabaseClient
		.from('teams')
		.select('*, team_members!inner(user_id)')
		.eq('team_members.user_id', session.user.id);

	if (!err) {
		return {
			teams
		};
	}

	error(404, err?.message);
}) satisfies PageServerLoad;
