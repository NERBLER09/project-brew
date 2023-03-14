<script lang="ts">
	import { goto } from '$app/navigation';
	import UserAdd from '$lib/assets/User-Add.svelte';
	import JoinCreateTeam from '$lib/components/dropdowns/team/JoinCreateTeam.svelte';
	import JoinTeam from '$lib/components/prompts/team/JoinTeam.svelte';
	import NewTeam from '$lib/components/prompts/team/NewTeam.svelte';
	import TeamCard from '$lib/components/team/TeamCard.svelte';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	let showInvitePrompt = false;
	let showJoinPrompt = false;

	let mobileAddContainer: HTMLElement;
	let showAddTeamDropdown = false;
	const handleAutoCloseDropdown = (event: Event) => {
		if (!mobileAddContainer.contains(event.target)) {
			showAddTeamDropdown = false;
		}
	};

	onMount(() => {
		if (data.teams.length === 0 || !data.teams) {
			goto('/app/team/empty');
		}
	});
</script>

<svelte:head>
	<title>Project Brew - Teams</title>
</svelte:head>

<svelte:window on:click={handleAutoCloseDropdown} />

<header>
	<div class="flex items-center">
		<h1 class="text-lg text-grey-800 dark:text-grey-100 md:text-2xl">Team</h1>
		<div class="ml-auto hidden gap-md md:flex">
			<button class="button--secondary" on:click={() => (showJoinPrompt = true)}>Join Team</button>
			<button
				class="button--primary hidden items-center gap-md md:flex"
				on:click={() => (showInvitePrompt = true)}
			>
				<UserAdd className="h-6 w-6 stroke-grey-200" />
				<span>New Team</span>
			</button>
		</div>
	</div>

	<p class="pt-md font-medium text-grey-700 dark:text-grey-200 md:pt-sm">
		Select a team to view it.
	</p>

	<div bind:this={mobileAddContainer}>
		<button
			class="button--circle absolute bottom-32 right-8 z-10 md:hidden"
			on:click={() => (showAddTeamDropdown = true)}
		>
			<UserAdd className="h-8 w-8 stroke-grey-200" />
			<span class="sr-only">Invite a new team member</span>
		</button>
		{#if showAddTeamDropdown}
			<JoinCreateTeam />
		{/if}
	</div>
</header>

<div class="mt-md flex flex-col gap-lg lg:grid lg:grid-cols-2 xl:grid-cols-3">
	{#each data.teams as team}
		<TeamCard {...team} />
	{/each}
</div>

<NewTeam bind:shown={showInvitePrompt} />
<JoinTeam bind:shown={showJoinPrompt} />
