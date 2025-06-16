<script lang="ts">
	import { supabase } from '$lib/supabase';
	import type { SubTask } from '$lib/types/projects';
	import { onMount } from 'svelte';
	import NewSubTask from './NewSubTask.svelte';
	import SubTaskItem from './SubTaskItem.svelte';
	import { userRole } from '$lib/stores/team';

	export let taskId: number;
	export let list: number;
	export let project: number;

	export let subTasks: SubTask[] = [];
	export let showSubTasks = false;
	export let showCreateSubTasks = false;

	$: if (showCreateSubTasks) showSubTasks = true;

	let isViewer = $userRole === 'viewer';

	const getSubTasks = async () => {
		const { data: tasks } = await supabase.from('sub_tasks').select().eq('task', taskId);
		subTasks = tasks ?? [];
		subTasks = subTasks.sort((item) => {
			if (item.completed) return 1;
			else return 0;
		});
	};

	onMount(() => {
		subTasks = subTasks ?? [];
	});
</script>

{#if subTasks.length > 0}
	<div class="mb-md flex flex-col gap-sm">
		{#each subTasks as task}
			<SubTaskItem {...task} {getSubTasks} />
		{/each}
	</div>
{/if}
{#if !isViewer}
	<NewSubTask task={taskId} {list} {project} {getSubTasks} />
{/if}
