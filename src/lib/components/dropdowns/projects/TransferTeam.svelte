<script lang="ts">
	import Trash from '$lib/assets/Trash.svelte';
	import { currentProject } from '$lib/stores/project';
	import { userData } from '$lib/stores/user';
	import { supabase } from '$lib/supabase';
	import type { Teams } from '$lib/types/projects';
	import { onMount } from 'svelte';
	import toast from 'svelte-french-toast';

	export let visibility: boolean;

	let teams: Teams[] = [];

	onMount(async () => {
		const { data } = await supabase
			.from('teams')
			.select('*, team_members!inner(user_id)')
			.eq('team_members.user_id', $userData.id);
		teams = data ?? [];
	});

	const handleUpdateTeam = async (teamId: string) => {
		const { error } = await supabase
			.from('projects')
			.update({ team: teamId })
			.eq('id', $currentProject.id);

		if (!error) {
			$currentProject.team = teamId;
			toast.success('Transfered team');
			visibility = false;
		} else toast.error(`Failed to tranfer team: ${error.message}`);
	};

	const handleRemoveTeam = async () => {
		const { error } = await supabase
			.from('projects')
			.update({ team: null })
			.eq('id', $currentProject.id);

		if (!error) {
			$currentProject.team = null;
			toast.success('Removed from team');
			visibility = false;
		} else toast.error(`Failed to remove from team: ${error.message}`);
	};
</script>

<div
	class="absolute left-0 top-6 flex h-fit w-screen max-w-[calc(100vw-3rem)] flex-col gap-4 rounded-2xl bg-grey-100 px-6 py-lg text-start dark:bg-grey-800 md:w-96 md:p-md"
>
	<button class="dropdown--item" on:click={handleRemoveTeam}>
		<Trash className="dropdown--icon" />
		<span class="dropdown--label">Remove from this team</span>
	</button>

	{#each teams as team}
		<button on:click={() => handleUpdateTeam(team.id)} class="dropdown--item"
			><span class="dropdown--label">Move to {team.name}</span></button
		>
	{/each}
</div>
