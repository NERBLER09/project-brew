<script>
	import UserAdd from '$lib/assets/User-Add.svelte';
	import MobileSubPageLayout from '$lib/components/layouts/MobileSubPageLayout.svelte';
	import { enhance } from '$app/forms';
	import toast from 'svelte-french-toast';
	import { goto } from '$app/navigation';
</script>

<MobileSubPageLayout pageName="Join a Team" previousPage="/app/team">
	<p class="my-sm font-medium text-grey-700 dark:text-grey-200">
		Enter in the join code of the team you want to join. If don't have the invite code ask the team
		owner for it.
	</p>

	<form
		method="POST"
		class="mt-md"
		action="?/join"
		use:enhance={() => {
			return async ({ result }) => {
				if (result.type === 'failure') {
					toast.error(result?.data.message);
				} else if (result.type === 'success') {
					toast.success('Joined team');
					goto(`/app/team/${result?.data.team}`);
				}
			};
		}}
	>
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
