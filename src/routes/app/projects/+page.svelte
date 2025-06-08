<script lang="ts">
	import Down from '$lib/assets/Arrow/Chevron/Down.svelte';
	import Edit from '$lib/assets/Edit.svelte';
	import Filter from '$lib/assets/Filter.svelte';
	import PlusNew from '$lib/assets/Plus-New.svelte';
	import Search from '$lib/assets/Search.svelte';
	import ProjectCard from '$lib/components/projects/links/ProjectCard.svelte';
	import SortDropdown from '$lib/components/projects/sort/SortDropdown.svelte';
	import EditPinPrompt from '$lib/components/prompts/projects/EditPinPrompt.svelte';
	import NewProjectPrompt from '$lib/components/prompts/projects/NewProjectPrompt.svelte';
	import { projectSort, type SortOption } from '$lib/stores/project';
	import { showNewProjectPrompt, showProjectsSort } from '$lib/stores/ui';
	import type { Projects } from '$lib/types/projects';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import Project from '$lib/components/home/Project.svelte';

	export let data: PageData;

	let query = '';
	const unsortedList: any[] = data.all?.map((project: Projects) => ({
		...project,
		searchTerms: `${project.project_name} ${project.description}`
	}));

	let allProjects = unsortedList;

	const handleSearch = () => {
		allProjects = unsortedList;
		allProjects = unsortedList.filter((value) => value.searchTerms.toLowerCase().includes(query));
		allProjects = [...allProjects];
	};

	const handleSort = (sort: SortOption) => {
		switch (sort) {
			case 'a-z':
				allProjects = allProjects.sort((a, b) => {
					if (a.project_name < b.project_name) return -1;
					else if (a.project_name > b.project_name) return 1;
					return 0;
				});
				break;
			case 'z-a':
				allProjects = allProjects.reverse();
				break;
		}
		allProjects = [...allProjects];
	};

	let showEditPinPrompt = false;

	const handleShowEditPinsPrompt = () => {
		showEditPinPrompt = true;
	};

	const handleShowNewProjectPrompt = () => {
		$showNewProjectPrompt = true;
	};

	$: handleSort($projectSort);

	onMount(() => {
		handleSort($projectSort);
	});
</script>

<svelte:head><title>Project Brew - Projects</title></svelte:head>

<header class="items-center md:flex">
	<h1 class="text-lg text-grey-800 dark:text-grey-200 md:text-2xl">Projects</h1>
	<button
		class="button--primary ml-auto hidden items-center gap-md md:flex"
		on:click={handleShowNewProjectPrompt}
	>
		<PlusNew className="h-8 w-8 stroke-grey-200" />
		<span>New project</span>
	</button>

	<a class="button--circle fixed bottom-32 right-8 z-50 md:hidden" href="/app/projects/new">
		<PlusNew className="h-8 w-8 stroke-grey-200" />
		<span class="sr-only">Create a new project</span>
	</a>
</header>

<section class="pt-6">
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
			<span class="sr-only md:not-sr-only">Edit Pinned <span class="sr-only">Projects</span></span>
		</button>
	</header>
	<div class="mt-md flex w-full flex-nowrap items-center gap-lg overflow-x-auto">
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

<section class="mt-lg">
	<header class="flex items-center">
		<h2 class="text-md font-semibold text-grey-800 dark:text-grey-100 md:text-lg">All Projects</h2>
	</header>
	<div class="mb-4 mt-md flex items-center">
		<div class="input--search w-full max-w-[15.625rem] lg:max-w-sm">
			<Search className="stroke-grey-700 w-6 h-6" />
			<input
				type="text"
				placeholder="Search by name"
				class="w-full border-none bg-grey-200 p-0"
				bind:value={query}
				on:keyup={handleSearch}
			/>
		</div>

		<div class="relative ml-auto">
			<!-- Only shown on mobile -->
			<button
				class="flex items-center gap-md p-0 md:hidden"
				on:click={() => ($showProjectsSort = !$showProjectsSort)}
			>
				<Filter
					className="stroke-grey-700 w-8 h-8 dark:stroke-grey-200"
					parentBg="grey-100 dark:stroke-grey-900"
				/>
				<span class="sr-only">Filter projects</span>
			</button>
			<!-- Only shown on desktop -->
			<button
				class="button--secondary hidden items-center gap-md md:flex"
				on:click={() => ($showProjectsSort = !$showProjectsSort)}
			>
				<Down className="stroke-grey-700 dark:stroke-grey-200 w-lg h-lg" />
				<span>Sort: {$projectSort}</span>
			</button>
			{#if $showProjectsSort}
				<div class="absolute right-0 z-40">
					<SortDropdown />
				</div>
			{/if}
		</div>
	</div>
	<div class="flex flex-col gap-lg md:flex-row md:flex-wrap">
		{#each allProjects as project}
			<ProjectCard {...project} />
		{:else}
			<p class="font-medium text-grey-700 dark:text-grey-200">
				To create a new project click on the plus button.
			</p>
		{/each}
	</div>
</section>

<NewProjectPrompt bind:shown={$showNewProjectPrompt} />
<EditPinPrompt bind:shown={showEditPinPrompt} projects={data.all} />
