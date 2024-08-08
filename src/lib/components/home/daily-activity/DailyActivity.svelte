<script lang="ts">
	import { onMount } from 'svelte';

	let totalAmountOfTasks = 0;
	let completedTasks = 0;
	let percentCompleted = 0;

	export let tasks = [];

	let strokeArray = 875;

	onMount(() => {
		totalAmountOfTasks = tasks?.length!;
		completedTasks = tasks?.filter((item) => item.status === 'done').length!;
		percentCompleted = Math.round((completedTasks / totalAmountOfTasks) * 100) || 0;
	});
</script>

<div
	class="relative col-span-4 col-start-1 row-start-1 mx-auto flex aspect-square h-[18.75rem] w-[18.75rem] flex-col items-center justify-center gap-sm rounded-full md:mx-0 lg:col-span-3"
>
	<div class="absolute">
		<svg class="h-[18.75rem] w-[18.75rem]">
			<circle
				cx="150"
				cy="150"
				class="fill-none stroke-grey-200 dark:stroke-grey-700"
				stroke-width="18"
				r="140"
			/>
			<circle
				cx="150"
				cy="150"
				r="140"
				class="fill-none stroke-accent-light transition-all duration-300 ease-in"
				stroke-dashoffset={strokeArray - (strokeArray * percentCompleted) / 100}
				stroke-dasharray={strokeArray}
				stroke-linecap="round"
				stroke-width="18"
				transform="scale(1,-1) translate(0, -100%) rotate(-90 150 150)"
			/>
		</svg>
	</div>
	<span class="text-xl font-bold text-grey-700 dark:text-grey-200">{percentCompleted}%</span>
	<span class="text-md font-medium text-grey-700 dark:text-grey-300">Your daily progress</span>
</div>
