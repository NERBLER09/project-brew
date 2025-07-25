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
		.select('*, project_members!inner(*), tasks(*)')
		.eq('project_members.user_id', session.user.id);

	const { data: team } = await supabaseClient.from('projects').select().eq('team', session.user.id);

	if (data) {
		let allProjects = [...data, ...(team ?? [])];
		allProjects = lodash.uniqBy(allProjects, 'id');
		const pinned = data.filter((value) => {
			const item = value.project_members.find((item) => item.project === value.id)
			if (item.pinned) return value
		});
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
		const team = data.get('team') as string;

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

		const { data: project, error: err } = await supabaseClient
			.from('projects')
			.insert({
				description,
				project_name,
				user_id: session.user.id,
				tags: tags ?? null,
				banner: coverURL,
				team: team === undefined ? team : null
			})
			.select()
			.limit(1)
			.single();

		await supabaseClient.from("project_members").insert({ userid: session.user.id, project: project.id });

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
