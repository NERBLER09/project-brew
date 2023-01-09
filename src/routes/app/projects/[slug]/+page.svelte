<script lang="ts">
	import Back from '$lib/assets/Arrow/Back.svelte';
	import CircleInfo from '$lib/assets/Circle-Info.svelte';
	import MoreHorizontal from '$lib/assets/More Horizontal.svelte';
	import List from '$lib/components/projects/list/List.svelte';

	import type { PageData } from './$types';

	export let data: PageData;

	console.log(data.lists);
</script>

<header class="h-[13.5rem]">
	<div class="relative z-50">
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
				<CircleInfo className="w-8 h-8 {data.banner ? 'stroke-grey-200' : 'stroke-grey-700'}" />
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
		<div>
			<p
				class="font-medium max-h-[6ch] text-ellipsis overflow-hidden {data.banner
					? 'text-grey-200'
					: 'text-grey-700'} text-sm md:text-base"
			>
				{data.description}
			</p>
			<span class="font-medium {data.banner ? 'text-grey-200' : 'text-grey-700'} text-sm mt-sm"
				>Read more</span
			>
		</div>
	</div>
	<img
		src={data.banner}
		alt="Project banner"
		class="absolute top-0 left-0 h-[15.625rem] w-full md:w-[calc(100%-16.625rem)] md:left-auto md:right-0 object-cover rounded-b-3xl {data.banner
			? 'block'
			: 'hidden'}"
	/>
</header>

<section
	class="flex flex-nowrap items-start gap-lg overflow-x-auto md:gap-2xl pb-4 mt-xl md:mt-2xl"
>
	{#each data.lists as list}
		<List name={list.list_name} />
	{/each}
</section>
