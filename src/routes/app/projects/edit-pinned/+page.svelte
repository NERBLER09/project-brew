<script lang="ts">
	import Check from '$lib/assets/Check.svelte';
	import Search from '$lib/assets/Search.svelte';
	import MobileSubPageLayout from '$lib/components/layouts/MobileSubPageLayout.svelte';

	import { supabase } from '$lib/supabase';
	import { invalidate } from '$app/navigation';
	import type { PageData } from './$types';

	export let data: PageData;
	let projects = data.all;

	const memberedProjects = projects.map((value) => {
		return value.project_members.find((item) => item.project === value.id);
	});

	projects = projects.map((item) => {
		const member = memberedProjects.find((project) => item.id === project.project);
		item.pinned = member.pinned;
		return item;
	});
	projects = [...projects];

	let unfilteredList = projects;
	let query = '';
	const handleSearch = () => {
		projects = unfilteredList.filter((value) => value.project_name.includes(query));
	};

	const handleUpdatePins = async () => {
		const updatedTeamMember = [];
		for (const project of projects) {
			const member = memberedProjects.filter((item) => item.project === project.id)[0];
			member.pinned = project.pinned;
			updatedTeamMember.push(member);
		}

		await supabase
			.from('project_members')
			.upsert([...updatedTeamMember])
			.select();

		invalidate('app:all-projects');
	};
</script>

<svelte:head>
	<title>Edit Pinned Projects</title>
</svelte:head>

<MobileSubPageLayout pageName="Edit Pinned Projects" previousPage="/app/projects">
	<p class="pt-sm font-medium text-grey-700 dark:text-grey-200">
		Chose what projects are displayed on top.
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
			<label for={project.id} class="input--label">
				<span class="input--label">{project.project_name}</span>
				<input
					id={project.id}
					type="checkbox"
					class="input--checkbox"
					bind:checked={project.pinned}
				/>
			</label>
		{/each}
	</div>

	<button class="button--circle absolute bottom-8 right-8" on:click={handleUpdatePins}>
		<Check className="h-8 w-8 stroke-grey-200" />
		<span class="sr-only">Update pinned projects</span>
	</button>
</MobileSubPageLayout>
