<script lang="ts">
	import TeamMemberLink from '$lib/components/team/TeamMemberLink.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<header>
	<h1 class="text-lg md:text-2xl text-grey-800 dark:text-grey-100">Team Members</h1>
</header>

<div>
	{#each data.members as id}
		<TeamMemberLink {id} />
	{/each}
</div>
