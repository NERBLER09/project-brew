<script lang="ts">
	import { invalidate } from '$app/navigation';
	import { supabase } from '$lib/supabase';
	import { onMount } from 'svelte';
	import toast from 'svelte-french-toast';

	export let project: number;
	export let name: string;
	export let id: number;

	let project_name: string;
	let doneListId: number | null;

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
	});

	const handleUpdateStatusWhenComplete = async () => {
		if (!doneListId) return;
		const { error } = await supabase
			.from('tasks')
			.update({ status: 'done', list: doneListId })
			.eq('id', id);

		if (error) {
			toast.error(`Failed to mark task as complete: ${error.message}`);
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
</div>
