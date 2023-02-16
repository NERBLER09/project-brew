<script lang="ts">
	import { page } from '$app/stores';
	import { addNewDay, weeklyActivity } from '$lib/api/activity';

	import DesktopSidebar from '$lib/components/Sidebar/DesktopSidebar.svelte';
	import MobileNavbar from '$lib/components/Sidebar/MobileNavbar.svelte';
	import { tasksCompletedThisDay } from '$lib/stores/project';

	import { perferedTheme, showMobileNav, useDarkMode } from '$lib/stores/ui';
	import { userData } from '$lib/stores/user';
	import { supabase } from '$lib/supabase';
	import { onMount } from 'svelte';

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

	onMount(async () => {
		const { data: session } = await supabase.auth.getUser();
		const { data: user, error: err } = await supabase
			.from('profiles')
			.select()
			.eq('id', session?.user?.id)
			.limit(1)
			.single();
		if (user) {
			$userData = user;
		}

		$weeklyActivity = user?.your_activity ?? [];
		addNewDay();
		$tasksCompletedThisDay = parseInt(localStorage.getItem('tasksCompletedToday') || '0');
		$weeklyActivity[$weeklyActivity.length - 1].tasksCompleted = $tasksCompletedThisDay;
		if ($weeklyActivity.length >= 7) $weeklyActivity.splice(0, 1);

		handleTheme();
	});
</script>

<div class="flex h-screen flex-col-reverse md:flex-row" class:dark={$useDarkMode}>
	<aside>
		<!-- Each automaticly hide based on screen size in tailwind -->
		<DesktopSidebar />
		{#if $showMobileNav}
			<MobileNavbar />
		{/if}
	</aside>

	<main
		class="h-full w-full overflow-y-auto dark:bg-grey-900 {$page.url.href.includes('settings')
			? ''
			: 'p-6 md:p-8'}"
	>
		<slot />
	</main>
</div>
