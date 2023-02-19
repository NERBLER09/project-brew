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
	<aside
		class="{!data.banner
			? ''
			: 'top-8'} relative left-8 hidden w-[calc(100vw-48px)] md:block md:w-[calc(100%-64px)]"
	>
		<Nav isBanner={data.banner ?? ''} />
	</aside>

	<div
		class="{!data.banner
			? ''
			: 'top-14'} relative left-6 w-[calc(100vw-48px)] md:left-8 md:w-[calc(100%-64px)]"
	>
		<slot />
	</div>
</div>

<div class="block md:hidden">
	{#if $showMobileSettingsNav}
		<Nav isBanner={data.banner ?? ''} />
	{:else}
		<div
			class="relative {!data.banner
				? ''
				: 'top-14'} left-6 w-[calc(100vw-48px)] md:left-8 md:w-[calc(100%-64px)]"
		>
			<slot />
		</div>
	{/if}
</div>
