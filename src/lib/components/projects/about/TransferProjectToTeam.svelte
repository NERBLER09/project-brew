<script lang="ts">
	import Down from '$lib/assets/Arrow/Chevron/Down.svelte';
	import TransferTeam from '$lib/components/dropdowns/projects/TransferTeam.svelte';
	import { currentProject } from '$lib/stores/project';

	export let teamName: string;

	let showTransferTeamDropdown = false;
	let transferDropdownContainer: HTMLElement;
	const handleAutoCloseDropdown = (event: Event) => {
		if (!transferDropdownContainer.contains(event.target)) showTransferTeamDropdown = false;
	};
</script>

<svelte:window on:click={handleAutoCloseDropdown} />

<div
	class="relative mt-md flex items-center gap-sm overflow-visible font-medium text-grey-700 dark:text-grey-200 md:static"
	bind:this={transferDropdownContainer}
>
	{#if $currentProject.team}
		<span>Part of</span>
		<button
			class="button--text m-0 flex items-center gap-sm p-0 md:relative"
			on:click={() => (showTransferTeamDropdown = !showTransferTeamDropdown)}
		>
			{teamName}
			<Down className="w-6 h-6 stroke-grey-700 dark:stroke-grey-200" />
			{#if showTransferTeamDropdown}
				<TransferTeam bind:visibility={showTransferTeamDropdown} />
			{/if}
		</button>
	{:else}
		<span>Transfer this project to a</span>
		<button
			class="button--text m-0 flex items-center gap-sm p-0 md:relative"
			on:click={() => (showTransferTeamDropdown = !showTransferTeamDropdown)}
		>
			team
			<Down className="w-6 h-6 stroke-grey-700 dark:stroke-grey-200" />
			{#if showTransferTeamDropdown}
				<TransferTeam bind:visibility={showTransferTeamDropdown} />
			{/if}
		</button>
	{/if}
</div>
