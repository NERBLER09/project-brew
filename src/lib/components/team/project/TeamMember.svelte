<script lang="ts">
	import { invalidate } from '$app/navigation';

	import MoreHorizontal from '$lib/assets/More Horizontal.svelte';

	import User from '$lib/assets/User.svelte';
	import { currentProject } from '$lib/stores/project';

	import { supabase } from '$lib/supabase';
	import { onMount } from 'svelte';
	import TeamMemberDropdown from '../../dropdowns/team/TeamMemberDropdown.svelte';

	export let id: string | undefined;

	let name: string = '';
	let avatar_url: string | null = '';
	let email: string = '';

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
		let invitedUsers = $currentProject.invited_people;
		const index = invitedUsers.indexOf(id);
		invitedUsers = invitedUsers.splice(index, 1);
		const { error } = await supabase
			.from('projects')
			.update({ invited_people: invitedUsers })
			.eq('id', $currentProject.id);

		if (!error) {
			$currentProject.invited_people = $currentProject.invited_people.splice(index, 1);

			invalidate('app:project');
		} else {
			console.log(error);
		}
	};

	let memberDropdownContainer: HTMLElement;

	const handleAutoCloseDropdown = (event: Event) => {
		if (!memberDropdownContainer.contains(event.target)) {
			showTeamMemberDropdown = false;
		}
	};
</script>

<svelte:window on:click={handleAutoCloseDropdown} />

<div class="flex w-full items-center md:relative">
	<a href="/app/team/{id}" class="flex w-full items-start gap-md">
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
	<div bind:this={memberDropdownContainer}>
		<button on:click={() => (showTeamMemberDropdown = !showTeamMemberDropdown)} class="ml-auto">
			<MoreHorizontal className="h-8 w-8 stroke-grey-700 dark:stroke-grey-200" />
		</button>

		{#if showTeamMemberDropdown}
			<TeamMemberDropdown bind:visibility={showTeamMemberDropdown} {email} {removeUser} />
		{/if}
	</div>
</div>
