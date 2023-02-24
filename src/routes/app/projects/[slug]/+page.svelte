<script lang="ts">
	import { currentProject, invitedTeamMembers, recentlyEdited } from '$lib/stores/project';
	import { dndzone } from 'svelte-dnd-action';

	import Back from '$lib/assets/Arrow/Back.svelte';
	import CircleInfo from '$lib/assets/Circle-Info.svelte';
	import MoreHorizontal from '$lib/assets/More Horizontal.svelte';
	import PlusNew from '$lib/assets/Plus-New.svelte';
	import ProjectDropdown from '$lib/components/dropdowns/projects/ProjectDropdown.svelte';
	import List from '$lib/components/projects/list/List.svelte';
	import AboutProject from '$lib/components/prompts/about/AboutProject.svelte';
	import Description from '$lib/components/text/Description.svelte';

	import type { PageData } from './$types';
	import { showAboutProjectPrompt } from '$lib/stores/ui';
	import NewList from '$lib/components/form/forms/NewList.svelte';
	import TagList from '$lib/components/projects/tags/TagList.svelte';
	import { onDestroy, onMount } from 'svelte';
	import { supabase } from '$lib/supabase';
	import type { User as Profile } from '$lib/types/projects';
	import { invalidate } from '$app/navigation';
	import User from '$lib/assets/User.svelte';

	export let data: PageData;
	currentProject.set(data);

	let showProjectDropdown = false;
	let createNewList = false;

	const handleDnd = (event) => {
		data.lists = event.detail.items;
	};

	const getInvitedTeamMembers = async (): Promise<Profile[]> => {
		let invitedUserData: Profile[] = [];
		for (const item of data.invited_people) {
			const { data } = await supabase.from('profiles').select().eq('id', item).limit(1).single();
			if (data) {
				invitedUserData = [data, ...invitedUserData];
			}
		}
		return invitedUserData;
	};

	onMount(async () => {
		if ($recentlyEdited.length >= 4) $recentlyEdited.pop();
		if (!$recentlyEdited.find((item) => item.id === data.id)) {
			$recentlyEdited = [data.project, ...$recentlyEdited];
		} else {
			const index = $recentlyEdited.findIndex((item) => item.id === data.id);
			$recentlyEdited.splice(index, 1);
			$recentlyEdited = [data.project, ...$recentlyEdited];
		}

		$invitedTeamMembers = await getInvitedTeamMembers();
	});

	const projectsRealtime = supabase
		.channel('project-detail-updates')
		.on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'projects' }, () =>
			invalidate('app:project')
		)
		.subscribe();

	const listsRealtime = supabase
		.channel('list-updates')
		.on('postgres_changes', { event: '*', schema: 'public', table: 'lists' }, () =>
			invalidate('app:project')
		)
		.subscribe();

	const cardsRealtime = supabase
		.channel('list-updates')
		.on('postgres_changes', { event: '*', schema: 'public', table: 'cards' }, () =>
			invalidate('app:project')
		)
		.subscribe();

	onDestroy(() => {
		supabase.removeAllChannels();
	});

	let projectDropdownContainer: HTMLElement;

	const handleAutoCloseDropdown = (event: Event) => {
		if (!projectDropdownContainer.contains(event.target)) {
			showProjectDropdown = false;
		}
	};
</script>

<svelte:head>
	<title>{data.name}</title>
</svelte:head>

<svelte:window on:click={handleAutoCloseDropdown} />

<header
	class="relative -top-6 -left-6 {data.banner
		? 'min-h-[13.5rem] '
		: 'h-fit'} w-[calc(100%+48px)] rounded-b-3xl bg-cover bg-center bg-origin-border object-cover p-6 md:-top-8 md:-left-8 md:w-[calc(100%+64px)] md:p-8"
	style="background-image: {data.banner
		? 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.6) 115.18%),'
		: ''} url({data.banner});"
>
	<div class="mb-md flex items-center md:mb-sm md:items-start">
		<a class="flex items-center gap-md" href="/app/projects">
			<Back
				className="w-8 h-8 aspect-square {data.banner
					? 'stroke-grey-200'
					: 'stroke-grey-700 dark:stroke-grey-200'} md:h-10 md:w-10"
			/>
			<h1
				class="w-fit text-lg {data.banner
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
		</div>
	</div>

	<TagList tags={data.tags} />

	<div class="md:w-2/3 lg:w-1/2">
		<Description banner={data.banner} description={data.description} />
	</div>

	{#if $invitedTeamMembers}
		<div
			class="static right-6 bottom-8 z-40 mt-sm ml-auto flex w-full items-center justify-end md:absolute"
		>
			{#each $invitedTeamMembers as { avatar_url }}
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
			{#if $invitedTeamMembers}
				<!-- Mobile -->
				<a href="/app/projects/{data.id}/about/team-management" class="ml-md md:hidden">
					<PlusNew
						className="h-10 w-10 {data.banner
							? 'stroke-grey-200'
							: 'stroke-grey-700 dark:stroke-grey-200'}"
					/>
					<span class="sr-only">Invite new team members</span>
				</a>
			{/if}
		</div>
	{/if}
</header>

<section
	class="relative {!data.banner
		? '-top-8'
		: ''} flex flex-nowrap items-start gap-lg overflow-x-auto pb-4 md:gap-2xl"
	use:dndzone={{ items: data.lists, type: 'list', flipDurationMs: 300 }}
	on:finalize={handleDnd}
	on:consider={handleDnd}
>
	{#each data.lists as list (list.id)}
		<List name={list.list_name} id={list.id} status={list.status} />
	{/each}

	<div
		class="min-w-[15.625rem] md:min-w-[18.75rem] lg:min-w-[25rem] {data.lists.length === 0
			? ''
			: 'mt-[2.625rem]  md:mt-[4.0625rem]'}"
	>
		{#if createNewList}
			<NewList bind:createNewList />
		{:else}
			<button
				class="button--primary flex w-full items-center justify-center gap-md"
				on:click={() => (createNewList = true)}
				draggable="false"
			>
				<PlusNew className="w-6 h-6 stroke-grey-200" />
				New List
			</button>
		{/if}
	</div>
</section>

<AboutProject bind:shown={$showAboutProjectPrompt} />
