<script lang="ts">
	import { deserialize } from '$app/forms';
	import { goto } from '$app/navigation';
	import Check from '$lib/assets/Check.svelte';
	import CloseMultiply from '$lib/assets/Close-Multiply.svelte';

	import Image from '$lib/assets/Image.svelte';
	import PlusNew from '$lib/assets/Plus-New.svelte';
	import MobileSubPageLayout from '$lib/components/layouts/MobileSubPageLayout.svelte';
	import type { ActionResult } from '@sveltejs/kit';
	import type { ActionData } from '../$types';

	let addNewTag = false;
	let tags: string[] = [];
	let tagName = '';

	const handleCreateNewTag = () => {
		tags = [...tags, tagName];
		tagName = '';
		addNewTag = false;
	};

	let files: any = '';
	let fileURL: string;

	const getFileURL = (file: any) => {
		if (!file) return;
		fileURL = URL.createObjectURL(file);
	};

	$: if (files) getFileURL(files[0]);

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

<svelte:head>
	<title>New Project</title>
</svelte:head>

<MobileSubPageLayout pageName="New Project" previousPage="/app/projects">
	<p class="font-medium text-grey-700 pt-sm pb-md">Chose what projects are displayed on top.</p>

	<form method="POST" on:submit|preventDefault={handleSubmit}>
		<section>
			<header>
				<h2 class="font-bold text-grey-700 text-md">Basic Details</h2>
			</header>
			<div>
				<input
					name="name"
					type="text"
					class="input--text w-full mb-4"
					placeholder="Enter a project name"
					bind:value={name}
					required
				/>
				<textarea
					name="description"
					class="input--text resize-none h-36 w-full"
					placeholder="Enter a brief description"
					bind:value={description}
				/>
			</div>
		</section>

		<section>
			<header>
				<h2 class="font-bold text-grey-700 text-md">Tags</h2>
			</header>

			<div class="flex flex-wrap gap-md mb-md">
				{#each tags as tag}
					<div class="bg-grey-200 py-1 px-2 w-fit rounded">
						<span class="text-grey-700 text-sm font-medium">{tag}</span>
					</div>
				{/each}
				{#if addNewTag}
					<form on:submit={handleCreateNewTag} class="flex items-center gap-sm ml-auto">
						<input
							type="text"
							class="input--text w-36"
							placeholder="Tag name"
							bind:value={tagName}
						/>
						<button type="submit">
							<PlusNew className="h-8 w-8 stroke-grey-700" />
							<span class="sr-only">Add new tag</span>
						</button>
						<button type="button" class="ml-sm" on:click={() => (addNewTag = false)}>
							<CloseMultiply className="h-8 w-8 stroke-grey-700" />
							<span class="sr-only">Cancel</span>
						</button>
					</form>
				{:else}
					<button type="button" on:click={() => (addNewTag = true)} class="ml-auto">
						<PlusNew className="h-8 w-8 stroke-grey-700" />
						<span class="sr-only">Add new tag</span>
					</button>
				{/if}
			</div>
		</section>
		<section>
			<header>
				<h2 class="font-bold text-grey-700 text-md">Invite team members</h2>
			</header>
			<div>
				<button type="button">
					<PlusNew className="h-8 w-8 stroke-grey-700" />
					<span class="sr-only">Add new team member</span>
				</button>
			</div>
		</section>
		<section>
			<header>
				<h2 class="font-bold text-grey-700 text-md">Cover image</h2>
			</header>
			<div class="max-w-xl">
				<label
					class="flex justify-center w-full h-32 px-4 transition bg-white border-2 border-grey-800 border-dashed rounded-md appearance-none cursor-pointer hover:border-grey-600 focus:outline-none"
				>
					<span class="flex flex-col justify-center items-center space-x-2">
						<Image className="h-8 w-8 stroke-grey-700" />
						<span class="font-medium text-grey-700">Select a cover image</span>
					</span>
					<input type="file" name="cover-image" class="hidden" accept=".png, .jpg" bind:files />
				</label>
			</div>

			{#if fileURL}
				<h3 class="text-md text-grey-700 font-semibold mt-md">Cover Preview</h3>
				<img src={fileURL} alt="cover" class="rounded-md object-cover bg-center max-h-52" />
				<button class="button--secondary mt-sm w-full" type="button" on:click={resetImages}
					>Clear cover</button
				>
			{/if}
		</section>
		<button class="button--circle bottom-8 right-8 absolute" type="submit">
			<Check className="h-8 w-8 stroke-grey-200" />
			<span class="sr-only">Update pinned projects</span>
		</button>
	</form>
</MobileSubPageLayout>
