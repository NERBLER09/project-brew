import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { fail, redirect, type Actions } from '@sveltejs/kit';

export const actions = {
	new: async (event) => {
		const { session, supabaseClient } = await getSupabase(event);
		if (!session) {
			throw redirect(303, '/');
		}

		const form = await event.request.formData();
		const name = form.get('name') as string;
		const description = form.get('description') as string;

		const { data: team, error: createErr } = await supabaseClient
			.from('teams')
			.insert({ name, description })
			.select()
			.limit(1)
			.single();

		if (createErr) {
			return fail(400, { message: `Failed to create team: ${createErr.message}` });
		}
		await supabaseClient
			.from('team_members')
			.insert({ role: 'owner', user_id: session.user.id, team: team.id });

		return { success: true, team_id: team.id };
	}
} satisfies Actions;
