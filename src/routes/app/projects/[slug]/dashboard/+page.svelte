<script lang="ts">
	import TodayProgress from '$lib/components/projects/dashboard/TodayProgress.svelte';
	import { showProjectAside } from '$lib/stores/project';
	import { onDestroy, onMount } from 'svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	onMount(() => {
		$showProjectAside = false;
	});

	onDestroy(() => {
		$showProjectAside = true;
	});
</script>

<svelte:head>
	<title>{data.project?.project_name} - Dashboard</title>
</svelte:head>

<div class="grid gap-md md:grid-cols-2 md:gap-lg lg:grid-cols-5 lg:gap-2xl">
	<section class="md:col-span-2 lg:col-span-3">
		<header class="mb-sm">
			<h2 class="text-md font-semibold text-grey-800 dark:text-grey-200">Today's Progress</h2>
		</header>

		<TodayProgress today={data.dashboard?.today ?? []} />
	</section>
	<section class="md:col-span-1 md:row-start-3 lg:col-span-2 lg:col-start-4 lg:row-start-1">
		<header>
			<h2 class="text-md font-semibold text-grey-800 dark:text-grey-200">Behind Tasks</h2>
		</header>
	</section>
	<section
		class="row-start-4 md:col-span-1 md:row-start-3 lg:col-span-2 lg:col-start-1 lg:row-start-2"
	>
		<header>
			<h2 class="text-md font-semibold text-grey-800 dark:text-grey-200">Task Workload</h2>
		</header>
	</section>
	<section
		class="row-start-3 md:col-span-2 md:row-start-2 lg:col-span-3 lg:col-start-3 lg:row-start-2"
	>
		<header>
			<h2 class="text-md font-semibold text-grey-800 dark:text-grey-200">Milestone Progress</h2>
		</header>
	</section>
</div>
