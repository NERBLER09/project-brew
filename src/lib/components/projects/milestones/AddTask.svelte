<script lang="ts">
	import { invalidate } from '$app/navigation';
	import PlusNew from '$lib/assets/Plus-New.svelte';
	import { currentProject } from '$lib/stores/project';
	import { supabase } from '$lib/supabase';
	import type { Task } from '$lib/types/projects';
	import { onMount } from 'svelte';

	export let show = false;
	export let milestoneId: string;

	let tasks: Task[] = [];
	let search = '';

	$: unfilteredTasks = tasks.filter((item: Task) =>
		item.name.toLowerCase().includes(search.toLowerCase())
	);

	onMount(async () => {
		const { data } = await supabase
			.from('tasks')
			.select()
			.eq('project', $currentProject.id)
			.is('milestone', null);
		tasks = data ?? [];
		unfilteredTasks = tasks;
	});

	const addTaskToMilestone = async (id: number) => {
		await supabase.from('tasks').update({ milestone: milestoneId }).eq('id', id);
		invalidate('milestone:open');
		show = false;
	};
</script>

<div
	class="absolute right-0 max-h-72 overflow-scroll rounded-lg bg-grey-100 p-2 shadow shadow-grey-700 dark:bg-grey-800"
>
	<span class="sr-only">Add new task to this milestone</span>
	<input type="search" class="input--text" placeholder="Search for a task" bind:value={search} />

	<div class="mt-md flex flex-col items-start gap-sm">
		{#each unfilteredTasks as task}
			<div class="flex w-full items-center">
				<span class="font-bold text-grey-700 dark:text-grey-300">{task.name}</span>

				<button class="ml-auto" on:click={() => addTaskToMilestone(task.id)}>
					<PlusNew className="h-8 w-8 stroke-grey-700 dark:stroke-grey-300" />
				</button>
			</div>
		{/each}
	</div>
</div>
