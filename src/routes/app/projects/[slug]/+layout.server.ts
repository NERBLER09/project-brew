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
		.select('*, project_members!inner(*), milestones(*)')
		.eq('id', projectId)
		.limit(1)
		.single();

	const invitedUserIds = project?.project_members?.map((item) => item.user_id) ?? [];

	const { data: users } = await supabaseClient
		.from('profiles')
		.select()
		.in('id', [...invitedUserIds]);

	const { data: userTeams } = await supabaseClient
		.from('teams')
		.select('*, team_members!inner(user_id)')
		.eq('team_members.user_id', session.user.id);

	const { data: role } = await supabaseClient
		.from('project_members')
		.select('role')
		.eq('user_id', session.user.id)
		.eq('project', projectId)
		.limit(1)
		.single();

	const { data: lists } = await supabaseClient
		.from('lists')
		.select()
		.eq('project', projectId)
		.order('position', { ascending: true });

	const { data: tasks } = await supabaseClient
		.from('tasks')
		.select('*, sub_tasks(*), milestone!inner(*)')
		.eq('milestone.completed', false)
		.eq('project', projectId);

	if (project) {
		return {
			name: project?.project_name,
			id: project.id,
			description: project?.description,
			banner: project?.banner,
			role,
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
