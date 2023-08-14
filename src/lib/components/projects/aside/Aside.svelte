<script lang="ts">
	import Filter from '$lib/assets/Filter.svelte';
	import Search from '$lib/assets/Search.svelte';
	import Sort from '$lib/assets/Sort.svelte';
	import FilterDropdown from '$lib/components/dropdowns/projects/FilterDropdown.svelte';
	import SortDropdown from '$lib/components/dropdowns/projects/SortDropdown.svelte';
	import { searchQuery } from '$lib/stores/project';

	let search = false;
	let searchInput: HTMLElement;

	let filter = false;
	let filterContainer: HTMLElement;

	let sort = false;
	let sortContainer: HTMLElement;

	const autoCloseDropdowns = (event: Event) => {
		if (!searchInput.contains(event.target)) {
			search = false;
		}

		// if (!filterContainer.contains(event.target)) {
		// 	filter = false;
		// }

		if (!sortContainer.contains(event.target)) {
			sort = false;
		}
	};

	$: if (!search) {
		$searchQuery = '';
	}
</script>

<svelte:window on:click={autoCloseDropdowns} />

<div class="ml-auto flex items-center gap-md">
	<div class="relative h-8 md:h-6" bind:this={searchInput}>
		{#if search}
			<input
				type="text"
				placeholder="Search for a task"
				class="input--text absolute right-0 top-8 md:top-0 md:right-8"
				bind:value={$searchQuery}
			/>
		{/if}
		<button on:click={() => (search = !search)}>
			<Search className="w-8 h-8 md:w-6 md:h-6 stroke-grey-700 dark:stroke-grey-200" />
			<span class="sr-only">Search through tasks</span>
		</button>
	</div>
	<div bind:this={filterContainer} class="md:relative">
		<button class="flex items-center gap-sm" on:click={() => (filter = !filter)}>
			<Filter
				className="w-8 h-8 md:w-6 md:h-6 stroke-grey-700 dark:stroke-grey-200"
				parentBg="white dark:stroke-grey-900"
			/>
			<span class="sr-only font-medium text-grey-700 dark:text-grey-200 md:not-sr-only">Filter</span
			>
		</button>

		{#if filter}
			<FilterDropdown />
		{/if}
	</div>
	<div bind:this={sortContainer} class="md:relative">
		<button class="flex items-center gap-sm" on:click={() => (sort = !sort)}>
			<Sort className="w-8 h-8 md:w-6 md:h-6 stroke-grey-700 dark:stroke-grey-200" />
			<span class="sr-only font-medium text-grey-700 dark:text-grey-200 md:not-sr-only">Sort</span>
		</button>
		{#if sort}
			<SortDropdown />
		{/if}
	</div>
</div>
