import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { error, fail, type Actions } from '@sveltejs/kit';

export const actions: Actions = {
	newTask: async (event) => {
		const { request } = event;
		const { session, supabaseClient } = await getSupabase(event);
		if (!session) {
			// the user is not signed in
			error(403, { message: 'Unauthorized' });
		}

		const data = await request.formData();
		const name = data.get('name') as string;
		const description = data.get('description') as string;
		let dueDate: string | null = data.get('date') as string;
		const list = data.get('list-id');
		const status = data.get('list-status') as string;
		const project = data.get('project');
		const project_name = data.get('project_name');
		const user = data.get('user_object');
		const priority_level = data.get('priority_level') as string;
		const milestone = data.get('milestone') as string;

		const assignedString = data.get('assigned') as string;
		let assigned = assignedString.split(',') || null;
		assigned = assigned[0] === '' ? [] : assigned;

		const formTags = data.get('tags') as string;
		let tags = formTags?.split(',') || null;
		tags = tags[0] === '' ? [] : tags;

		dueDate = dueDate ? dueDate : null;

		if (assigned) {
			for (const id of assigned) {
				if (id === session.user.id) continue;

				await supabaseClient.from('notifications').insert({
					message: `Has assigned you to ${name} in ${project_name}`,
					target_user: id,
					sentBy: user
				});
			}
		}

		const { data: task, error: err } = await supabaseClient
			.from('tasks')
			.insert({
				list,
				project,
				name,
				description,
				due_date: dueDate,
				is_priority: false,
				user_id: session.user.id,
				status,
				tags,
				assigned,
				priority_level,
				milestone: !milestone ? milestone : null
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
