<script lang="ts">
	import CloseMultiply from '$lib/assets/Close-Multiply.svelte';
	import Search from '$lib/assets/Search.svelte';

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

	$: handleModalStatus(shown);
</script>

<dialog bind:this={dialog} class="bg-grey-100 rounded-2xl p-8 w-2/3 h-1/2 lg:w-1/3 lg:h-2/3">
	<header class="flex items-center">
		<h2 class="font-semibold text-grey-800 text-lg">Edit pinned projects</h2>
		<button on:click={() => (shown = false)} class="ml-auto">
			<CloseMultiply className="stroke-grey-700 w-12 h-12" />
		</button>
	</header>
	<div
		class="font-bold border-2 border-grey-600 border-solid box-border input--text flex items-center gap-md my-md p-md placeholder:text-grey-700 text-grey-700"
	>
		<Search className="stroke-grey-700 w-6 h-6" />
		<input
			type="text"
			placeholder="Search for a project"
			class="bg-grey-200 border-none w-full p-0"
		/>
	</div>

	<div>
		{#each projects as project}
			<label for={project.id} class="input--label">{project.project_name}</label>
			<input id={project.id} type="checkbox" class="input--checkbox" checked={project.pinned} />
		{/each}
	</div>

	<footer class="w-1/2 flex items-center justify-evenly mx-auto mt-auto">
		<button class="button--secondary" on:click={() => (shown = false)}>Cancel</button>
		<button class="button--primary">Update</button>
	</footer>
</dialog>
