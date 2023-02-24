import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async (event) => {
	const { session, supabaseClient } = await getSupabase(event);
	if (!session) {
		throw redirect(303, '/');
	}

	event.depends('project:invited');

	const { data: users, error: err } = await supabaseClient
		.from('profiles')
		.select()
		.neq('id', session.user.id);

	const { data: project } = await supabaseClient
		.from('projects')
		.select('invited_people')
		.eq('id', event.params.slug)
		.limit(1)
		.single();

	console.log(project?.invited_people);

	if (users) {
		return {
			users,
			invited_people: project?.invited_people ?? []
		};
	}

	throw error(404, err?.message);
}) satisfies PageServerLoad;
