<script lang="ts">
	import Calendar from '$lib/assets/Calendar.svelte';
	import Check from '$lib/assets/Check.svelte';
	import CirclePriority from '$lib/assets/Fill/CirclePriority.svelte';
	import MoreHorizontal from '$lib/assets/More Horizontal.svelte';
	import CardDropdown from '$lib/components/dropdowns/projects/CardDropdown.svelte';
	import { onMount } from 'svelte/internal';

	export let name: string;
	export let tags: any[] = [];
	export let description: string = '';
	export let dueDate: any;
	export let isPriority: boolean = false;
	export let id: number;
	export let status: 'other' | 'todo' | 'done' | 'doing';
	export let tasks: any[];

	let showCardDropdown = false;
	let formattedDate = '';

	onMount(() => {
		if (!dueDate) return '';

		const tempDueDate = new Date(dueDate);
		formattedDate = tempDueDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
	});
</script>

<div class="md:relative">
	<section class="bg-grey-100 dark:bg-grey-800 p-6 w-full rounded-lg">
		<header class="flex items-start mb-sm">
			<div>
				<div class="flex items-start gap-sm">
					{#if status === 'done'}
						<Check className="h-8 w-8 stroke-[#059669] hidden md:block" />
					{/if}
					<h3 class="text-md text-grey-700 dark:text-grey-200 font-semibold card__text--{status}">{name}</h3>
				</div>
				{#if dueDate}
					<div class="flex items-center md:hidden">
						<Calendar className="h-6 w-6 stroke-accent-light" />
						<span class="text-sm text-grey-700 dark:text-grey-200 font-medium">{formattedDate}</span>
					</div>
				{/if}
			</div>

			<div class="ml-auto flex items-center gap-md">
				{#if dueDate}
					<div class="md:flex items-center hidden">
						<Calendar className="h-6 w-6 stroke-accent-light" />
						<span class="text-sm text-grey-700 dark:text-grey-200 font-medium">{formattedDate}</span>
					</div>
				{/if}

				<button on:click={() => (showCardDropdown = !showCardDropdown)}>
					<MoreHorizontal className="h-8 w-8 stroke-grey-700 dark:stroke-grey-200" />
				</button>
			</div>
		</header>

		<div class="mb-md">
			<p class="text-sm font-medium text-grey-700 dark:text-grey-200 max-h-[10ch] empty:hidden">{description}</p>
		</div>

		{#if tags}
			<div class="flex items-center gap-md flex-wrap pt-sm empty:hidden mb-4">
				{#each tags as tag}
					<div class="bg-grey-200 py-1 px-2 w-fit rounded">
						<span class="text-grey-700 text-sm font-medium">{tag}</span>
					</div>
				{/each}
			</div>
		{/if}

		{#if isPriority}
			<CirclePriority className="h-12 w-12 fill-[#E68F16] ml-auto" />
		{/if}
	</section>

	{#if showCardDropdown}
		<CardDropdown bind:visibility={showCardDropdown} {id} bind:priority={isPriority} bind:tasks />
	{/if}
</div>

<style>
	.card__text--done {
		@apply line-through text-[#059669];
	}
	.card__text--todo {
		@apply text-[#b91c1c];
	}
</style>
