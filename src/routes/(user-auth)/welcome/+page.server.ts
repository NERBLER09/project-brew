import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { fail, type Actions, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async (event) => {
	const { session, supabaseClient } = await getSupabase(event);
	if (!session) {
		redirect(303, '/');
	}

	const { data: profile } = await supabaseClient
		.from('profiles')
		.select()
		.eq('id', session.user.id)
		.limit(1)
		.single();

	if (profile) {
		redirect(303, '/app/home');
	}
}) satisfies PageServerLoad;

export const actions = {
	default: async (event) => {
		const { session, supabaseClient } = await getSupabase(event);
		if (!session) {
			return fail(303, { message: 'User is not logged in' });
		}

		const id = session?.user.id;
		const email = session?.user.email;

		const data = await event.request.formData();
		const name = data.get('name') as string;
		const location = data.get('location') as string;
		const company = data.get('company') as string;
		const bio = data.get('bio') as string;
		const banner = data.get('banner') as File;
		const profile = data.get('profile') as File;
		const pronouns = data.get('pronouns') as string;

		let bannerURL = '';

		if (banner.size !== 0 && banner.size < 5000000) {
			await supabaseClient.storage.from('avatars').upload(`${session.user.id}/cover.png`, banner, {
				cacheControl: '3600',
				upsert: false
			});

			const { data: url } = supabaseClient.storage
				.from('avatars')
				.getPublicUrl(`${session.user.id}/cover.png`);
			bannerURL = url.publicUrl;
		} else if (banner.size > 5000000) {
			return fail(400, { message: 'Selected banner image is over 5mb is size.' });
		}

		let profileURL = '';

		if (profile.size !== 0 && profile.size < 5000000) {
			await supabaseClient.storage
				.from('avatars')
				.upload(`${session.user.id}/avatar.png`, profile, {
					cacheControl: '3600',
					upsert: false
				});

			const { data: url } = supabaseClient.storage
				.from('avatars')
				.getPublicUrl(`${session.user.id}/avatar.png`);
			profileURL = url.publicUrl;
		} else if (profile.size > 5000000) {
			return fail(400, { message: 'Selected banner image is over 5mb is size.' });
		}

		const { error: err } = await supabaseClient.from('profiles').insert({
			id,
			name,
			email,
			location,
			role: company,
			bio,
			banner: bannerURL,
			avatar_url: profileURL,
			pronouns
		});

		if (err) {
			return fail(400, { message: err.message });
		} else {
			return { success: true };
		}
	}
} satisfies Actions;
