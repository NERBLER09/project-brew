import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { error, fail, redirect, type Actions } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

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
		.eq('id', projectId)
		.limit(1)
		.single();

	const { data: lists } = await supabaseClient.from('lists').select().eq('project', projectId);

	const { data: userTeams } = await supabaseClient
		.from('teams')
		.select('*, team_members!inner(user_id)')
		.eq('team_members.user_id', session.user.id);

	if (project) {
		return {
			name: project?.project_name,
			id: project.id,
			description: project?.description,
			banner: project?.banner,
			tags: JSON.parse(project?.tags) || [],
			lists: lists || [],
			project,
			invited_people: project.invited_people || [],
			team: project.team,
			userTeams
		};
	}

	if (errProject) {
		throw redirect(303, '/app/projects/not-invited');
	}
}) satisfies LayoutServerLoad;
