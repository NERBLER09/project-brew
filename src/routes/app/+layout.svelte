<script lang="ts">
	import { page } from '$app/stores';

	import DesktopSidebar from '$lib/components/Sidebar/DesktopSidebar.svelte';
	import MobileNavbar from '$lib/components/Sidebar/MobileNavbar.svelte';

	import { perferedTheme, showMobileNav, useDarkMode } from '$lib/stores/ui';
	import { onMount } from 'svelte';

	onMount(() => {
		$perferedTheme = localStorage.getItem('theme') ?? 'light';
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
		class="w-full h-full overflow-y-auto dark:bg-grey-900 {$page.url.href.includes('settings')
			? ''
			: 'md:p-8 p-6'}"
	>
		<slot />
	</main>
</div>
