<script lang="ts">
	import { deserialize } from '$app/forms';
	import { goto } from '$app/navigation';
	import CloseMultiply from '$lib/assets/Close-Multiply.svelte';
	import Image from '$lib/assets/Image.svelte';
	import PlusNew from '$lib/assets/Plus-New.svelte';
	import NewTagsInput from '$lib/components/projects/edit/NewTagsInput.svelte';
	import type { ActionResult } from '@sveltejs/kit';

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

	let tags: string[] = [];
	let tagName = '';

	let files: any = '';
	let fileURL: string;

	const getFileURL = (file: any) => {
		if (!file) return;
		fileURL = URL.createObjectURL(file);
	};

	$: getFileURL(files[0]);

	let name = '';
	let description = '';

	export let form: ActionData;
	const handleSubmit = async (event) => {
		const data = new FormData(this);
		data.append('cover-url', files[0] ?? '');
		data.append('name', name);
		data.append('description', description);
		data.append('tags', tags.toString() ?? null);

		const response = await fetch('/app/projects?/new', {
			method: 'POST',
			body: data
		});

		const result: ActionResult = deserialize(await response.text());
		if (result.type === 'success') {
			goto('/app/projects');
		}
	};

	const resetImages = () => {
		fileURL = '';
		files = null;
	};
</script>

<dialog bind:this={dialog} class="bg-grey-100 dark:bg-grey-900 rounded-2xl p-8 w-2/3 h-1/2 xl:w-1/3 xl:h-2/3">
	<header class="flex items-center mb-md">
		<h2 class="font-semibold text-grey-800 dark:text-grey-200 text-lg">Create a new project</h2>
		<button on:click={() => (shown = false)} class="ml-auto">
			<CloseMultiply className="stroke-grey-700 dark:stroke-grey-200 w-12 h-12" />
		</button>
	</header>

	<form method="POST" on:submit|preventDefault={handleSubmit}> <section class="mt-sm">
			<header>
				<h2 class="font-bold text-grey-700 dark:text-grey-200 text-md mb-sm">Basic Details</h2>
			</header>
			<div class="flex gap-4 items-center mb-lg">
				<label for="name-input" class="input--label w-[22ch]">Enter a project name</label>
				<input
					id="name-input"
					name="name"
					type="text"
					class="input--text w-full"
					placeholder="Enter a project name"
					bind:value={name}
					required
				/>
			</div>
			<div class="flex flex-col gap-sm">
				<label for="description-input" class="input--label">Enter a description</label>
				<textarea
					name="description"
					id="description-input"
					class="input--text resize-none h-36"
					placeholder="Enter a brief description"
					bind:value={description}
				/>
			</div>
		</section>

		<section class="my-md">
			<header>
				<h2 class="font-bold text-grey-700 dark:text-grey-200 text-md mt-md">Tags</h2>
			</header>
			<div class="flex flex-wrap gap-md mb-md">
				<NewTagsInput bind:newTags={tags}/>
			</div>
		</section>
		<section class="mb-sm">
			<header>
				<h2 class="font-bold text-grey-700 dark:text-grey-200 text-md">Invite team members</h2>
			</header>
			<div>
				<button type="button">
					<PlusNew className="h-8 w-8 stroke-grey-700 dark:stroke-grey-200" />
					<span class="sr-only">Add new team member</span>
				</button>
			</div>
		</section>
		<section>
			<header>
				<h2 class="font-bold text-grey-700 dark:text-grey-200 text-md">Cover image</h2>
			</header>
			<div>
				<label
					class="flex justify-center w-full h-32 px-4 transition bg-grey-100 dark:bg-grey-800 border-2 border-grey-800 border-dashed rounded-md appearance-none cursor-pointer hover:border-grey-600 focus:outline-none"
				>
					<span class="flex flex-col justify-center items-center space-x-2">
						<Image className="h-8 w-8 stroke-grey-700 dark:stroke-grey-200" />
						<span class="font-medium text-grey-700 dark:text-grey-200">Drag and drop</span>
						<span class="font-medium text-grey-700 dark:text-grey-200">or</span>
						<span class="font-medium text-grey-700 dark:text-grey-200">select a cover image</span>
					</span>
					<input type="file" name="file_upload" class="hidden" accept=".png, .jpg" bind:files />
				</label>
			</div>

			{#if fileURL}
				<h3 class="text-md text-grey-700 dark:text-grey-200 font-semibold mt-md">Cover Preview</h3>
				<img src={fileURL} alt="cover" class="rounded-md object-cover bg-center max-h-52" />
				<button class="button--secondary mt-sm w-full" type="button" on:click={resetImages}
					>Clear cover</button
				>
			{/if}
		</section>
		<footer class="w-1/2 flex items-center justify-around mx-auto mt-xl">
			<button class="button--secondary" on:click={() => (shown = false)} type="button"
				>Cancel</button
			>
			<button class="button--primary" type="submit">Update</button>
		</footer>
	</form>
</dialog>
