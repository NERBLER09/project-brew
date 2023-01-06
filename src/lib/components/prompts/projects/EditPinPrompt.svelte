<script lang="ts">
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
		const { error } = await supabase
			.from('projects')
			.upsert([...projects])
			.select();

		if (error) {
			console.error(error.message);
		} else {
			shown = false;
		}
	};
</script>

<dialog bind:this={dialog} class="bg-grey-100 rounded-2xl p-8 w-2/3 h-1/2 xl:w-1/3 xl:h-2/3">
	<header class="flex items-center">
		<h2 class="font-semibold text-grey-800 text-lg">Edit pinned projects</h2>
		<button on:click={() => (shown = false)} class="ml-auto">
			<CloseMultiply className="stroke-grey-700 w-12 h-12" />
		</button>
	</header>
	<p class="font-medium text-grey-700 pt-sm">Chose what projects are displayed on top.</p>
	<div
		class="font-bold border-2 border-grey-600 border-solid box-border input--text flex items-center gap-md my-md p-md placeholder:text-grey-700 text-grey-700"
	>
		<Search className="stroke-grey-700 w-6 h-6" />
		<input
			type="text"
			placeholder="Search for a project"
			class="bg-grey-200 border-none w-full p-0"
			bind:value={query}
			on:keyup={handleSearch}
		/>
	</div>

	<div>
		{#each projects as project}
			<label for={project.id} class="input--label">{project.project_name}</label>
			<input
				id={project.id}
				type="checkbox"
				class="input--checkbox"
				bind:checked={project.pinned}
			/>
		{/each}
	</div>

	<footer class="w-1/2 flex items-center justify-evenly mx-auto mt-auto">
		<button class="button--secondary" on:click={() => (shown = false)}>Cancel</button>
		<button class="button--primary" on:click={handleUpdatePins}>Update</button>
	</footer>
</dialog>
