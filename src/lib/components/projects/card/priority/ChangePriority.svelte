<script lang="ts">
	import Check from '$lib/assets/Check.svelte';
	import { supabase } from '$lib/supabase';

	export let shown: boolean;
	export let priority_level: string | null;
	export let taskId: number;

	const updatePriority = async (priority) => {
		await supabase.from('tasks').update({ priority_level: priority }).eq('id', taskId);
	};
</script>

<div
	class="dropdown--container z-50 border-grey-200 shadow dark:border-grey-700 md:left-0 md:top-8 md:w-[12.5rem] md:border-2"
>
	<button
		class="dropdown--item"
		on:click={() => {
			updatePriority('high');
			priority_level = 'high';
			shown = false;
		}}
	>
		{#if priority_level === 'high'}
			<Check className="dropdown--icon" />
		{/if}
		<div class="rounded-full bg-red-400 py-1 px-4 dark:bg-red-600">
			<span class="sr-only">High priority</span>
			<span class="font-medium text-grey-100">High</span>
		</div>
	</button>

	<button
		class="dropdown--item"
		on:click={() => {
			updatePriority('med');
			priority_level = 'med';
			shown = false;
		}}
	>
		{#if priority_level === 'med'}
			<Check className="dropdown--icon" />
		{/if}
		<div class="rounded-full bg-orange-400 py-1 px-4 dark:bg-orange-600">
			<span class="font-medium text-grey-100">Medium</span>
		</div>
	</button>
	<button
		class="dropdown--item"
		on:click={() => {
			updatePriority('low');
			priority_level = 'low';
			shown = false;
		}}
	>
		{#if priority_level === 'low'}
			<Check className="dropdown--icon" />
		{/if}
		<div class="rounded-full bg-yellow-300 py-1 px-4 dark:bg-yellow-500">
			<span class="sr-only">Low priority</span>
			<span class="font-medium text-grey-700">Low</span>
		</div>
	</button>
	<button
		class="dropdown--item"
		on:click={() => {
			updatePriority('none');
			priority_level = 'none';
			shown = false;
		}}
	>
		{#if priority_level === 'none'}
			<Check className="dropdown--icon" />
		{/if}
		<div class="rounded-full bg-emerald-400 py-1 px-4 dark:bg-emerald-500">
			<span class="sr-only">No priority</span>
			<span class="font-medium text-grey-100">None</span>
		</div>
	</button>
</div>
