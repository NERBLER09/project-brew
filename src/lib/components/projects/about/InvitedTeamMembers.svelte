<script lang="ts">
	import TeamMember from '$lib/components/team/project/TeamMember.svelte';

	export let invited_people: string[] | null | undefined;
</script>

<section>
	<header>
		<h2 class="text-md font-semibold text-grey-700 dark:text-grey-200">Invited team members</h2>
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
