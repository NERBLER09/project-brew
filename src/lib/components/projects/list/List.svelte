<script lang="ts">
	import MoreHorizontal from '$lib/assets/More Horizontal.svelte';
	import PlusNew from '$lib/assets/Plus-New.svelte';
	import Card from '../card/Card.svelte';

	import { supabase } from '$lib/supabase';
	import { onMount } from 'svelte';
	import { dndzone } from 'svelte-dnd-action';
	import { userData } from '$lib/stores/user';
	import {
		currentProject,
		dateFilter,
		filterTags,
		milestoneFilter,
		priorityFilter,
		searchQuery,
		sortOptions,
		tasksCompletedThisDay
	} from '$lib/stores/project';

	import { weeklyActivity } from '$lib/api/activity';
	import type { Task } from '$lib/types/projects';
	import { disableDrag } from '$lib/stores/ui';
	import ListDropdown from '$lib/components/dropdowns/projects/ListDropdown.svelte';
	import { handleSortingTasks } from '$lib/api/sort';
	import { handleFilter } from '$lib/api/filter';
	import { userRole } from '$lib/stores/team';
	import toast from 'svelte-french-toast';
	import { invalidate } from '$app/navigation';
	import { deserialize } from '$app/forms';

	export let name: string;
	export let id: number;
	export let status: string;
	let tasks: Task[] = [];

	let unsortedTasks: Task[] = [];
	let showListDropdown = false;
	let listDropdownElement: HTMLElement;

	const handleDnd = (e) => {
		tasks = e.detail.items;
	};

	const handleFinalize = async (event) => {
		tasks = event.detail.items;
		const found = tasks.find((task) => task.id === event.detail.info.id);
		if (!tasks.includes(found)) return;

		await supabase
			.from('tasks')
			.update({ list: id, user_id: $userData.id, status })
			.eq('id', event.detail.info.id);

		if (found) {
			const index = tasks.indexOf(found);
			if (index < 0) return; // Prevents error if index is below 0
			tasks[index].status = status;

			if (tasks[index].status === 'done') {
				$tasksCompletedThisDay++;
				$weeklyActivity[$weeklyActivity.length - 1].tasksCompleted++;

				await supabase
					.from('profiles')
					.update({ your_activity: $weeklyActivity })
					.eq('id', $userData.id);

				localStorage.setItem('tasksCompletedToday', $tasksCompletedThisDay);
			}
		}
	};

	export let dbTasks: Task[];

	const handleCreateNewTask = async (event) => {
		const form = new FormData(this);
		form.append('name', 'New Task');
		form.append('priority_level', 'none');
		form.append('status', 'other');
		form.append('list-id', id);
		form.append('list-status', status);

		const response = await fetch(`/app/projects/${$currentProject.id}?/newTask`, {
			method: 'POST',
			body: form
		});

		const result = deserialize(await response.text());

		if (result?.type === 'success') {
			invalidate('app:project');
		} else if (result.type === 'failure') {
			toast.error(result?.data.message);
		}
	};

	$: unsortedTasks = dbTasks.filter((item) => {
		if (item.milestone) {
			return !item.milestone.completed;
		} else {
			return item;
		}
	});

	$: unsortedTasks = unsortedTasks.filter((item) => item.status === status);

	$: tasks = dbTasks.filter((item) => item.status === status);

	$: tasks = handleFilter(
		unsortedTasks ?? [],
		$dateFilter,
		$priorityFilter,
		$filterTags,
		$milestoneFilter
	);

	$: tasks = handleSortingTasks(tasks, $sortOptions) ?? [];
	$: tasks = tasks.sort((a, b) => {
		if (a.name === 'New Task' && b.name !== 'New Task') return -1;
		else if (a.name !== 'New Task' && b.name !== 'New Task') return 1;
		else return 0;
	});

	onMount(async () => {
		tasks = unsortedTasks;
	});

	const handleClickOutside = (event: Event) => {
		if (!listDropdownElement.contains(event.target)) {
			showListDropdown = false;
		}
	};

	const handleSearch = (query: string) => {
		tasks = unsortedTasks;
		tasks = unsortedTasks.filter((item) => item?.name.toLowerCase().includes(query));
	};

	$: handleSearch($searchQuery);
</script>

<svelte:window on:click={handleClickOutside} />

<section class="w-[15.625rem] touch-none md:w-[18.75rem] lg:w-[25rem]">
	<header class="flex w-[15.625rem] items-center md:w-[18.75rem] lg:w-[25rem]">
		<div class="mb-md flex items-center gap-md md:mb-lg">
			<h2 class="text-md font-semibold text-grey-900 dark:text-grey-100 md:text-lg">{name}</h2>
			<p class="text-sm font-medium text-grey-700 dark:text-grey-200 md:text-base">
				{tasks.length}
			</p>
		</div>
		{#if $userRole !== 'viewer'}
			<div bind:this={listDropdownElement} class="relative ml-auto">
				<button on:click={() => (showListDropdown = !showListDropdown)}>
					<MoreHorizontal className="stroke-grey-700 dark:stroke-grey-200 h-8 w-8" />

					{#if showListDropdown}
						<ListDropdown bind:visibility={showListDropdown} listId={id} />
					{/if}
				</button>
			</div>
		{/if}
	</header>

	{#if $userRole !== 'viewer'}
		<button
			class="button--secondary flex w-full items-center justify-center gap-md"
			on:click={handleCreateNewTask}
		>
			<PlusNew className="w-6 h-6 stroke-grey-700 dark:stroke-grey-200" />
			New task
		</button>
	{/if}

	<div
		class="mt-md flex min-h-[200px] flex-col gap-md"
		use:dndzone={{
			items: tasks,
			type: 'card',
			flipDurationMs: 300,
			dragDisabled: $disableDrag || $userRole === 'viewer'
		}}
		on:consider={handleDnd}
		on:finalize={handleFinalize}
	>
		{#each tasks as task (task.id)}
			<Card {...task} list={id} milestone={task.milestone} />
		{/each}
	</div>
</section>
