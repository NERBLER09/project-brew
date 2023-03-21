<script lang="ts">
	import Filter from '$lib/assets/Filter.svelte';
	import Search from '$lib/assets/Search.svelte';
	import Sort from '$lib/assets/Sort.svelte';

	let search = false;
	let searchInput: HTMLElement;

	const autoCloseDropdowns = (event: Event) => {
		if (!searchInput.contains(event.target)) {
			search = false;
		}
	};
</script>

<svelte:window on:click={autoCloseDropdowns} />

<div class="ml-auto flex items-center gap-md">
	<div class="relative h-8 md:h-6" bind:this={searchInput}>
		{#if search}
			<input
				type="text"
				placeholder="Search for a task"
				class="input--text absolute right-0 top-8 md:top-0 md:right-8"
			/>
		{/if}
		<button on:click={() => (search = !search)}>
			<Search className="w-8 h-8 md:w-6 md:h-6 stroke-grey-700 dark:stroke-grey-200" />
			<span class="sr-only">Search through tasks</span>
		</button>
	</div>
	<button class="flex items-center gap-sm">
		<Filter
			className="w-8 h-8 md:w-6 md:h-6 stroke-grey-700 dark:stroke-grey-200"
			parentBg="white dark:stroke-grey-900"
		/>
		<span class="sr-only font-medium text-grey-700 dark:text-grey-200 md:not-sr-only">Filter</span>
	</button>
	<button class="flex items-center gap-sm">
		<Sort className="w-8 h-8 md:w-6 md:h-6 stroke-grey-700 dark:stroke-grey-200" />
		<span class="sr-only font-medium text-grey-700 dark:text-grey-200 md:not-sr-only">Sort</span>
	</button>
</div>
