<script lang="ts">
	import Filter from '$lib/assets/Filter.svelte';
	import TeamMember from '$lib/components/team/project/TeamMember.svelte';
	import { currentProject } from '$lib/stores/project';
	import { showManageInvitedPrompt } from '$lib/stores/ui';

	export let invited_people: string[] | null | undefined;
</script>

<section class="mt-md">
	<header>
		<div class="flex items-center">
			<h2 class="text-md font-semibold text-grey-700 dark:text-grey-200">Invited team members</h2>
			<a href="/app/projects/{$currentProject.id}/about/team-management" class="ml-auto md:hidden">
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

	<div class="mt-md flex w-full flex-col items-start gap-lg md:grid md:grid-cols-2">
		{#each invited_people as id}
			<TeamMember {id} />
		{/each}
	</div>
</section>
