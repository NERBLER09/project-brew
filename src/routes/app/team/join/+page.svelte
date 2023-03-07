<script>
	import UserAdd from '$lib/assets/User-Add.svelte';
	import MobileSubPageLayout from '$lib/components/layouts/MobileSubPageLayout.svelte';
</script>

<MobileSubPageLayout pageName="Join a Team" previousPage="/app/team">
	<p class="my-sm font-medium text-grey-700 dark:text-grey-200">
		Enter in the join code of the team you want to join. If don't have the invite code ask the team
		owner for it.
	</p>

	<form method="POST" class="mt-md">
		<input
			type="text"
			class="input--text w-full"
			placeholder="Enter the invite code"
			name="code"
			required
		/>
		<button class="button--circle absolute bottom-8 right-8" type="submit">
			<UserAdd className="h-8 w-8 stroke-grey-200" />
			<span class="sr-only">Join team</span>
		</button>
	</form>
</MobileSubPageLayout>
