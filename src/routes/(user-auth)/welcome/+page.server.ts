import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { fail, redirect, type Actions } from '@sveltejs/kit';

export const actions = {
	default: async (event) => {
		const { session, supabaseClient } = await getSupabase(event);
		if (!session) {
			throw redirect(303, '/');
		}

		const id = session?.user.id!;
		const email = session?.user.email!;

		const data = await event.request.formData();
		const name = data.get('name') as string;

		const { error: err } = await supabaseClient.from('profiles').insert({ id, name, email });
		if (err) {
			return fail(400, { message: err.message });
		} else {
			return { success: true };
		}
	}
} satisfies Actions;
