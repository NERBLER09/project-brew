<script lang="ts">
	import CloseMultiply from '$lib/assets/Close-Multiply.svelte';
	import PlusNew from '$lib/assets/Plus-New.svelte';
	import Trash from '$lib/assets/Trash.svelte';
	import { dateFilter, filterTags } from '$lib/stores/project';

	let addFilter = false;

	let tags: string[] = [];
	let tagName = '';
	let addNewTag = true;
	const handleCreateNewTag = () => {
		tags = [...tags, tagName];
		tagName = '';
		addNewTag = false;
	};

	const handleRemoveTag = (tag: string) => {
		const index = tags.indexOf(tag);
		tags.splice(index, 1);
		tags = [...tags];
	};

	$: $filterTags = tags;

	const setDateFilter = (option: 'soon' | 'today' | 'overdue' | 'unset') => {
		$dateFilter = option;
		addFilter = false;
	};

	const clearFilters = () => {
		$dateFilter = null;
		$filterTags = [];
		addFilter = false;
	};
</script>

<div class="dropdown--container top-6 right-0 z-50 min-w-[15.1875rem]">
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

	<hr class="mx-auto w-1/2" />

	{#each tags as tag}
		<div class="flex w-fit items-center rounded bg-grey-300 py-2 px-3 dark:bg-grey-700">
			<span class="font-medium text-grey-700 dark:text-grey-200">{tag}</span>
			<button on:click={() => handleRemoveTag(tag)}>
				<Trash className="w-6 h-6 stroke-grey-700 dark:stroke-grey-200" />
				<span class="sr-only">Remove {tag} tag</span>
			</button>
		</div>
	{/each}
	{#if addNewTag}
		<form on:submit={handleCreateNewTag} class="ml-auto flex items-center gap-sm">
			<input
				type="text"
				class="input--text w-36"
				placeholder="Tag name"
				bind:value={tagName}
				required
			/>
			<button type="submit">
				<PlusNew className="h-8 w-8 stroke-grey-700 dark:stroke-grey-200" />
				<span class="sr-only">Add new tag</span>
			</button>
			<button type="button" class="ml-sm" on:click={() => (addNewTag = false)}>
				<CloseMultiply className="h-8 w-8 stroke-grey-700 dark:stroke-grey-200" />
				<span class="sr-only">Cancel</span>
			</button>
		</form>
	{:else}
		<button on:click={() => (addNewTag = true)} class="ml-auto">
			<PlusNew className="h-8 w-8 stroke-grey-700 dark:stroke-grey-200" />
			<span class="sr-only">Add new tag</span>
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
