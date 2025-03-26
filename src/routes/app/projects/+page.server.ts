import { supabase } from '$lib/supabase';
import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { error, fail, redirect, type Actions } from '@sveltejs/kit';
import lodash from 'lodash';
import type { PageServerLoad } from './$types';

export const load = (async (event) => {
	const { session, supabaseClient } = await getSupabase(event);
	if (!session) {
		redirect(303, '/');
	}

	event.depends('app:all-projects');

	const { data, error: err } = await supabaseClient
		.from('projects')
		.select('*, project_members!inner(user_id), tasks(*)')
		.eq('project_members.user_id', session.user.id);

	const { data: userTeams } = await supabaseClient
		.from('team_members')
		.select()
		.eq('user_id', session.user.id)
		.limit(1)
		.single();

	const { data: team } = await supabaseClient.from('projects').select().eq('team', userTeams?.team);

	if (data) {
		let allProjects = [...data, ...(team ?? [])];
		allProjects = lodash.uniqBy(allProjects, 'id');
		const pinned = data.filter((value) => value.pinned);
		return { all: allProjects, pinned };
	}
	if (err) {
		error(404, err.message);
	}
}) satisfies PageServerLoad;

export const actions: Actions = {
	new: async (event) => {
		const { request } = event;
		const { session, supabaseClient } = await getSupabase(event);
		if (!session) {
			// the user is not signed in
			error(403, { message: 'Unauthorized' });
		}

		const data = await request.formData();
		const description = data.get('description') as string;
		const project_name = data.get('name') as string;
		const formTags = data.get('tags') as string;
		let tags = formTags?.split(',') || null;
		const cover = data.get('cover-url') as File;
		const user = data.get('user') as string;
		const team = data.get('team') as string;

		const invitedString = data.get('invited') as string;
		let invited = invitedString.split(',') || null;
		invited = invited[0] === '' ? [] : invited;

		let coverURL = null;

		if (cover && cover.size < 5000000) {
			const ccName = lodash(project_name);

			const { error: coverErr } = await supabaseClient.storage
				.from('project-covers')
				.upload(`${session.user.id}/${ccName}.png`, cover, {
					cacheControl: '3600',
					upsert: true
				});

			if (coverErr) {
				return fail(400, { message: `Failed to upload cover: ${coverErr.message}` });
			}

			const { data: url } = supabaseClient.storage
				.from('project-covers')
				.getPublicUrl(`${session.user.id}/${ccName}.png`);
			coverURL = url.publicUrl;
		} else if (cover.size > 5000000) {
			return fail(400, { message: 'Cover is larger then 5mb' });
		}

		if (invited) {
			for (const id of invited) {
				await supabaseClient.from('notifications').insert({
					message: `Has invited you to ${project_name}`,
					target_user: id,
					sentBy: JSON.parse(user),
					type: 'invite'
				});
			}
		}

		const { data: project, error: err } = await supabaseClient
			.from('projects')
			.insert({
				description,
				project_name,
				user_id: session.user.id,
				tags: tags ?? null,
				banner: coverURL,
				invited_people: invited,
				team: team === undefined ? team : null
			})
			.select()
			.limit(1)
			.single();

		if (!err) {
			await supabaseClient.from('project_members').insert({
				user_id: session.user.id,
				role: 'owner',
				project: project.id
			});
			return { success: true, id: project.id };
		} else {
			return fail(400, { message: `Failed to create project: ${err.message}` });
		}
	}
};
