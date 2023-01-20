<script>
	import Back from '$lib/assets/Arrow/Back.svelte';
	import Check from '$lib/assets/Check.svelte';
	import Edit from '$lib/assets/Edit.svelte';
	import User from '$lib/assets/User.svelte';
	import Description from '$lib/components/text/Description.svelte';
	import { currentProject } from '$lib/stores/project';

	let inEditMode = false;
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
		<a class="flex items-center gap-md" href="/app/projects/{$currentProject.id}">
			<Back
				className="w-8 h-8 aspect-square {$currentProject.banner
					? 'stroke-grey-200'
					: 'stroke-grey-700'}"
			/>
			<h1
				class="w-fit text-lg {$currentProject.banner ? 'text-grey-200' : 'text-grey-700'} truncate"
			>
				{$currentProject?.name}
			</h1>
		</a>
		{#if inEditMode}
			<button class="ml-auto mb-auto" on:click={() => inEditMode = false}>
				<Check className="h-8 w-8 stroke-grey-200" />
				<span class="sr-only">Edit project details</span>
			</button>
		{:else}
			<button class="ml-auto mb-auto" on:click={() => inEditMode = true}>
				<Edit className="h-8 w-8 stroke-grey-200" />
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
		<Description banner="" description={$currentProject.description} />
		<p class="font-medium text-grey-700 mt-md">Team management coming soon.</p>
	</div>
</section>
