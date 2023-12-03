import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { error, fail, redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async (event) => {
	const { session, supabaseClient } = await getSupabase(event);
	if (!session) {
		throw redirect(303, '/');
	}

	const params = event.params;
	const projectId = params.slug;

	event.depends('project:list');

	const { data: tasks } = await supabaseClient
		.from('tasks')
		.select('*, sub_tasks(*), milestone(*)')
		.eq('project', projectId);

	const { project } = await event.parent();

	if (tasks) {
		return {
			project: {
				...project,
				tasks: tasks || []
			}
		};
	}

	return error(404, 'Failed to fetch project board lists');
}) satisfies PageServerLoad;

export const actions = {
	new: async (event) => {
		const { request, params } = event;
		const { session, supabaseClient } = await getSupabase(event);
		if (!session) {
			// the user is not signed in
			throw error(403, { message: 'Unauthorized' });
		}

		const data = await request.formData();
		const name = data.get('new-task-name') as string;

		const projectId = params.slug;

		const { data: listId } = await supabaseClient
			.from('lists')
			.select('id')
			.eq('project', projectId)
			.eq('position', 0)
			.limit(1)
			.single();

		const { error } = await supabaseClient
			.from('tasks')
			.insert({ project: parseInt(projectId), user_id: session.user.id, list: listId?.id, name });

		if (!error) {
			return { success: true };
		} else {
			return fail(400, { message: error.message });
		}
	}
} satisfies Actions;
