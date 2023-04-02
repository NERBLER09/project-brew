<script lang="ts">
	import type { Task } from '$lib/types/projects';
	import TaskItem from './TaskItem.svelte';

	export let today: Task[];

	let strokeArray = 380;
	let totalAmountOfTasks = today.length ?? 0;
	let completedTasks = today.filter((item) => item.status === 'done').length ?? 0;
	let percentCompleted = (completedTasks / totalAmountOfTasks) * 100;
</script>

<div class="flex flex-row gap-xl">
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

	<div class="hidden w-full md:inline">
		{#each today as today}
			<TaskItem {...today} />
		{/each}
	</div>
</div>
