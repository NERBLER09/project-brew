<script lang="ts">
	import Trash from '$lib/assets/Trash.svelte';
	import { supabase } from '$lib/supabase';

	export let completed: boolean;
	export let id: string;
	export let name: string;
	export let task: number;
	export let getSubTasks: () => Promise<void>;

	const updateStatus = async () => {
		await supabase.from('sub_tasks').update({ completed }).eq('id', id);
		getSubTasks();
	};
	const handleDelete = async () => {
		await supabase.from('sub_tasks').delete().eq('id', id);
		getSubTasks();
	};
</script>

<div class="display flex max-w-[400px] flex-row gap-md">
	<input
		type="checkbox"
		class="input--checkbox"
		bind:checked={completed}
		id="{name}-sub-task"
		on:change={updateStatus}
	/>
	<label
		for="{name}-sub-task"
		class="input--label ml-sm {completed
			? 'text-emerald-600 line-through dark:text-emerald-500'
			: ''}">{name}</label
	>
	<button
		class="button--secondary ml-auto flex items-center gap-md border-0 p-0 text-start"
		on:click={handleDelete}
	>
		<Trash className="h-6 w-6 stroke-grey-700 dark:stroke-grey-300" />
		<span class="sr-only">Delete {name}</span>
	</button>
</div>
