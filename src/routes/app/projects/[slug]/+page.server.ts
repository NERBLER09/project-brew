import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { error, fail, type Actions } from '@sveltejs/kit';

export const actions: Actions = {
	newTask: async (event) => {

		const { request, params } = event;
		const { session, supabaseClient } = await getSupabase(event);
		if (!session) {
			// the user is not signed in
			error(403, { message: 'Unauthorized' });
		}

		const data = await request.formData();
		const name = data.get('name') as string;
		const description = data.get('description') as string;
		const list = data.get('list-id');
		const status = data.get('list-status') as string;
		const priority_level = data.get('priority_level') as string;

		const projectId = params.slug;

		const { data: task, error: err } = await supabaseClient
			.from('tasks')
			.insert({
				list,
				project: projectId,
				name,
				description,
				is_priority: false,
				user_id: session.user.id,
				status,
				priority_level,
			})
			.select();

		if (task && !err) {
			return {
				data: task[0],
				status: 'success'
			};
		} else {
			return fail(400, { message: `Failed to create new task: ${err.message}` });
		}
	},

	newList: async (event) => {
		const { request, params } = event;
		const { session, supabaseClient } = await getSupabase(event);
		if (!session) {
			// the user is not signed in
			error(403, { message: 'Unauthorized' });
		}

		const data = await request.formData();
		const name = data.get('list-name');
		const status = data.get('list-status');
		const project = data.get('project-id') as string;
		const userId = session.user.id;

		const { error: err } = await supabaseClient
			.from('lists')
			.insert({
				list_name: name,
				project,
				user_id: userId,
				status
			})
			.select();

		if (!err) {
			return {
				status: 'success'
			};
		} else {
			return fail(400, { message: `Failed to create new task: ${err.message}` });
		}
	}
};
