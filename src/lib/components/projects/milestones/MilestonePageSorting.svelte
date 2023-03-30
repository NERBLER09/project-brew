<script lang="ts">
	import CalendarAdd from '$lib/assets/CalendarAdd.svelte';
	import CloseMultiply from '$lib/assets/Close-Multiply.svelte';
	import PlusNew from '$lib/assets/Plus-New.svelte';
	import Trash from '$lib/assets/Trash.svelte';

	interface MilestoneSorting {
		endDate: 'asc' | 'dsc' | null;
	}
	export let milestoneSorting: MilestoneSorting = {
		endDate: null
	};

	let addSort = false;
</script>

<div class="dropdown--container right-0 z-50 md:top-6 md:min-w-[15.625rem]">
	<button class="dropdown--item" on:click={() => (addSort = !addSort)}>
		<PlusNew className="dropdown--icon" />
		<span class="dropdown--label"> Add sort </span>
	</button>

	{#if addSort}
		<button
			class="dropdown--item"
			on:click={() => {
				milestoneSorting.endDate = 'asc';
				addSort = false;
			}}
		>
			<CalendarAdd className="dropdown--icon" />
			<span class="dropdown--label"> End date </span>
		</button>
	{/if}

	{#if milestoneSorting.endDate}
		<hr class="mx-auto w-1/2" />
		<div class="flex w-full items-center gap-sm">
			<span class="dropdown--label mr-md">End date: </span>
			<select
				name="date-sort-input"
				bind:value={milestoneSorting.endDate}
				class="input--text w-1/2 bg-grey-300 dark:bg-grey-700 md:w-fit"
			>
				<option value="asc">Closer</option>
				<option value="dsc">Further</option>
			</select>
			<button on:click={() => (milestoneSorting.endDate = null)} class="ml-auto">
				<CloseMultiply className="w-8 h-8 md:w-6 md:h-6 stroke-grey-700 dark:stroke-grey-300" />
				<span class="sr-only">Remove date sorting</span>
			</button>
		</div>
	{/if}
	{#if milestoneSorting.endDate || milestoneSorting.progress}
		<hr class="mx-auto w-1/2" />

		<button class="dropdown--item">
			<Trash className="dropdown--icon" />
			<span class="dropdown--label">Clear sorting</span>
		</button>
	{/if}
</div>
