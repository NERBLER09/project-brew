<script lang="ts">
	import CloseMultiply from '$lib/assets/Close-Multiply.svelte';
	import PlusNew from '$lib/assets/Plus-New.svelte';
	import { sortOptions as projectSort } from '$lib/stores/project';

	let addSort = false;

	const sortOptions = $projectSort;
	$: $projectSort = sortOptions;
</script>

<div class="dropdown--container top-6 right-0 z-50 md:min-w-[12.5rem]">
	<button class="dropdown--item" on:click={() => (addSort = !addSort)}>
		<PlusNew className="dropdown--icon" />
		<span class="dropdown--label"> Add sort </span>
	</button>

	{#if addSort}
		<button class="dropdown--item" on:click={() => (sortOptions.date = 'ascending')}>
			<PlusNew className="dropdown--icon" />
			<span class="dropdown--label"> Add date sort </span>
		</button>
		<button class="dropdown--item">
			<PlusNew className="dropdown--icon" />
			<span class="dropdown--label"> Add priority sort </span>
		</button>
	{/if}

	{#if sortOptions.date}
		<div class="flex w-full items-center gap-sm">
			<span class="dropdown--label">Date: </span>
			<select
				name="date-sort-input"
				bind:value={sortOptions.date}
				class="input--text w-fit bg-grey-300 dark:bg-grey-700"
			>
				<option value="ascending">Ascending</option>
				<option value="descending">Descending</option>
			</select>
			<button on:click={() => (sortOptions.date = null)}>
				<CloseMultiply className="w-8 h-8 md:w-6 md:h-6 stroke-grey-700 dark:stroke-grey-300" />
				<span class="sr-only">Remove date sorting</span>
			</button>
		</div>
	{/if}
</div>
