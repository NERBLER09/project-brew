<script lang="ts">
	import { goto, invalidate } from '$app/navigation';
	import Back from '$lib/assets/Arrow/Back.svelte';
	import Settings from '$lib/assets/Settings.svelte';
	import ProjectCard from '$lib/components/projects/links/ProjectCard.svelte';
	import AboutTeam from '$lib/components/prompts/team/about/AboutTeam.svelte';
	import TaskList from '$lib/components/team/statistics/due/TaskList.svelte';
	import ProjectItem from '$lib/components/team/statistics/progress/ProjectItem.svelte';
	import TeamMemberLink from '$lib/components/team/TeamMemberLink.svelte';
	import Description from '$lib/components/text/Description.svelte';
	import { currentTeam, userRole } from '$lib/stores/team';
	import { supabase } from '$lib/supabase';
	import { onDestroy } from 'svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	$currentTeam = data.team;
	$userRole = data.role;
	let showAboutDialog = false;

	supabase
		.channel('task-updates')
		.on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'tasks' }, () =>
			invalidate('app:team')
		)
		.subscribe();

	supabase
		.channel('team-member')
		.on(
			'postgres_changes',
			{
				event: 'UPDATE',
				schema: 'public',
				table: 'team_members',
				filter: `team=eq.${data.team.id}`
			},
			() => invalidate('app:team')
		)
		.subscribe();
	supabase.channel('team-delete').on(
		'postgres_changes',
		{
			event: 'DELETE',
			schema: 'public',
			table: 'teams',
			filter: `id=.${data.team.id}`
		},
		() => goto('/app/team')
	);

	onDestroy(() => supabase.removeAllChannels());
</script>

<svelte:head>
	<title>{data.team.name} - Team</title>
</svelte:head>

<header
	class="{!data.team.banner
		? 'static w-full'
		: 'relative -left-6 -top-6 h-[12.5rem] w-[calc(100%+48px)] p-6 md:-left-8 md:-top-8 md:w-[calc(100%+64px)] md:p-8'} rounded-b-3xl bg-cover bg-center bg-origin-border object-cover"
	style="background-image: {data.team.banner
		? 'linear-gradient(0deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.6) 115.18%),'
		: ''} url({data.team.banner});"
>
	<div class="mb-md flex items-center md:mb-sm md:items-start">
		<a class="flex max-w-[calc(100%-3.25rem)] items-center gap-md" href="/app/team">
			<Back
				className="w-8 h-8 min-w-[2rem] min-h-[2rem] aspect-square {data.team.banner
					? 'stroke-grey-200'
					: 'stroke-grey-700 dark:stroke-grey-200'} md:h-10 md:w-10"
			/>
			<h1
				class="w-full text-lg {data.team.banner
					? 'text-grey-200'
					: 'text-grey-700 dark:text-grey-200'} truncate md:text-xl md:font-semibold"
			>
				{data.team.name}
			</h1>
		</a>
		<div class="ml-auto flex items-center gap-md">
			<a href="/app/team/{data.team.id}/about" class="md:hidden">
				<Settings
					className="w-8 h-8 {data.team.banner
						? 'stroke-grey-200'
						: 'stroke-grey-700 dark:stroke-grey-200'}"
				/>
				<span class="sr-only">View or manage team</span>
			</a>
			<button class="hidden md:inline" on:click={() => (showAboutDialog = true)}>
				<Settings
					className="w-8 h-8 {data.team.banner
						? 'stroke-grey-200'
						: 'stroke-grey-700 dark:stroke-grey-200'}"
				/>
				<span class="sr-only">View or manage team</span>
			</button>
		</div>
	</div>

	<div class="md:w-2/3 lg:w-1/2">
		<Description banner={data.team.banner} description={data.team.description} />
	</div>
</header>

<div
	class="md:grid md:grid-cols-2 md:gap-lg lg:grid-cols-4 lg:grid-rows-2 lg:gap-2xl xl:grid-cols-5"
>
	<section class="md:col-span-2 md:col-start-1 lg:col-span-2 lg:row-span-2 xl:col-span-3">
		<header>
			<h2 class="my-md text-lg font-semibold text-grey-900 dark:text-grey-100">
				Here is what needs to get done
			</h2>
		</header>
		{#if data.team.dashboard_settings?.progress}
			<section class="my-md">
				<header>
					<h3 class="text-md font-semibold text-grey-800 dark:text-grey-200">Progress for today</h3>
				</header>

				<div class="mt-md flex w-full flex-nowrap items-start gap-lg overflow-x-auto md:flex-wrap">
					{#each data.team.projects as project}
						<ProjectItem {...project} />
					{:else}
						<p class="font-medium text-grey-700 dark:text-grey-200">
							Progress for each project added to this team will appear here.
						</p>
					{/each}
				</div>
			</section>
		{/if}

		{#if data.team.dashboard_settings?.dueTasks}
			<section class="mb-md">
				<header>
					<h3 class="my-sm text-md font-semibold text-grey-800 dark:text-grey-200">
						Tasks due today
					</h3>
				</header>

				<TaskList />
			</section>
			<section class="mb-md">
				<header>
					<h3 class="my-sm text-md font-semibold text-grey-800 dark:text-grey-200">
						Tasks Due Soon
					</h3>
				</header>

				<TaskList type="soon" />
			</section>
			<section class="mb-md">
				<header>
					<h3 class="my-sm text-md font-semibold text-grey-800 dark:text-grey-200">
						Overdue Tasks
					</h3>
				</header>

				<TaskList type="overdue" />
			</section>
		{/if}
	</section>

	{#if data.team.dashboard_settings.projects}
		<section
			class="my-mb col-span-1 my-md min-w-[18rem] md:col-start-1 lg:col-span-2 lg:col-start-3 lg:row-span-1 lg:row-start-1 xl:col-span-1 xl:col-start-4"
		>
			<header class="my-sm flex items-center">
				<h2 class="text-lg font-semibold text-grey-700 dark:text-grey-200">Projects</h2>
			</header>

			<div class="mt-md flex w-full flex-nowrap items-center gap-lg overflow-x-auto md:flex-wrap">
				{#each data.team.projects as project}
					<ProjectCard {...project} />
				{:else}
					<p class="font-medium text-grey-700 dark:text-grey-200">
						Projects added to this team will appear here.
					</p>
				{/each}
			</div>
		</section>
	{/if}

	{#if data.team.dashboard_settings.members}
		<section
			class="col-span-1 min-w-[18rem] md:col-start-2 lg:col-start-3 lg:row-span-1 lg:row-start-2 xl:col-start-5 xl:row-span-1"
		>
			<header class="my-sm flex items-center">
				<h2 class="text-lg font-semibold text-grey-700 dark:text-grey-200">Members</h2>
				<a href="/app/team/{data.team.id}/about#team" class="ml-auto md:hidden">
					<Settings className="h-8 w-8 stroke-grey-700 dark:stroke-grey-200" />
				</a>

				<button class="ml-auto hidden md:inline" on:click={() => (showAboutDialog = true)}>
					<Settings className="h-8 w-8 stroke-grey-700 dark:stroke-grey-200" />
				</button>
			</header>

			<div class="flex flex-col items-start gap-md">
				{#each data.team.team_members as { user_id }}
					<TeamMemberLink id={user_id} />
				{/each}
			</div>
		</section>
	{/if}
</div>
<AboutTeam bind:shown={showAboutDialog} teamMembers={data.team.team_members} />
