<script lang="ts">
	import { invalidate } from '$app/navigation';

	import CloseMultiply from '$lib/assets/Close-Multiply.svelte';
	import Edit from '$lib/assets/Edit.svelte';
	import Image from '$lib/assets/Image.svelte';
	import Trash from '$lib/assets/Trash.svelte';
	import NewTagsInput from '$lib/components/projects/edit/NewTagsInput.svelte';
	import Description from '$lib/components/text/Description.svelte';

	import { currentProject } from '$lib/stores/project';
	import { supabase } from '$lib/supabase';

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
	let newProjectName = $currentProject.name;
	let newProjectDescription = $currentProject.description;
	let newProjectTags: any[] = $currentProject?.tags;
	let newCoverURL = $currentProject.banner;
	let newCoverFile: File;

	const handleUpdateProject = async () => {
		inEditMode = false;
		const { data, error } = await supabase
			.from('projects')
			.update({
				project_name: newProjectName,
				description: newProjectDescription,
				tags: newProjectTags
			})
			.eq('id', $currentProject.id)
			.select();

		console.error(error);

		if (data) {
			$currentProject = data[0];
			$currentProject.tags = JSON.parse(data[0]?.tags) || [];
			$currentProject.name = data[0]?.project_name;
		}

		invalidate('app:project');
	};
	const handleRemoveCover = () => {
		newCoverURL = '';
	};
</script>

<dialog bind:this={dialog} class="bg-grey-100 rounded-2xl p-8 w-2/3 h-1/2 xl:w-1/3 xl:h-2/3">
	<header
		class="relative -top-8 -left-8 w-[calc(100%+64px)] p-6 flex items-end object-cover rounded-b-3xl bg-cover bg-center {!$currentProject.banner
			? 'w-fit'
			: 'h-[12.5rem]'}"
		style="background-image: url({!inEditMode ? $currentProject.banner : newCoverURL});"
	>
		{#if !inEditMode}
			<h1
				class="w-fit text-lg {$currentProject.banner ? 'text-grey-200' : 'text-grey-700'} truncate"
			>
				{$currentProject?.name}
			</h1>
		{:else}
			<h1
				class="w-fit text-lg {newCoverURL ? 'text-grey-200' : 'text-grey-700'} truncate"
				contenteditable="true"
				bind:textContent={newProjectName}
			>
				{$currentProject?.name}
			</h1>
		{/if}

		<div class="ml-auto mb-auto flex items-center gap-md">
			{#if inEditMode}
				<button on:click={() => (inEditMode = false)}>
					<Trash className="h-8 w-8 {newCoverURL ? 'stroke-grey-200' : 'stroke-grey-700'}" />
					<span class="sr-only">Discard changes</span>
				</button>
			{:else}
				<button on:click={() => (inEditMode = true)}>
					<Edit
						className="h-8 w-8 {$currentProject.banner ? 'stroke-grey-200' : 'stroke-grey-700'}"
					/>
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
			{#if inEditMode}
				<NewTagsInput bind:newTags={newProjectTags} />
			{:else}
				{#each $currentProject.tags as tag}
					<div class="bg-grey-200 py-2 px-3 w-fit rounded">
						<span class="text-grey-700 font-medium">{tag}</span>
					</div>
				{/each}
			{/if}
		</div>

		{#if !inEditMode}
			<Description banner="" description={$currentProject.description} />
			<p class="font-medium text-grey-700 mt-md">Team management coming soon.</p>
		{:else}
			<label for="description-input" class="input--label mb-sm">Edit the project description</label>
			<textarea
				name="description"
				class="input--text resize-none h-36 w-full"
				placeholder="Enter a brief description"
				bind:value={newProjectDescription}
			/>
		{/if}
	</div>
	{#if inEditMode}
		<section class="mt-md">
			<header>
				<h2 class="text-grey-900 text-md font-semibold">Cover Properties</h2>
			</header>
			{#if !$currentProject.banner}
				<button class="button--secondary flex items-center justify-center gap-md w-full">
					<Image className="stroke-grey-700 w-6 h-6" />
					Set a project cover
				</button>
			{:else if $currentProject.banner}
				<button class="button--primary flex items-center justify-center gap-md w-full">
					<Image className="stroke-grey-200 w-6 h-6" />
					Update project cover
				</button>
				<button
					class="button--secondary flex items-center justify-center gap-md w-full mt-sm"
					on:click={handleRemoveCover}
				>
					<Trash className="stroke-grey-700 w-6 h-6" />
					Remove cover
				</button>
			{/if}
		</section>

		<footer class="w-1/2 flex items-center justify-around mx-auto mt-xl gap-md">
			<button class="button--secondary" on:click={() => (inEditMode = false)}>Cancel</button>
			<button class="button--primary" on:click={handleUpdateProject}>Save</button>
		</footer>
	{/if}
</dialog>