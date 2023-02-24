import type { NotficationSettings } from '$lib/types/projects';
import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { error, fail, type Actions } from '@sveltejs/kit';

export const actions = {
	account: async (event) => {
		const { request } = event;
		const { session, supabaseClient } = await getSupabase(event);
		if (!session) {
			// the user is not signed in
			throw error(403, { message: 'Unauthorized' });
		}

		const data = await request.formData();
		const name = data.get('name') as string;
		const location = data.get('location') as string;
		const bio = data.get('bio') as string;
		const role = data.get('role') as string;
		const profile = data.get('profile') as File;
		let avatar_url = data.get('avatar_url') as string;
		const avatar_preview = data.get('avatar_preview') as string;

		const banner = data.get('banner') as File;
		let banner_url = data.get('banner_url') as string;
		const banner_preview = data.get('banner_preview') as string;

		if (profile.size !== 0 && profile.size < 500000) {
			await supabaseClient.storage
				.from('avatars')
				.upload(`${session.user.id}/avatar.png`, profile, {
					cacheControl: '3600',
					upsert: true
				});

			const { data: url } = supabaseClient.storage
				.from('avatars')
				.getPublicUrl(`${session.user.id}/avatar.png`);
			avatar_url = url.publicUrl;
		} else if (profile.size === 0 && avatar_url !== avatar_preview) {
			await supabaseClient.storage.from('avatars').remove([`${session.user.id}/avatar.png`]);
			avatar_url = '';
		} else if (profile.size !== 0 && profile.size > 5000000 && avatar_url !== avatar_preview) {
			return fail(400, { message: 'Profile picture is larger then 5mb.', fail: true });
		}

		if (banner.size !== 0 && banner.size < 5000000) {
			await supabaseClient.storage.from('avatars').upload(`${session.user.id}/cover.png`, banner, {
				cacheControl: '3600',
				upsert: true
			});

			const { data: url } = supabaseClient.storage
				.from('avatars')
				.getPublicUrl(`${session.user.id}/cover.png`);
			banner_url = url.publicUrl;
		} else if (banner.size === 0 && banner_url !== banner_preview) {
			await supabaseClient.storage.from('avatars').remove([`${session.user.id}/cover.png`]);
			banner_url = '';
		} else if (banner.size > 5000000 && banner.size > 0 && banner_url !== banner_preview) {
			return fail(400, { message: 'Banner is larger then 5mb.', fail: true });
		}

		const { error: err } = await supabaseClient
			.from('profiles')
			.update({ name, location, bio, avatar_url, banner: banner_url, role })
			.eq('id', session.user.id);

		if (err) {
			throw error(403, err.message);
		}
	},
	notifications: async (event) => {
		const { request } = event;
		const { session, supabaseClient } = await getSupabase(event);
		if (!session) {
			// the user is not signed in
			throw error(403, { message: 'Unauthorized' });
		}

		const data = await request.formData();
		let pushInvited = data.get('project-invite') as string;
		let pushAssigned = data.get('new-task') as string;
		let pushDueTask = data.get('due-tasks') as string;
		let pushFocusTimerUp = data.get('focus-timer-up') as string;

		let emailInvited = data.get('email-project-invite') as string;
		let emailAssigned = data.get('email-new-task') as string;
		let emailDueTask = data.get('email-due-tasks') as string;

		console.log(pushInvited);

		const notifications: NotficationSettings = {
			push: {
				invited: pushInvited === 'on',
				assigned: pushAssigned === 'on',
				dueTask: pushDueTask === 'on',
				timerUp: pushFocusTimerUp === 'on'
			},
			email: {
				invited: emailInvited === 'on',
				assigned: emailAssigned === 'on',
				dueTask: emailDueTask === 'on'
			}
		};

		const { error: err } = await supabaseClient
			.from('profiles')
			.update({ notifcations_settings: notifications })
			.eq('id', session.user.id);

		if (err) {
			throw fail(403, { message: err.message });
		}
	}
} satisfies Actions;
