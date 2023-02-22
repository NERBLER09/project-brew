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
		const bio = data.get('bio') as string;
		const banner = data.get('banner') as File;

		let bannerURL = '';

		if (banner.size !== 0 && banner.size < 5000000) {
			await supabaseClient.storage
				.from('avatars')
				.upload(`${session.user.id}/avatar.png`, bannerURL, {
					cacheControl: '3600',
					upsert: true
				});

			const { data: url } = supabaseClient.storage
				.from('avatars')
				.getPublicUrl(`${session.user.id}/cover.png`);
			bannerURL = url.publicUrl;
		} else if (banner.size > 5000000) {
			return fail(400, { message: 'Selected banner image is over 5mb is size.' });
		}

		const { error: err } = await supabaseClient
			.from('profiles')
			.insert({ id, name, email, bio, banner: bannerURL });
		if (err) {
			return fail(400, { message: err.message });
		} else {
			return { success: true };
		}
	}
} satisfies Actions;
