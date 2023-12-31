import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { type Actions, fail, redirect } from '@sveltejs/kit';

export const actions: Actions = {
	join: async (event) => {
		const { session, supabaseClient } = await getSupabase(event);
		if (!session) {
			redirect(303, '/');
		}

		const data = await event.request.formData();
		const code = data.get('code') as string;

		const { data: check } = await supabaseClient
			.from('team_members')
			.select()
			.eq('team', code)
			.eq('user_id', session.user.id)
			.limit(1)
			.single();

		if (check) {
			return fail(400, { message: 'You have already joined that team.' });
		}

		const { data: team_member, error: joinErr } = await supabaseClient
			.from('team_members')
			.insert({ user_id: session.user.id, team: code, role: 'viewer' })
			.select()
			.limit(1)
			.single();

		if (joinErr) {
			throw fail(400, { message: joinErr.message });
		} else {
			return { team: team_member.team };
		}
	}
} satisfies Actions;
