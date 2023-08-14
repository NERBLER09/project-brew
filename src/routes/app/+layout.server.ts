import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { error, redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load = (async (event) => {
	const { session, supabaseClient } = await getSupabase(event);
	if (!session) {
		throw redirect(303, '/');
	}

	event.depends('app:data');

	const { data: notifications, error: err } = await supabaseClient
		.from('notifications')
		.select()
		.eq('target_user', session.user.id);
	const { data: user } = await supabaseClient
		.from('profiles')
		.select()
		.eq('id', session.user.id)
		.limit(1)
		.single();

	if (user) {
		return {
			notifications,
			...user,
			user
		};
	} else if (!user) {
		throw redirect(303, '/welcome');
	}

	throw error(404, err?.message);
}) satisfies LayoutServerLoad;
