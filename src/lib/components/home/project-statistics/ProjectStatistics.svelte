<script lang="ts">
	import type { Projects } from '$lib/types/projects';
	import Project from '$lib/components/home/project-statistics/Project.svelte';

	export let pinned_projects: Projects[];
</script>

<section class="col-span-2 h-fit lg:col-start-4">
	<header>
		<h2 class="text-md font-semibold text-grey-800 dark:text-grey-100 md:text-lg">
			Project Statistics
		</h2>
		<p class="mt-md mb-sm font-medium text-grey-700 dark:text-grey-200 md:my-0">
			Your progress for each of you pinned project(s) will show up here
		</p>
	</header>
	<div class="mt-md flex w-full flex-nowrap items-start gap-lg overflow-x-auto md:flex-wrap">
		{#each pinned_projects as { project_name, id }}
			<Project {project_name} {id} />
		{/each}
	</div>
</section>
