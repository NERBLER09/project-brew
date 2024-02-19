<script lang="ts">
	import Bell from '$lib/assets/Bell.svelte';
	import Edit from '$lib/assets/Edit.svelte';
	import PlusNew from '$lib/assets/Plus-New.svelte';
	import User from '$lib/assets/User.svelte';
	import UserDropdown from '$lib/components/dropdowns/UserDropdown.svelte';
	import YourActivity from '$lib/components/home/activity/YourActivity.svelte';
	import DesktopNotifications from '$lib/components/notifications/DesktopNotifications.svelte';
	import EditPinPrompt from '$lib/components/prompts/projects/EditPinPrompt.svelte';
	import NewProjectPrompt from '$lib/components/prompts/projects/NewProjectPrompt.svelte';
	import { showNewProjectPrompt } from '$lib/stores/ui';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import Search from '$lib/assets/Search.svelte';
	import Project from '$lib/components/home/Project.svelte';
	import DailyActivity from '$lib/components/home/daily-activity/DailyActivity.svelte';

	export let data: PageData;

	let showUserDropdown = false;
	let showNotificationsDropdown = false;

	let showEditPinPrompt = false;

	const handleShowEditPinsPrompt = () => {
		showEditPinPrompt = true;
	};

	let totalFocusTime = 0;

	let userDropdownContainer: HTMLElement;
	let notificationsContainer: HTMLElement;

	const handleAutoCloseDropdown = (event: Event) => {
		if (!userDropdownContainer.contains(event.target)) {
			showUserDropdown = false;
		}

		if (!notificationsContainer.contains(event.target)) {
			showNotificationsDropdown = false;
		}
	};

	onMount(() => {
		totalFocusTime = parseInt(localStorage.getItem('focusTime') || '0');
	});
</script>

<svelte:head>
	<title>Project Brew - Home</title>
</svelte:head>

<svelte:window on:click={handleAutoCloseDropdown} />

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

		<a href="search" class="md:hidden">
			<Search className="stroke-grey-700 dark:stroke-grey-200 h-9 w-9 md:w-[2rem] md:h-[2rem]" />
			<span class="sr-only">Search</span>
		</a>

		<a href="/app/notifications" class="md:hidden">
			<Bell className="stroke-grey-700 dark:stroke-grey-200 h-9 w-9 md:w-[2rem] md:h-[2rem]" />
			<span class="sr-only">View current notifications</span>
		</a>

		<div class="relative hidden md:inline" bind:this={notificationsContainer}>
			<button on:click={() => (showNotificationsDropdown = !showNotificationsDropdown)}>
				<Bell className="stroke-grey-700 dark:stroke-grey-200 h-8 w-8 md:w-[2rem] md:h-[2rem]" />
				<span class="sr-only">View current notifications</span>
			</button>
			{#if showNotificationsDropdown}
				<DesktopNotifications notifications={data.notifications} />
			{/if}
		</div>
		<button
			class="relative"
			on:click={() => (showUserDropdown = !showUserDropdown)}
			bind:this={userDropdownContainer}
		>
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

<div
	class="mt-md grid grid-cols-1 gap-md md:grid-cols-2 md:grid-rows-[max-content] md:gap-xl lg:grid-cols-5"
>
	<DailyActivity bind:tasks={data.tasks} />

	<YourActivity />

	<!-- <ProjectStatistics pinned_projects={data.pinned} /> -->

	<!-- <TeamActivity /> -->

	<div class="col-span-5">
		<section>
			<header class="flex items-center">
				<a
					href="/app/projects/edit-pinned"
					class="button--text mr-md flex items-center gap-md p-0 md:hidden"
				>
					<Edit className="stroke-grey-700 w-8 h-8 dark:stroke-grey-200" />
					<span class="sr-only">Edit Pinned projects</span>
				</a>
				<!-- Shown on desktop -->
				<button
					class="button--text mr-md hidden items-center gap-md p-0 md:flex"
					on:click={handleShowEditPinsPrompt}
				>
					<Edit className="stroke-grey-700 dark:stroke-grey-200 w-8 h-8" />
					<span class="sr-only">Edit pinned projects</span>
				</button>

				<h2 class="text-md font-semibold text-grey-800 dark:text-grey-100 md:text-lg">
					Pinned Projects
				</h2>
				<!-- Shown on mobile -->
			</header>
			<div class="mt-md flex w-full flex-nowrap items-center gap-lg overflow-x-auto md:flex-wrap">
				{#if data.pinned.length === 0}
					<p class="font-medium text-grey-700 dark:text-grey-200">
						To pin a project click on the edit button.
					</p>
				{/if}
				{#each data.pinned as project}
					<Project {...project} />
				{/each}
			</div>
		</section>
	</div>

	<!-- <section class="col-span-1 hidden w-fit md:inline"> -->
	<!-- 	<header> -->
	<!-- 		<h2 class="text-lg font-semibold text-grey-800 dark:text-grey-100">Focus Minutes</h2> -->
	<!-- 	</header> -->
	<!-- 	<div> -->
	<!-- 		{#if totalFocusTime === 0} -->
	<!-- 			<p class="font-medium text-grey-700 dark:text-grey-200"> -->
	<!-- 				Your focus time will display here after you complete a focus session -->
	<!-- 			</p> -->
	<!-- 		{:else} -->
	<!-- 			<div class="mt-sm flex flex-col text-center"> -->
	<!-- 				<span class="font-medium text-grey-700 dark:text-grey-200">You've been focusing for</span> -->
	<!-- 				<span class="mb-sm mt-md text-md font-medium text-grey-700 dark:text-grey-200" -->
	<!-- 					><span class="font-semibold">{totalFocusTime}</span> minute{totalFocusTime > 1 -->
	<!-- 						? 's' -->
	<!-- 						: ''}</span -->
	<!-- 				> -->
	<!-- 				<span class="mb-md font-medium text-grey-700 dark:text-grey-200">today</span> -->
	<!-- 				<span class="font-medium text-grey-700 dark:text-grey-200">Keep up the great work</span> -->
	<!-- 			</div> -->
	<!-- 		{/if} -->
	<!-- 	</div> -->
	<!-- </section> -->
</div>

<NewProjectPrompt bind:shown={$showNewProjectPrompt} />
<EditPinPrompt bind:shown={showEditPinPrompt} projects={data.all} />
