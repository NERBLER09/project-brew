<script lang="ts">
	import Calendar from '$lib/assets/Calendar.svelte';
	import CirclePriority from '$lib/assets/Fill/CirclePriority.svelte';
	import MoreHorizontal from '$lib/assets/More Horizontal.svelte';
	import { onMount } from 'svelte/internal';

	export let name: string;
	export let tags: any[] = [];
	export let description: string = '';
	export let dueDate: any;
	export let isPriority: boolean = false;

	onMount(() => {
		if (!dueDate) return '';

		const tempDueDate = new Date(dueDate);
		dueDate = tempDueDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
	});
</script>

<section class="bg-grey-100 p-6 w-full">
	<header class="flex items-center mb-sm">
		<h3 class="text-md text-grey-700 font-semibold">{name}</h3>
		<div class="ml-auto flex items-center gap-md">
			{#if dueDate}
				<div class="flex items-center">
					<Calendar className="h-6 w-6 stroke-accent-light" />
					<span class="text-sm text-grey-700 font-medium">{dueDate}</span>
				</div>
			{/if}

			<button>
				<MoreHorizontal className="h-8 w-8 stroke-grey-700" />
			</button>
		</div>
	</header>

	<div class="mb-md">
		<p class="text-sm font-medium text-grey-700 max-h-[10ch] empty:hidden">{description}</p>
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
