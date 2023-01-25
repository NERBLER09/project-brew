<script lang="ts">
	import { currentProject } from '$lib/stores/project';
	import { dndzone } from 'svelte-dnd-action';

	import Back from '$lib/assets/Arrow/Back.svelte';
	import CircleInfo from '$lib/assets/Circle-Info.svelte';
	import MoreHorizontal from '$lib/assets/More Horizontal.svelte';
	import PlusNew from '$lib/assets/Plus-New.svelte';
	import ProjectDropdown from '$lib/components/dropdowns/projects/ProjectDropdown.svelte';
	import List from '$lib/components/projects/list/List.svelte';
	import AboutProject from '$lib/components/prompts/about/AboutProject.svelte';
	import Description from '$lib/components/text/Description.svelte';

	import type { PageData } from './$types';
	import { showAboutProjectPrompt } from '$lib/stores/ui';
	import NewList from '$lib/components/form/forms/NewList.svelte';

	export let data: PageData;
	currentProject.set(data);

	let showProjectDropdown = false;

	let createNewList = false;

	const handleDnd = (event) => {
		data.lists = event.detail.items;
	};
</script>

<svelte:head>
	<title>{data.name}</title>
</svelte:head>

<header
	class="min-h-[13.5rem] object-cover bg-origin-border bg-center bg-cover rounded-b-3xl relative -top-6 -left-6 p-6 w-[calc(100%+48px)] md:-top-8 md:-left-8 md:w-[calc(100%+64px)] md:p-8"
	style="background-image: url({data.banner});"
>
	<div class="flex items-center mb-md md:mb-sm md:items-start">
		<a class="flex items-center gap-md" href="/app/projects">
			<Back
				className="w-8 h-8 aspect-square {data.banner
					? 'stroke-grey-200'
					: 'stroke-grey-700'} md:h-10 md:w-10"
			/>
			<h1
				class="w-fit text-lg {data.banner
					? 'text-grey-200'
					: 'text-grey-700'} truncate md:text-xl md:font-semibold"
			>
				{data.name}
			</h1>
		</a>
		<div class="flex items-center gap-md ml-auto">
			<a href="/app/projects/{data.id}/about" class="block md:hidden">
				<CircleInfo className="w-8 h-8 {data.banner ? 'stroke-grey-200' : 'stroke-grey-700'}" />
				<span class="sr-only">View project info</span>
			</a>
			<button class="hidden md:block" on:click={() => ($showAboutProjectPrompt = true)}>
				<CircleInfo className="w-8 h-8 {data.banner ? 'stroke-grey-200' : 'stroke-grey-700'}" />
				<span class="sr-only">View project info</span>
			</button>
			<button on:click={() => (showProjectDropdown = !showProjectDropdown)}>
				<MoreHorizontal className="w-8 h-8 {data.banner ? 'stroke-grey-200' : 'stroke-grey-700'}" />
			</button>
		</div>
	</div>
	<div class="flex flex-wrap gap-md mb-md">
		{#each data.tags as tag}
			<div class="bg-grey-200 py-1 px-2 w-fit rounded">
				<span class="text-grey-700 text-sm font-medium">{tag}</span>
			</div>
		{/each}
	</div>

	<Description banner={data.banner} description={data.description} />
</header>

<section
	class="flex flex-nowrap items-start gap-lg overflow-x-auto md:gap-2xl pb-4"
	use:dndzone={{ items: data.lists, type: 'list', flipDurationMs: 300 }}
	on:finalize={handleDnd}
	on:consider={handleDnd}
>
	{#each data.lists as list (list.id)}
		<List name={list.list_name} id={list.id} status={list.status} />
	{/each}

	<div class="w-[15.625rem] md:w-[18.75rem] lg:w-[25rem] mt-[2.625rem] md:mt-[4.0625rem]">
		{#if createNewList}
			<NewList bind:createNewList />
		{:else}
			<button
				class="button--primary w-full flex items-center gap-md justify-center"
				on:click={() => (createNewList = true)}
			>
				<PlusNew className="w-6 h-6 stroke-grey-200" />
				New List
			</button>
		{/if}
	</div>
</section>

<AboutProject bind:shown={$showAboutProjectPrompt} />

{#if showProjectDropdown}
	<ProjectDropdown bind:visibility={showProjectDropdown} projectId={data.id} />
{/if}
