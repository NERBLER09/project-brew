<script lang="ts">
	import { invalidate } from '$app/navigation';
	import Check from '$lib/assets/Check.svelte';
	import Trash from '$lib/assets/Trash.svelte';
	import { userTeams } from '$lib/stores/project';
	import { supabase } from '$lib/supabase';
	import toast from 'svelte-french-toast';

	export let visibility: boolean;
	export let team: string | null | undefined;
	export let projectId: string;

	let teams = $userTeams;

	const handleUpdateTeam = async (teamId: string) => {
		const { error } = await supabase.from('projects').update({ team: teamId }).eq('id', projectId);

		if (!error) {
			invalidate('project:about');
			team = teamId;
			toast.success('Transferred team');
			visibility = false;
		} else toast.error(`Failed to tranfer team: ${error.message}`);
	};

	const handleRemoveTeam = async () => {
		const { error } = await supabase.from('projects').update({ team: null }).eq('id', projectId);

		if (!error) {
			team = null;
			invalidate('project:about');
			toast.success('Removed from team');
			visibility = false;
		} else toast.error(`Failed to remove from team: ${error.message}`);
	};
</script>

<div
	class="absolute left-0 top-6 z-50 flex h-fit w-screen max-w-[calc(100vw-3rem)] flex-col gap-4 rounded-2xl bg-grey-100 px-6 py-lg text-start dark:bg-grey-800 md:w-96 md:p-md"
>
	{#if team}
		<button class="dropdown--item" on:click={handleRemoveTeam}>
			<Trash className="dropdown--icon" />
			<span class="dropdown--label">Remove from this team</span>
		</button>
	{/if}

	{#each teams as { id, name }}
		<button on:click={() => handleUpdateTeam(id)} class="dropdown--item">
			{#if team === id}
				<Check className="dropdown--icon" />
			{/if}
			<span class="dropdown--label">{name}</span>

		</button>
	{/each}
</div>
