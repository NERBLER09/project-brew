<script lang="ts">
	import { showProjectAside } from '$lib/stores/project';
	import { onDestroy, onMount } from 'svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	let strokeArray = 380;
	let totalAmountOfTasks = data.dashboard?.today?.length ?? 0;
	let completedTasks = data.dashboard?.today?.filter((item) => item.status === 'done').length ?? 0;
	let percentCompleted = (completedTasks / totalAmountOfTasks) * 100;

	onMount(() => {
		$showProjectAside = false;
	});

	onDestroy(() => {
		$showProjectAside = true;
	});
</script>

<div class="grid gap-md md:grid-cols-2 md:gap-lg lg:grid-cols-5 lg:gap-2xl">
	<section class="md:col-span-2 lg:col-span-3">
		<header class="mb-sm">
			<h2 class="text-md font-semibold text-grey-800 dark:text-grey-200">Today's Progress</h2>
		</header>

		<div
			class="relative flex aspect-square h-32 w-32 flex-col items-center justify-center gap-sm rounded-full"
		>
			<div class="absolute">
				<svg class="h-32 w-32">
					<circle
						cx="64"
						cy="64"
						class="fill-none stroke-grey-200 dark:stroke-grey-700"
						stroke-width="8"
						r="60"
					/>
					<circle
						cx="64"
						cy="64"
						r="60"
						class="fill-none stroke-accent-light transition-all duration-300 ease-in"
						stroke-dashoffset={strokeArray - (strokeArray * percentCompleted) / 100}
						stroke-dasharray={strokeArray}
						stroke-linecap="round"
						stroke-width="8"
						transform="rotate(-90 64 64)"
					/>
				</svg>
			</div>
			<span class="font-bold text-grey-700 dark:text-grey-200">{percentCompleted}%</span>
			<span class="font-medium text-grey-700 dark:text-grey-200">Completed</span>
		</div>
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
