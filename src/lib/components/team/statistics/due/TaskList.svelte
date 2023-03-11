<script lang="ts">
	import { currentTeam } from '$lib/stores/team';
	import { supabase } from '$lib/supabase';
	import type { Task } from '$lib/types/projects';
	import { onMount } from 'svelte';
	import TaskItem from './TaskItem.svelte';

	let incompleteTasks: Task[] = [];
	let teamId = $currentTeam.id;

	onMount(async () => {
		const { data: tasks, error } = await supabase
			.from('tasks')
			.select('*, project!inner(team)')
			.eq('project.team', teamId)
			.neq('status', 'done');

		console.log(tasks);
		if (tasks) {
			incompleteTasks = tasks;
		}
	});
</script>

<div class="flex flex-col gap-md">
	{#each incompleteTasks as { project, name }}
		<TaskItem {project} {name} />
	{:else}
		<p class="font-medium text-grey-700 dark:text-grey-300">
			There is nothing that needs to get done for today!
		</p>
	{/each}
</div>
