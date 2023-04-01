<script lang="ts">
	import PlusNew from '$lib/assets/Plus-New.svelte';
	import Trash from '$lib/assets/Trash.svelte';
	import { currentProject, dateFilter, filterTags, milestoneFilter } from '$lib/stores/project';
	import { supabase } from '$lib/supabase';
	import { onMount } from 'svelte';

	let addFilter = false;

	// let tags: string[] = [];
	// $: $filterTags = tags;
	//
	const setDateFilter = (option: 'soon' | 'today' | 'overdue' | 'unset') => {
		$dateFilter = option;
		addFilter = false;
	};

	const clearFilters = () => {
		$dateFilter = null;
		$filterTags = [];
		$milestoneFilter = null;
		addFilter = false;
	};

	let projectMilestones: any[] = [];
	const setMilestoneFilter = (name: string, id: string) => {
		$milestoneFilter = { name, id };
	};

	onMount(async () => {
		const { data } = await supabase.from('milestones').select().eq('project', $currentProject.id);
		projectMilestones = data ?? [];
	});
</script>

<div class="dropdown--container right-0 z-50 min-w-[15.1875rem] md:top-6">
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
		<button class="dropdown--item" on:click={() => setDateFilter('soon')}>
			<span class="dropdown--label">Date - Soon</span>
		</button>
		<button class="dropdown--item" on:click={() => setDateFilter('today')}
			><span class="dropdown--label">Date - Today </span>
		</button>
		<button class="dropdown--item" on:click={() => setDateFilter('overdue')}
			><span class="dropdown--label">Date - Overdue</span></button
		>
		<button class="dropdown--item" on:click={() => setDateFilter('unset')}>
			<span class="dropdown--label">Date - No Date</span>
		</button>

		<section>
			<header>
				<h4 class="dropdown--label px-md py-sm text-md">Milestone</h4>
			</header>

			{#each projectMilestones as milestone}
				<button
					class="dropdown--item"
					on:click={() => setMilestoneFilter(milestone.name, milestone.id)}
				>
					<PlusNew className="dropdown--icon" />
					<span class="dropdown--label">{milestone.name}</span>
				</button>
			{/each}
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

	{#if $milestoneFilter}
		<button class="dropdown--item" on:click={() => ($milestoneFilter = null)}>
			<Trash className="dropdown--icon" />
			<span class="dropdown--label">{$milestoneFilter.name}</span>
		</button>
	{/if}
</div>
