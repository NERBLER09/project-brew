<script lang="ts">
	import { userRole } from '$lib/stores/team';
	import ChangePriority from './ChangePriority.svelte';

	export let priority_level: string | null;
	export let taskId: number;

	let changePriorityDropdown = false;
	let priorityContainer: HTMLElement;
	let isViewer = $userRole === 'viewer';

	const handleAutoClose = (event: Event) => {
		if (!priorityContainer.contains(event.target)) {
			changePriorityDropdown = false;
		}
	};
</script>

<svelte:window on:click={handleAutoClose} />

<div
	bind:this={priorityContainer}
	class="{!isViewer
		? 'hover:bg-grey-200 hover:dark:bg-grey-700'
		: ''} rounded md:relative {changePriorityDropdown ? 'bg-grey-200 dark:bg-grey-700' : ''} max-w-fit col-start-4"
>
	<button
		on:click={() => {
			if (!isViewer) changePriorityDropdown = !changePriorityDropdown;
		}}
		class={isViewer ? 'cursor-default' : ''}
	>
		<span class="sr-only">Click to change the priority</span>
		{#if priority_level === 'high'}
			<div class="rounded-full bg-red-400 px-3 py-[0.125rem] dark:bg-red-600">
				<span class="sr-only">High priority</span>
				<span class="font-medium text-grey-100">High</span>
			</div>
		{:else if priority_level === 'med'}
			<div class="rounded-full bg-orange-400 px-3 py-[0.125rem] dark:bg-orange-600">
				<span class="sr-only">Medium priority</span>
				<span class="font-medium text-grey-100">Medium</span>
			</div>
		{:else if priority_level === 'low'}
			<div class="rounded-full bg-yellow-300 px-3 py-[0.125rem] dark:bg-yellow-500">
				<span class="sr-only">Low priority</span>
				<span class="font-medium text-grey-700">Low</span>
			</div>
		{:else if priority_level === 'none' || priority_level === null}
			<div class="rounded-full bg-emerald-400 px-3 py-[0.125rem] dark:bg-emerald-500">
				<span class="sr-only">No priority</span>
				<span class="font-medium text-grey-100">None</span>
			</div>
		{/if}
	</button>
	{#if changePriorityDropdown}
		<ChangePriority bind:priority_level bind:shown={changePriorityDropdown} {taskId} />
	{/if}
</div>
