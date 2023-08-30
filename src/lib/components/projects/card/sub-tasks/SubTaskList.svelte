<script lang="ts">
	import Down from '$lib/assets/Arrow/Chevron/Down.svelte';
	import Up from '$lib/assets/Arrow/Chevron/Up.svelte';
	import CloseMultiply from '$lib/assets/Close-Multiply.svelte';
	import PlusNew from '$lib/assets/Plus-New.svelte';
	import { supabase } from '$lib/supabase';
	import type { SubTask } from '$lib/types/projects';
	import { onMount } from 'svelte';
	import NewSubTask from './NewSubTask.svelte';
	import SubTaskItem from './SubTaskItem.svelte';

	export let taskId: number;
	export let list: number;
	export let project: number;

	export let subTasks: SubTask[] = [];
	let total = 0;
	let completed = 0;

	let showSubTasks = false;
	let showCreateSubTasks = false;

	const getSubTasks = async () => {
		const { data: tasks } = await supabase.from('sub_tasks').select().eq('task', taskId);
		subTasks = tasks ?? [];
		total = subTasks.length;
		completed = [...subTasks.filter((item) => item.completed)].length;
	};

	onMount(() => {
		subTasks = subTasks ?? [];
		total = subTasks.length;
		completed = [...subTasks.filter((item) => item.completed)].length;
	});
</script>

{#if subTasks.length > 0}
	<div class="mb-md flex w-full items-center gap-md">
		<span class="font-bold text-grey-700 dark:text-grey-300">{completed}/{total}</span>
		<span class="sr-only">{completed}/{total} of this task's sub tasks are completed</span>

		<div class="relative w-full">
			<div
				class="absolute h-1 rounded-full bg-grey-700 dark:bg-grey-300"
				style="width: {(completed / total) * 100}%"
			/>
			<div class="h-1 w-full rounded-full bg-grey-300 dark:bg-grey-700" />
		</div>
		<button
			class="button--secondary m-0 flex items-center gap-md border-0 p-0 text-start"
			on:click={() => (showSubTasks = !showSubTasks)}
		>
			{#if showSubTasks}
				<Up className="h-6 w-6 stroke-grey-700 dark:stroke-grey-300" />
				<span class="sr-only">Hide sub tasks</span>
			{:else}
				<Down className="h-6 w-6 stroke-grey-700 dark:stroke-grey-300" />
				<span class="sr-only">Show sub tasks</span>
			{/if}
		</button>
	</div>

	{#if showSubTasks}
		<div class="mb-md flex flex-col gap-sm">
			{#each subTasks as task}
				<SubTaskItem {...task} {getSubTasks} />
			{/each}
		</div>
		<button
			class="button--secondary m-0 mb-md flex w-full items-center gap-md border-0 p-0 text-start"
			on:click={() => (showCreateSubTasks = !showCreateSubTasks)}
		>
			{#if showCreateSubTasks}
				<CloseMultiply className="h-6 w-6 stroke-grey-700 dark:stroke-grey-300" />
				Cancel
			{:else}
				<PlusNew className="h-6 w-6 stroke-grey-700 dark:stroke-grey-300" />
				Add a sub task
			{/if}
		</button>
	{/if}
{:else}
	<button
		class="button--secondary m-0 mb-md flex w-full items-center gap-md border-0 p-0 text-start"
		on:click={() => (showCreateSubTasks = true)}
	>
		<PlusNew className="h-6 w-6 stroke-grey-700 dark:stroke-grey-300" />
		Add a sub task
	</button>
{/if}

{#if showCreateSubTasks}
	<NewSubTask task={taskId} {list} {project} {getSubTasks} />
{/if}
