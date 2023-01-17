<script lang="ts">
	import Back from '$lib/assets/Arrow/Back.svelte';
	import CircleInfo from '$lib/assets/Circle-Info.svelte';
	import MoreHorizontal from '$lib/assets/More Horizontal.svelte';
	import List from '$lib/components/projects/list/List.svelte';
	import AboutProject from '$lib/components/prompts/about/AboutProject.svelte';
	import Description from '$lib/components/text/Description.svelte';
	import { currentProject } from '$lib/stores/project';

	import type { PageData } from './$types';

	export let data: PageData;
	currentProject.set(data);

	let showAboutPrompt = false;
</script>

<header
	class="min-h-[13.5rem] object-cover rounded-b-3xl relative -top-6 -left-6 p-4 w-[calc(100%+48px)] md:-top-8 md:-left-8 md:w-[calc(100%+64px)] md:p-8"
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
			<button class="hidden md:block" on:click={() => (showAboutPrompt = true)}>
				<CircleInfo className="w-8 h-8 {data.banner ? 'stroke-grey-200' : 'stroke-grey-700'}" />
				<span class="sr-only">View project info</span>
			</button>
			<MoreHorizontal className="w-8 h-8 {data.banner ? 'stroke-grey-200' : 'stroke-grey-700'}" />
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
	class="flex flex-nowrap items-start gap-lg overflow-x-auto md:gap-2xl pb-4 mt-xl md:mt-2xl"
>
	{#each data.lists as list}
		<List name={list.list_name} id={list.id} project_id={list.project} />
	{/each}
</section>

<AboutProject shown={showAboutPrompt} />
