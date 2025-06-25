import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async (event) => {
	const { session, supabaseClient } = await getSupabase(event);
	if (!session) {
		redirect(303, '/');
	}

	event.depends('project:milestones');

	const { data: milestones, error: err } = await supabaseClient
		.from('milestones')
		.select('*, tasks(*), roadmap(*)')
		.eq('project', event.params.slug);

	if (!err) {
		return { milestones };
	}

	error(404, `Failed to fetch milestones ${err.message}`);
}) satisfies PageServerLoad;
