<script lang="ts">
	import { invalidate } from '$app/navigation';

	import MoreHorizontal from '$lib/assets/More Horizontal.svelte';

	import User from '$lib/assets/User.svelte';
	import { currentTeam, userRole } from '$lib/stores/team';
	import { currentUsers, userData } from '$lib/stores/user';

	import { supabase } from '$lib/supabase';
	import { onMount } from 'svelte';
	import toast from 'svelte-french-toast';
	import TeamMemberDropdown from '../dropdowns/team/TeamMemberDropdown.svelte';

	export let id: string | undefined;

	let name: string;
	let avatar_url: string | null;
	let email: string;
	let status: 'online' | 'offline' = 'offline';

	let showTeamMemberDropdown = false;

	onMount(async () => {
		const { data: member, error } = await supabase
			.from('profiles')
			.select()
			.eq('id', id)
			.limit(1)
			.single();
		if (member) {
			name = member.name;
			email = member.email;
			avatar_url = member.avatar_url;
		}
	});

	$: if ($currentUsers) {
		for (const item of $currentUsers.users) {
			if (item.id === id) {
				status = 'online';
				break;
			} else {
				status = 'offline';
				break;
			}
		}
	}

	let memberDropdownContainer: HTMLElement;

	const handleAutoCloseDropdown = (event: Event) => {
		if (!memberDropdownContainer.contains(event.target)) {
			showTeamMemberDropdown = false;
		}
	};

	const handleRemoveUser = async () => {
		if (($currentUsers.id = id)) {
			toast.error("Can't remove team owner.");
			return;
		}
		if ($userRole === 'owner' || $userRole === 'admin') {
			const { error } = await supabase
				.from('team_members')
				.delete()
				.eq('team', $currentTeam.id)
				.eq('user_id', id)
				.neq('role', 'owner');

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

{#if !name}
	<p class="font-bold text-grey-700 dark:text-grey-100">Loading team member details...</p>
{:else}
	<div class="flex w-full items-center overflow-visible md:relative">
		<a href="/app/team/member/{id}" class="flex w-full items-start gap-md">
			{#if avatar_url}
				<img
					src={avatar_url}
					alt="User profile"
					class="aspect-square h-12 w-12 rounded-full object-cover"
				/>
			{:else}
				<User className="w-12 h-12 stroke-grey-700 dark:stroke-grey-200" />
			{/if}
			<div class="mr-md flex w-full flex-col items-start justify-start gap-sm">
				<div class="flex w-full max-w-[90%] items-center md:max-w-full">
					<p class="font-bold text-grey-700 dark:text-grey-100">{name}</p>
					<p class="ml-auto text-sm font-medium text-grey-700 dark:text-grey-100">
						{#if status === 'offline'}
							Offline
						{:else}
							Online
						{/if}
					</p>
				</div>
				<p class="max-w-[90%] break-words font-bold text-grey-700 dark:text-grey-100 md:max-w-full">
					{email}
				</p>
			</div>
		</a>

		<div bind:this={memberDropdownContainer}>
			<button on:click={() => (showTeamMemberDropdown = !showTeamMemberDropdown)} class="ml-auto">
				<MoreHorizontal className="h-8 w-8 stroke-grey-700 dark:stroke-grey-200" />
			</button>

			{#if showTeamMemberDropdown}
				<TeamMemberDropdown
					bind:visibility={showTeamMemberDropdown}
					{email}
					removeUser={handleRemoveUser}
				/>
			{/if}
		</div>
	</div>
{/if}
