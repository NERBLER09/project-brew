<script lang="ts">
	import { invalidate } from '$app/navigation';
	import Back from '$lib/assets/Arrow/Back.svelte';
	import InvitedTeamMembers from '$lib/components/projects/about/InvitedTeamMembers.svelte';
	import TransferProjectToTeam from '$lib/components/projects/about/TransferProjectToTeam.svelte';
	import { showMobileNav } from '$lib/stores/ui';
	import { supabase } from '$lib/supabase';
	import { onDestroy, onMount } from 'svelte';
	import toast from 'svelte-french-toast';
	import type { PageData } from './$types';
	import FileInput from '$lib/components/form/FileInput.svelte';
	import { userRole } from '$lib/stores/team';
	import pkg from 'lodash';
	const { camelCase } = pkg;
	import TagList from '$lib/components/projects/tags/TagList.svelte';
	import TagInput from '$lib/components/prompts/about/TagInput.svelte';

	export let data: PageData;

	let inEditMode = false;
	let project_name = data.project?.project_name;
	let description = data.project?.description;
	let bannerURL = data.project?.banner;
	let newBanner: FileList | null;

	let isViewer = $userRole === 'viewer';

	let teamName = data.team_name;

	onMount(async () => {
		$showMobileNav = false;
	});

	onDestroy(() => {
		$showMobileNav = true;
	});

	let original_name = project_name;
	let original_description = description;

	const updateProjectName = async () => {
		if (project_name === original_name) return;

		const { error } = await supabase
			.from('projects')
			.update({
				project_name
			})
			.eq('id', data.project?.id);

		if (!error) {
			invalidate('app:project');
			invalidate('project:about');
			toast.success('Updated project details');
		} else {
			toast.error(`Failed to update project details: ${error?.message}`);
		}
	};

	const updateProjectDescription = async () => {
		if (description === original_description) return;

		const { error } = await supabase
			.from('projects')
			.update({
				description
			})
			.eq('id', data.project?.id);

		if (!error) {
			invalidate('app:project');
			invalidate('project:about');
			toast.success('Updated project details');
		} else {
			toast.error(`Failed to update project details: ${error?.message}`);
		}
	};

	const updateProjectBanner = async () => {
		if (newBanner[0].size !== 0 && newBanner[0].size < 5000000) {
			await supabase.storage
				.from('project-covers')
				.upload(`${data.user.id}/${camelCase(data.project?.project_name)}.png`, newBanner[0], {
					cacheControl: '3600',
					upsert: true
				});

			const { data: url } = supabase.storage
				.from('project-covers')
				.getPublicUrl(`${data.user.id}/${camelCase(data.project?.project_name)}.png`);
			console.log(url.publicUrl);
			bannerURL = url.publicUrl;
		} else if (newBanner.size > 5000000 && newBanner.size > 0) {
			toast.error("Project banner can't be larger then 5mb");
		}

		const { error } = await supabase
			.from('projects')
			.update({
				banner: bannerURL
			})
			.eq('id', data.project?.id);

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
			.eq('id', data.project?.id);

		if (!error) {
			invalidate('app:project');
			invalidate('project:about');
			toast.success('Updated project details');
		} else {
			toast.error(`Failed to update project details: ${error?.message}`);
		}
	};
</script>

<svelte:head>
	<title>About {data.project?.project_name}</title>
</svelte:head>

<div class="fixed right-0 top-0 bg-white dark:bg-grey-900">
	<header
		class="flex w-[calc(100%+48px)] items-end rounded-b-3xl bg-cover bg-center object-cover p-4 {newBanner
			? 'static w-[calc(100%+48px)]'
			: 'h-[12.5rem]'}"
		style="background-image: {bannerURL
			? 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.6) 115.18%),'
			: ''} url({!inEditMode ? data.project?.banner : bannerURL});"
	>
		<div
			class="flex items-center gap-md {!data.project?.banner
				? 'max-w-[calc(100%-80px)]'
				: 'w-full'}"
		>
			<a href="/app/projects/{data.project?.id}">
				<Back
					className="w-8 h-8 aspect-square {data.project?.banner
						? 'stroke-grey-200'
						: 'stroke-grey-700 dark:stroke-grey-200'}"
				/>
			</a>
			{#if isViewer}
				<h1
					class="text-lg {bannerURL
						? 'max-w-[calc(100%-80px)] text-grey-200'
						: 'w-full text-grey-700 dark:text-grey-200'} truncate"
				>
					{data.project?.project_name}
				</h1>
			{:else}
				<h1
					class="text-lg {bannerURL
						? 'max-w-[calc(100%-80px)] text-grey-200'
						: 'w-full text-grey-700 dark:text-grey-200'} truncate"
					contenteditable
					bind:innerHTML={project_name}
					on:blur={updateProjectName}
				>
					{data.project?.project_name}
				</h1>
			{/if}
		</div>
	</header>

	<div class="relative {data.project?.banner ? '-top-3' : '-top-8'} px-4">
		<!-- TODO: Create new tag input -->
		{#if isViewer}
			<TagList tags={data.project?.tags ?? []} />
		{:else}
			<TagInput newTags={data.project?.tags ?? []} projectId={data.project?.id} />
		{/if}

		{#if isViewer}
			{#if data.project?.description}
				<p class="my-md font-medium text-grey-700 dark:text-grey-300">
					{description}
				</p>
			{/if}
		{:else}
			{#if data.project?.description}
				<p
					class="my-md font-medium text-grey-700 dark:text-grey-300"
					contenteditable="true"
					bind:textContent={description}
					on:blur={updateProjectDescription}
				>
					{description}
				</p>
			{/if}

			{#if data?.project.user_teams.length > 0}
				<TransferProjectToTeam {teamName} team={data.project?.team} projectId={data.project?.id} />
			{/if}

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
			invited_people={data.project?.invited_people}
			projectId={data.project?.id}
		/>
	</div>
</div>
