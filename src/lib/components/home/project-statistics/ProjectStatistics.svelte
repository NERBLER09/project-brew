<script lang="ts">
	import type { Projects } from '$lib/types/projects';
	import Project from '$lib/components/home/project-statistics/Project.svelte';

	export let pinned_projects: Projects[];
</script>

<section class="col-span-2 lg:col-start-3">
	<header>
		<h2 class="text-md font-semibold text-grey-800 dark:text-grey-100 md:text-lg">
			Project Statistics
		</h2>
		<p class="font-medium text-grey-700 dark:text-grey-200">
			Your progress for each of you pinned project(s) will show up here
		</p>
	</header>
	<div class="mt-md">
		<div class="flex flex-nowrap gap-lg">
			{#each pinned_projects as { project_name, id }}
				<Project {project_name} {id} />
			{/each}
		</div>
	</div>
</section>
