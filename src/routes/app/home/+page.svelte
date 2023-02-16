<script lang="ts">
	import Bell from '$lib/assets/Bell.svelte';
	import Edit from '$lib/assets/Edit.svelte';
	import PlusNew from '$lib/assets/Plus-New.svelte';
	import User from '$lib/assets/User.svelte';
	import UserDropdown from '$lib/components/dropdowns/UserDropdown.svelte';
	import YourActivity from '$lib/components/home/activity/YourActivity.svelte';
	import ProjectStatistics from '$lib/components/home/project-statistics/ProjectStatistics.svelte';
	import TeamActivity from '$lib/components/home/TeamActivity.svelte';
	import DesktopNotifications from '$lib/components/notifications/DesktopNotifications.svelte';
	import ProjectCard from '$lib/components/projects/links/ProjectCard.svelte';
	import EditPinPrompt from '$lib/components/prompts/projects/EditPinPrompt.svelte';
	import NewProjectPrompt from '$lib/components/prompts/projects/NewProjectPrompt.svelte';
	import { recentlyEdited } from '$lib/stores/project';
	import { showNewProjectPrompt } from '$lib/stores/ui';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	let showUserDropdown = false;
	let showNotificationsDropdown = false;

	let showEditPinPrompt = false;

	const handleShowEditPinsPrompt = () => {
		showEditPinPrompt = true;
	};

	let totalFocusTime = 0;

	onMount(() => {
		totalFocusTime = parseInt(localStorage.getItem('focusTime') || '0');
	});
</script>

<svelte:head>
	<title>Project Brew - Home</title>
</svelte:head>

<header class="flex items-start">
	<!-- Mobile welcome text -->
	<div class="flex flex-col items-start md:hidden">
		<span class="font-medium text-grey-800 dark:text-grey-200">Welcome Back</span>
		<span class="w-1/2 text-lg font-semibold text-grey-900 dark:text-grey-100">{data.name}</span>
	</div>
	<!-- Desktop welcome text -->
	<span
		class="hidden w-1/2 break-words text-grey-900 dark:text-grey-100 md:block md:text-lg lg:text-xl"
		>Welcome Back, <br class="hidden lg:block" /><span class="font-semibold">{data.name}</span
		></span
	>

	<div class="ml-auto flex items-center gap-lg md:gap-xl">
		<button
			class="button--primary hidden items-center gap-md lg:flex"
			on:click={() => ($showNewProjectPrompt = true)}
		>
			<PlusNew className="h-5 w-5" />
			New Project
		</button>

		<a href="/app/notifications" class="md:hidden">
			<Bell className="stroke-grey-700 dark:stroke-grey-200 h-9 w-9 md:w-[2rem] md:h-[2rem]" />
			<span class="sr-only">View current notifications</span>
		</a>

		<div class="relative hidden md:inline">
			<button
				on:click={() => (showNotificationsDropdown = !showNotificationsDropdown)}
				on:blur={() => (showNotificationsDropdown = false)}
			>
				<Bell className="stroke-grey-700 dark:stroke-grey-200 h-8 w-8 md:w-[2rem] md:h-[2rem]" />
				<span class="sr-only">View current notifications</span>
			</button>
			{#if showNotificationsDropdown}
				<DesktopNotifications />
			{/if}
		</div>
		<button class="relative" on:click={() => (showUserDropdown = !showUserDropdown)}>
			{#if data.avatar_url}
				<img
					src={data.avatar_url}
					alt="User profile"
					class="aspect-square h-2xl w-2xl rounded-full object-cover md:h-16 md:w-16"
				/>
			{:else}
				<User className="w-2xl h-2xl stroke-grey-700 dark:stroke-grey-200 md:h-16 md:w-16" />
			{/if}
		</button>
	</div>
	{#if showUserDropdown}
		<UserDropdown bind:visibility={showUserDropdown} />
	{/if}
</header>

<div class="mt-md grid grid-cols-1 gap-md md:grid-cols-2 md:grid-rows-2 md:gap-xl lg:grid-cols-5">
	<YourActivity />

	<ProjectStatistics pinned_projects={data.pinned} />

	<TeamActivity />

	<div class="col-span-2">
		<section>
			<header class="flex items-center">
				<h2 class="text-md font-semibold text-grey-800 dark:text-grey-100 md:text-lg">
					Pinned Projects
				</h2>
				<!-- Shown on mobile -->
				<a
					href="/app/projects/edit-pinned"
					class="button--text ml-auto flex items-center gap-md p-0 md:hidden"
				>
					<Edit className="stroke-grey-700 w-8 h-8 dark:stroke-grey-200" />
					<span class="sr-only">Edit Pinned projects</span>
				</a>
				<!-- Shown on desktop -->
				<button
					class="button--text ml-auto hidden items-center gap-md p-0 md:flex"
					on:click={handleShowEditPinsPrompt}
				>
					<Edit className="stroke-grey-700 dark:stroke-grey-200 w-8 h-8" />
					<span class="hidden xl:inline">Edit pinned <span class="sr-only">projects</span></span>
				</button>
			</header>
			<div class="mt-md flex w-full flex-nowrap items-center gap-lg overflow-x-auto md:flex-wrap">
				{#if data.pinned.length === 0}
					<p class="font-medium text-grey-700 dark:text-grey-200">
						To pin a project click on the edit button.
					</p>
				{/if}
				{#each data.pinned as project}
					<ProjectCard
						project_name={project.project_name}
						id={project.id}
						description={project.description}
						banner={project.banner}
						invited_people={project.invited_people}
					/>
				{/each}
			</div>
		</section>
	</div>

	<section class="col-span-2 hidden md:inline">
		<header>
			<h2 class="text-lg font-semibold text-grey-800 dark:text-grey-100">Jump Back Into</h2>
			<p class="font-medium text-grey-700 dark:text-grey-200">
				Resume working on recently edited projects
			</p>
		</header>

		<div class="mt-md flex w-full flex-nowrap items-center gap-lg overflow-x-auto md:flex-wrap">
			{#each $recentlyEdited as project}
				<ProjectCard
					project_name={project.project_name}
					id={project.id}
					description={project.description}
					banner={project.banner}
					invited_people={project.invited_people}
				/>
			{:else}
				<p class="font-medium text-grey-700 dark:text-grey-200">
					Projects you have recently viewed will show up here
				</p>
			{/each}
		</div>
	</section>

	<section class="col-span-1 hidden md:inline">
		<header>
			<h2 class="text-lg font-semibold text-grey-800 dark:text-grey-100">Focus Minutes</h2>
		</header>
		<div>
			{#if totalFocusTime === 0}
				<p class="font-medium text-grey-700 dark:text-grey-200">
					Your focus time will display here after you complete a focus session
				</p>
			{:else}
				<div class="mt-sm flex flex-col text-center">
					<span class="font-medium text-grey-700 dark:text-grey-200">You've been focusing for</span>
					<span class="mt-md mb-sm text-md font-medium text-grey-700 dark:text-grey-200"
						><span class="font-semibold">{totalFocusTime}</span> minutes</span
					>
					<span class="mb-md font-medium text-grey-700 dark:text-grey-200">today</span>
					<span class="font-medium text-grey-700 dark:text-grey-200">Keep up the great work</span>
				</div>
			{/if}
		</div>
	</section>
</div>

<NewProjectPrompt bind:shown={$showNewProjectPrompt} />
<EditPinPrompt bind:shown={showEditPinPrompt} projects={data.all} />
