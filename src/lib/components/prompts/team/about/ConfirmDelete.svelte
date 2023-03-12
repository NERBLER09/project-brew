<script lang="ts">
	import CloseMultiply from '$lib/assets/Close-Multiply.svelte';
	import { userData } from '$lib/stores/user';
	import { supabase } from '$lib/supabase';
	import camelCase from 'lodash';
	import toast from 'svelte-french-toast';

	import { goto } from '$app/navigation';
	import { currentProject } from '$lib/stores/project';
	import { currentTeam, userRole } from '$lib/stores/team';

	export let shown = false;
	let dialog: HTMLDialogElement;

	const handleModalStatus = (status: boolean) => {
		if (!dialog) return;
		if (status) {
			shown = true;
			dialog.showModal();
		} else {
			shown = false;
			dialog.close();
		}
	};

	$: handleModalStatus(shown);

	const handleTeamDelete = async () => {
		if ($userRole !== 'owner') {
			toast.error("Can't delete team. User is not the owner");
			return;
		}

		await supabase.from('projects').update({ team: null }).eq('team', $currentTeam.id);
		await supabase.from('team_members').delete().eq('team', $currentTeam.id);
		await supabase.storage.from('teams').remove([`${$userData.id}/${$currentTeam.name}`]);
		const { error } = await supabase.from('teams').delete().eq('id', $currentTeam.id);

		if (!error) {
			toast.success('Deleted team');
			goto('/app/team');
		} else {
			toast.error(`Failed to delete team: ${error.message}`);
		}
		shown = false;
	};
</script>

<dialog
	bind:this={dialog}
	class="h-fit w-full overflow-hidden rounded-2xl bg-grey-100 p-8 dark:bg-grey-900 md:h-fit md:w-[25rem]"
>
	<header class="flex items-center">
		<h2 class="text-lg font-semibold text-grey-800 dark:text-grey-200">Confirm Delete</h2>
		<button on:click={() => (shown = false)} class="ml-auto">
			<CloseMultiply className="stroke-grey-700 dark:stroke-grey-200 w-12 h-12" />
		</button>
	</header>
	<p class="pt-sm font-medium text-grey-700 dark:text-grey-200">
		Are you sure you want to delete {$currentTeam.name}. This will remove everyone's access to this
		team and the team projects. Only the creators of projects will be able to access them.
	</p>
	<p class="pt-sm font-medium text-red-500 dark:text-red-400">
		This action is <span class="font-bold">irreversible</span>.
	</p>
	<div class="mt-md flex flex-col gap-md md:flex-row">
		<button class="button--secondary w-full" on:click={() => (shown = false)}>Cancel</button>
		<button class="button--primary w-full" on:click={handleTeamDelete}>Delete</button>
	</div>
</dialog>
