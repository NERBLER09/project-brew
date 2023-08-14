<script lang="ts">
	import Milestone from '$lib/assets/Milestone.svelte';
	import OpenShare from '$lib/assets/Open-Share.svelte';
	import type { Task } from '$lib/types/projects';
	import TaskItem from './TaskItem.svelte';

	export let id: string;
	export let name: string;
	export let tasks: Task[];

	let totalTasks = tasks.length;
	let completedTasks = tasks.filter((item) => item.status === 'done').length;
	let tasksDueSoon = tasks.filter((item) => {
		const startDate = new Date();
		startDate.setHours(0, 0, 0);

		const endDate = new Date();
		endDate.setDate(endDate.getDate() + 5);
		endDate.setHours(0, 0, 0);

		const dueDate = new Date(item.due_date);
		dueDate.setDate(dueDate.getDate() + 1);
		dueDate.setHours(0, 0, 0);

		return dueDate.valueOf() >= startDate.valueOf() && dueDate.valueOf() <= endDate.valueOf();
	});
</script>

<section
	class="min-w-[18.75rem] rounded-lg bg-grey-100 p-6 dark:bg-grey-800 md:h-fit md:max-h-[17.8125] md:min-h-[10.625rem] md:min-w-[25rem] md:max-w-[25rem]"
>
	<header class="mb-md flex items-center">
		<Milestone className="h-6 w-6 stroke-accent-light mr-md" />
		<h3 class="font-bold text-grey-700 dark:text-grey-300">{name}</h3>

		<a href="milestones/{id}" class="button--secondary m-0 ml-auto border-0 p-0">
			<OpenShare className="h-6 w-6 stroke-grey-700 dark:stroke-grey-300" />
		</a>
	</header>

	<div class="mb-md flex w-full items-center gap-md">
		<span class="font-bold text-grey-700 dark:text-grey-300">{completedTasks}/{totalTasks}</span>
		<span class="sr-only">{completedTasks}/{totalTasks} of {name}'s tasks are completed.</span>

		<div class="relative w-full">
			<div
				class="absolute h-1 rounded-full bg-grey-700 dark:bg-grey-300"
				style="width: {(completedTasks / totalTasks) * 100}%"
			/>
			<div class="h-1 w-full rounded-full bg-grey-300 dark:bg-grey-700" />
		</div>
	</div>

	<div class="hidden md:inline">
		{#if tasksDueSoon.length > 0}
			<section>
				<header>
					<h4 class="font-medium text-grey-700 dark:text-grey-300">What is due soon</h4>
				</header>
			</section>
			<div class="flex flex-col gap-sm">
				{#each tasksDueSoon as item}
					<TaskItem {...item} location="milestones" />
				{/each}
			</div>
		{:else}
			<p class="font-medium text-grey-700 dark:text-grey-300">
				There are no tasks in this milestone that are due soon
			</p>
		{/if}
	</div>
</section>
