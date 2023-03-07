<script lang="ts">
	import Back from '$lib/assets/Arrow/Back.svelte';
	import CircleInfo from '$lib/assets/Circle-Info.svelte';
	import MoreHorizontal from '$lib/assets/More Horizontal.svelte';
	import Description from '$lib/components/text/Description.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<svelte:head>
	<title>{data.team.name} - Team</title>
</svelte:head>

<header
	class="relative -top-6 -left-6 max-h-[18.75rem] {data.banner
		? 'h-fit'
		: 'h-fit'} w-[calc(100%+48px)] rounded-b-3xl bg-cover bg-center bg-origin-border object-cover p-6 md:-top-8 md:-left-8 md:w-[calc(100%+64px)] md:p-8"
	style="background-image: {data.team.banner
		? 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.6) 115.18%),'
		: ''} url({data.team.banner});"
>
	<div class="mb-md flex items-center md:mb-sm md:items-start">
		<a class="flex w-[calc(100%-100px)] items-center gap-md" href="/app/team">
			<Back
				className="w-8 h-8 min-w-[2rem] min-h-[2rem] aspect-square {data.team.banner
					? 'stroke-grey-200'
					: 'stroke-grey-700 dark:stroke-grey-200'} md:h-10 md:w-10"
			/>
			<h1
				class="w-full text-lg {data.team.banner
					? 'text-grey-200'
					: 'text-grey-700 dark:text-grey-200'} truncate md:text-xl md:font-semibold"
			>
				{data.team.name}
			</h1>
		</a>
		<div class="ml-auto flex items-center gap-md">
			<div>
				<CircleInfo
					className="w-8 h-8 {data.team.banner
						? 'stroke-grey-200'
						: 'stroke-grey-700 dark:stroke-grey-200'}"
				/>
				<span class="sr-only">View project info</span>
			</div>
			<div>
				<button>
					<MoreHorizontal
						className="w-8 h-8 {data.team.banner
							? 'stroke-grey-200'
							: 'stroke-grey-700 dark:stroke-grey-200'}"
					/>
				</button>
			</div>
		</div>
	</div>

	<div class="md:w-2/3 lg:w-1/2">
		<Description banner={data.team.banner} description={data.team.description} />
	</div>
</header>
