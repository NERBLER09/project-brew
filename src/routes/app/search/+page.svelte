<script lang="ts">
	import { startCase } from 'lodash';
	import type { PageData } from './$types';
	import ProjectCard from '$lib/components/projects/links/ProjectCard.svelte';
	import MilestoneLink from '$lib/components/projects/milestones/MilestoneLink.svelte';
	import TeamCard from '$lib/components/team/TeamCard.svelte';
	import SearchInput from '$lib/components/search/SearchInput.svelte';
	import MobileSubPageLayout from '$lib/components/layouts/MobileSubPageLayout.svelte';

	export let data: PageData;
</script>

<svelte:head>
	<title>Search - {data.search.query}</title>
</svelte:head>

<MobileSubPageLayout
	previousPage="/app/home"
	pageName={data.search.query ? startCase(data.search.query) : 'Search'}
/>

<header class="hidden md:block">
	<h1 class="text-lg text-grey-800 dark:text-grey-200 md:text-2xl">
		{#if data.search.query}
			{startCase(data.search.query)}
		{:else}
			Search
		{/if}
	</h1>
</header>

<SearchInput />

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

	<div class="mt-md flex w-full flex-nowrap items-center gap-lg overflow-x-auto md:flex-wrap">
		{#each data.search.milestones as milestone}
			<a
				href="/app/projects/{milestone.projects.id}/milestones/{milestone.id}"
				class="flex w-fit flex-col items-center gap-sm rounded-md bg-grey-100 p-md dark:bg-grey-800"
			>
				<span class="text-md font-bold text-grey-700 dark:text-grey-300">{milestone.name}</span>

				<span class="font-semibold text-grey-700 dark:text-grey-300"
					>{milestone.projects.project_name}</span
				>
			</a>
		{:else}
			<p class="font-semibold text-grey-700 dark:text-grey-300 my-sm">No results</p>
		{/each}
	</div>
</section>

<section class="my-md">
	<header>
		<h2 class="text-md font-semibold text-grey-800 dark:text-grey-100 md:text-lg">Teams</h2>
	</header>

	<div class="mt-md flex flex-col gap-lg lg:grid lg:grid-cols-2 xl:grid-cols-3">
		{#each data.search?.teams as team}
			<TeamCard {...team} />
		{:else}
			<p class="font-semibold text-grey-700 dark:text-grey-300 my-sm">No results</p>
		{/each}
	</div>
</section>
