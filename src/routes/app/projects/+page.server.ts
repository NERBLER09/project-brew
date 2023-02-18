import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { error, redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { camelCase, constant } from 'lodash';

export const load = (async (event) => {
	const { session, supabaseClient } = await getSupabase(event);
	if (!session) {
		throw redirect(303, '/');
	}

	event.depends("app:all-projects")

	const { data, error: err } = await supabaseClient
		.from('projects')
		.select()
		.eq('user_id', session.user.id);

	const { data: invited, error: err2 } = await supabaseClient
		.from("projects")
		.select()
		.contains("invited_people", [session.user.id]);

	if (data && invited) {
		const allProjects = [...data, ...invited]
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
		const user = data.get("user") as string

		const inivtedString = data.get("invited") as string;
		let invited = inivtedString.split(",") || null
		invited = invited[0] === "" ? [] : invited

		tags = tags[0] === '' ? [] : tags;

		let coverURL = null;

		if (cover) {
			const ccName = camelCase(project_name)

			const { error: coverErr } = await supabaseClient
				.storage
				.from("project-covers")
				.upload(`${session.user.id}/${ccName}.png`, cover, {
					cacheControl: '3600',
					upsert: false
				})
			const { data: url } = supabaseClient.storage.from("project-covers").getPublicUrl(`${session.user.id}/${ccName}.png`)
			coverURL = url.publicUrl
		}

		if (invited) {
			for (const id of invited) {
				const { error } = await supabaseClient.from("notifications").insert({
					message: `Has invited you to ${project_name}`,
					target_user: id,
					sentBy: JSON.parse(user),
					type: "invite"
				})

				console.log(error)
			}
		}

		const { error: err } = await supabaseClient.from("projects").insert({ description, project_name, user_id: session.user.id, tags, banner: coverURL, invited_people: invited })
		console.error(err)

		if (!err) {
			return { success: true };
		}
	}
};
