<script lang="ts">
	import { goto } from '$app/navigation';
	import User from '$lib/assets/User.svelte';
	import MobileSubPageLayout from '$lib/components/layouts/MobileSubPageLayout.svelte';
	import { supabase } from '$lib/supabase';
	import type { PageData } from './$types';

	export let data: PageData;

	const handleInviteNewUser = async (id: string) => {
		const teamMembers = [id, ...(data.team_members || [])];
		const { error } = await supabase
			.from('profiles')
			.update({ team_members: teamMembers })
			.eq('id', data.id);
		if (!error) {
			goto('/app/team');
		}
	};
</script>

<MobileSubPageLayout pageName="Add new team member" previousPage="/app/team">
	<p class="font-medium text-grey-700 dark:text-grey-100">
		Tap on a person to add them to your team.
	</p>
	<div class="mt-md flex w-full flex-col items-start gap-lg">
		{#each data.users as { avatar_url, name, id, email }}
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
</MobileSubPageLayout>
