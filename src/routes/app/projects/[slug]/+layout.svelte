<script lang="ts">
	import {
		currentProject,
		dateFilter,
		filterTags,
		milestoneFilter,
		priorityFilter,
		recentlyEdited,
		showProjectAside,
		sortOptions,
		userTeams
	} from '$lib/stores/project';

	import Back from '$lib/assets/Arrow/Back.svelte';
	import CircleInfo from '$lib/assets/Circle-Info.svelte';
	import MoreHorizontal from '$lib/assets/More Horizontal.svelte';
	import PlusNew from '$lib/assets/Plus-New.svelte';
	import ProjectDropdown from '$lib/components/dropdowns/projects/ProjectDropdown.svelte';
	import Description from '$lib/components/text/Description.svelte';

	import type { LayoutData } from './$types';
	import { showAboutProjectPrompt } from '$lib/stores/ui';
	import TagList from '$lib/components/projects/tags/TagList.svelte';
	import { onMount } from 'svelte';
	import User from '$lib/assets/User.svelte';
	import ProjectNav from '$lib/components/projects/nav/ProjectNav.svelte';
	import Aside from '$lib/components/projects/aside/Aside.svelte';
	import AboutProject from '$lib/components/prompts/about/AboutProject.svelte';
	import { supabase } from '$lib/supabase';
	import { invalidate } from '$app/navigation';
	import { userRole } from '$lib/stores/team';

	export let data: LayoutData;
	$currentProject = data.project;
	$currentProject.invited_people = data.invited_people ?? [];
	$currentProject = $currentProject;
	$userRole = data.role?.role;
	$userTeams = data.userTeams ?? [];

	$milestoneFilter = data.project?.filter.milestone;
	$dateFilter = data.project?.filter.date;
	$priorityFilter = data.project?.filter.priority;

	$sortOptions = data.project?.sort ?? {};

	let showProjectDropdown = false;

	onMount(async () => {
		if ($recentlyEdited.length >= 4) $recentlyEdited.pop();
		if (!$recentlyEdited.find((item) => item.id === data.id)) {
			$recentlyEdited = [data.project, ...$recentlyEdited];
		} else {
			const index = $recentlyEdited.findIndex((item) => item.id === data.id);
			$recentlyEdited.splice(index, 1);
			$recentlyEdited = [data.project, ...$recentlyEdited];
		}
	});

	let projectDropdownContainer: HTMLElement;

	const handleAutoCloseDropdown = (event: Event) => {
		if (!projectDropdownContainer.contains(event.target)) {
			showProjectDropdown = false;
		}
	};

	supabase
		.channel('any')
		.on(
			'postgres_changes',
			{ event: '*', schema: 'public', table: 'tasks', filter: `id=eq.${data.id}` },
			async () => {
				invalidate('app:project');
			}
		)
		.subscribe();
</script>

<svelte:window on:click={handleAutoCloseDropdown} />

<header
	class="relative -left-6 -top-6 {data.banner
		? 'h-[18.75rem]'
		: 'h-fit'} w-[calc(100%+48px)] rounded-b-3xl bg-cover bg-center bg-origin-border object-cover p-6 md:-left-8 md:-top-8 md:w-[calc(100%+64px)] md:p-8"
	style="background-image: {data.banner
		? 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.6) 115.18%),'
		: ''} url({data.banner});"
>
	<div class="mb-md flex items-center md:mb-sm md:items-start">
		<a class="flex w-[calc(100%-100px)] items-center gap-md" href="/app/projects">
			<Back
				className="w-8 h-8 min-w-[2rem] min-h-[2rem] aspect-square {data.banner
					? 'stroke-grey-200'
					: 'stroke-grey-700 dark:stroke-grey-200'} md:h-10 md:w-10"
			/>
			<h1
				class="w-full text-lg {data.banner
					? 'text-grey-200'
					: 'text-grey-700 dark:text-grey-200'} truncate md:text-xl md:font-semibold"
			>
				{data.name}
			</h1>
		</a>
		<div class="ml-auto flex items-center gap-md">
			<!-- Mobile link -->
			<a href="/app/projects/{data.id}/about" class="block md:hidden">
				<CircleInfo
					className="w-8 h-8 {data.banner
						? 'stroke-grey-200'
						: 'stroke-grey-700 dark:stroke-grey-200'}"
				/>
				<span class="sr-only">View project info</span>
			</a>
			<!-- Desktop -->
			<button class="hidden md:block" on:click={() => ($showAboutProjectPrompt = true)}>
				<CircleInfo
					className="w-8 h-8 {data.banner
						? 'stroke-grey-200'
						: 'stroke-grey-700 dark:stroke-grey-200'}"
				/>
				<span class="sr-only">View project info</span>
			</button>
			{#if $userRole === 'owner'}
				<div bind:this={projectDropdownContainer} class="z-40">
					<button on:click={() => (showProjectDropdown = !showProjectDropdown)}>
						<MoreHorizontal
							className="w-8 h-8 {data.banner
								? 'stroke-grey-200'
								: 'stroke-grey-700 dark:stroke-grey-200'}"
						/>
					</button>
					{#if showProjectDropdown}
						<ProjectDropdown bind:visibility={showProjectDropdown} projectId={data.id} />
					{/if}
				</div>
			{/if}
		</div>
	</div>

	<TagList tags={data.project.tags} />

	<div class="md:w-2/3 lg:w-1/2">
		<Description banner={data.banner} description={data.description} />
	</div>

	<div
		class="static bottom-8 right-6 z-40 ml-auto mt-sm flex w-full items-center justify-end md:absolute"
	>
		{#each data.project?.invite.profiles as { avatar_url }}
			{#if avatar_url}
				<img
					src={avatar_url}
					alt="User profile"
					class="-ml-md aspect-square h-10 w-10 rounded-full object-cover first:ml-0"
				/>
			{:else}
				<User
					className="w-10 h-10 stroke-grey-700 dark:stroke-grey-200 bg-grey-200 dark:bg-grey-700 rounded-full  -ml-md first:ml-0"
				/>
			{/if}
		{/each}
		<!-- Mobile -->
		<a href="/app/projects/{data.id}/about/team-management" class="ml-md md:hidden">
			<PlusNew
				className="h-10 w-10 {data.banner
					? 'stroke-grey-200'
					: 'stroke-grey-700 dark:stroke-grey-200'}"
			/>
			<span class="sr-only">Invite new team members</span>
		</a>
	</div>
</header>

<div class="-top-6 mb-md flex w-full items-center md:relative">
	<ProjectNav />
	{#if $showProjectAside}
		<Aside />
	{/if}
</div>

<slot />

<AboutProject
	bind:shown={$showAboutProjectPrompt}
	project_name={data.project?.project_name}
	description={data.project?.description}
/>
