<script lang="ts">
	import { enhance } from '$app/forms';
	import toast from 'svelte-french-toast';
	import { goto } from '$app/navigation';
	import CloseMultiply from '$lib/assets/Close-Multiply.svelte';

	export let shown = false;
	let dialog: HTMLDialogElement;

	const handleModalStatus = (status: boolean) => {
		if (!dialog) return;
		if (status) {
			shown = true;
			dialog.showModal();
		} else {
			shown = false;
			dialog.close();
		}
	};

	$: handleModalStatus(shown);
</script>

<dialog
	bind:this={dialog}
	class="h-[18.75rem] w-full overflow-hidden rounded-2xl bg-grey-100 p-8 dark:bg-grey-900 md:h-[18.75rem] md:w-[25rem]"
	on:close={() => (shown = false)}
>
	<header class="mb-md flex items-center">
		<h2 class="text-lg font-semibold text-grey-800 dark:text-grey-200">Join a team</h2>

		<button on:click={() => (shown = false)} class="ml-auto">
			<CloseMultiply className="stroke-grey-700 dark:stroke-grey-200 w-12 h-12" />
		</button>
	</header>
	<p class="my-sm font-medium text-grey-700 dark:text-grey-200">
		Enter in the join code of the team you want to join. If don't have the invite code ask the team
		owner for it.
	</p>

	<form
		method="POST"
		action="/app/team/join?/join"
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

		<footer class="mt-lg flex w-full items-center justify-center gap-2xl">
			<button class="button--secondary" on:click={() => (shown = false)} type="button"
				>Cancel</button
			>
			<button class="button--primary" type="submit">Join</button>
		</footer>
	</form>
</dialog>
