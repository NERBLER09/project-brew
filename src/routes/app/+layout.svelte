<script lang="ts">
	import { invalidate } from '$app/navigation';
	import { page } from '$app/stores';
	import { tasksCompletedThisDay } from '$lib/stores/project';
	import { perferedTheme, showMobileNav, useDarkMode } from '$lib/stores/ui';
	import { currentUsers, invitedTeamMembers, userData } from '$lib/stores/user';
	import { supabase } from '$lib/supabase';
	import type { User } from '$lib/types/projects';
	import { onDestroy, onMount } from 'svelte';
	import { addNewDay, weeklyActivity } from '$lib/api/activity';

	import DesktopSidebar from '$lib/components/Sidebar/DesktopSidebar.svelte';
	import MobileNavbar from '$lib/components/Sidebar/MobileNavbar.svelte';
	import type { LayoutData } from './$types';

	export let data: LayoutData;

	const handleTheme = () => {
		$perferedTheme = localStorage.getItem('theme');

		switch ($perferedTheme) {
			case 'light':
				$useDarkMode = false;
				break;
			case 'dark':
				$useDarkMode = true;
				break;
			case 'system':
				$useDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
				break;
			default:
				$useDarkMode = false;
				break;
		}

		perferedTheme.subscribe((val) => {
			localStorage.setItem('theme', val);
		});

		useDarkMode.subscribe((val) => {
			if ($perferedTheme === 'system') return;
			if (val) {
				localStorage.setItem('theme', 'dark');
			} else {
				localStorage.setItem('theme', 'light');
			}
		});
	};

	const getInvitedTeamMembers = async (team_members: string[]): Promise<User[]> => {
		let invitedUserData: User[] = [];
		for (const item of team_members) {
			const { data } = await supabase.from('profiles').select().eq('id', item).limit(1).single();
			if (data) {
				invitedUserData = [data, ...invitedUserData];
			}
		}
		return invitedUserData;
	};

	onMount(async () => {
		if (data.user) $userData = data.user;

		$weeklyActivity = data.your_activity ?? [];
		addNewDay();
		$tasksCompletedThisDay = parseInt(localStorage.getItem('tasksCompletedToday') || '0');
		$weeklyActivity[$weeklyActivity.length - 1].tasksCompleted = $tasksCompletedThisDay;
		if ($weeklyActivity.length >= 7) $weeklyActivity.splice(0, 1);

		handleTheme();

		if (data?.team_members) {
			$invitedTeamMembers = await getInvitedTeamMembers(data?.team_members);
		}

		const userChannel = supabase.channel('online', {
			config: {
				presence: {
					key: 'users'
				}
			}
		});

		userChannel.on('presence', { event: 'sync' }, () => {
			$currentUsers = userChannel.presenceState();
		});

		userChannel.subscribe(async (status) => {
			if (status === 'SUBSCRIBED') {
				await userChannel.track({ id: data?.id });
			}
		});
	});

	const notificationChannel = supabase
		.channel('notifications')
		.on('postgres_changes', { event: '*', schema: 'public', table: 'notifications' }, () =>
			invalidate('app:data')
		);

	onDestroy(() => {
		supabase.removeAllChannels();
	});
</script>

<div class="flex h-screen flex-col-reverse md:flex-row" class:dark={$useDarkMode}>
	<aside>
		<!-- Each automatically hide based on screen size in tailwind -->
		<DesktopSidebar />
		{#if $showMobileNav}
			<MobileNavbar />
		{/if}
	</aside>

	<main
		class="relative h-full w-full overflow-y-auto dark:bg-grey-900 {$page.url.href.includes(
			'settings'
		)
			? ''
			: 'p-6 md:p-8'}"
		id="main"
	>
		<slot />
	</main>
</div>
