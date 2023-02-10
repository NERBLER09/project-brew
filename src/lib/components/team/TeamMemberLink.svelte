<script lang="ts">
	import { invalidate } from '$app/navigation';

	import MoreHorizontal from '$lib/assets/More Horizontal.svelte';

	import User from '$lib/assets/User.svelte';
	import { userData } from '$lib/stores/user';

	import { supabase } from '$lib/supabase';
	import { onMount } from 'svelte';
	import TeamMemberDropdown from '../dropdowns/team/TeamMemberDropdown.svelte';

	export let id: string | undefined;

	let name: string;
	let avatar_url: string | null;
	let email: string;

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

	const removeUser = async () => {
		let { data: users } = await supabase
			.from('profiles')
			.select('*')
			.eq('id', $userData.id)
			.limit(1)
			.single();

		if (!users?.team_members) return;

		let currentUsers = users.team_members;
		const index = currentUsers.indexOf(id!)!;
		currentUsers.splice(index, 1)!;

		const { error } = await supabase
			.from('profiles')
			.update({ team_members: currentUsers })
			.eq('id', $userData.id);

		if (!error) {
			$userData.team_members = currentUsers;
			invalidate('app:team-members');
		} else {
			console.error(error);
		}
	};
</script>

{#if !name}
	<p class="font-bold text-grey-700 dark:text-grey-100">Loading team member details...</p>
{:else}
	<div class="flex w-full items-center md:relative">
		<a href="/app/team/{id}" class="flex items-start gap-md">
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
		</a>
		<button on:click={() => (showTeamMemberDropdown = !showTeamMemberDropdown)} class="ml-auto">
			<MoreHorizontal className="h-8 w-8 stroke-grey-700 dark:stroke-grey-200" />
		</button>
		{#if showTeamMemberDropdown}
			<TeamMemberDropdown bind:visibility={showTeamMemberDropdown} {email} {removeUser} />
		{/if}
	</div>
{/if}
