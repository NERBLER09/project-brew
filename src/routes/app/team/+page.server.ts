import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async (event) => {
	const { session, supabaseClient } = await getSupabase(event);
	if (!session) {
		throw redirect(303, '/');
	}

	event.depends('app:team-members');

	const { data: teams, error: err } = await supabaseClient.from('teams').select();
	if (!err) {
		return {
			teams
		};
	}

	throw error(404, err?.message);
}) satisfies PageServerLoad;
