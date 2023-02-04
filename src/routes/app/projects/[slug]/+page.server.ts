import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { error, redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async (event) => {
	const { session, supabaseClient } = await getSupabase(event);
	if (!session) {
		throw redirect(303, '/');
	}

	let params = event.params;
	const projectId = params.slug;

	event.depends('app:project');

	// Grabs project info
	const { data: project, error: errProject } = await supabaseClient
		.from('projects')
		.select()
		.eq('user_id', session.user.id)
		.eq('id', projectId)
		.limit(1)
		.single();
	const { data: lists } = await supabaseClient.from('lists').select().eq('project', projectId);
	if (project?.user_id !== session.user.id) throw redirect(301, '/app/projects/not-invited');
	if (project) {
		return {
			name: project?.project_name,
			id: project.id,
			description: project?.description,
			banner: project?.banner,
			tags: JSON.parse(project?.tags) || [],
			lists: lists || [],
			project,
			invited_people: project.invited_people || []
		};
	}

	throw error(404, errProject?.message);
}) satisfies PageServerLoad;

export const actions: Actions = {
	newTask: async (event) => {
		const { request, params } = event;
		const { session, supabaseClient } = await getSupabase(event);
		if (!session) {
			// the user is not signed in
			throw error(403, { message: 'Unauthorized' });
		}

		const data = await request.formData();
		const name = data.get('name');
		const description = data.get('description');
		let dueDate = data.get('date');
		const isPriority = data.get('priority');
		const list = data.get('list-id');
		const status = data.get("list-status")
		const project = data.get('project');

		const formTags = data.get('tags') as string
		let tags = formTags?.split(',') || null
		tags = tags[0] === '' ? [] : tags;

		dueDate = !dueDate ? dueDate : null;

		const { data: task, error: err } = await supabaseClient
			.from('tasks')
			.insert({
				list,
				project,
				name,
				description,
				due_date: dueDate,
				is_priority: isPriority,
				user_id: session.user.id,
				status,
				tags
			})
			.select();

		if (task && !err) {
			return {
				data: task[0],
				status: 'success',
			};
		}
	},

	newList: async (event) => {
		const { request, params } = event;
		const { session, supabaseClient } = await getSupabase(event);
		if (!session) {
			// the user is not signed in
			throw error(403, { message: 'Unauthorized' });
		}

		const data = await request.formData();
		const name = data.get('list-name');
		const status = data.get("list-status")
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
		}
	}
};
