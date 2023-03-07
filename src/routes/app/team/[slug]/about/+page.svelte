<script lang="ts">
	import Back from '$lib/assets/Arrow/Back.svelte';
	import type { PageData } from './$types';
	import { onDestroy, onMount } from 'svelte';
	import { showMobileNav } from '$lib/stores/ui';

	export let data: PageData;

	onMount(() => {
		$showMobileNav = false;
	});

	onDestroy(() => {
		$showMobileNav = true;
	});
</script>

<header
	class="relative -top-6 -left-6 flex w-[calc(100%+48px)] items-end rounded-b-3xl bg-cover bg-center object-cover p-6 
    {!data.team.banner ? 'static w-[calc(100%+48px)]' : 'h-[12.5rem]'}"
	style="background-image: {data.team.banner
		? 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.6) 115.18%),'
		: ''} url({data.team.banner});"
>
	<a class="flex w-full items-center gap-md" href="/app/team/{data.team.id}">
		<Back
			className="min-w-[2rem] min-h-[2rem] h-8 w-8 aspect-square {data.team.banner
				? 'stroke-grey-200'
				: 'stroke-grey-700 dark:stroke-grey-200'}"
		/>
		<h1
			class="text-lg {data.team.banner
				? 'max-w-[calc(100%-80px)] text-grey-200'
				: 'w-full text-grey-700 dark:text-grey-200'} truncate"
		>
			{data.team.name}
		</h1>
	</a>
</header>
