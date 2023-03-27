<script lang="ts">
	import CalendarAdd from '$lib/assets/CalendarAdd.svelte';
	import CirclePriority from '$lib/assets/Circle-Priority.svelte';
	import CloseMultiply from '$lib/assets/Close-Multiply.svelte';
	import PlusNew from '$lib/assets/Plus-New.svelte';
	import Trash from '$lib/assets/Trash.svelte';
	import { sortOptions as projectSort } from '$lib/stores/project';

	let addSort = false;

	const sortOptions = $projectSort;
	$: $projectSort = sortOptions;
</script>

<div class="dropdown--container right-0 z-50 md:top-6 md:min-w-[15.625rem]">
	<button class="dropdown--item" on:click={() => (addSort = !addSort)}>
		<PlusNew className="dropdown--icon" />
		<span class="dropdown--label"> Add sort </span>
	</button>

	{#if addSort}
		<button class="dropdown--item" on:click={() => (sortOptions.date = 'ascending')}>
			<CalendarAdd className="dropdown--icon" />
			<span class="dropdown--label"> Add date sort </span>
		</button>
		<button class="dropdown--item" on:click={() => (sortOptions.priority = 'ascending')}>
			<CirclePriority className="dropdown--icon" />
			<span class="dropdown--label"> Add priority sort </span>
		</button>
	{/if}

	{#if sortOptions.date}
		<hr class="mx-auto w-1/2" />
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
			<button on:click={() => (sortOptions.date = null)} class="ml-auto">
				<CloseMultiply className="w-8 h-8 md:w-6 md:h-6 stroke-grey-700 dark:stroke-grey-300" />
				<span class="sr-only">Remove date sorting</span>
			</button>
		</div>
	{/if}
	{#if sortOptions.priority}
		<hr class="mx-auto w-1/2" />
		<div class="flex w-full items-center gap-md">
			<span class="dropdown--label">Prority: </span>
			<select
				name="date-sort-input"
				bind:value={sortOptions.priority}
				class="input--text w-fit bg-grey-300 dark:bg-grey-700"
			>
				<option value="ascending">Ascending</option>
				<option value="descending">Descending</option>
			</select>
			<button on:click={() => (sortOptions.priority = null)} class="ml-auto">
				<CloseMultiply className="w-8 h-8 md:w-6 md:h-6 stroke-grey-700 dark:stroke-grey-300" />
				<span class="sr-only">Remove task priority sorting</span>
			</button>
		</div>
	{/if}

	{#if sortOptions.date || sortOptions.priority}
		<hr class="mx-auto w-1/2" />

		<button
			class="dropdown--item"
			on:click={() => {
				sortOptions.date = null;
				sortOptions.priority = null;
			}}
		>
			<Trash className="dropdown--icon" />
			<span class="dropdown--label">Clear sorting</span>
		</button>
	{/if}
</div>
