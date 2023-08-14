<script lang="ts">
	import { invalidate } from '$app/navigation';
	import Back from '$lib/assets/Arrow/Back.svelte';
	import Down from '$lib/assets/Arrow/Chevron/Down.svelte';
	import Check from '$lib/assets/Check.svelte';
	import Edit from '$lib/assets/Edit.svelte';
	import Image from '$lib/assets/Image.svelte';
	import Trash from '$lib/assets/Trash.svelte';
	import TransferTeam from '$lib/components/dropdowns/projects/TransferTeam.svelte';
	import InvitedTeamMembers from '$lib/components/projects/about/InvitedTeamMembers.svelte';
	import TransferProjectToTeam from '$lib/components/projects/about/TransferProjectToTeam.svelte';
	import NewTagsInput from '$lib/components/projects/edit/NewTagsInput.svelte';
	import TagList from '$lib/components/projects/tags/TagList.svelte';
	import { showMobileNav } from '$lib/stores/ui';
	import { supabase } from '$lib/supabase';
	import camelCase from 'lodash';
	import { onDestroy, onMount } from 'svelte';
	import toast from 'svelte-french-toast';
	import type { PageData } from './$types';

	export let data: PageData;

	let inEditMode = false;
	let newProjectName = data.project?.project_name;
	let newProjectDescription = data.project?.description;
	let newProjectTags: any[] = data.project?.tags;
	let newCoverURL = data.project?.banner;
	let newCoverFile: FileList | null;
	let coverInputElement: HTMLInputElement;

	let teamName = '';

	const getTeamName = async () => {
		const { data: team } = await supabase
			.from('teams')
			.select()
			.eq('id', data.project?.team)
			.limit(1)
			.single();
		if (team) {
			teamName = team.name;
		}
	};

	$: if (data.project?.team) getTeamName();

	onMount(async () => {
		$showMobileNav = false;
		getTeamName();
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
			.upload(`${user.user?.id}/${ccName}.png`, cover, {
				cacheControl: '3600',
				upsert: true
			});

		if (!coverErr) {
			const { data: url } = supabase.storage
				.from('project-covers')
				.getPublicUrl(`${user.user?.id}/${ccName}.png`);

			return url.publicUrl;
		} else {
			toast.error('Failed to upload project banner. Try again');
		}
	};

	const handleUpdateProject = async () => {
		let updatedCoverURL = data.project?.banner;
		inEditMode = false;

		if (newCoverFile && newCoverFile[0].size > 5000000) {
			toast.error("Cover can't be over 5mb in size.");
			return;
		} else if (newCoverFile && newCoverFile[0].size < 5000000) {
			updatedCoverURL = await uploadNewCover(newCoverFile);
		}

		const { error } = await supabase
			.from('projects')
			.update({
				project_name: newProjectName,
				description: newProjectDescription,
				tags: JSON.stringify(newProjectTags).replace('\\', ''),
				banner: updatedCoverURL
			})
			.eq('id', data.project?.id)
			.select();

		if (!error) {
			invalidate('app:project');
			invalidate('project:about');
			toast.success('Updated project details');
		} else {
			toast.error(`Failed to update project details: ${error?.message}`);
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
		newProjectName = data.project?.project_name;
		newProjectDescription = data.project?.description;
		newProjectTags = data.project?.tags;
		newCoverURL = data.project?.banner;
		newCoverFile = null;
	}

	let showTransferTeamDropdown = false;
	let transferDropdownContainer: HTMLElement;
	const handleAutoCloseDropdown = (event: Event) => {
		if (!transferDropdownContainer.contains(event.target)) showTransferTeamDropdown = false;
	};
</script>

<svelte:window on:click={handleAutoCloseDropdown} />

<svelte:head>
	<title>About {data.project?.project_name}</title>
</svelte:head>

<header
	class="relative -top-6 -left-6 flex w-[calc(100%+48px)] items-end rounded-b-3xl bg-cover bg-center object-cover p-4 {!newCoverURL
		? 'static w-[calc(100%+48px)]'
		: 'h-[12.5rem]'}"
	style="background-image: {newCoverURL
		? 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.6) 115.18%),'
		: ''} url({!inEditMode ? data.project?.banner : newCoverURL});"
>
	{#if !inEditMode}
		<a
			class="flex items-center gap-md {!data.project?.banner
				? 'max-w-[calc(100%-80px)]'
				: 'w-full'}"
			href="/app/projects/{data.project?.id}"
		>
			<Back
				className="w-8 h-8 aspect-square {data.project?.banner
					? 'stroke-grey-200'
					: 'stroke-grey-700 dark:stroke-grey-200'}"
			/>
			<h1
				class="text-lg {newCoverURL
					? 'max-w-[calc(100%-80px)] text-grey-200'
					: 'w-full text-grey-700 dark:text-grey-200'} truncate"
			>
				{data.project?.project_name}
			</h1>
		</a>
	{:else}
		<h1
			class="text-lg {newCoverURL
				? 'max-w-[calc(100%-80px)] text-grey-200'
				: 'w-fit text-grey-700 dark:text-grey-200'} truncate"
			contenteditable="true"
			bind:textContent={newProjectName}
		>
			{data.project?.project_name}
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
				className="h-8 w-8 {data.project?.banner
					? 'stroke-grey-200'
					: 'stroke-grey-700 dark:stroke-grey-200'}"
			/>
			<span class="sr-only">Edit project details</span>
		</button>
	{/if}
</header>

<div class="relative {data.project?.banner ? '-top-3' : '-top-8'}">
	{#if data.project?.tags.length > 1}
		<div class="mb-sm flex flex-wrap gap-md">
			{#if inEditMode}
				<NewTagsInput bind:newTags={newProjectTags} />
			{:else}
				<TagList tags={data.project?.tags} />
			{/if}
		</div>
	{/if}

	{#if !inEditMode}
		{#if data.project?.description}
			<p class="my-sm text-sm font-medium text-grey-700 dark:text-grey-300">
				{data.project?.description}
			</p>
		{/if}

		{#if data?.project.user_teams.length > 0}
			<TransferProjectToTeam {teamName} team={data.project?.team} projectId={data.project?.id} />
		{/if}
		<InvitedTeamMembers
			invited_people={data.project?.invited_people}
			projectId={data.project?.id}
		/>
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
				<Image className="stroke-grey-700 w-6 h-6 dark:stroke-grey-200" />
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
