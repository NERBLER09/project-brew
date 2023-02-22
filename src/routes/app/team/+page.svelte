<script lang="ts">
	import UserAdd from '$lib/assets/User-Add.svelte';
	import InviteMember from '$lib/components/prompts/team/InviteMember.svelte';

	import TeamMemberLink from '$lib/components/team/TeamMemberLink.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	let showInvitePrompt = false;
</script>

<header>
	<div class="flex items-center">
		<h1 class="text-lg text-grey-800 dark:text-grey-100 md:text-2xl">Team Members</h1>
		<button
			class="button--primary ml-auto hidden items-center gap-md md:flex"
			on:click={() => (showInvitePrompt = true)}
		>
			<UserAdd className="h-8 w-8 stroke-grey-200" />
			<span>Invite</span>
		</button>
	</div>
	<p class="pt-md font-medium text-grey-700 dark:text-grey-200 md:pt-sm">
		Tap on a member to view their details.
	</p>

	<a class="button--circle absolute bottom-32 right-8 z-50 md:hidden" href="/app/team/add">
		<UserAdd className="h-8 w-8 stroke-grey-200" />
		<span class="sr-only">Invite a new team member</span>
	</a>
</header>

<div class="mt-md flex w-full flex-col items-start gap-lg lg:grid lg:grid-cols-2 xl:grid-cols-4">
	{#each data.members as id}
		<TeamMemberLink {id} />
	{:else}
		<p class="font-medium text-grey-700 dark:text-grey-200">
			People you have added to your team will appear here. To add a person click on the "invite"
			button.
		</p>
	{/each}
</div>
<InviteMember bind:shown={showInvitePrompt} />
