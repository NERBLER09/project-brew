import { userData } from '$lib/stores/user';
import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async (event) => {
	const { session, supabaseClient } = await getSupabase(event);
	if (!session) {
		throw redirect(303, '/');
	}

	const user_id = event.params.slug;

	const { data: user, error: err } = await supabaseClient
		.from('profiles')
		.select()
		.eq('id', user_id)
		.limit(1)
		.single();

	console.log(user);

	if (user) {
		return { ...user };
	}

	throw error(404, err?.message);
}) satisfies PageServerLoad;
