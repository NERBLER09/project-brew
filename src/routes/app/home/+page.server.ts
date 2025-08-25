import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import lodash from 'lodash';

export const load = (async (event) => {
	const { session, supabaseClient } = await getSupabase(event);
	if (!session) {
		redirect(303, '/');
	}

	event.depends('app:all-projects');

	const { data, error: projectsErr } = await supabaseClient
		.from('projects')
		.select('*, project_members!inner(*), tasks(*)')
		.eq('project_members.user_id', session.user.id);

	const { data: user, error: err } = await supabaseClient
		.from('profiles')
		.select()
		.eq('id', session.user.id);

	const projectIds = data?.map((item) => item.id) ?? [];

	const { data: team } = await supabaseClient.from('projects').select().eq('team', session.user.id);

	const { data: tasks, error: err2 } = await supabaseClient
		.from('tasks')
		.select()
		.in('project', projectIds);


	if (user && !projectsErr) {
		if (user?.length === 0) redirect(303, '/welcome');

		let allProjects = [...data, ...(team ?? [])];
		allProjects = lodash.uniqBy(allProjects, 'id');
		const pinned = data.filter((value) => {
			const item = value.project_members.find((item) => item.project === value.id)
			if (item.pinned) return value
		});
		return {
			name: user[0]?.name,
			avatar_url: user[0].avatar_url,
			background: user[0].dashboard_bg,
			all: data,
			pinned,
			user: user[0],
			tasks
		};
	}

	error(404, err?.message);
}) satisfies PageServerLoad;
