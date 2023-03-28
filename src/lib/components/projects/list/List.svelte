<script lang="ts">
	import MoreHorizontal from '$lib/assets/More Horizontal.svelte';
	import PlusNew from '$lib/assets/Plus-New.svelte';
	import Card from '../card/Card.svelte';

	import { supabase } from '$lib/supabase';
	import { onMount } from 'svelte';
	import { dndzone } from 'svelte-dnd-action';
	import { userData } from '$lib/stores/user';
	import NewCard from '$lib/components/form/forms/NewCard.svelte';
	import {
		dateFilter,
		filterTags,
		searchQuery,
		sortOptions,
		tasksCompletedThisDay,
		type SortOptions
	} from '$lib/stores/project';

	import { weeklyActivity } from '$lib/api/activity';
	import type { Task } from '$lib/types/projects';
	import { disableDrag } from '$lib/stores/ui';
	import ListDropdown from '$lib/components/dropdowns/projects/ListDropdown.svelte';

	export let name: string;
	export let id: any;
	export let status: string;
	let tasks: Task[] = [];

	let unsortedTasks: any[] = [];
	let showListDropdown = false;
	let listDropdownElement: HTMLElement;

	let showCreateTask = false;
	const handleDnd = (e) => {
		tasks = e.detail.items;
	};

	const handleFinalize = async (event) => {
		tasks = event.detail.items;
		const found = tasks.find((task) => task.id === event.detail.info.id);
		if (!tasks.includes(found)) return;

		const { error } = await supabase
			.from('tasks')
			.update({ list: id, user_id: $userData.id, status })
			.eq('id', event.detail.info.id);

		const index = tasks.indexOf(found!);
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
	};

	const handleDateFilter = (option: 'soon' | 'today' | 'overdue' | 'unset' | null) => {
		unsortedTasks = dbTasks;
		switch (option) {
			case 'soon':
				unsortedTasks = unsortedTasks.filter((item) => {
					return (
						new Date(item.due_date).getTime() >= new Date().getTime() &&
						new Date(item.due_date).getTime() <= new Date().setDate(new Date().getDate() + 4)
					);
				});

				break;
			case 'today':
				unsortedTasks = unsortedTasks.filter((item) => {
					const date = new Date(item.due_date);
					const today = new Date();
					date.setDate(date.getDate() + 1);

					return (
						date.getDate() === today.getDate() &&
						date.getMonth() === today.getMonth() &&
						date.getFullYear() === today.getFullYear()
					);
				});
				break;

			case 'overdue':
				unsortedTasks = unsortedTasks.filter((item) => {
					const date = new Date(item.due_date);
					const today = new Date();
					date.setDate(date.getDate() + 1);

					return date < today && date.getTime() !== 86400000;
				});
				break;
			case 'unset':
				unsortedTasks = unsortedTasks.filter((item) => {
					return !item.due_date;
				});
				break;
			default:
				unsortedTasks = dbTasks;
				break;
		}
		tasks = unsortedTasks;
		tasks = [...tasks];
	};

	const handleTagsFilter = (tags: string[]) => {
		unsortedTasks = dbTasks;

		if (!tags) {
			return;
		}

		unsortedTasks = unsortedTasks.filter((item: Task) => {
			return item.tags?.includes(tags.toString());
		});
		tasks = unsortedTasks;
		tasks = [...tasks];
	};

	const handleSort = (option: SortOptions) => {
		if (option.date === 'descending') {
			unsortedTasks = unsortedTasks.sort((item: Task) => {
				return new Date().getTime() - new Date(item.due_date).getTime();
			});
		} else if (option.date === 'ascending') {
			unsortedTasks = unsortedTasks.sort((item: Task) => {
				return new Date(item.due_date).getTime() - new Date().getTime();
			});
		}

		if (option.priority === 'ascending') {
			unsortedTasks = unsortedTasks.sort((item: Task) => {
				return !item.is_priority;
			});
		} else if (option.priority === 'descending') {
			unsortedTasks = unsortedTasks.sort((item: Task) => {
				return item.is_priority;
			});
		}

		tasks = unsortedTasks;
		tasks = [...tasks];
	};

	$: handleDateFilter($dateFilter);
	$: handleTagsFilter($filterTags);
	$: handleSort($sortOptions);

	let dbTasks: Task[] = [];
	onMount(async () => {
		const { data, error } = await supabase.from('tasks').select().eq('list', id);
		tasks = data || [];
		dbTasks = data ?? [];
		unsortedTasks = tasks.map((task: Task) => ({
			...task,
			searchTerms: `${task.name} ${task.description}`
		}));
		handleDateFilter($dateFilter);
	});

	const handleClickOutside = (event: Event) => {
		if (!listDropdownElement.contains(event.target)) {
			showListDropdown = false;
		}
	};

	const handleSearch = (query: string) => {
		tasks = unsortedTasks;
		tasks = unsortedTasks.filter((item) => item?.searchTerms.toLowerCase().includes(query));
		tasks = [...tasks];
	};

	$: handleSearch($searchQuery);
</script>

<svelte:window on:click={handleClickOutside} />

<section class="w-[15.625rem] md:relative md:w-[18.75rem] lg:w-[25rem]">
	<header class="flex w-[15.625rem] items-center md:w-[18.75rem] lg:w-[25rem]">
		<div class="mb-md flex items-center gap-md md:mb-lg">
			<h2 class="text-md font-semibold text-grey-900 dark:text-grey-100 md:text-lg">{name}</h2>
			<p class="text-sm font-medium text-grey-700 dark:text-grey-200 md:text-base">
				{tasks.length}
			</p>
		</div>
		<div bind:this={listDropdownElement} class="ml-auto">
			<button on:click={() => (showListDropdown = !showListDropdown)}>
				<MoreHorizontal className="stroke-grey-700 dark:stroke-grey-200 h-8 w-8" />

				{#if showListDropdown}
					<ListDropdown bind:visibility={showListDropdown} listId={id} />
				{/if}
			</button>
		</div>
	</header>

	{#if showCreateTask}
		<NewCard bind:showCreateTask bind:tasks listId={id} listStatus={status} />
	{:else}
		<button
			class="button--secondary flex w-full items-center justify-center gap-md"
			on:click={() => (showCreateTask = true)}
		>
			<PlusNew className="w-6 h-6 stroke-grey-700 dark:stroke-grey-200" />
			New task
		</button>
	{/if}

	<div
		class="mt-md flex min-h-[200px] flex-col gap-md"
		use:dndzone={{ items: tasks, type: 'card', flipDurationMs: 300, dragDisabled: $disableDrag }}
		on:consider={handleDnd}
		on:finalize={handleFinalize}
	>
		{#each tasks as task (task.id)}
			<Card
				name={task.name}
				description={task.description}
				dueDate={task.due_date}
				isPriority={task.is_priority}
				id={task.id}
				status={task.status}
				tags={task.tags}
				bind:tasks
				assinged={task.assigned}
				milestone={task.milestone}
			/>
		{/each}
	</div>
</section>
