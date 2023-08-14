import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { error, fail, redirect, type Actions } from '@sveltejs/kit';
import lodash from 'lodash';
import type { PageServerLoad } from './$types';

export const load = (async (event) => {
	const { session, supabaseClient } = await getSupabase(event);
	if (!session) {
		throw redirect(303, '/');
	}

	event.depends('app:all-projects');

	const { data, error: err } = await supabaseClient
		.from('projects')
		.select()
		.eq('user_id', session.user.id);

	const { data: invited, error: err2 } = await supabaseClient
		.from('projects')
		.select()
		.contains('invited_people', [session.user.id]);

	const { data: userTeams } = await supabaseClient
		.from('team_members')
		.select()
		.eq('user_id', session.user.id)
		.limit(1)
		.single();

	const { data: team } = await supabaseClient.from('projects').select().eq('team', userTeams?.team);

	if (data && invited) {
		let allProjects = [...data, ...invited, ...(team ?? [])];
		allProjects = lodash.uniqBy(allProjects, 'id');
		const pinned = data.filter((value) => value.pinned);
		return { all: allProjects, pinned };
	}
	if (err) {
		throw error(404, err.message);
	}
}) satisfies PageServerLoad;

export const actions: Actions = {
	new: async (event) => {
		const { request } = event;
		const { session, supabaseClient } = await getSupabase(event);
		if (!session) {
			// the user is not signed in
			throw error(403, { message: 'Unauthorized' });
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
				team: team === '' ? null : team
			})
			.select()
			.limit(1)
			.single();

		console.log(err);

		if (!err) {
			return { success: true, id: project.id };
		} else {
			return fail(400, { message: `Failed to create project: ${err.message}` });
		}
	}
};
