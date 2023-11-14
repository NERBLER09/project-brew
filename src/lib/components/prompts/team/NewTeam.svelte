<script lang="ts">
	import CloseMultiply from '$lib/assets/Close-Multiply.svelte';
	import Image from '$lib/assets/Image.svelte';
	import { enhance } from '$app/forms';
	import toast from 'svelte-french-toast';
	import { goto } from '$app/navigation';
	import FileInput from '$lib/components/form/FileInput.svelte';

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

	let files: any = '';
	let fileURL: string;
	let fileInput: HTMLInputElement;

	const getFileURL = (file: any) => {
		if (!file) return;
		fileURL = URL.createObjectURL(file);
	};

	const resetImages = () => {
		fileURL = '';
		files = null;
		fileInput.value = '';
	};

	$: if (files) getFileURL(files[0]);
</script>

<dialog
	bind:this={dialog}
	class="h-1/2 w-2/3 rounded-2xl bg-grey-100 p-8 dark:bg-grey-900 xl:h-2/3 xl:w-1/3"
	on:close={() => (shown = false)}
>
	<header class="mb-md flex items-center">
		<h2 class="text-lg font-semibold text-grey-800 dark:text-grey-200">Create a new team</h2>

		<button on:click={() => (shown = false)} class="ml-auto">
			<CloseMultiply className="stroke-grey-700 dark:stroke-grey-200 w-12 h-12" />
		</button>
	</header>

	<form
		method="POST"
		action="/app/team/create?/new"
		use:enhance={() => {
			return async ({ result }) => {
				if (result.type === 'failure') {
					toast.error(result?.data.message);
				} else if (result.type === 'success') {
					toast.success('Created new project');
					goto(`/app/team/${result.data.team_id}`);
				}
			};
		}}
	>
		<label for="name-input" class="input--label">What should this team be called</label>
		<input
			type="text"
			class="input--text mb-md mt-md w-full"
			placeholder="What should this team be called"
			name="name"
			id="name-input"
		/>

		<label for="name-input" class="input--label mb-md">What should this team be called</label>
		<textarea
			name="description"
			class="input--text mt-md h-36 w-full resize-none"
			placeholder="Enter a brief description"
		/>

		<section>
			<header>
				<h2 class="my-md font-bold text-grey-700 dark:text-grey-200">Cover image</h2>
			</header>

			<p class="font-semibold text-grey-700 dark:text-grey-300">
				Spice up your team by setting a team banner
			</p>

			<FileInput
				bind:bannerURL={fileURL}
				postRemoveBannnerHandle={() => {}}
				bind:newBanner={files}
			/>
		</section>

		<footer class="mx-auto mt-xl flex w-1/2 items-center justify-around">
			<button class="button--secondary" on:click={() => (shown = false)} type="button"
				>Cancel</button
			>
			<button class="button--primary" type="submit">Create</button>
		</footer>
	</form>
</dialog>
