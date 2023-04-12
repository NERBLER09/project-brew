<script lang="ts">
	import Calendar from '$lib/assets/Calendar.svelte';
	import Milestone from '$lib/assets/Milestone.svelte';
	import { supabase } from '$lib/supabase';
	import { onMount } from 'svelte';
	import Assinged from '../card/Assinged.svelte';

	export let name: string;
	export let tags: string[] = [];
	export let due_date: string;
	export let id: number;
	export let status: 'other' | 'todo' | 'done' | 'doing';
	export let assigned: string[] | null;
	export let milestone: string | null;
	export let priority_level: string | null;

	tags = tags ?? [];
	assigned = assigned ?? [];

	let formattedDate = '';
	let milestoneName = '';

	const getMilestoneName = async () => {
		if (milestone) {
			const { data } = await supabase
				.from('milestones')
				.select('name')
				.eq('id', milestone)
				.limit(1)
				.single();

			milestoneName = data?.name ?? '';
		}
	};

	onMount(() => {
		const tempDueDate = new Date(due_date);
		tempDueDate.setDate(tempDueDate.getDate() + 1);
		formattedDate = tempDueDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

		getMilestoneName();
	});
</script>

<div class="flex items-center">
	<div class="relative mr-md min-w-[15.625rem]">
		<span class="font-bold text-grey-700 dark:text-grey-300">{name}</span>
	</div>
	<div class="relative mr-md flex min-w-[10.625rem] items-center gap-sm">
		<Calendar className="h-6 w-6 stroke-accent-light" />
		<span class="font-bold text-grey-700 dark:text-grey-300">{formattedDate}</span>
	</div>
	<div class="relative mr-md min-w-[10.625rem]">
		<div class="w-fit">
			{#if status === 'done'}
				<div class="rounded-full bg-emerald-400 py-1 px-4 dark:bg-emerald-500">
					<span class="font-medium text-grey-100">Done</span>
				</div>
			{:else if status === 'doing'}
				<div class="rounded-full bg-yellow-300 py-1 px-4 dark:bg-yellow-400">
					<span class="font-medium text-grey-700">Doing</span>
				</div>
			{:else if status === 'todo'}
				<div class="rounded-full bg-orange-400 py-1 px-4 dark:bg-orange-600">
					<span class="font-medium text-grey-100">To-do</span>
				</div>
			{:else if status === 'other' || status === null}
				<div class="rounded-full bg-grey-200 py-1 px-4 dark:bg-grey-700">
					<span class="font-medium text-grey-700 dark:text-grey-300">Other</span>
				</div>
			{/if}
		</div>
	</div>
	<div class="mr-md min-w-[10.625rem]">
		<div class="w-fit">
			{#if priority_level === 'high'}
				<div class="rounded-full bg-red-400 py-1 px-4 dark:bg-red-600">
					<span class="sr-only">High priority</span>
					<span class="font-medium text-grey-100">High</span>
				</div>
			{:else if priority_level === 'med'}
				<div class="rounded-full bg-orange-400 py-1 px-4 dark:bg-orange-600">
					<span class="sr-only">Medium priority</span>
					<span class="font-medium text-grey-100">Medium</span>
				</div>
			{:else if priority_level === 'low'}
				<div class="rounded-full bg-yellow-300 py-1 px-4 dark:bg-yellow-500">
					<span class="sr-only">Low priority</span>
					<span class="font-medium text-grey-700">Low</span>
				</div>
			{:else if priority_level === 'none' || priority_level === null}
				<div class="rounded-full bg-emerald-400 py-1 px-4 dark:bg-emerald-500">
					<span class="sr-only">No priority</span>
					<span class="font-medium text-grey-100">None</span>
				</div>
			{/if}
		</div>
	</div>
	<div class="relative mr-md min-w-[10.625rem]">
		<div class="relative mt-md flex items-center">
			{#each assigned as id}
				<Assinged {id} />
			{/each}
		</div>
	</div>
	<div class="relative mr-md flex min-w-[10.625rem] max-w-[10.625rem] items-center gap-sm">
		<Milestone className="h-6 w-6 stroke-accent-light" />
		{#if milestoneName}
			<span class="truncate font-bold text-grey-700 dark:text-grey-300">{milestoneName}</span>
		{:else}
			<span class="truncate font-bold text-grey-700 dark:text-grey-300">No milestone</span>
		{/if}
	</div>
	<div class="min-w-[10.625rem]">
		<span class="font-bold text-grey-700 dark:text-grey-300">
			<div class="mb-4 flex flex-wrap items-center gap-md pt-sm empty:hidden">
				{#each tags as tag}
					<div class="w-fit rounded-full bg-grey-200 py-1 px-4 dark:bg-grey-700">
						<span class="text-sm font-medium text-grey-700 dark:text-grey-300">{tag}</span>
					</div>
				{/each}
			</div>
		</span>
	</div>

	<div class="absolute left-0 -bottom-1 h-1 w-full rounded-full bg-grey-700 dark:bg-grey-300" />
</div>
