<script lang="ts">
	import { startCase } from 'lodash';
	import type { PageData } from './$types';
	import ProjectCard from '$lib/components/projects/links/ProjectCard.svelte';

	export let data: PageData;
</script>

<svelte:head>
	<title>Search - {data.search.query}</title>
</svelte:head>

<header>
	<h1 class="text-lg text-grey-800 dark:text-grey-200 md:text-2xl">
		{startCase(data.search.query)}
	</h1>
</header>

<section class="my-md">
	<header>
		<h2 class="text-md font-semibold text-grey-800 dark:text-grey-100 md:text-lg">Projects</h2>
	</header>
	<div class="mt-md flex w-full flex-nowrap items-center gap-lg overflow-x-auto md:flex-wrap">
		{#each data.search?.projects as project}
			<ProjectCard {...project} />
		{:else}
			<p class="font-semibold text-grey-700 dark:text-grey-300 my-sm">No results</p>
		{/each}
	</div>
</section>

<section class="my-md">
	<header>
		<h2 class="text-md font-semibold text-grey-800 dark:text-grey-100 md:text-lg">
			Project Milestones
		</h2>
	</header>
</section>

<section class="my-md">
	<header>
		<h2 class="text-md font-semibold text-grey-800 dark:text-grey-100 md:text-lg">Teams</h2>
	</header>
</section>

<section class="my-md">
	<header>
		<h2 class="text-md font-semibold text-grey-800 dark:text-grey-100 md:text-lg">Team Members</h2>
	</header>
</section>
