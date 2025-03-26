<script lang="ts">
	import { invalidate } from '$app/navigation';
	import Down from '$lib/assets/Arrow/Chevron/Down.svelte';

	import CloseMultiply from '$lib/assets/Close-Multiply.svelte';
	import InvitedTeamMembers from '$lib/components/projects/about/InvitedTeamMembers.svelte';
	import TransferProjectToTeam from '$lib/components/projects/about/TransferProjectToTeam.svelte';

	import { currentProject, userTeams } from '$lib/stores/project';
	import { showManageInvitedPrompt } from '$lib/stores/ui';
	import { supabase } from '$lib/supabase';
	import { onMount } from 'svelte';
	import toast from 'svelte-french-toast';
	import ManageInvited from './ManageInvited.svelte';
	import FileInput from '$lib/components/form/FileInput.svelte';
	import { userRole } from '$lib/stores/team';
	import TagList from '$lib/components/projects/tags/TagList.svelte';
	import TagInput from './TagInput.svelte';

	import pkg from 'lodash';
	const { camelCase } = pkg;

	export let shown = false;
	let dialog: HTMLDialogElement;

	export let project_name: string | null;
	export let description: string | null = '';
	export let tags: string[] | null = [];
	export let banner: string | null = '';
	tags = tags ?? [];

	project_name = $currentProject.project_name ?? '';
	description = $currentProject.description ?? '';

	let original_name = project_name;
	let original_description = description;

	let isViewer = $userRole === 'viewer';

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

	$: bannerURL = banner;
	let newBanner: FileList | null;

	console.log(bannerURL);

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

	const updateProjectName = async () => {
		if (project_name === original_name) return;
		toast.success('Updated name');
		const { error } = await supabase
			.from('projects')
			.update({
				project_name
			})
			.eq('id', $currentProject.id);

		if (!error) {
			invalidate('app:project');
			invalidate('project:about');
			toast.success('Updated project details');
		} else {
			toast.error(`Failed to update project details: ${error?.message}`);
		}
	};

	const updateProjectDescription = async () => {
		if (description !== original_description) return;
		const { error } = await supabase
			.from('projects')
			.update({
				description
			})
			.eq('id', $currentProject.id);

		if (!error) {
			invalidate('app:project');
			invalidate('project:about');
			toast.success('Updated project details');
		} else {
			toast.error(`Failed to update project details: ${error?.message}`);
		}
	};

	const updateProjectBanner = async () => {
		const { data: user } = await supabase.auth.getUser();

		if (newBanner[0]?.size !== 0 && newBanner[0]?.size < 5000000) {
			const { error } = await supabase.storage
				.from('project-covers')
				.upload(`${user?.user.id}/${camelCase($currentProject.project_name)}.png`, newBanner[0], {
					cacheControl: '3600',
					upsert: true
				});

			const { data: url } = supabase.storage
				.from('project-covers')
				.getPublicUrl(`${user?.user.id}/${camelCase($currentProject.project_name)}.png`);
			bannerURL = url.publicUrl;
		} else if (newBanner.size > 5000000 && newBanner.size > 0) {
			toast.error("Project banner can't be larger then 5mb");
		}

		const { error } = await supabase
			.from('projects')
			.update({
				banner: bannerURL
			})
			.eq('id', $currentProject.id);

		if (!error) {
			invalidate('app:project');
			invalidate('project:about');
			toast.success('Updated project details');
		} else {
			toast.error(`Failed to update project details: ${error?.message}`);
		}
	};

	const removeBanner = async () => {
		const { error } = await supabase
			.from('projects')
			.update({
				banner: null
			})
			.eq('id', $currentProject.id);

		if (!error) {
			invalidate('app:project');
			invalidate('project:about');
			toast.success('Updated project details');
		} else {
			toast.error(`Failed to update project details: ${error?.message}`);
		}
	};
</script>

<dialog
	bind:this={dialog}
	class="h-1/2 w-2/3 overflow-x-hidden rounded-2xl bg-grey-100 p-8 dark:bg-grey-900 xl:h-2/3 xl:w-1/3"
	on:close={() => (shown = false)}
>
	<header
		class="relative -left-8 -top-8 flex w-[calc(100%+64px)] items-end rounded-b-3xl bg-cover bg-center object-cover p-6 font-semibold {!bannerURL
			? 'w-[calc(100%+64px)]'
			: 'h-[12.5rem]'}"
		style="background-image: {bannerURL
			? 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.6) 115.18%),'
			: ''} url('{bannerURL}');"
	>
		{#if isViewer}
			<h1
				class="w-fit text-lg {bannerURL
					? 'text-grey-200'
					: 'text-grey-700 dark:text-grey-200'} truncate"
			>
				{project_name}
			</h1>
		{:else}
			<h1
				class="w-fit text-lg {bannerURL
					? 'text-grey-200'
					: 'text-grey-700 dark:text-grey-200'} truncate"
				contenteditable
				on:blur={updateProjectName}
				bind:innerHTML={project_name}
			>
				{project_name}
			</h1>
		{/if}

		<div class="relative mb-auto ml-auto flex items-center gap-md">
			<button on:click={() => (shown = false)}>
				<CloseMultiply
					className=" {bannerURL
						? 'stroke-grey-200'
						: 'stroke-grey-700 dark:stroke-grey-200'} w-12 h-12"
				/>
				<span class="sr-only">Close</span>
			</button>
		</div>
	</header>

	<div class="relative {$currentProject.banner ? '-top-6' : '-top-8'}">
		{#if isViewer}
			<TagList tags={$currentProject.tags ?? []} />
		{:else}
			<TagInput newTags={$currentProject.tags ?? []} projectId={$currentProject.id} />
		{/if}

		{#if isViewer}
			{#if $currentProject.description}
				<p class="my-sm text-sm font-medium text-grey-700 dark:text-grey-300">
					{$currentProject.description}
				</p>
			{/if}
		{:else}
			{#if $currentProject.description}
				<p
					class="my-sm text-sm font-medium text-grey-700 dark:text-grey-300"
					contenteditable="true"
					bind:textContent={description}
					on:blur={updateProjectDescription}
				>
					{$currentProject.description}
				</p>
			{/if}

			{#if $userTeams?.length > 0}
				<TransferProjectToTeam
					{teamName}
					projectId={$currentProject.id}
					team={$currentProject.team}
				/>
			{/if}
		{/if}

		{#if !isViewer}
			<section>
				<header>
					<h2 class="text-md font-semibold text-grey-700 dark:text-grey-200">Project Appearance</h2>
				</header>
				<FileInput
					bind:bannerURL
					bind:newBanner
					uploadBanner={updateProjectBanner}
					postRemoveBannnerHandle={removeBanner}
				/>
			</section>
		{/if}

		<InvitedTeamMembers
			invited_people={$currentProject.invited_people}
			projectId={$currentProject.id}
		/>
	</div>
</dialog>

<ManageInvited bind:shown={$showManageInvitedPrompt} />
