<script lang="ts">
	import DesktopSidebar from '$lib/components/Sidebar/DesktopSidebar.svelte';
	import MobileNavbar from '$lib/components/Sidebar/MobileNavbar.svelte';

	import { showMobileNav } from '$lib/stores/ui';
</script>

<div class="md:flex">
	<aside>
		<!-- Each automaticly hide based on screen size in tailwind -->
		<DesktopSidebar />
		{#if $showMobileNav}
			<MobileNavbar />
		{/if}
	</aside>

	<main class="md:p-8 p-6 w-full">
		<slot />
	</main>
</div>
