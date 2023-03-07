import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async (event) => {
	const { session, supabaseClient } = await getSupabase(event);
	if (!session) {
		throw redirect(303, '/');
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
	if (!err) {
		return {
			team: {
				...team
			}
		};
	}

	throw error(400, err.message);
}) satisfies PageServerLoad;
