import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load = (async (event) => {
	const { session, supabaseClient } = await getSupabase(event);
	if (!session) {
		redirect(303, '/');
	}

	const params = event.params;
	const projectId = params.slug;

	event.depends('app:project');

	// Grabs project info
	const { data: project, error: errProject } = await supabaseClient
		.from('projects')
		.select('*, project_members!inner(*, profiles(*)), milestones(*), lists!inner(*, tasks(*, sub_tasks(*), milestone(*)))')
		.eq('id', projectId)
		.single();

	const lists = project.lists.sort((a, b) => a.position - b.position);
	const userProfiles = project.project_members.map(item => item.profiles)
	const users = userProfiles.flat(Infinity)

	const { data: userTeams } = await supabaseClient
		.from('teams')
		.select('*, team_members!inner(user_id)')
		.eq('team_members.user_id', session.user.id);

	const { data: team } = await supabaseClient
		.from('teams')
		.select()
		.eq('id', project.team)
		.limit(1)
		.single();
	const team_name = team.name

	const currentProfile = project.project_members.find((item) => item.user_id === session.user.id)
	const role = currentProfile.role
	let tasks = project.lists.map(item => item.tasks)
	tasks = tasks.flat(Infinity)

	if (project) {
		return {
			name: project?.project_name,
			id: project.id,
			description: project?.description,
			banner: project?.banner,
			role,
			team_name,
			lists: lists || [],
			project: {
				...project,

				tasks: tasks ?? [],
				invite: {
					profiles: users ?? []
				}
			},
			invited_people: project.project_members || [],
			team: project.team,
			userTeams: userTeams ?? []
		};
	}

	if (errProject) {
		redirect(303, '/app/projects/not-invited');
	}
}) satisfies LayoutServerLoad;
