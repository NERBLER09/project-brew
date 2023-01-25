<script lang="ts">
	import { page } from '$app/stores';

	import DesktopSidebar from '$lib/components/Sidebar/DesktopSidebar.svelte';
	import MobileNavbar from '$lib/components/Sidebar/MobileNavbar.svelte';

	import { showMobileNav } from '$lib/stores/ui';
	import { onMount } from 'svelte';

	let useDarkMode = false;

	onMount(() => {
		if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
			useDarkMode = true;
		}
	});
</script>

<div class="flex h-screen flex-col-reverse md:flex-row" class:dark={useDarkMode}>
	<aside>
		<!-- Each automaticly hide based on screen size in tailwind -->
		<DesktopSidebar />
		{#if $showMobileNav}
			<MobileNavbar />
		{/if}
	</aside>

	<main
		class="w-full h-full overflow-y-auto {$page.url.href.includes('settings') ? '' : 'md:p-8 p-6'}"
	>
		<slot />
	</main>
</div>
