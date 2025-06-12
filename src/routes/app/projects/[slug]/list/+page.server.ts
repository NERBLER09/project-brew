import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { fail, type Actions } from '@sveltejs/kit';

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
