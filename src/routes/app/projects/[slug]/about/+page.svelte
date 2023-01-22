<script lang="ts">
	import Back from '$lib/assets/Arrow/Back.svelte';
	import Check from '$lib/assets/Check.svelte';
	import Edit from '$lib/assets/Edit.svelte';
	import Image from '$lib/assets/Image.svelte';
	import Trash from '$lib/assets/Trash.svelte';
	import NewTagsInput from '$lib/components/projects/edit/NewTagsInput.svelte';
	import Description from '$lib/components/text/Description.svelte';
	import { currentProject } from '$lib/stores/project';
	import { showMobileNav } from '$lib/stores/ui';
	import { supabase } from '$lib/supabase';
	import { camelCase } from 'lodash';
	import { onDestroy, onMount } from 'svelte';

	let inEditMode = false;
	let newProjectName = $currentProject.name;
	let newProjectDescription = $currentProject.description;
	let newProjectTags: any[] = $currentProject?.tags;
	let newCoverURL = $currentProject.banner;
	let newCoverFile: FileList | null;

	let coverInputElement: HTMLInputElement;

	onMount(() => {
		$showMobileNav = false;
	});

	onDestroy(() => {
		$showMobileNav = true;
	});

	const uploadNewCover = async (coverList: FileList | null) => {
		if (!coverList) return '';
		let cover = coverList[0];

		const ccName = camelCase(newProjectName);
		const { data: user } = await supabase.auth.getUser();

		const { error: coverErr } = await supabase.storage
			.from('project-covers')
			.update(`${user.user?.id}/${ccName}.png`, cover, {
				cacheControl: '3600',
				upsert: false
			});
		console.log(coverErr)

		const { data: url } = supabase.storage
			.from('project-covers')
			.getPublicUrl(`${user.user?.id}/${ccName}.png`);

		return url.publicUrl;
	};

	const handleUpdateProject = async () => {
		let updatedCoverURL = newCoverURL || (await uploadNewCover(newCoverFile));
		inEditMode = false;
		const { data, error } = await supabase
			.from('projects')
			.update({
				project_name: newProjectName,
				description: newProjectDescription,
				tags: newProjectTags,
				banner: updatedCoverURL
			})
			.eq('id', $currentProject.id)
			.select();

		console.error(error);

		if (data) {
			$currentProject = data[0];
			$currentProject.tags = JSON.parse(data[0]?.tags) || [];
			$currentProject.name = data[0]?.project_name;
		}
	};

	const handleRemoveCover = () => {
		newCoverURL = null;
		newCoverFile = null;
	};

	const getFileURL = (file: any) => {
		if (!file) return;
		newCoverURL = URL.createObjectURL(file);
	};

	$: if (newCoverFile) getFileURL(newCoverFile[0]);

	$: if (!inEditMode) {
		newProjectName = $currentProject.name;
		newProjectDescription = $currentProject.description;
		newProjectTags = $currentProject?.tags;
		newCoverURL = $currentProject.banner;
		newCoverFile = null;
	}
</script>

<svelte:head>
	<title>About {$currentProject.name}</title>
</svelte:head>

<section>
	<header
		class="relative -top-6 -left-6 w-[calc(100%+48px)] p-4 flex items-end object-cover rounded-b-3xl bg-cover bg-center {!newCoverURL
			? 'w-fit static'
			: 'h-[12.5rem]'}"
		style="background-image: url({!inEditMode ? $currentProject.banner : newCoverURL});"
	>
		{#if !inEditMode}
			<a class="flex items-center gap-md" href="/app/projects/{$currentProject.id}">
				<Back
					className="w-8 h-8 aspect-square {$currentProject.banner
						? 'stroke-grey-200'
						: 'stroke-grey-700'}"
				/>
				<h1
					class="w-fit text-lg {$currentProject.banner
						? 'text-grey-200'
						: 'text-grey-700'} truncate"
				>
					{$currentProject?.name}
				</h1>
			</a>
		{:else}
			<h1
				class="w-fit text-lg {newCoverURL ? 'text-grey-200' : 'text-grey-700'} truncate"
				contenteditable="true"
				bind:textContent={newProjectName}
			>
				{$currentProject?.name}
			</h1>
		{/if}

		{#if inEditMode}
			<button class="ml-auto mb-auto z-50" on:click={() => (inEditMode = false)}>
				<Trash className="h-8 w-8 {newCoverURL ? 'stroke-grey-200' : 'stroke-grey-700'}" />
				<span class="sr-only">Drop changes</span>
			</button>
		{:else}
			<button class="ml-auto mb-auto" on:click={() => (inEditMode = true)}>
				<Edit
					className="h-8 w-8 {$currentProject.banner ? 'stroke-grey-200' : 'stroke-grey-700'}"
				/>
				<span class="sr-only">Edit project details</span>
			</button>
		{/if}
	</header>
	<div>
		<div class="flex flex-wrap gap-md mb-lg">
			{#if inEditMode}
				<NewTagsInput bind:newTags={newProjectTags} />
			{:else}
				{#each $currentProject.tags as tag}
					<div class="bg-grey-200 py-2 px-3 w-fit rounded">
						<span class="text-grey-700 font-medium">{tag}</span>
					</div>
				{/each}
			{/if}
		</div>
		{#if !inEditMode}
			<Description banner="" description={$currentProject.description} />
			<p class="font-medium text-grey-700 mt-md">Team management coming soon.</p>
		{:else}
			<label for="description-input" class="input--label mb-sm">Edit the project description</label>
			<textarea
				name="description"
				class="input--text resize-none h-36 w-full"
				placeholder="Enter a brief description"
				bind:value={newProjectDescription}
			/>
		{/if}
	</div>
	{#if inEditMode}
		<button class="button--circle bottom-8 right-8 absolute" on:click={handleUpdateProject}>
			<Check className="h-8 w-8 stroke-grey-200" />
			<span class="sr-only">Save changes</span>
		</button>

		<section class="mt-md">
			<header>
				<h2 class="text-grey-900 text-md font-semibold">Cover Properties</h2>
			</header>

			<input type="file" class="hidden" bind:this={coverInputElement} bind:files={newCoverFile} />

			{#if !newCoverURL}
				<button
					class="button--secondary flex items-center justify-center gap-md w-full"
					on:click={() => coverInputElement.click()}
				>
					<Image className="stroke-grey-700 w-6 h-6" />
					Set a project cover
				</button>
			{:else if newCoverURL}
				<button
					class="button--primary flex items-center justify-center gap-md w-full"
					on:click={() => coverInputElement.click()}
				>
					<Image className="stroke-grey-200 w-6 h-6" />
					Update project cover
				</button>
				<button
					class="button--secondary flex items-center justify-center gap-md w-full mt-sm"
					on:click={handleRemoveCover}
				>
					<Trash className="stroke-grey-700 w-6 h-6" />
					Remove cover
				</button>
			{/if}
		</section>
	{/if}
</section>
