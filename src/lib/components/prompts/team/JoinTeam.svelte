<script lang="ts">
	import CloseMultiply from '$lib/assets/Close-Multiply.svelte';
	import Image from '$lib/assets/Image.svelte';
	import { enhance } from '$app/forms';
	import toast from 'svelte-french-toast';

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
	class="relative h-1/2 w-2/3 rounded-2xl bg-grey-100 p-8 dark:bg-grey-900 xl:h-2/3 xl:w-1/3"
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

	<form method="POST">
		<input
			type="text"
			class="input--text w-full"
			placeholder="Enter the invite code"
			name="code"
			required
		/>

		<footer class="mx-auto mt-lg flex w-1/2 items-center justify-around">
			<button class="button--secondary" on:click={() => (shown = false)} type="button">Join</button>
			<button class="button--primary" type="submit">Create</button>
		</footer>
	</form>
</dialog>
