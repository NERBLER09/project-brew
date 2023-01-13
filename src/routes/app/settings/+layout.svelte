<script lang="ts">
	import Header from '$lib/components/settings/header/Header.svelte';
	import Nav from '$lib/components/settings/nav/Nav.svelte';
	import { showMobileSettignsNav } from '$lib/stores/ui';

	import type { LayoutData } from '.svelte-kit/types/src/routes/app/settings/$types';

	export let data: LayoutData;
</script>

<Header {data} />

<div class="hidden md:inline">
	<!-- Only show the desktop nav in all pages -->
	<aside class="hidden md:block relative top-8 left-8">
		<Nav />
	</aside>

	<div class="relative top-14 left-6 md:left-8 w-[calc(100vw-48px)] md:w-[calc(100%-64px)]">
		<slot />
	</div>
</div>

<div class="block md:hidden">
	{#if $showMobileSettignsNav}
		<Nav />
	{:else}
		<div class="relative top-14 left-6 md:left-8 w-[calc(100vw-48px)] md:w-[calc(100%-64px)]">
			<slot />
		</div>
	{/if}
</div>
