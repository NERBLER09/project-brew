import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { redirect } from '@sveltejs/kit';
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

	const { data: lists } = await supabaseClient
		.from('lists')
		.select()
		.eq('project', projectId)
		.order('position', { ascending: false });

	const { data: invited_people } = await supabaseClient
		.from('project_members')
		.select()
		.eq('project', projectId);

	const invitedUserIds = invited_people?.map((item) => item.user_id) ?? [];

	const { data: users } = await supabaseClient
		.from('profiles')
		.select()
		.in('id', [...invitedUserIds]);

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
			project: {
				...project,
				invite: {
					profiles: users ?? []
				}
			},
			invited_people: invited_people || [],
			team: project.team,
			userTeams
		};
	}

	if (errProject) {
		throw redirect(303, '/app/projects/not-invited');
	}
}) satisfies LayoutServerLoad;
