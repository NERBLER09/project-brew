<script lang="ts">
	import Header from '$lib/components/settings/header/Header.svelte';
	import Nav from '$lib/components/settings/nav/Nav.svelte';
	import { showMobileSettingsNav } from '$lib/stores/ui';

	import type { LayoutData } from './$types';

	export let data: LayoutData;
</script>

<Header {data} />

<div class="hidden md:inline">
	<!-- Only show the desktop nav in all pages -->
	<aside class="relative top-8 left-8 hidden w-[calc(100vw-48px)] md:block md:w-[calc(100%-64px)]">
		<Nav />
	</aside>

	<div class="relative top-14 left-6 w-[calc(100vw-48px)] md:left-8 md:w-[calc(100%-64px)]">
		<slot />
	</div>
</div>

<div class="block md:hidden">
	{#if $showMobileSettingsNav}
		<Nav />
	{:else}
		<div class="relative top-14 left-6 w-[calc(100vw-48px)] md:left-8 md:w-[calc(100%-64px)]">
			<slot />
		</div>
	{/if}
</div>
