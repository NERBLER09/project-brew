<script lang="ts">
	import type { Task } from '$lib/types/projects';
	import TaskItem from './TaskItem.svelte';
	import TodayTaskStatus from './TodayTaskStatus.svelte';
	import TodayTaskStatusDark from './TodayTaskStatusDark.svelte';

	export let today: Task[];
	export let due: Task[];

	let strokeArray = 380;
	let totalAmountOfTasks = today.length ?? 0;
	let completedTasks = today.filter((item) => item.status === 'done').length ?? 0;
	let percentCompleted = (completedTasks / totalAmountOfTasks) * 100;
</script>

<div class="flex flex-row gap-xl">
	<div class="mx-auto flex flex-col">
		<div
			class="relative mx-auto mb-md flex aspect-square h-32 w-32 flex-col items-center justify-center gap-sm rounded-full"
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
			<span class="font-bold text-grey-700 dark:text-grey-200">
				{#if percentCompleted}
					{percentCompleted}
				{:else}
					100
				{/if}
				%</span
			>
			<span class="font-medium text-grey-700 dark:text-grey-200">Completed</span>
		</div>

		{#if today.length > 0}
			<div class="inline dark:hidden">
				<TodayTaskStatus {today} />
			</div>
			<div class="hidden dark:inline">
				<TodayTaskStatusDark {today} />
			</div>
		{/if}
	</div>

	<div class="hidden w-full flex-col gap-md md:flex">
		{#each due as today}
			<TaskItem {...today} />
		{:else}
			<p class="font-medium text-grey-700 dark:text-grey-200">
				There are no tasks currently that need to be worked on.
			</p>
		{/each}
	</div>
</div>
