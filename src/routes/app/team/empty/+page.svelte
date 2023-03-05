<script>
	import UserAdd from '$lib/assets/User-Add.svelte';
</script>

<div class="relative h-full">
	<section
		class="md:staticmd:justify-center absolute flex h-full flex-col items-center justify-center gap-md px-6 text-center"
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
			<button class="button--secondary w-full md:w-fit">Join Team</button>
			<button class="button--primary flex items-center justify-center gap-md">
				<UserAdd className="h-6 w-6 stroke-grey-200" />
				New Team
			</button>
		</div>
	</section>
</div>
