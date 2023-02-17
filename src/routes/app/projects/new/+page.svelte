<script lang="ts">
	import { deserialize } from '$app/forms';
	import { goto } from '$app/navigation';
	import Check from '$lib/assets/Check.svelte';

	import Image from '$lib/assets/Image.svelte';
	import MobileSubPageLayout from '$lib/components/layouts/MobileSubPageLayout.svelte';
	import NewTagsInput from '$lib/components/projects/edit/NewTagsInput.svelte';
	import InviteTeamMember from '$lib/components/projects/new/InviteTeamMember.svelte';
	import { invitedTeamMembers } from '$lib/stores/user';
	import type { ActionResult } from '@sveltejs/kit';
	import type { ActionData } from '../$types';

	let tags: string[] = [];

	let files: any = '';
	let fileURL: string;

	const getFileURL = (file: any) => {
		if (!file) return;
		fileURL = URL.createObjectURL(file);
	};

	$: if (files) getFileURL(files[0]);

	let name = '';
	let description = '';
	let invitedMembers: string[];

	export let form: ActionData;
	const handleSubmit = async (event) => {
		const data = new FormData(this);
		data.append('cover-url', files[0] ?? '');
		data.append('name', name);
		data.append('description', description);
		data.append('tags', tags.toString() ?? null);
		data.append('invited', invitedMembers.toString());
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
	<p class="pt-sm pb-md font-medium text-grey-700 dark:text-grey-200">
		Chose what projects are displayed on top.
	</p>

	<form method="POST" on:submit|preventDefault={handleSubmit}>
		<section>
			<header>
				<h2 class="text-md font-bold text-grey-700 dark:text-grey-200">Basic Details</h2>
			</header>
			<div>
				<input
					name="name"
					type="text"
					class="input--text mb-4 w-full"
					placeholder="Enter a project name"
					bind:value={name}
					required
				/>
				<textarea
					name="description"
					class="input--text h-36 w-full resize-none"
					placeholder="Enter a brief description"
					bind:value={description}
				/>
			</div>
		</section>

		<section>
			<header>
				<h2 class="text-md font-bold text-grey-700 dark:text-grey-200">Tags</h2>
			</header>

			<div class="mb-md flex flex-wrap gap-md">
				<NewTagsInput bind:newTags={tags} />
			</div>
		</section>

		<InviteTeamMember allTeamMembers={$invitedTeamMembers} bind:invitedUserIds={invitedMembers} />

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
						<span class="font-medium text-grey-700 dark:text-grey-200">Select a cover image</span>
					</span>
					<input type="file" name="cover-image" class="hidden" accept=".png, .jpg" bind:files />
				</label>
			</div>

			{#if fileURL}
				<h3 class="mt-md text-md font-semibold text-grey-700 dark:text-grey-200">Cover Preview</h3>
				<img src={fileURL} alt="cover" class="max-h-52 rounded-md bg-center object-cover" />
				<button class="button--secondary mt-sm w-full" type="button" on:click={resetImages}
					>Clear cover</button
				>
			{/if}
		</section>
		<button class="button--circle absolute bottom-8 right-8" type="submit">
			<Check className="h-8 w-8 stroke-grey-200" />
			<span class="sr-only">Create project</span>
		</button>
	</form>
</MobileSubPageLayout>
