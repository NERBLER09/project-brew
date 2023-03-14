import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { error, redirect, fail, type Actions } from '@sveltejs/kit';

import type { PageServerLoad } from './$types';

export const load = (async (event) => {
	const { session, supabaseClient } = await getSupabase(event);
	if (!session) {
		throw redirect(303, '/');
	}

	event.depends('project:invited');

	const { data: project, error: err } = await supabaseClient
		.from('projects')
		.select('invited_people')
		.eq('id', event.params.slug)
		.limit(1)
		.single();

	if (project) {
		return {
			invited_people: project?.invited_people ?? []
		};
	}

	throw error(404, err?.message);
}) satisfies PageServerLoad;

export const actions = {
	invite: async (event) => {
		const { session, supabaseClient } = await getSupabase(event);

		const query = (await event.request.formData()).get('invite_email');
		const slug = event.params.slug;

		const { data: user, error: fetchErr } = await supabaseClient
			.from('profiles')
			.select()
			.eq('email', query)
			.limit(1)
			.single();

		if (fetchErr) {
			return fail(404, {
				notFound: true,
				message: "A user with that email address doesn't exist."
			});
		}

		const { data: checkExists } = await supabaseClient
			.from('projects')
			.select()
			.eq('id', slug)
			.limit(1)
			.single();

		if (checkExists?.invited_people?.includes(user.id)) {
			return fail(400, { invited: true, message: 'Already invited that user' });
		}

		const { data: project } = await supabaseClient
			.from('projects')
			.select()
			.eq('id', slug)
			.limit(1)
			.single();
		const newInvitedPeople = [user.id, ...(project?.invited_people ?? [])];

		const { error: inviteErr } = await supabaseClient
			.from('projects')
			.update({ invited_people: newInvitedPeople })
			.eq('id', slug);

		if (!inviteErr) {
			return { success: true, invited_people: newInvitedPeople };
		} else {
			return fail(400, { message: inviteErr.message });
		}
	}
} satisfies Actions;
