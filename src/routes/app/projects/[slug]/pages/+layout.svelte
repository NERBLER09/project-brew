<script lang="ts">
	import PageLink from '$lib/components/projects/pages/PageLink.svelte';

	// TODO:: Replace with actuall db data
	const sampleData = [
		{
			id: 'sample-page',
			name: 'New Page',
			description: 'This page is the first page to ever exsist in this project',
			banner:
				'https://plus.unsplash.com/premium_photo-1672115680958-54438df0ab82?q=80&w=3284&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
		},
		{
			id: 'future-plans',
			name: 'Future plans',
			description: 'This page deals with the future plans of this project'
		}
	];
</script>

<header class="mb-md">
	<h2 class="text-md font-semibold text-grey-700 dark:text-grey-200 md:text-lg">Pages</h2>
</header>

<div class="flex flex-col gap-lg md:flex-row md:flex-wrap">
	{#each sampleData as page}
		<PageLink {...page} />
	{/each}
</div>

<slot />
