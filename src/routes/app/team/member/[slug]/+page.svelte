<script lang="ts">
	import Back from '$lib/assets/Arrow/Back.svelte';
	import Building from '$lib/assets/Building.svelte';
	import Community from '$lib/assets/Community.svelte';
	import Settings from '$lib/assets/Settings.svelte';
	import User from '$lib/assets/User.svelte';
	import ProjectCard from '$lib/components/projects/links/ProjectCard.svelte';
	import { currentTeam } from '$lib/stores/team';
	import { supabase } from '$lib/supabase';
	import type { Projects } from '$lib/types/projects';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	let invitedProject: Projects[] = [];

	onMount(async () => {
		const { data: user } = await supabase.auth.getUser();
		const userId = user.user?.id;

		const { data: projects, error } = await supabase
			.from('projects')
			.select()
			.eq('user_id', userId);

		if (projects) {
			invitedProject = projects;
			invitedProject = invitedProject.filter((item) => item.invited_people?.includes(data.id));
		} else {
			console.error(error);
		}
	});
</script>

<svelte:head>
	<title>Member - {data.name}</title>
</svelte:head>

<header
	class="relative -left-6 -top-6 flex h-[15.625rem] w-[calc(100%+48px)] items-end rounded-b-3xl bg-cover bg-center bg-origin-border object-cover p-6 md:left-0 md:top-0 md:h-[17.1875rem] md:w-full md:rounded-xl md:p-md lg:h-[18.75rem] {!data.banner
		? 'bg-grey-100 dark:bg-grey-800'
		: 'bg-grey-100'}"
	style="background-image: {data.banner
		? 'linear-gradient(180deg, rgba(0, 0, 0, 0) 55.28%, rgba(0, 0, 0, 0.6) 100%),'
		: ''} url({data.banner});"
>
	<a
		href={$currentTeam ? `/app/team/${$currentTeam.id}` : '/app/team'}
		class="absolute left-6 top-6"
	>
		<Back
			className="w-8 h-8 {data.banner ? 'stroke-grey-200' : 'stroke-grey-700 dark:stroke-grey-200'}"
		/>
		<span class="sr-only">Back</span>
	</a>

	{#if data.currentUser}
		<a href="/app/settings/account" class="absolute right-6 top-6">
			<Settings
				className="w-8 h-8 {data.banner
					? 'stroke-grey-200'
					: 'stroke-grey-700 dark:stroke-grey-200'}"
			/>
			<span class="sr-only">Account settings</span>
		</a>
	{/if}

	<div class=" flex items-center gap-lg">
		{#if data.avatar_url}
			<img
				src={data.avatar_url}
				alt="User profile"
				class="aspect-square h-20 w-20 rounded-full object-cover md:h-[6.25rem] md:w-[6.25rem]"
			/>
		{:else}
			<User
				className="w-20 h-20 md:h-[6.25rem] md:w-[6.25rem] {data.banner
					? 'stroke-grey-700 dark:stroke-grey-200 bg-grey-100 dark:bg-grey-800 rounded-full'
					: 'stroke-grey-700 dark:stroke-grey-200'}"
			/>
		{/if}

		<div class="flex flex-col items-start gap-sm">
			<h1
				class="text-lg font-semibold {data.banner
					? 'text-grey-200'
					: 'text-grey-700 dark:text-grey-200'} md:text-xl"
			>
				{data.name}
			</h1>

			{#if data.pronouns}
				<p class="text-base {data.banner ? 'text-grey-200' : 'text-grey-700 dark:text-grey-200'}">
					{data.pronouns}
				</p>
			{/if}

			{#if !data.currentUser}
				<span
					class="font-medium {data.banner ? 'text-grey-200' : 'text-grey-700 dark:text-grey-200'}"
					>Invited to {invitedProject.length} project(s)</span
				>
			{/if}

			{#if data.location}
				<div class="flex items-center gap-md">
					<Community
						className="h-8 w-8 {data.banner
							? 'stroke-grey-200'
							: 'stroke-grey-700 dark:stroke-grey-200'}"
					/>
					<span
						class="font-medium {data.banner ? 'text-grey-200' : 'text-grey-700 dark:text-grey-200'}"
						>{data.location}</span
					>
				</div>
			{/if}
			{#if data.role}
				<div class="flex items-center gap-md">
					<Building
						className="h-8 w-8 {data.banner
							? 'stroke-grey-200'
							: 'stroke-grey-700 dark:stroke-grey-200'}"
					/>
					<span
						class="font-medium {data.banner ? 'text-grey-200' : 'text-grey-700 dark:text-grey-200'}"
						>{data.role}</span
					>
				</div>
			{/if}
		</div>
	</div>
</header>

<div class="md:px-[7.5rem]">
	{#if data.bio}
		<div class="mt-lg lg:w-1/2">
			<p class="font-medium text-grey-700 dark:text-grey-100">{data.bio}</p>
		</div>
	{/if}
	{#if !data.currentUser}
		<section>
			<header>
				<h2 class="text-lg font-semibold text-grey-700 dark:text-grey-200">Projects</h2>
				{#if invitedProject.length > 0}
					<p class="mt-sm font-medium text-grey-700 dark:text-grey-200">
						View and manage what projects {data.name} is apart of.
					</p>
				{/if}
			</header>

			{#if invitedProject.length > 0}
				<div class="mt-md flex grid-cols-2 flex-col flex-wrap gap-lg md:flex-row">
					{#each invitedProject as project}
						<div class="relative">
							<ProjectCard {...project} />
						</div>
					{/each}
				</div>
			{:else}
				<p class="mt-sm font-medium text-grey-700 dark:text-grey-200">
					It looks like you haven't invited {data.name} to any projects.
				</p>
			{/if}
		</section>
	{/if}
</div>
