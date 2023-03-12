<script lang="ts">
	import { invalidate } from '$app/navigation';
	import Down from '$lib/assets/Arrow/Chevron/Down.svelte';
	import MoreHorizontal from '$lib/assets/More Horizontal.svelte';
	import UserRemove from '$lib/assets/User-Remove.svelte';
	import ChangeStatus from '$lib/components/dropdowns/team/ChangeStatus.svelte';
	import { currentTeam, userRole } from '$lib/stores/team';
	import { supabase } from '$lib/supabase';
	import { onMount } from 'svelte';
	import toast from 'svelte-french-toast';

	export let id: string;
	export let role: 'owner' | 'admin' | 'editor' | 'viewer';

	let name: string;
	let email: string;
	let avatar: string;
	let roleFormatted: string;

	const formateRole = () => {
		switch (role) {
			case 'owner':
				roleFormatted = 'Owner';
				break;
			case 'admin':
				roleFormatted = 'Admin';
				break;
			case 'editor':
				roleFormatted = 'Editor';
				break;
			case 'viewer':
				roleFormatted = 'Viewer';
				break;
		}
	};

	onMount(async () => {
		const { data: profile, error } = await supabase
			.from('profiles')
			.select()
			.eq('id', id)
			.limit(1)
			.single();

		if (profile) {
			name = profile.name;
			email = profile.email;
			avatar = profile.avatar_url ?? '';
		}

		formateRole();
	});

	let showChangeStatus = false;

	let changeStatusContainer: HTMLElement;
	const handleAutoCloseDropdown = (event: Event) => {
		if (!changeStatusContainer) return;
		if (!changeStatusContainer.contains(event.target)) {
			showChangeStatus = false;
		}
	};

	const handleUpdateStatus = async (event) => {
		const newRole = event.detail.role;
		showChangeStatus = false;

		console.log($userRole);

		if ($userRole === 'owner' || $userRole === 'admin') {
			await supabase
				.from('team_members')
				.update({ role: newRole })
				.eq('user_id', id)
				.eq('team', $currentTeam.id);

			role = newRole;
			formateRole();
			invalidate('app:team');
		} else {
			toast.error('User is not the team owner or an admin.');
		}
	};

	const handleRemoveUser = async () => {
		if ($userRole === 'owner' || $userRole === 'admin') {
			const { error } = await supabase
				.from('team_members')
				.delete()
				.eq('team', $currentTeam.id)
				.eq('user_id', id);

			if (error) {
				toast.error(`Failed to remove ${name}`);
			} else {
				toast.success(`Removed ${name}`);
				invalidate('app:team');
			}
		} else {
			toast.error('User is not the team owner or an admin.');
		}
	};
</script>

<svelte:window on:click={handleAutoCloseDropdown} />

<div class="w-full">
	<div class="flex gap-lg">
		<img
			src={avatar}
			alt="{name} profile"
			class="aspect-square h-12 w-12 rounded-full object-cover"
		/>
		<div class="flex flex-col gap-sm">
			<span class="font-bold text-grey-700 dark:text-grey-200">{name}</span>
			<span class="font-medium text-grey-700 dark:text-grey-300">{email}</span>
		</div>
	</div>

	{#if role !== 'owner'}
		<div class="mt-sm flex items-center">
			<div class="relative" bind:this={changeStatusContainer}>
				<button
					on:click={() => (showChangeStatus = !showChangeStatus)}
					class="flex items-center gap-sm rounded bg-grey-200 px-3 py-2 font-bold dark:bg-grey-700"
				>
					<span class="font-bold text-grey-700 dark:text-grey-200">{roleFormatted}</span>
					<Down className="w-6 h-6 stroke-grey-700 dark:stroke-grey-300" />
					<span class="sr-only">Change team member status</span>
				</button>
				{#if showChangeStatus}
					<ChangeStatus on:update={handleUpdateStatus} />
				{/if}
			</div>
			<div class="ml-auto flex gap-md">
				<button on:click={handleRemoveUser}>
					<UserRemove className="w-8 h-8 stroke-grey-700 dark:stroke-grey-300" />
				</button>
				<MoreHorizontal className="w-8 h-8 stroke-grey-700 dark:stroke-grey-300" />
			</div>
		</div>
	{/if}
</div>
