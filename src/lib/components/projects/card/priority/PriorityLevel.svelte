<script lang="ts">
	import ChangePriority from './ChangePriority.svelte';

	export let priority_level: string | null;
	export let taskId: number;

	let changePriorityDropdown = false;
	let priorityContainer: HTMLElement;
</script>

<div bind:this={priorityContainer} class="md:relative">
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

	<ChangePriority bind:priority_level bind:shown={changePriorityDropdown} {taskId} />
</div>
