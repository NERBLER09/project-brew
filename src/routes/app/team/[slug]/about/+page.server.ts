import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { fail, type Actions } from '@sveltejs/kit';

export const actions = {
	invite: async (event) => {
		const { supabaseClient } = await getSupabase(event);

		const query = await (await event.request.formData()).get('invite_email');
		const slug = await event.params.slug;

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
			.from('team_members')
			.select()
			.eq('user_id', user.id)
			.eq('team', slug)
			.limit(1)
			.single();
		if (checkExists) {
			return fail(400, { invited: true, message: 'Already invited that user' });
		}

		const { error: inviteErr } = await supabaseClient
			.from('team_members')
			.insert({ role: 'viewer', team: slug, user_id: user.id });

		if (!inviteErr) {
			return { success: true };
		} else {
			return fail(400, { message: 'Failed to invite user', email: query });
		}
	}
} satisfies Actions;
