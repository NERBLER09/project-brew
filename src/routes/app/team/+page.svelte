<script lang="ts">
	import UserAdd from '$lib/assets/User-Add.svelte';

	import TeamMemberLink from '$lib/components/team/TeamMemberLink.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<header>
	<h1 class="text-lg text-grey-800 dark:text-grey-100 md:text-2xl">Team Members</h1>
	<p class="pt-md font-medium text-grey-700 dark:text-grey-200 md:pt-sm">
		Tap on a member to view their details.
	</p>

	<a class="button--circle absolute bottom-32 right-8 z-50 md:hidden" href="/app/team/add">
		<UserAdd className="h-8 w-8 stroke-grey-200" />
		<span class="sr-only">Invite a new team member</span>
	</a>
</header>

<div class="mt-md flex w-full flex-col items-start gap-lg md:grid md:grid-cols-2 lg:grid-cols-4">
	{#each data.members as id}
		<TeamMemberLink {id} />
	{/each}
</div>
