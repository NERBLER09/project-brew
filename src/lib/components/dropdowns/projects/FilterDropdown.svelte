<script lang="ts">
	import PlusNew from '$lib/assets/Plus-New.svelte';
	import Trash from '$lib/assets/Trash.svelte';
	import { dateFilter } from '$lib/stores/project';

	let addFilter = false;

	const setDateFilter = (option: 'soon' | 'today' | 'overdue' | 'unset') => {
		$dateFilter = option;
		addFilter = false;
	};

	const clearFilters = () => {
		$dateFilter = null;
		addFilter = false;
	};
</script>

<div class="dropdown--container top-6 right-0 z-50 min-w-[12.5rem]">
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
</div>
