<script lang="ts">
	import Down from '$lib/assets/Arrow/Chevron/Down.svelte';
	import Up from '$lib/assets/Arrow/Chevron/Up.svelte';
	import Check from '$lib/assets/Check.svelte';
	import PlusNew from '$lib/assets/Plus-New.svelte';
	import Trash from '$lib/assets/Trash.svelte';
	import {
		currentProject,
		dateFilter,
		filterTags,
		milestoneFilter,
		priorityFilter
	} from '$lib/stores/project';
	import { supabase } from '$lib/supabase';
	import { findIndex, includes } from 'lodash';

	let addFilter = false;
	let showMilestonesFilter = false;

	let tags: string[] = [];
	let tagName = '';
	$: $filterTags = tags;

	const clearFilters = () => {
		$dateFilter = null;
		$priorityFilter = null;
		$filterTags = [];
		$milestoneFilter = null;
		addFilter = false;
	};

	let projectMilestones: any[] = $currentProject.milestones.filter((item) => {
		if (!item.completed) return item;
	});

	const setMilestoneFilter = (name: string, id: string) => {
		$milestoneFilter = { name, id };
		addFilter = false;
	};

	const updateFilterOnDB = async (date, milestone, priority) => {
		await supabase
			.from('projects')
			.update({
				filter: { date, milestone, priority }
			})
			.eq('id', $currentProject.id);
	};

	$: updateFilterOnDB($dateFilter, $milestoneFilter, $priorityFilter);
</script>

<div
	class="dropdown--container z-50 min-w-[15.1875rem] -translate-x-[274px] translate-y-[calc(100vh-178px)] md:right-0 md:top-6 md:translate-x-0 md:translate-y-0"
>
	<button class="dropdown--item" on:click={clearFilters}>
		<Trash className="dropdown--icon" />
		<span class="dropdown--label">Clear Filters</span>
	</button>
	<hr class="mx-auto w-1/2" />
	<button class="dropdown--item" on:click={() => (addFilter = !addFilter)}>
		<PlusNew className="dropdown--icon" />
		<span class="dropdown--label">Add Filter</span>
	</button>

	{#if addFilter}
		<div class="flex w-full items-center gap-md">
			<label for="date-filter-select" class="input--label whitespace-nowrap">Date filter:</label>
			<select
				id="date-filter-select"
				class="input--text w-full"
				bind:value={$dateFilter}
				on:change={() => (addFilter = false)}
			>
				<option value={null} selected disabled hidden>No filter</option>
				<option value="today">Today</option>
				<option value="soon">Soon</option>
				<option value="overdue">Overdue</option>
				<option value="unset">Unset</option>
			</select>
		</div>
		<div class="flex w-full items-center gap-md">
			<label for="date-filter-select" class="input--label whitespace-nowrap">Priority:</label>
			<select
				id="date-filter-select"
				class="input--text w-full"
				bind:value={$priorityFilter}
				on:change={() => (addFilter = false)}
			>
				<option value={null} selected disabled hidden>No filter</option>
				<option value="high">High</option>
				<option value="med">Medium</option>
				<option value="low">Low</option>
				<option value="none">None</option>
				<option value="unset">Unset</option>
			</select>
		</div>
		<section>
			<header class="flex items-center">
				<h4 class="dropdown--label px-md py-sm text-md md:text-base">Milestones</h4>
				<button
					class="button--secondary m-0 ml-auto border-0 p-0"
					on:click={() => {
						showMilestonesFilter = !showMilestonesFilter;
						addFilter = true;
					}}
				>
					{#if showMilestonesFilter}
						<Up className="h-8 w-8 md:h-6 md:w-6 stroke-grey-700 dark:stroke-grey-300" />
						<span class="sr-only">Hide milestones to filter by</span>
					{:else}
						<Down className="h-8 w-8 md:h-6 md:w-6 stroke-grey-700 dark:stroke-grey-300" />
						<span class="sr-only">Show milestones to filter by</span>
					{/if}
				</button>
			</header>

			{#if showMilestonesFilter}
				{#each projectMilestones as milestone}
					<button
						class="dropdown--item w-full"
						on:click={() => setMilestoneFilter(milestone.name, milestone.id)}
					>
						<PlusNew className="dropdown--icon" />
						<span class="dropdown--label truncate">{milestone.name}</span>
					</button>
				{/each}
			{/if}
		</section>

		<section>
			<header>
				<h4 class="dropdown--label px-md py-sm text-md md:text-base">Tags</h4>
			</header>

			<div
				class="mb-4 flex w-full flex-col flex-wrap items-center justify-items-start gap-md pt-sm empty:hidden"
			>
				{#each $currentProject.project_tags as tag}
					<button
						class="dropdown--item mr-auto w-full"
						on:click={() => {
							if (!tags.includes(tag)) tags = [tag, ...tags];
							else {
								const index = tags.indexOf(tag);
								tags.splice(index, 1);
								tags = tags;
							}
						}}
					>
						<span class="text-sm font-medium text-grey-700 dark:text-grey-300">{tag}</span>
						{#if !tags.includes(tag)}
							<PlusNew
								className="h-8 w-8 md:h-6 md:w-6 stroke-grey-700 dark:stroke-grey-300 ml-auto"
							/>
						{:else}
							<Trash
								className="h-8 w-8 md:h-6 md:w-6 stroke-grey-700 dark:stroke-grey-300 ml-auto"
							/>
						{/if}
					</button>
				{/each}
			</div>
		</section>
	{/if}

	{#if $dateFilter}
		<hr class="mx-auto w-1/2" />
	{/if}

	{#if $dateFilter === 'soon'}
		<button class="dropdown--item" on:click={() => ($dateFilter = null)}>
			<Trash className="dropdown--icon" />
			<span class="dropdown--label">Date - Soon</span>
		</button>
	{:else if $dateFilter === 'today'}
		<button class="dropdown--item" on:click={() => ($dateFilter = null)}>
			<Trash className="dropdown--icon" />
			<span class="dropdown--label">Date - Today</span>
		</button>
	{:else if $dateFilter === 'overdue'}
		<button class="dropdown--item" on:click={() => ($dateFilter = null)}>
			<Trash className="dropdown--icon" />
			<span class="dropdown--label">Date - Overdue</span>
		</button>
	{:else if $dateFilter === 'unset'}
		<button class="dropdown--item" on:click={() => ($dateFilter = null)}>
			<Trash className="dropdown--icon" />
			<span class="dropdown--label">Date - No Date</span>
		</button>
	{/if}

	{#if $priorityFilter}
		<button class="dropdown--item" on:click={() => ($priorityFilter = null)}>
			<Trash className="dropdown--icon" />
			<span class="dropdown--label"
				>Priority - {#if $priorityFilter === 'high'}
					High
				{:else if $priorityFilter === 'med'}
					Medium
				{:else if $priorityFilter === 'low'}
					Low
				{:else if $priorityFilter === 'none'}
					None
				{:else}
					Unset
				{/if}</span
			>
		</button>
	{/if}

	{#if $milestoneFilter}
		<button class="dropdown--item w-full" on:click={() => ($milestoneFilter = null)}>
			<Trash className="dropdown--icon" />
			<span class="dropdown--label truncate">{$milestoneFilter.name}</span>
		</button>
	{/if}
</div>
