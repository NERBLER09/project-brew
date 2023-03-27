<script lang="ts">
	import { goto } from '$app/navigation';
	import CloseMultiply from '$lib/assets/Close-Multiply.svelte';
	import { currentProject } from '$lib/stores/project';
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
	class="h-1/2 w-2/3 rounded-2xl bg-grey-100 p-8 dark:bg-grey-900 xl:h-2/3 xl:w-1/3"
	on:close={() => (shown = false)}
>
	<header class="mb-md flex items-center">
		<h2 class="text-lg font-semibold text-grey-800 dark:text-grey-200">Create a new milestone</h2>
		<button on:click={() => (shown = false)} class="ml-auto">
			<CloseMultiply className="stroke-grey-700 dark:stroke-grey-200 w-12 h-12" />
		</button>
	</header>

	<form
		method="POST"
		class="mt-md"
		use:enhance={() => {
			return async ({ result }) => {
				if (result.type === 'failure') {
					toast.error(`Failed to create milestone: ${result.data.errMsg}`);
				} else if (result.type === 'success') {
					toast.success('Created new milestone');
					goto(`/app/projects/${$currentProject.id}/milestones/${result.data.milestone}`);
				}
			};
		}}
	>
		<input
			type="text"
			class="input--text w-full"
			placeholder="What should this milestone be called?"
			required
			name="name"
		/>

		<textarea
			name="description"
			class="input--text mt-md h-36 w-full resize-none"
			placeholder="Write something about this milestone"
		/>

		<div class="mt-md">
			<label for="start-date" class="input--label">Start date:</label>
			<input type="date" class="input--text" id="start-date" required name="start-date" />
		</div>
		<div class="mt-md">
			<label for="end-date" class="input--label">End date:</label>
			<input type="date" class="input--text" id="end-date" required name="end-date" />
		</div>

		<div class="mx-auto mt-xl flex w-1/2 items-center justify-around">
			<button class="button--secondary" on:click={() => (shown = false)} type="button"
				>Cancel</button
			>
			<button class="button--primary" type="submit">Create</button>
		</div>
	</form>
</dialog>
