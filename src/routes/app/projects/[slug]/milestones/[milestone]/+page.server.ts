import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { error, fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load = (async (event) => {
	const { session, supabaseClient } = await getSupabase(event);
	if (!session) {
		redirect(303, '/');
	}

	event.depends('milestone:open');

	const milestoneId = event.params.milestone;

	const { data: lists } = await supabaseClient
		.from('lists')
		.select("status")
		.eq('project', event.params.slug)
		.order('position', { ascending: true });


	const { data: milestone, error: err } = await supabaseClient
		.from('milestones')
		.select()
		.eq('id', milestoneId)
		.limit(1)
		.single();

	const { data: tasks } = await supabaseClient
		.from('tasks')
		.select()
		.eq('milestone', milestoneId)
		.eq('project', event.params.slug);

	const { data: roadmap } = await supabaseClient
		.from('roadmap')
		.select()
		.eq('milestone', milestoneId)
		.order('target', { ascending: false });

	let leaderProfilePicture = '';

	if (milestone?.leader) {
		const { data: profile } = await supabaseClient
			.from('profiles')
			.select('avatar_url')
			.eq('id', milestone.leader)
			.limit(1)
			.single();
		leaderProfilePicture = profile?.avatar_url ?? '';
	}

	const { data: invited_people } = await supabaseClient
		.from('project_members')
		.select()
		.eq('project', event.params.slug);

	const invitedUserIds = invited_people?.map((item) => item.user_id) ?? [];

	const { data: users } = await supabaseClient
		.from('profiles')
		.select()
		.in('id', [...invitedUserIds]);

	if (!err) {
		return {
			milestone: {
				...milestone,
				tasks: tasks ?? [],
				roadmap: roadmap ?? [],
				leader_profile: leaderProfilePicture
			},
			project: {
				invited_people: users ?? [],
				id: event.params.slug
			},
			lists
		};
	}
	error(404, `Failed to fetch milestone ${err.message}`);
}) satisfies PageServerLoad;

export const actions = {
	default: async (event) => {
		const { request, params } = event;
		const { session, supabaseClient } = await getSupabase(event);
		if (!session) {
			// the user is not signed in
			error(403, { message: 'Unauthorized' });
		}

		const data = await request.formData();
		const name = data.get('name') as string;
		const description = data.get('description') as string;
		const target_date = data.get('target-date') as string;

		const { error: err } = await supabaseClient
			.from('roadmap')
			.insert({ name, description, target: target_date, milestone: params.milestone });

		if (!err) {
			return { success: true };
		} else {
			return fail(400, { failCreate: true, errMsg: err.message });
		}
	}
} satisfies Actions;
