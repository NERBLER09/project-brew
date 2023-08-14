<script lang="ts">
	import Down from '$lib/assets/Arrow/Chevron/Down.svelte';
	import TransferTeam from '$lib/components/dropdowns/projects/TransferTeam.svelte';

	export let teamName: string;
	export let team: string | null | undefined;
	export let projectId: string;

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
	{#if team}
		<span>Part of</span>
		<button
			class="button--text m-0 flex items-center gap-sm p-0 md:relative"
			on:click={() => (showTransferTeamDropdown = !showTransferTeamDropdown)}
		>
			{teamName}
			<Down className="w-6 h-6 stroke-grey-700 dark:stroke-grey-200" />
			{#if showTransferTeamDropdown}
				<TransferTeam bind:visibility={showTransferTeamDropdown} {team} {projectId} />
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
				<TransferTeam bind:visibility={showTransferTeamDropdown} {projectId} {team} />
			{/if}
		</button>
	{/if}
</div>
