import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async (event) => {
	const { session, supabaseClient } = await getSupabase(event);
	if (!session) {
		throw redirect(303, '/');
	}

	event.depends('app:team-members');

	const { data: user, error: err } = await supabaseClient
		.from('profiles')
		.select()
		.eq('id', session.user.id)
		.limit(1)
		.select();


	if (user) {
		return {
			members: user[0].team_members || []
		};
	}

	throw error(404, err?.message);
}) satisfies PageServerLoad;
