import type { PageServerLoad } from './$types';
import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { error, redirect } from '@sveltejs/kit';

export const load = (async (event) => {
	const { session, supabaseClient } = await getSupabase(event);
	if (!session) {
		throw redirect(303, '/');
	}

	const params = event.params;
	const projectId = params.slug;

	event.depends('project:dashboard');

	const { data: tasks, error: err } = await supabaseClient
		.from('tasks')
		.select()
		.eq('project', projectId);

	const { data: today } = await supabaseClient
		.from('tasks')
		.select()
		.eq('due_date', new Date().toISOString())
		.eq('project', projectId);
	// .neq("status", "done");

	const { data: milestones } = await supabaseClient
		.from('milestones')
		.select('*, tasks!inner(*)')
		.eq('project', projectId)
		.eq('completed', false);

	const { data: behind } = await supabaseClient
		.from('tasks')
		.select()
		.eq('project', projectId)
		.lt('due_date', new Date().toISOString())
		.neq('status', 'done');

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
