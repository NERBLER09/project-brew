import type { PageServerLoad } from './$types';
import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { error, redirect } from '@sveltejs/kit';

export const load = (async (event) => {
	const { session, supabaseClient } = await getSupabase(event);
	if (!session) {
		redirect(303, '/');
	}

	const params = event.params;
	const projectId = params.slug;

	event.depends('project:dashboard');

	const { data: tasks, error: err } = await supabaseClient
		.from('tasks')
		.select()
		.eq('project', projectId);

	const { data: milestones } = await supabaseClient
		.from('milestones')
		.select('*, tasks!inner(*)')
		.eq('project', projectId)
		.eq('completed', false);

	const today = tasks?.filter((item) => item.due_date === new Date().toISOString());

	const behind = tasks?.filter((item) => {
		if (item.due_date) {
			return (
				new Date(item.due_date).toISOString() < new Date().toISOString() && item.status !== 'done'
			);
		}
	});

	if (tasks) {
		return {
			dashboard: {
				tasks,
				today,
				milestones: milestones ?? [],
				behind
			}
		};
	}
	return error(400, err?.message);
}) satisfies PageServerLoad;
