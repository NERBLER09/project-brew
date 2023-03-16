<script lang="ts">
	import { currentTeam } from '$lib/stores/team';
	import { supabase } from '$lib/supabase';
	import type { Task } from '$lib/types/projects';
	import { onMount } from 'svelte';
	import TaskItem from './TaskItem.svelte';

	export let type: 'today' | 'soon' | 'overdue' = 'today';
  
	let incompleteTasks: Task[] = [];
	let teamId = $currentTeam.id;

	onMount(async () => {
		let query = supabase
			.from('tasks')
			.select('*, projects!inner(team)')
			.eq('projects.team', teamId);

		switch (type) {
			case 'today':
				query = query.eq('due_date', new Date().toISOString());
				break;
			case 'soon':
				const date = new Date();
				date.setDate(date.getDate() - 3);
				query = query.rangeAdjacent(
					'due_date',
					`[
					${date.toISOString()}, ${new Date().toISOString()}
				]`
				);
				break;
			case 'overdue':
				query = query.lte('due_date', `${new Date().toISOString()}`);
				break;
		}

		query = query.neq('status', 'done');

		const { data: tasks, error } = await query;


		if (tasks) {
			incompleteTasks = tasks;
		}
	});
</script>

<div class="flex flex-col gap-md">
	{#each incompleteTasks as { project, name, id, due_date: dueDate }, index}
		<TaskItem {project} {name} {id} bind:incompleteTasks {index} {type} {dueDate} />
	{:else}
		<p class="font-medium text-grey-700 dark:text-grey-300">
			{#if type === 'today'}
				There is nothing that needs to get done for today!
			{:else if type === 'soon'}
				There is nothing that needs to done in the next three days!
			{:else if type === 'overdue'}
				Congratulations, everything in on schedule.
			{/if}
		</p>
	{/each}
</div>
