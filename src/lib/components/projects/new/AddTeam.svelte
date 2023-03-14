<script lang="ts">
	import Trash from '$lib/assets/Trash.svelte';
	import { userData } from '$lib/stores/user';
	import { supabase } from '$lib/supabase';
	import type { Teams } from '$lib/types/projects';
	import { onMount } from 'svelte';

	export let visibility: boolean;
	export let selectedTeam: string;

	let teams: Teams[] = [];

	onMount(async () => {
		const { data } = await supabase
			.from('teams')
			.select('*, team_members!inner(user_id)')
			.eq('team_members.user_id', $userData.id);
		teams = data ?? [];
	});

	const handleUpdateTeam = async (teamId: string) => {
		selectedTeam = teamId;
	};

	const handleRemoveTeam = async () => {
		selectedTeam = '';
	};
</script>

<div
	class="absolute left-0 top-6 flex h-fit w-screen max-w-[calc(100vw-3rem)] flex-col gap-4 rounded-2xl bg-grey-100 px-6 py-lg text-start dark:bg-grey-800 md:w-96 md:p-md"
>
	{#if selectedTeam}
		<button class="dropdown--item" on:click={handleRemoveTeam} type="button">
			<Trash className="dropdown--icon" />
			<span class="dropdown--label">Remove from this team</span>
		</button>
	{/if}

	{#each teams as team}
		<button on:click={() => handleUpdateTeam(team.id)} class="dropdown--item" type="button"
			><span class="dropdown--label">Add to {team.name}</span></button
		>
	{/each}
</div>
