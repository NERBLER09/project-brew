import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async (event) => {
	const { session, supabaseClient } = await getSupabase(event);
	if (!session) {
		redirect(303, '/');
	}

	event.depends('app:all-projects');

	const { data: projects, error: projectsErr } = await supabaseClient
		.from('projects')
		.select('*, tasks(*)')
		.eq('user_id', session.user.id);

	const { data: user, error: err } = await supabaseClient
		.from('profiles')
		.select()
		.eq('id', session.user.id);

	const { data: tasks, error: err2 } = await supabaseClient
		.from('tasks')
		.select('*, projects(user_id)')
		.eq('projects.user_id', session.user.id);

	if (user && !projectsErr) {
		if (user?.length === 0) redirect(303, '/welcome');

		const pinned = projects.filter((value) => value.pinned);

		return {
			name: user[0]?.name,
			avatar_url: user[0].avatar_url,
			all: projects,
			pinned,
			user: user[0],
			tasks
		};
	}

	error(404, err?.message);
}) satisfies PageServerLoad;
