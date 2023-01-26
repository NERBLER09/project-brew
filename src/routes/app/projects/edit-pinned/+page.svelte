<script lang="ts">
	import Check from '$lib/assets/Check.svelte';
	import Search from '$lib/assets/Search.svelte';
	import MobileSubPageLayout from '$lib/components/layouts/MobileSubPageLayout.svelte';

	import { supabase } from '$lib/supabase';
	import { goto } from '$app/navigation';
	import type { PageData } from './$types';

	export let data: PageData;
	let projects = data.all;

	let unfilteredList = data.all;
	let query = '';
	const handleSearch = () => {
		data.all = unfilteredList.filter((value) => value.project_name.includes(query));
	};

	const handleUpdatePins = async () => {
		const { error } = await supabase
			.from('projects')
			.upsert([...projects])
			.select();

		if (error) {
			console.error(error.message);
		} else {
			goto('/app/projects');
		}
	};
</script>

<svelte:head>
	<title>Edit Pinned Projects</title>
</svelte:head>

<MobileSubPageLayout pageName="Edit Pinned Projects" previousPage="/app/projects">
	<p class="font-medium text-grey-700 dark:text-grey-200 pt-sm">
		Chose what projects are displayed on top.
	</p>
	<div
		class="font-bold border-2 border-grey-600 border-solid box-border input--text flex items-center gap-md my-md p-md placeholder:text-grey-700 text-grey-700"
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

	<button class="button--circle bottom-8 right-8 absolute" on:click={handleUpdatePins}>
		<Check className="h-8 w-8 stroke-grey-200" />
		<span class="sr-only">Update pinned projects</span>
	</button>
</MobileSubPageLayout>
