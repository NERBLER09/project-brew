<script lang="ts">
	import Edit from '$lib/assets/Edit.svelte';

	import ProjectCard from '$lib/components/projects/links/ProjectCard.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<svelte:head><title>Project Brew - Projects</title></svelte:head>

<header>
	<h1 class="text-lg md:text-2xl text-grey-800">Projects</h1>
</header>

<section class="pt-6">
	<header class="flex items-center">
		<h2 class="font-semibold text-grey-800 text-md md:text-lg">Pinned Projects</h2>
		<button class="button--text flex items-center gap-md ml-auto p-0">
			<Edit className="stroke-grey-700 w-8 h-8" />
			<span class="sr-only md:not-sr-only">Edit Pinned Projects</span>
		</button>
	</header>
	<div class="mt-md">
		{#if data.pinned.length === 0}
			<p class="text-grey-700 font-medium">To pin a project click on the edit button.</p>
		{/if}
		{#each data.pinned as project}
			<ProjectCard
				project_name={project.project_name}
				id={project.id}
				description={project.description}
				banner={project.banner}
				invited_people={project.invited_people}
			/>
		{/each}
	</div>
</section>
