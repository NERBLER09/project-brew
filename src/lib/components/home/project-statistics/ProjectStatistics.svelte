<script lang="ts">
	import type { Projects } from '$lib/types/projects';
	import Project from '$lib/components/home/project-statistics/Project.svelte';

	export let pinned_projects: Projects[];
</script>

<section class="col-span-2 lg:col-start-3">
	<header>
		<h2 class="text-lg font-semibold text-grey-800 dark:text-grey-100">Project Statistics</h2>
	</header>
	<div>
		<p class="font-medium text-grey-700 dark:text-grey-200">
			Here is where how many tasks are left to be completed will show up
		</p>
		<div class="flex flex-nowrap gap-lg">
			{#each pinned_projects as { project_name, id }}
				<Project {project_name} {id} />
			{/each}
		</div>
	</div>
</section>
