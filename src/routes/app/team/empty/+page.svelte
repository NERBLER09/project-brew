<script>
	import UserAdd from '$lib/assets/User-Add.svelte';
	import JoinTeam from '$lib/components/prompts/team/JoinTeam.svelte';
	import NewTeam from '$lib/components/prompts/team/NewTeam.svelte';

	let showJoinTeamPrompt = false;
	let showNewTeamPrompt = false;
</script>

<div class="relative h-full w-full">
	<section
		class="md:staticmd:justify-center absolute flex h-full w-full flex-col items-center justify-center gap-md px-6 text-center"
	>
		<header>
			<h1 class="text-lg font-semibold text-grey-800 dark:text-grey-100">No Teams</h1>

			<p class="font-medium text-grey-700 dark:text-grey-200">
				It doesn't look like you are apart of any teams.
			</p>
		</header>

		<p class="font-medium text-grey-700 dark:text-grey-200">
			You can create a new team by clicking the "New Team" button
		</p>
		<p class="font-bold text-grey-700 dark:text-grey-200">or</p>
		<p class="font-medium text-grey-700 dark:text-grey-200">
			You can join an existing team by clicking the "Join Team" button and entering the invite code.
		</p>

		<div class="flex flex-col gap-md md:flex-row md:gap-xl">
			<!-- Mobile -->
			<a href="/app/team/join" class="button--secondary w-full md:hidden md:w-fit">Join Team</a>
			<a
				href="/app/team/create"
				class="button--primary flex items-center justify-center gap-md md:hidden"
			>
				<UserAdd className="h-6 w-6 stroke-grey-200" />
				New Team
			</a>
			<!-- Desktop -->
			<button
				on:click={() => (showJoinTeamPrompt = true)}
				class="button--secondary hidden w-full md:inline md:w-fit">Join Team</button
			>
			<button
				on:click={() => (showNewTeamPrompt = true)}
				class="button--primary hidden items-center justify-center gap-md md:flex"
			>
				<UserAdd className="h-6 w-6 stroke-grey-200" />
				New Team
			</button>
		</div>
	</section>
</div>

<NewTeam bind:shown={showNewTeamPrompt} />
<JoinTeam bind:shown={showJoinTeamPrompt} />
