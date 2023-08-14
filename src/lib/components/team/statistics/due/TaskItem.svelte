<script lang="ts">
	import Calendar from '$lib/assets/Calendar.svelte';
	import Assinged from '$lib/components/projects/card/Assinged.svelte';
	import { supabase } from '$lib/supabase';
	import type { Task } from '$lib/types/projects';
	import { onMount } from 'svelte';
	import toast from 'svelte-french-toast';

	export let project: number;
	export let name: string;
	export let id: number;
	export let incompleteTasks: Task[];
	export let index: number;
	export let type: 'today' | 'soon' | 'overdue' = 'today';
	export let dueDate: string = '';

	let project_name: string;
	let doneListId: number | null;
	let assignedPeople: string[] = [];
	let date: string = '';

	let itemDone = false;

	onMount(async () => {
		const { data, error } = await supabase
			.from('projects')
			.select()
			.eq('id', project)
			.limit(1)
			.single();

		const { data: list } = await supabase
			.from('lists')
			.select('id')
			.eq('project', project)
			.eq('status', 'done')
			.limit(1)
			.single();

		doneListId = list?.id ?? null;
		project_name = data?.project_name ?? '';
		assignedPeople = data?.invited_people ?? [];

		const tempDueDate = new Date(dueDate);
		tempDueDate.setDate(tempDueDate.getDate() + 1);
		date = tempDueDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
	});

	const handleUpdateStatusWhenComplete = async () => {
		if (!doneListId) return;
		const { error } = await supabase
			.from('tasks')
			.update({ status: 'done', list: doneListId })
			.eq('id', id);

		if (error) {
			toast.error(`Failed to mark task as complete: ${error.message}`);
		} else {
			incompleteTasks.splice(index, 1);
			incompleteTasks = [...incompleteTasks];
			itemDone = false;
		}
	};

	$: if (itemDone) handleUpdateStatusWhenComplete();
</script>

<div class="flex items-center rounded bg-grey-100 px-2 py-3 dark:bg-grey-800">
	<input type="checkbox" class="input--checkbox" bind:checked={itemDone} />
	<span class="ml-md font-bold text-grey-700 dark:text-grey-300">{name}</span>
	<li class="ml-md list-inside list-disc font-bold text-grey-700 dark:text-grey-300">
		<a href="/app/projects/{project}">
			{project_name}
		</a>
	</li>

	{#if type !== 'today'}
		<div class="ml-md flex items-center md:ml-2xl md:gap-sm">
			<Calendar className="h-6 w-6 stroke-accent-light" />
			<span class="text-sm font-medium text-grey-700 dark:text-grey-200 md:text-base">{date}</span>
		</div>
	{/if}

	<div class="ml-auto hidden items-center px-2 md:flex">
		{#each assignedPeople as id}
			<Assinged {id} />
		{/each}
	</div>
</div>
