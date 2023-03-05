<script lang="ts">
	import CloseMultiply from '$lib/assets/Close-Multiply.svelte';
	import Image from '$lib/assets/Image.svelte';

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

	const getFileURL = (file: any) => {
		if (!file) return;
		fileURL = URL.createObjectURL(file);
	};

	const resetImages = () => {
		fileURL = '';
		files = null;
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

	<form method="POST">
		<input
			type="text"
			class="input--text mb-md w-full"
			placeholder="What should this team be called"
			name="name"
		/>
		<textarea
			name="description"
			class="input--text h-36 w-full resize-none"
			placeholder="Enter a brief description"
		/>

		<section>
			<header>
				<h2 class="text-md font-bold text-grey-700 dark:text-grey-200">Cover image</h2>
			</header>
			<div class="max-w-xl">
				<label
					class="flex h-32 w-full cursor-pointer appearance-none justify-center rounded-md border-2 border-dashed border-grey-800 bg-grey-100 px-4 transition hover:border-grey-600 focus:outline-none dark:bg-grey-800"
				>
					<span class="flex flex-col items-center justify-center space-x-2">
						<Image className="h-8 w-8 stroke-grey-700 dark:stroke-grey-200" />
						<span class="font-medium text-grey-700 dark:text-grey-200">Drag and drop</span>
						<span class="font-medium text-grey-700 dark:text-grey-200">or</span>
						<span class="font-medium text-grey-700 dark:text-grey-200">select a cover image</span>
					</span>
					<input type="file" name="cover" class="hidden" accept=".png, .jpg" bind:files />
				</label>
			</div>

			{#if fileURL}
				<h3 class="mt-md text-md font-semibold text-grey-700 dark:text-grey-200">Cover Preview</h3>
				<img src={fileURL} alt="cover" class="max-h-52 w-full rounded-md bg-center object-cover" />
				<button class="button--secondary mt-sm w-full" type="button" on:click={resetImages}
					>Clear cover</button
				>
			{/if}
		</section>

		<footer class="mx-auto mt-xl flex w-1/2 items-center justify-around">
			<button class="button--secondary" on:click={() => (shown = false)} type="button"
				>Cancel</button
			>
			<button class="button--primary" type="submit">Create</button>
		</footer>
	</form>
</dialog>
