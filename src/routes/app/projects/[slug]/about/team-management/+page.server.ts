import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { fail, type Actions } from '@sveltejs/kit';
import lodash from 'lodash';
const { parseInt } = lodash;

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
			.from('project_members')
			.select()
			.eq('user_id', user.id)
			.limit(1)
			.single();

		if (checkExists) {
			return fail(400, { invited: true, message: 'Already invited that user' });
		}

		const { error: inviteErr } = await supabaseClient
			.from('project_members')
			.insert({ project: parseInt(slug ?? '0'), user_id: user.id })
			.eq('id', slug);

		if (!inviteErr) {
			return { success: true };
		} else {
			return fail(400, { message: inviteErr.message });
		}
	}
} satisfies Actions;
