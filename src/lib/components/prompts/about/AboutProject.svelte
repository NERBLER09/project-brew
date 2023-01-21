<script lang="ts">
	import Back from '$lib/assets/Arrow/Back.svelte';
	import Check from '$lib/assets/Check.svelte';

	import CloseMultiply from '$lib/assets/Close-Multiply.svelte';
	import Edit from '$lib/assets/Edit.svelte';
	import Description from '$lib/components/text/Description.svelte';
	import { currentProject } from '$lib/stores/project';
	export let shown = false;
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

	let inEditMode = false;
</script>

<dialog bind:this={dialog} class="bg-grey-100 rounded-2xl p-8 w-2/3 h-1/2 xl:w-1/3 xl:h-2/3">
	<header
		class="relative -top-8 -left-8 w-[calc(100%+64px)] h-[12.5rem] p-4 flex items-end object-cover rounded-b-3xl bg-cover bg-center"
		style="background-image: url({$currentProject.banner});"
	>
		<h1
			class="w-fit text-lg {$currentProject.banner
				? 'text-grey-200'
				: 'text-grey-700'} truncate pl-6"
		>
			{$currentProject?.name}
		</h1>
		<div class="ml-auto mb-auto flex items-center gap-md">
			{#if inEditMode}
				<button on:click={() => (inEditMode = false)}>
					<Check className="h-8 w-8 stroke-grey-200" />
					<span class="sr-only">Save changes</span>
				</button>
			{:else}
				<button on:click={() => (inEditMode = true)}>
					<Edit className="h-8 w-8 stroke-grey-200" />
					<span class="sr-only">Edit project details</span>
				</button>
			{/if}

			<button on:click={() => (shown = false)}>
				<CloseMultiply
					className=" {$currentProject.banner ? 'stroke-grey-200' : 'stroke-grey-700'} w-12 h-12"
				/>
				<span class="sr-only">Close</span>
			</button>
		</div>
	</header>

	<div>
		<div class="flex flex-wrap gap-md mb-lg">
			{#each $currentProject.tags as tag}
				<div class="bg-grey-200 py-2 px-3 w-fit rounded">
					<span class="text-grey-700 font-medium">{tag}</span>
				</div>
			{/each}
		</div>
		<Description banner="" description={$currentProject.description} />
		<h2 class="text-md font-semibold text-grey-700 mt-md">Team management coming soon.</h2>
	</div>
</dialog>
