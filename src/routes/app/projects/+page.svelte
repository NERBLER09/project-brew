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
	import type { PageData } from './$types';

	export let data: PageData;

	let query = '';
	let allProjects = data.all;

	const handleSearch = () => {
		allProjects = data.all;
		allProjects = data.all.filter((value) => value.project_name?.includes(query));
		allProjects = [...allProjects];
	};

	let showEditPinPrompt = false;
	let showNewProjectPrompt = false;

	const handleShowEditPinsPrompt = () => {
		showEditPinPrompt = true;
	};

	const handleShowNewProjctPrompt = () => {
		showNewProjectPrompt = true;
	};
</script>

<svelte:head><title>Project Brew - Projects</title></svelte:head>

<header class="flex items-center">
	<h1 class="text-lg md:text-2xl text-grey-800">Projects</h1>
	<button
		class="hidden button--primary md:flex items-center gap-md ml-auto"
		on:click={handleShowNewProjctPrompt}
	>
		<PlusNew className="h-8 w-8 stroke-grey-200" />
		<span>New project</span>
	</button>

	<a class="md:hidden button--circle bottom-32 right-8 absolute z-50" href="/app/projects/new">
		<PlusNew className="h-8 w-8 stroke-grey-200" />
		<span class="sr-only">Create a new project</span>
	</a>
</header>

<section class="pt-6">
	<header class="flex items-center">
		<h2 class="font-semibold text-grey-800 text-md md:text-lg">Pinned Projects</h2>
		<!-- Shown on mobile -->
		<a
			href="/app/projects/edit-pinned"
			class="button--text flex items-center gap-md ml-auto p-0 md:hidden"
		>
			<Edit className="stroke-grey-700 w-8 h-8" />
			<span class="sr-only">Edit Pinned projects</span>
		</a>
		<!-- Shown on desktop -->
		<button
			href="/app/projects/edit-pinned"
			class="button--text md:flex items-center gap-md ml-auto p-0 hidden"
			on:click={handleShowEditPinsPrompt}
		>
			<Edit className="stroke-grey-700 w-8 h-8" />
			<span class="sr-only md:not-sr-only">Edit Pinned <span class="sr-only">Projects</span></span>
		</button>
	</header>
	<div class="mt-md flex items-center flex-wrap gap-lg">
		{#if data.pinned.length === 0}
			<p class="text-grey-700 font-medium">To pin a project click on the edit button.</p>
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

<section class="mt-lg">
	<header class="flex items-center">
		<h2 class="font-semibold text-grey-800 text-md md:text-lg">All Projects</h2>
	</header>
	<div class="flex items-center">
		<div
			class="font-bold border-2 border-grey-600 border-solid box-border input--text flex items-center gap-md my-lg p-md placeholder:text-grey-700 text-grey-700 w-2/3"
		>
			<Search className="stroke-grey-700 w-6 h-6" />
			<input
				type="text"
				placeholder="Search by name"
				class="bg-grey-200 border-none w-full p-0"
				bind:value={query}
				on:keyup={handleSearch}
			/>
		</div>

		<div class="relative ml-auto">
			<button class="flex items-center gap-md p-0 md:hidden">
				<Filter className="stroke-grey-700 w-8 h-8" parentBg="grey-100" />
				<span class="sr-only">Filter projects</span>
			</button>
			<button class="hidden md:flex items-center gap-md  button--secondary">
				<Down className="stroke-grey-700 w-lg h-lg" />
				<span>Sort: Z-A</span>
			</button>
			<div class="absolute right-0 z-40">
				<SortDropdown />
			</div>
		</div>
	</div>
	<div class="flex flex-wrap gap-lg">
		{#if data.all.length === 0}
			<p class="text-grey-700 font-medium">To pin a project click on the edit button.</p>
		{/if}
		{#each allProjects as project}
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

<NewProjectPrompt bind:shown={showNewProjectPrompt} />
<EditPinPrompt bind:shown={showEditPinPrompt} projects={data.all} />
