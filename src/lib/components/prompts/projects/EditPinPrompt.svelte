<script lang="ts">
	import { invalidate } from '$app/navigation';

	import CloseMultiply from '$lib/assets/Close-Multiply.svelte';
	import Search from '$lib/assets/Search.svelte';
	import { supabase } from '$lib/supabase';

	export let shown = false;
	export let projects: any[];
	let dialog: HTMLDialogElement;

	const handleModalStatus = (status: boolean) => {
		if (!dialog) return;
		if (status) {
			shown = true;
			dialog.showModal();
		} else {
			shown = false;
			dialog.close();
		}
	};

	let unfilteredList = projects;
	let query = '';
	const handleSearch = () => {
		projects = unfilteredList.filter((value) => value.project_name.includes(query));
	};

	$: handleModalStatus(shown);

	const handleUpdatePins = async () => {
		let updatedProjects = [];
		for (const project of projects) {
			const temp = project;
			delete temp.tasks;
			delete temp.project_members;
			updatedProjects.push(temp);
		}
		const { error } = await supabase
			.from('projects')
			.upsert([...updatedProjects])
			.select();

		if (error) {
			console.error(error.message);
		} else {
			invalidate('app:all-projects');
			shown = false;
		}
	};
</script>

<dialog
	bind:this={dialog}
	class="h-1/2 w-2/3 rounded-2xl bg-grey-100 p-8 dark:bg-grey-900 xl:h-2/3 xl:w-1/3"
	on:close={() => (shown = false)}
>
	<header class="flex items-center">
		<h2 class="text-lg font-semibold text-grey-800 dark:text-grey-200">Edit pinned projects</h2>
		<button on:click={() => (shown = false)} class="ml-auto">
			<CloseMultiply className="stroke-grey-700 dark:stroke-grey-200 w-12 h-12" />
		</button>
	</header>
	<p class="pt-sm font-medium text-grey-700 dark:text-grey-200">
		Chose what projects are displayed on top.
	</p>
	<div class="input--search my-md p-md">
		<Search className="stroke-grey-700 w-6 h-6" />
		<input
			type="text"
			placeholder="Search for a project"
			class="w-full border-none bg-grey-200 p-0"
			bind:value={query}
			on:keyup={handleSearch}
		/>
	</div>

	<div class="flex flex-col gap-md">
		{#each projects as project}
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

	<footer class="mx-auto mt-lg flex w-1/2 items-center justify-evenly">
		<button class="button--secondary" on:click={() => (shown = false)}>Cancel</button>
		<button class="button--primary" on:click={handleUpdatePins}>Update</button>
	</footer>
</dialog>
