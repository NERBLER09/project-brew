<script lang="ts">
	import { goto } from '$app/navigation';

	import Search from '$lib/assets/Search.svelte';
	import Trash from '$lib/assets/Trash.svelte';

	import MobileSubPageLayout from '$lib/components/layouts/MobileSubPageLayout.svelte';
	import { focusProject } from '$lib/stores/focus';
	import type { Projects } from '$lib/types/projects';
	import type { PageData } from './$types';

	export let data: PageData;

	const handleSelectFocusProject = (project: Projects) => {
		$focusProject = project;
		goto('/app/focus');
	};

	let unfilteredList = data.all;
	let query = '';
	const handleSearch = () => {
		data.all = unfilteredList.filter((value) => value.project_name.includes(query));
	};
</script>

<MobileSubPageLayout pageName="Select A Focus Project" previousPage="/app/focus">
	<p class="pt-sm font-medium text-grey-700 dark:text-grey-200">
		Select a project that you want to focus on for this session
	</p>
	<div class="input--search my-md p-md">
		<Search className="stroke-grey-700 w-6 h-6" />
		<input
			type="text"
			placeholder="Search by name"
			class="w-full border-none bg-grey-200 p-0"
			bind:value={query}
			on:keyup={handleSearch}
		/>
	</div>
	<div class="flex flex-col gap-md">
		{#each data.all as project}
			<button
				class="input--label button--text w-full pl-2 text-start"
				on:click={() => handleSelectFocusProject(project)}
			>
				{project.project_name}
			</button>
		{/each}

		{#if $focusProject}
			<button
				class="button--circle absolute bottom-8 right-8"
				on:click={() => ($focusProject = null)}
			>
				<Trash className="h-8 w-8 stroke-grey-200" />
				<span class="sr-only">Update pinned projects</span>
			</button>
		{/if}
	</div>
</MobileSubPageLayout>
