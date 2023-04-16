<script lang="ts">
	import { deserialize } from '$app/forms';
	import { invalidate } from '$app/navigation';
	import CloseMultiply from '$lib/assets/Close-Multiply.svelte';
	import PlusNew from '$lib/assets/Plus-New.svelte';
	import TaskItem from '$lib/components/projects/table/TaskItem.svelte';
	import { searchQuery, sortOptions } from '$lib/stores/project';
	import type { ActionResult } from '@sveltejs/kit';
	import toast from 'svelte-french-toast';
	import type { PageData } from './$types';
	import { handleSortClear, handleSortingTasks } from '$lib/api/sort';
	export let data: PageData;

	let filteredTasks = data.project?.tasks ?? [];

	let addNewTask = false;
	let newTaskName = '';

	const handleSearch = (query: string) => {
		filteredTasks = data.project?.tasks ?? [];
		filteredTasks = filteredTasks.filter((item) => item.name.toLowerCase().includes(query));
		filteredTasks = [...filteredTasks];
	};
	$: handleSearch($searchQuery);

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
		} else {
			toast.error(`Failed to create new task: ${result.data.message}`);
		}
	};

	$: filteredTasks = handleSortingTasks(filteredTasks, $sortOptions);
	$: filteredTasks = handleSortClear($sortOptions, data.project?.tasks ?? []);
</script>

<svelte:head>
	<title>{data.project?.project_name} - List</title>
</svelte:head>

<div class="overflow-x-auto">
	<div class="relative flex flex-nowrap items-start gap-lg pb-4 md:gap-2xl">
		<div class="relative flex items-center">
			<div class="relative mr-md w-[15.625rem]">
				<span class="font-bold text-grey-700 dark:text-grey-300">Name</span>
				<div
					class="absolute right-0 top-0 h-full w-1 rounded-t-full bg-grey-700 dark:bg-grey-300"
				/>
			</div>
			<div class="relative mr-md w-[10.625rem]">
				<span class="font-bold text-grey-700 dark:text-grey-300">Due Date</span>
				<div
					class="absolute right-0 top-0 h-full w-1 rounded-t-full bg-grey-700 dark:bg-grey-300"
				/>
			</div>
			<div class="relative mr-md w-[10.625rem]">
				<span class="font-bold text-grey-700 dark:text-grey-300">Status</span>
				<div
					class="absolute right-0 top-0 h-full w-1 rounded-t-full bg-grey-700 dark:bg-grey-300"
				/>
			</div>
			<div class="relative mr-md w-[10.625rem]">
				<span class="font-bold text-grey-700 dark:text-grey-300">Priority</span>
				<div
					class="absolute right-0 top-0 h-full w-1 rounded-t-full bg-grey-700 dark:bg-grey-300"
				/>
			</div>
			<div class="relative mr-md w-[10.625rem]">
				<span class="font-bold text-grey-700 dark:text-grey-300">Assigned</span>
				<div
					class="absolute right-0 top-0 h-full w-1 rounded-t-full bg-grey-700 dark:bg-grey-300"
				/>
			</div>
			<div class="relative mr-md w-[10.625rem]">
				<span class="font-bold text-grey-700 dark:text-grey-300">Milestone</span>
				<div
					class="absolute right-0 top-0 h-full w-1 rounded-t-full bg-grey-700 dark:bg-grey-300"
				/>
			</div>
			<div class="w-[170px]">
				<span class="font-bold text-grey-700 dark:text-grey-300">Tags</span>
			</div>

			<div class="absolute left-0 -bottom-1 h-1 w-full rounded-full bg-grey-700 dark:bg-grey-300" />
		</div>
	</div>

	<div class="relative flex flex-col flex-nowrap items-start gap-md">
		{#each filteredTasks as task}
			<TaskItem {...task} />
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
				autofocus
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

<div class="h-1 w-full rounded-full bg-grey-700 dark:bg-grey-300" />

<button
	class="button--secondary my-sm mx-0 flex w-full items-center gap-md border-0 p-sm md:w-fit"
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
