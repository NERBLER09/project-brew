<script>
	import Back from '$lib/assets/Arrow/Back.svelte';
	import Check from '$lib/assets/Check.svelte';
	import CloseMultiply from '$lib/assets/Close-Multiply.svelte';
	import Edit from '$lib/assets/Edit.svelte';
	import Description from '$lib/components/text/Description.svelte';
	import { currentProject } from '$lib/stores/project';
	import { showMobileNav } from '$lib/stores/ui';
	import { supabase } from '$lib/supabase';
	import { onDestroy, onMount } from 'svelte';

	let inEditMode = false;
	let newProjectName = $currentProject.name;
	let newProjectDescription = $currentProject.description;

	onMount(() => {
		$showMobileNav = false;
	});

	onDestroy(() => {
		$showMobileNav = true;
	});

	const handleUpdateProject = async () => {
		inEditMode = false;
		const { data, error } = await supabase
			.from('projects')
			.update({ project_name: newProjectName, description: newProjectDescription })
			.eq('id', $currentProject.id)
			.select();

		console.error(error);

		if (data) {
			$currentProject = data[0];
			$currentProject.tags = JSON.parse(data[0]?.tags) || [];
			$currentProject.name = data[0]?.project_name;
		}
	};
</script>

<svelte:head>
	<title>About {$currentProject.name}</title>
</svelte:head>

<section>
	<header
		class="relative -top-6 -left-6 w-[calc(100%+48px)] p-4 flex items-end object-cover rounded-b-3xl bg-cover bg-center {!$currentProject.banner
			? 'w-fit static'
			: 'h-[12.5rem]'}"
		style="background-image: url({$currentProject.banner});"
	>
		{#if !inEditMode}
			<a class="flex items-center gap-md" href="/app/projects/{$currentProject.id}">
				<Back
					className="w-8 h-8 aspect-square {$currentProject.banner
						? 'stroke-grey-200'
						: 'stroke-grey-700'}"
				/>
				<h1
					class="w-fit text-lg {$currentProject.banner
						? 'text-grey-200'
						: 'text-grey-700'} truncate"
				>
					{$currentProject?.name}
				</h1>
			</a>
		{:else}
			<h1
				class="w-fit text-lg {$currentProject.banner ? 'text-grey-200' : 'text-grey-700'} truncate"
				contenteditable="true"
				bind:textContent={newProjectName}
			>
				{$currentProject?.name}
			</h1>
		{/if}

		{#if inEditMode}
			<button class="ml-auto mb-auto z-50" on:click={() => (inEditMode = false)}>
				<CloseMultiply
					className="h-8 w-8 {$currentProject.banner ? 'stroke-grey-200' : 'stroke-grey-700'}"
				/>
				<span class="sr-only">Drop changes</span>
			</button>
		{:else}
			<button class="ml-auto mb-auto" on:click={() => (inEditMode = true)}>
				<Edit
					className="h-8 w-8 {$currentProject.banner ? 'stroke-grey-200' : 'stroke-grey-700'}"
				/>
				<span class="sr-only">Edit project details</span>
			</button>
		{/if}
	</header>
	<div>
		<div class="flex flex-wrap gap-md mb-lg">
			{#each $currentProject.tags as tag}
				<div class="bg-grey-200 py-2 px-3 w-fit rounded">
					<span class="text-grey-700 font-medium">{tag}</span>
				</div>
			{/each}
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
		<button class="button--circle bottom-8 right-8 absolute" on:click={handleUpdateProject}>
			<Check className="h-8 w-8 stroke-grey-200" />
			<span class="sr-only">Save changes</span>
		</button>
	{/if}
</section>
