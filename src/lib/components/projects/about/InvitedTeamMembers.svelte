<script lang="ts">
	import Filter from '$lib/assets/Filter.svelte';
	import TeamMember from '$lib/components/team/project/TeamMember.svelte';
	import { showManageInvitedPrompt } from '$lib/stores/ui';
	import type { ProjectMember } from '$lib/types/projects';

	export let invited_people: ProjectMember[];
	export let projectId: string;
</script>

<section class="mt-md w-full">
	<header>
		<div class="flex items-center">
			<h2 class="text-md font-semibold text-grey-700 dark:text-grey-200">Invited people</h2>
			<a href="/app/projects/{projectId}/about/team-management" class="ml-auto md:hidden">
				<Filter
					className="w-8 h-8 stroke-grey-700 dark:stroke-grey-200"
					parentBg="grey-100 dark:stroke-grey-900"
				/>
				<span class="sr-only">Manage invited team members</span>
			</a>
			<button class="ml-auto hidden md:inline" on:click={() => ($showManageInvitedPrompt = true)}>
				<Filter
					className="w-8 h-8 stroke-grey-700 dark:stroke-grey-200"
					parentBg="grey-100 dark:stroke-grey-900"
				/>
				<span class="sr-only">Manage invited team members</span>
			</button>
		</div>
		{#if invited_people?.length === 0}
			<p class="font-medium text-grey-700 dark:text-grey-200">
				It doesn't look like you have invited anyone from your team into this project.
			</p>
		{/if}
	</header>

	<div class="mt-md flex w-full flex-col items-start gap-lg">
		{#each invited_people as { user_id, id, role }}
			<TeamMember {user_id} dbId={id} {role} />
		{/each}
	</div>
</section>
