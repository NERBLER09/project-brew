<script lang="ts">
	import {
		currentProject,
		invitedTeamMembers,
		recentlyEdited,
		userTeams
	} from '$lib/stores/project';

	import Back from '$lib/assets/Arrow/Back.svelte';
	import CircleInfo from '$lib/assets/Circle-Info.svelte';
	import MoreHorizontal from '$lib/assets/More Horizontal.svelte';
	import PlusNew from '$lib/assets/Plus-New.svelte';
	import ProjectDropdown from '$lib/components/dropdowns/projects/ProjectDropdown.svelte';
	import Description from '$lib/components/text/Description.svelte';

	import type { LayoutData, PageData } from './$types';
	import { showAboutProjectPrompt } from '$lib/stores/ui';
	import TagList from '$lib/components/projects/tags/TagList.svelte';
	import { onDestroy, onMount } from 'svelte';
	import { supabase } from '$lib/supabase';
	import type { User as Profile } from '$lib/types/projects';
	import { goto, invalidate } from '$app/navigation';
	import User from '$lib/assets/User.svelte';
	import ProjectNav from '$lib/components/projects/nav/ProjectNav.svelte';
	import Aside from '$lib/components/projects/aside/Aside.svelte';

	export let data: LayoutData;
	currentProject.set(data);
	userTeams.set(data.userTeams ?? []);

	let showProjectDropdown = false;

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

	let headerElement: HTMLElement;
	let headerHeight: number = 0;

	onMount(async () => {
		goto(`/app/projects/${data.id}/dashboard`);
		if ($recentlyEdited.length >= 4) $recentlyEdited.pop();
		if (!$recentlyEdited.find((item) => item.id === data.id)) {
			$recentlyEdited = [data.project, ...$recentlyEdited];
		} else {
			const index = $recentlyEdited.findIndex((item) => item.id === data.id);
			$recentlyEdited.splice(index, 1);
			$recentlyEdited = [data.project, ...$recentlyEdited];
		}

		$invitedTeamMembers = await getInvitedTeamMembers();

		headerHeight = headerElement.offsetHeight;
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

<svelte:window on:click={handleAutoCloseDropdown} />

<header
	class="relative -top-6 -left-6 h-[18.75rem] {data.banner
		? 'h-fit'
		: 'h-fit'} w-[calc(100%+48px)] rounded-b-3xl bg-cover bg-center bg-origin-border object-cover p-6 md:-top-8 md:-left-8 md:w-[calc(100%+64px)] md:p-8"
	style="background-image: {data.banner
		? 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.6) 115.18%),'
		: ''} url({data.banner});"
	bind:this={headerElement}
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

<div class="flex w-full items-center">
	<ProjectNav />
	<Aside />
</div>

<slot />