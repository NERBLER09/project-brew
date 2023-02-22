<script lang="ts">
	import Back from '$lib/assets/Arrow/Back.svelte';
	import Check from '$lib/assets/Check.svelte';
	import Edit from '$lib/assets/Edit.svelte';
	import Image from '$lib/assets/Image.svelte';
	import Trash from '$lib/assets/Trash.svelte';
	import InvitedTeamMembers from '$lib/components/projects/about/InvitedTeamMembers.svelte';
	import NewTagsInput from '$lib/components/projects/edit/NewTagsInput.svelte';
	import TagList from '$lib/components/projects/tags/TagList.svelte';
	import Description from '$lib/components/text/Description.svelte';
	import { currentProject } from '$lib/stores/project';
	import { showMobileNav } from '$lib/stores/ui';
	import { supabase } from '$lib/supabase';
	import { camelCase } from 'lodash';
	import { onDestroy, onMount } from 'svelte';
	import toast from 'svelte-french-toast';

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

		const { data: url } = supabase.storage
			.from('project-covers')
			.getPublicUrl(`${user.user?.id}/${ccName}.png`);

		return url.publicUrl;
	};

	const handleUpdateProject = async () => {
		let updatedCoverURL = '';
		if (newCoverFile && newCoverFile[0].size > 5000000) {
			toast.error("Cover can't be over 5mb in size.");
			return;
		} else {
			updatedCoverURL = await uploadNewCover(newCoverFile);
		}
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

		if (data) {
			$currentProject = data[0];
			$currentProject.tags = JSON.stringify(data[0]?.tags) || [];
			$currentProject.name = data[0]?.project_name;
		} else {
			toast.error(`Failed to update project details: ${error.message}`);
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
		class="relative -top-6 -left-6 flex w-[calc(100%+48px)] items-end rounded-b-3xl bg-cover bg-center object-cover p-4 {!newCoverURL
			? 'static w-fit'
			: 'h-[12.5rem]'}"
		style="background-image: {$currentProject.banner
			? 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.6) 115.18%),'
			: ''}, url({!inEditMode ? $currentProject.banner : newCoverURL});"
	>
		{#if !inEditMode}
			<a class="flex items-center gap-md" href="/app/projects/{$currentProject.id}">
				<Back
					className="w-8 h-8 aspect-square {$currentProject.banner
						? 'stroke-grey-200'
						: 'stroke-grey-700 dark:stroke-grey-200'}"
				/>
				<h1
					class="w-fit text-lg {$currentProject.banner
						? 'text-grey-200'
						: 'text-grey-700 dark:text-grey-200'} truncate"
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
			<button class="z-50 ml-auto mb-auto" on:click={() => (inEditMode = false)}>
				<Trash
					className="h-8 w-8 {newCoverURL
						? 'stroke-grey-200'
						: 'stroke-grey-700 dark:stroke-grey-200'}"
				/>
				<span class="sr-only">Drop changes</span>
			</button>
		{:else}
			<button class="ml-auto mb-auto" on:click={() => (inEditMode = true)}>
				<Edit
					className="h-8 w-8 {$currentProject.banner
						? 'stroke-grey-200'
						: 'stroke-grey-700 dark:stroke-grey-200'}"
				/>
				<span class="sr-only">Edit project details</span>
			</button>
		{/if}
	</header>
	<div>
		<div class="mb-lg flex flex-wrap gap-md">
			{#if inEditMode}
				<NewTagsInput bind:newTags={newProjectTags} />
			{:else}
				<TagList tags={$currentProject.tags} />
			{/if}
		</div>
		{#if !inEditMode}
			<Description banner="" description={$currentProject.description} />
			<InvitedTeamMembers invited_people={$currentProject.invited_people} />
		{:else}
			<label for="description-input" class="input--label mb-sm">Edit the project description</label>
			<textarea
				name="description"
				class="input--text h-36 w-full resize-none"
				placeholder="Enter a brief description"
				bind:value={newProjectDescription}
			/>
		{/if}
	</div>
	{#if inEditMode}
		<button class="button--circle absolute bottom-8 right-8" on:click={handleUpdateProject}>
			<Check className="h-8 w-8 stroke-grey-200" />
			<span class="sr-only">Save changes</span>
		</button>

		<section class="mt-md">
			<header>
				<h2 class="text-md font-semibold text-grey-900 dark:text-grey-200">Cover Properties</h2>
			</header>

			<input type="file" class="hidden" bind:this={coverInputElement} bind:files={newCoverFile} />

			{#if !newCoverURL}
				<button
					class="button--secondary flex w-full items-center justify-center gap-md"
					on:click={() => coverInputElement.click()}
				>
					<Image className="stroke-grey-700 w-6 h-6" />
					Set a project cover
				</button>
			{:else if newCoverURL}
				<button
					class="button--primary flex w-full items-center justify-center gap-md"
					on:click={() => coverInputElement.click()}
				>
					<Image className="stroke-grey-200 w-6 h-6" />
					Update project cover
				</button>
				<button
					class="button--secondary mt-sm flex w-full items-center justify-center gap-md"
					on:click={handleRemoveCover}
				>
					<Trash className="stroke-grey-700 dark:stroke-grey-200 w-6 h-6" />
					Remove cover
				</button>
			{/if}
		</section>
	{/if}
</section>
