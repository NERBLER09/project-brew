<script lang="ts">
	import { invalidate } from '$app/navigation';
	import Down from '$lib/assets/Arrow/Chevron/Down.svelte';
	import User from '$lib/assets/User.svelte';
	import ChangeStatus from '$lib/components/dropdowns/team/ChangeStatus.svelte';
	import { currentProject } from '$lib/stores/project';
	import { supabase } from '$lib/supabase';
	import { onMount } from 'svelte';
	import toast from 'svelte-french-toast';
	import { userRole } from '$lib/stores/team';

	export let user_id: string;
	export let dbId: string;
	export let projectId: number;
	export let role: 'owner' | 'admin' | 'editor' | 'viewer';

	let name: string;
	let email: string;
	let avatar: string;
	let roleFormatted: string;

	let isOwner = $userRole === 'owner';

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
			.eq('id', user_id)
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
	let teamMemberDropdown: HTMLElement;

	const handleAutoCloseDropdown = (event: Event) => {
		if (!changeStatusContainer) return;
		if (!changeStatusContainer.contains(event.target)) {
			showChangeStatus = false;
		}
	};

	const handleUpdateStatus = async (event) => {
		const newRole = event.detail.role;
		showChangeStatus = false;

		if (isOwner) {
			await supabase
				.from('project_members')
				.update({ role: newRole })
				.eq('user_id', dbId)
				.eq('project', $currentProject.id);

			role = newRole;
			formateRole();
			invalidate('app:team');
		} else {
			toast.error('User is not the team owner or an admin.');
		}
	};
</script>

<svelte:window on:click={handleAutoCloseDropdown} />

<div class="w-full items-center md:flex">
	<div class="flex w-full gap-lg">
		{#if avatar}
			<img
				src={avatar}
				alt="{name} profile"
				class="aspect-square h-12 w-12 rounded-full object-cover"
			/>
		{:else}
			<User className="h-12 w-12 stroke-grey-700 dark:stroke-grey-200" />
		{/if}

		<div class="flex w-[calc(100%-4.875rem)] flex-col gap-sm">
			<div class="flex items-center gap-sm">
				<span class="truncate font-bold text-grey-700 dark:text-grey-200">{name}</span>

				{#if role === 'owner' || !isOwner}
					<li
						class="ml-md list-inside list-disc truncate text-sm font-medium text-grey-700 dark:text-grey-300 md:hidden md:text-base"
					>
						{roleFormatted}
					</li>
				{/if}
			</div>
			<span class="truncate font-medium text-grey-700 dark:text-grey-300">{email}</span>
		</div>
	</div>

	<div class="relative ml-auto mt-sm" bind:this={changeStatusContainer}>
		{#if isOwner && role !== 'owner'}
			<button
				on:click={() => (showChangeStatus = !showChangeStatus)}
				class="flex items-center justify-center gap-sm rounded bg-grey-200 px-3 py-2 font-bold dark:bg-grey-700 md:px-2 md:py-1"
			>
				<span class="font-bold text-grey-700 dark:text-grey-200">{roleFormatted}</span>
				<Down className="w-6 h-6 stroke-grey-700 dark:stroke-grey-300" />
				<span class="sr-only">Change team member status</span>
			</button>
			{#if showChangeStatus}
				<ChangeStatus on:update={handleUpdateStatus} />
			{/if}
		{:else if !isOwner || role === 'owner'}
			<span class="hidden font-medium text-grey-700 dark:text-grey-300 md:inline"
				>{roleFormatted}</span
			>
		{/if}
	</div>
</div>
