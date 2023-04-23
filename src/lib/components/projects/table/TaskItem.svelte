<script lang="ts">
	import Calendar from '$lib/assets/Calendar.svelte';
	import CalendarAdd from '$lib/assets/CalendarAdd.svelte';
	import Milestone from '$lib/assets/Milestone.svelte';
	import { supabase } from '$lib/supabase';
	import { onMount } from 'svelte';
	import Assinged from '../card/Assinged.svelte';
	import PriorityLevel from '../card/priority/PriorityLevel.svelte';
	import ChangeMilestone from './ChangeMilestone.svelte';

	export let name: string;
	export let tags: string[] = [];
	export let due_date: string;
	export let id: number;
	export let status: 'other' | 'todo' | 'done' | 'doing';
	export let assigned: string[] | null;
	export let milestone: string | null;
	export let priority_level: string | null;
	export let projectId: number;

	tags = tags ?? [];
	assigned = assigned ?? [];

	let formattedDate = '';
	let milestoneName = '';
	let showChangeMilestone = false;

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

	let newDate: Date;
	let newDateInput: HTMLInputElement;
	const updateDetails = async (name: string, date: Date) => {
		await supabase
			.from('tasks')
			.update({ name, due_date: new Date(date).toISOString() })
			.eq('id', id);

		const tempDueDate = new Date(newDate);
		tempDueDate.setDate(tempDueDate.getDate() + 1);
		formattedDate = tempDueDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
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
		<span
			class="font-bold text-grey-700 dark:text-grey-300"
			contenteditable
			bind:textContent={name}
			on:blur={() => updateDetails(name, newDate)}>{name}</span
		>
	</div>
	<button
		class="button--secondary relative m-0 mr-md flex min-w-[10.625rem] items-center gap-sm border-0 p-0"
		on:click={() => newDateInput.showPicker()}
	>
		<input
			type="date"
			class="hidden"
			bind:this={newDateInput}
			bind:value={newDate}
			on:change={() => updateDetails(name, newDate)}
		/>
		{#if due_date}
			<Calendar className="h-6 w-6 stroke-accent-light" />
			<span class="font-bold text-grey-700 dark:text-grey-300">{formattedDate}</span>
		{:else}
			<CalendarAdd className="h-6 w-6 stroke-accent-light" />
			<span class="font-bold text-grey-700 dark:text-grey-300">Add due date</span>
		{/if}
	</button>
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
			<PriorityLevel {priority_level} taskId={id} />
		</div>
	</div>
	<div class="relative mr-md min-w-[10.625rem]">
		{#if assigned}
			<div class="relative mt-md flex items-center">
				{#each assigned as id}
					<Assinged {id} />
				{/each}
			</div>
		{/if}
	</div>
	<div class="relative mr-md min-w-[10.625rem] max-w-[10.625rem]">
		<button
			class="button--secondary m-0 flex w-fit items-center gap-sm border-0 p-0"
			on:click={() => (showChangeMilestone = !showChangeMilestone)}
		>
			<Milestone className="h-6 w-6 stroke-accent-light" />
			{#if milestoneName}
				<span class="truncate font-bold text-grey-700 dark:text-grey-300">{milestoneName}</span>
			{:else}
				<span class="truncate font-bold text-grey-700 dark:text-grey-300">No milestone</span>
			{/if}
		</button>

		{#if showChangeMilestone}
			<ChangeMilestone
				{projectId}
				milestoneId={milestone}
				taskId={id}
				bind:shown={showChangeMilestone}
			/>
		{/if}
	</div>
	<div class="min-w-[10.625rem]">
		{#if tags && tags.length > 0}
			<span class="font-bold text-grey-700 dark:text-grey-300">
				<div class="flex flex-wrap items-center gap-md pt-sm empty:hidden">
					{#each tags as tag}
						<div class="w-fit rounded-full bg-grey-200 py-1 px-4 dark:bg-grey-700">
							<span class="text-sm font-medium text-grey-700 dark:text-grey-300">{tag}</span>
						</div>
					{/each}
				</div>
			</span>
		{/if}
	</div>
</div>
