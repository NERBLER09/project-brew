<script lang="ts">
	import { invalidate } from '$app/navigation';

	import CloseMultiply from '$lib/assets/Close-Multiply.svelte';
	import User from '$lib/assets/User.svelte';
	import { userData } from '$lib/stores/user';
	import { supabase } from '$lib/supabase';
	import type { User } from '$lib/types/projects';
	import { onMount } from 'svelte';
	export let shown = false;

	let dialog: HTMLDialogElement;
	let users: User[] = [];

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

	const handleInviteNewUser = async (id: string) => {
		const teamMembers = [id, ...($userData.team_members || [])];
		const { error } = await supabase
			.from('profiles')
			.update({ team_members: teamMembers })
			.eq('id', $userData.id);
		if (!error) {
			shown = false;
			invalidate('app:team-members');
		}
		console.error(error);
	};

	onMount(async () => {
		const { data, error: err } = await supabase.from('profiles').select().neq('id', $userData.id);

		if (users) {
			users = data || [];
		}
	});
</script>

<dialog
	bind:this={dialog}
	class="h-1/2 w-2/3 rounded-2xl bg-grey-100 p-8 dark:bg-grey-900 xl:h-2/3 xl:w-1/3"
>
	<header class="mb-md">
		<div class="flex items-center">
			<h2 class="text-lg font-semibold text-grey-800 dark:text-grey-200">Create a new project</h2>
			<button on:click={() => (shown = false)} class="ml-auto">
				<CloseMultiply className="stroke-grey-700 dark:stroke-grey-200 w-12 h-12" />
			</button>
		</div>
		<p class="font-medium text-grey-700 dark:text-grey-100">
			Click on a person to add them to your team.
		</p>
	</header>

	<div class="mt-md flex w-full flex-col items-start gap-lg">
		{#each users as { avatar_url, name, id, email }}
			<button class="flex items-start gap-md" on:click={() => handleInviteNewUser(id)}>
				{#if avatar_url}
					<img
						src={avatar_url}
						alt="User profile"
						class="aspect-square h-12 w-12 rounded-full object-cover"
					/>
				{:else}
					<User className="w-12 h-12 stroke-grey-700 dark:stroke-grey-200" />
				{/if}
				<div class="flex flex-col items-start justify-start gap-sm">
					<p class="font-bold text-grey-700 dark:text-grey-100">{name}</p>
					<p class="font-bold text-grey-700 dark:text-grey-100">{email}</p>
				</div>
			</button>
		{/each}
	</div>
</dialog>
