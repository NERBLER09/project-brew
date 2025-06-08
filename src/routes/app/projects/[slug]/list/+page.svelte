<script lang="ts">
	import { deserialize } from '$app/forms';
	import { invalidate } from '$app/navigation';
	import CloseMultiply from '$lib/assets/Close-Multiply.svelte';
	import PlusNew from '$lib/assets/Plus-New.svelte';
	import TaskItem from '$lib/components/projects/table/TaskItem.svelte';
	import {
		dateFilter,
		filterTags,
		milestoneFilter,
		priorityFilter,
		searchQuery,
		sortOptions
	} from '$lib/stores/project';
	import type { ActionResult } from '@sveltejs/kit';
	import toast from 'svelte-french-toast';
	import type { PageData } from './$types';
	import { handleSortingTasks } from '$lib/api/sort';
	import { handleFilter } from '$lib/api/filter';
	import { supabase } from '$lib/supabase';
	import { userRole } from '$lib/stores/team';
	export let data: PageData;

	let filteredTasks = data.project?.tasks ?? [];

	let addNewTask = false;
	let newTaskName = '';

	let taskContainer: HTMLElement;
	let taskContainerHeight = 0;

	$: taskContainerHeight = taskContainer ? taskContainer.clientHeight : 0;
	let isViewer = $userRole === 'viewer';

	const getRectHeight = (container) => {
		if (!container) return 0;
		const rect = taskContainer.getBoundingClientRect();
		return rect.height;
	};

	$: taskContainerHeight = getRectHeight(taskContainer);

	const handleSearch = (query: string) => {
		filteredTasks = data.project?.tasks ?? [];
		filteredTasks = filteredTasks.filter((item) => {
			if (item.milestone) {
				return !item.milestone.completed;
			} else {
				return item;
			}
		});
		filteredTasks = filteredTasks.filter((item) =>
			item.name.toLowerCase().includes(query.toLowerCase())
		);
		filteredTasks = [...filteredTasks];
	};

	const handleCreateNewTask = async (event) => {
		const data = new FormData();
		data.append('new-task-name', newTaskName);
		const response = await fetch('list?/new', {
			method: 'POST',
			body: data
		});

		const result: ActionResult = deserialize(await response.text());
		if (result.type === 'success') {
			await invalidate('project:list');
			addNewTask = false;
			toast.success('Created new task');
			newTaskName = '';
		} else {
			toast.error(`Failed to create new task: ${result.data.message}`);
		}
	};

	$: filteredTasks = handleSortingTasks(data.project?.tasks, $sortOptions);
	$: filteredTasks = handleFilter(
		data.project?.tasks ?? [],
		$dateFilter,
		$priorityFilter,
		$filterTags,
		$milestoneFilter
	);

	$: handleSearch($searchQuery);

	supabase
		.channel('any')
		.on('postgres_changes', { event: '*', schema: 'public', table: 'tasks' }, (payload) => {
			invalidate('project:list');
		})
		.subscribe();
</script>

<svelte:head>
	<title>{data.project?.project_name} - List</title>
</svelte:head>

<div class="overflow-x-auto">
	<div class="flex flex-nowrap items-start md:gap-2xl">
		<div class="relative flex items-center">
			<div class="relative mr-md w-[18.75rem]">
				<span class="font-bold text-grey-700 dark:text-grey-300">Name</span>
				<div
					class="absolute right-0 top-0 w-1 rounded-t-full bg-grey-300 dark:bg-grey-600"
					style="height: {(taskContainerHeight + 40) / 16}rem;"
				/>
			</div>
			<div class="relative mr-md w-[12.5rem]">
				<span class="font-bold text-grey-700 dark:text-grey-300">Due Date</span>
				<div
					class="absolute right-0 top-0 w-1 rounded-t-full bg-grey-300 dark:bg-grey-600"
					style="height: {(taskContainerHeight + 40) / 16}rem;"
				/>
			</div>
			<div class="relative mr-md w-[12.5rem]">
				<span class="font-bold text-grey-700 dark:text-grey-300">Status</span>
				<div
					class="absolute right-0 top-0 w-1 rounded-t-full bg-grey-300 dark:bg-grey-600"
					style="height: {(taskContainerHeight + 40) / 16}rem;"
				/>
			</div>
			<div class="relative mr-md w-[12.5rem]">
				<span class="font-bold text-grey-700 dark:text-grey-300">Priority</span>
				<div
					class="absolute right-0 top-0 w-1 rounded-t-full bg-grey-300 dark:bg-grey-600"
					style="height: {(taskContainerHeight + 40) / 16}rem;"
				/>
			</div>
			<div class="relative mr-md w-[12.5rem]">
				<span class="font-bold text-grey-700 dark:text-grey-300">Milestone</span>
				<div
					class="absolute right-0 top-0 w-1 rounded-t-full bg-grey-300 dark:bg-grey-600"
					style="height: {(taskContainerHeight + 40) / 16}rem;"
				/>
			</div>
			<div class="relative mr-md w-[12.5rem]">
				<span class="font-bold text-grey-700 dark:text-grey-300">Assigned</span>
				<div
					class="absolute right-0 top-0 w-1 rounded-t-full bg-grey-300 dark:bg-grey-600"
					style="height: {(taskContainerHeight + 40) / 16}rem;"
				/>
			</div>
			<div class="absolute -bottom-1 left-0 h-1 w-full rounded-full bg-grey-300 dark:bg-grey-600" />
		</div>
	</div>

	<div class="relative flex flex-col flex-nowrap items-start" bind:this={taskContainer}>
		{#each filteredTasks as task}
			<div class="border-b border-grey-700 dark:border-grey-100">
				<TaskItem {...task} projectId={data.project?.id} />
			</div>
		{:else}
			<span class="font-medium text-grey-700 dark:text-grey-300"
				>Click the button below to create your first task
			</span>
		{/each}
	</div>

	{#if addNewTask}
		<form
			action="?new"
			method="POST"
			class="input--text flex w-[15.625rem] items-center"
			on:submit|preventDefault={handleCreateNewTask}
		>
			<input
				type="text"
				class="input--text m-0 w-full p-0"
				placeholder="Enter a task name"
				name="new-task-name"
				required
				on:blur={handleCreateNewTask}
				bind:value={newTaskName}
			/>
			<button>
				<PlusNew
					className="stroke-grey-700 dark:stroke-grey-200 w-[1.125rem] h-[1.125rem] ml-auto"
				/>
			</button>
		</form>
	{/if}
</div>

<div class="h-1 w-full rounded-full bg-grey-300 dark:bg-grey-600" />

{#if !isViewer}
	<button
		class="button--secondary mx-0 my-sm flex w-full items-center gap-md border-0 p-sm md:w-fit"
		on:click={() => (addNewTask = !addNewTask)}
	>
		{#if !addNewTask}
			<PlusNew className="h-6 w-6 stroke-grey-700 dark:stroke-grey-300" />
			New Task
		{:else}
			<CloseMultiply className="h-6 w-6 stroke-grey-700 dark:stroke-grey-300" />
			Cancel
		{/if}
	</button>
{/if}
