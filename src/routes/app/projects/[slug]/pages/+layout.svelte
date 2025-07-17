<script lang="ts">
	import PageLink from '$lib/components/projects/pages/PageLink.svelte';
	import type { LayoutData } from './$types';

	export let data: LayoutData;
</script>

<header class="mb-md">
	<h2 class="text-md font-semibold text-grey-700 dark:text-grey-200 md:text-lg">Pages</h2>
</header>

<div class="flex flex-col gap-lg md:flex-row md:flex-wrap">
	{#each data.pages as page}
		<PageLink {...page} />
	{/each}
</div>

<slot />
