<script lang="ts">
	import { currentProject } from '$lib/stores/project';
	import { supabase } from '$lib/supabase';
	import { onMount } from 'svelte';

	export let name: string;
	export let id: string;
	export let completed: boolean = false;
	export let tasks: object[] = [];

	let strokeArray = 380;

	let totalTasks = 0;
	let completedTasks = 0;
	let percentCompleted = 0;

	onMount(async () => {
		totalTasks = tasks?.length ?? 0;
		completedTasks = tasks?.filter((item) => item.status === 'done').length!;
		percentCompleted = Math.round((completedTasks / totalTasks) * 100) || 0;
	});
</script>

<a href="/app/projects/{$currentProject.id}/milestones/{id}" class="w-full sm:w-fit">
	<section
		class="flex w-full min-w-[8rem] flex-col items-center rounded-xl bg-grey-100 p-md text-center dark:bg-grey-800 sm:w-fit"
	>
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
			{#if completed}
				<span class="font-bold text-grey-700 dark:text-grey-200">Milestone Closed</span>
			{:else}
				<span class="font-bold text-grey-700 dark:text-grey-200">{percentCompleted}%</span>
				<span class="font-medium text-grey-700 dark:text-grey-200">Completed</span>
			{/if}
		</div>
		<header class="mt-sm max-w-[10rem]">
			<span class="text-start font-semibold text-grey-900 dark:text-grey-100 md:text-center">
				{name}
			</span>
		</header>
	</section>
</a>
