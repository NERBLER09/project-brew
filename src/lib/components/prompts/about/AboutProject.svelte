<script lang="ts">
	import { invalidate } from '$app/navigation';

	import CloseMultiply from '$lib/assets/Close-Multiply.svelte';
	import Edit from '$lib/assets/Edit.svelte';
	import Image from '$lib/assets/Image.svelte';
	import Trash from '$lib/assets/Trash.svelte';
	import InvitedTeamMembers from '$lib/components/projects/about/InvitedTeamMembers.svelte';
	import TransferProjectToTeam from '$lib/components/projects/about/TransferProjectToTeam.svelte';
	import NewTagsInput from '$lib/components/projects/edit/NewTagsInput.svelte';
	import TagList from '$lib/components/projects/tags/TagList.svelte';

	import { currentProject, userTeams } from '$lib/stores/project';
	import { showManageInvitedPrompt } from '$lib/stores/ui';
	import { supabase } from '$lib/supabase';
	import lodash from 'lodash';
	import { onMount } from 'svelte';
	import toast from 'svelte-french-toast';
	import ManageInvited from './ManageInvited.svelte';

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

	let inEditMode = false;
	let newProjectName = $currentProject.project_name;
	let newProjectDescription = $currentProject.description;
	let newProjectTags: any[] = $currentProject?.tags;
	let newCoverURL = $currentProject.banner;
	let newCoverFile: FileList | null;
	let coverInputElement: HTMLInputElement;

	let teamName = '';

	const getTeamName = async () => {
		const { data: team } = await supabase
			.from('teams')
			.select()
			.eq('id', $currentProject.team)
			.limit(1)
			.single();
		if (team) {
			teamName = team.name;
		}
	};

	$: if ($currentProject.team) getTeamName();

	onMount(async () => {
		getTeamName();
	});

	const uploadNewCover = async (coverList: FileList | null) => {
		if (!coverList) return '';
		let cover = coverList[0];

		const ccName = lodash.camelCase(newProjectName);
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
		let updatedCoverURL = $currentProject.banner;
		if (newCoverFile && newCoverFile[0].size > 5000000) {
			toast.error("Cover can't be over 5mb in size.");
			return;
		} else if (newCoverFile && newCoverFile[0].size < 5000000) {
			updatedCoverURL = await uploadNewCover(newCoverFile);
		}
		inEditMode = false;
		const { data, error } = await supabase
			.from('projects')
			.update({
				project_name: newProjectName,
				description: newProjectDescription,
				tags: JSON.stringify(newProjectTags).replace('\\', ''),
				banner: updatedCoverURL
			})
			.eq('id', $currentProject.id)
			.select();

		if (data) {
			$currentProject = data[0];
			$currentProject.tags = JSON.parse(data[0]?.tags ?? '[]');
			$currentProject.project_name = data[0]?.project_name;
			console.log(data[0].tags);
			invalidate('app:project');
			toast.success('Updated project details');
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
		newProjectName = $currentProject.project_name;
		newProjectDescription = $currentProject.description;
		newProjectTags = $currentProject?.tags;
		newCoverURL = $currentProject.banner;
		newCoverFile = null;
	}
</script>

<dialog
	bind:this={dialog}
	class="h-1/2 w-2/3 rounded-2xl bg-grey-100 p-8 dark:bg-grey-900 xl:h-2/3 xl:w-1/3"
	on:close={() => (shown = false)}
>
	<header
		class="relative -top-8 -left-8 flex w-[calc(100%+64px)] items-end rounded-b-3xl bg-cover bg-center object-cover p-6 font-semibold {!newCoverURL
			? 'w-[calc(100%+64px)]'
			: 'h-[12.5rem]'}"
		style="background-image: {newCoverURL
			? 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.6) 115.18%),'
			: ''} url({!inEditMode ? $currentProject.banner : newCoverURL});"
	>
		{#if !inEditMode}
			<h1
				class="w-fit text-lg {$currentProject.banner
					? 'text-grey-200'
					: 'text-grey-700 dark:text-grey-200'} truncate"
			>
				{$currentProject?.name}
			</h1>
		{:else}
			<h1
				class="w-fit text-lg {newCoverURL
					? 'text-grey-200'
					: 'text-grey-700 dark:text-grey-200'} truncate"
				contenteditable="true"
				bind:textContent={newProjectName}
			>
				{$currentProject?.name}
			</h1>
		{/if}

		<div class="relative ml-auto mb-auto flex items-center gap-md ">
			{#if inEditMode}
				<button on:click={() => (inEditMode = false)}>
					<Trash
						className="h-8 w-8 {newCoverURL
							? 'stroke-grey-200'
							: 'stroke-grey-700 dark:stroke-grey-200'}"
					/>
					<span class="sr-only">Discard changes</span>
				</button>
			{:else}
				<button on:click={() => (inEditMode = true)}>
					<Edit
						className="h-8 w-8 {$currentProject.banner
							? 'stroke-grey-200'
							: 'stroke-grey-700 dark:stroke-grey-200'}"
					/>
					<span class="sr-only">Edit project details</span>
				</button>
			{/if}

			<button on:click={() => (shown = false)}>
				<CloseMultiply
					className=" {newCoverURL
						? 'stroke-grey-200'
						: 'stroke-grey-700 dark:stroke-grey-200'} w-12 h-12"
				/>
				<span class="sr-only">Close</span>
			</button>
		</div>
	</header>

	<div class="relative {$currentProject.banner ? '-top-6' : '-top-8'}">
		<div class="flex flex-wrap">
			{#if $currentProject.tags.length > 1}
				<div class="mb-sm flex flex-wrap gap-md">
					{#if inEditMode}
						<NewTagsInput bind:newTags={newProjectTags} />
					{:else}
						<TagList tags={$currentProject.tags} />
					{/if}
				</div>
			{/if}
		</div>

		{#if !inEditMode}
			{#if $currentProject.description}
				<p class="my-sm text-sm font-medium text-grey-700 dark:text-grey-300">
					{$currentProject.description}
				</p>
			{/if}

			{#if $userTeams.length > 0}
				<TransferProjectToTeam
					{teamName}
					projectId={$currentProject.project.id}
					team={$currentProject.project.team}
				/>
			{/if}
			<InvitedTeamMembers
				invited_people={$currentProject.invited_people}
				projectId={$currentProject.project.id}
			/>
		{:else}
			<div class="flex flex-col">
				<label for="description-input" class="input--label mb-sm"
					>Edit the project description</label
				>
				<textarea
					name="description"
					class="input--text h-36 w-full resize-none"
					placeholder="Enter a brief description"
					bind:value={newProjectDescription}
				/>
			</div>
		{/if}
	</div>
	{#if inEditMode}
		<section class="mt-md">
			<header>
				<h2 class="text-md font-semibold text-grey-900 dark:text-grey-100">Cover Properties</h2>
			</header>

			<input type="file" class="hidden" bind:this={coverInputElement} bind:files={newCoverFile} />

			{#if !newCoverURL}
				<button
					class="button--secondary flex w-full items-center justify-center gap-md"
					on:click={() => coverInputElement.click()}
				>
					<Image className="stroke-grey-70 dark:text-grey-1000 w-6 h-6" />
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
					<Trash className="stroke-grey-700 dark:stroke-grey-100 w-6 h-6" />
					Remove cover
				</button>
			{/if}
		</section>

		<footer class="mx-auto mt-xl flex w-1/2 items-center justify-around gap-md">
			<button class="button--secondary" on:click={() => (inEditMode = false)}>Cancel</button>
			<button class="button--primary" on:click={handleUpdateProject}>Save</button>
		</footer>
	{/if}
</dialog>

<ManageInvited bind:shown={$showManageInvitedPrompt} />
