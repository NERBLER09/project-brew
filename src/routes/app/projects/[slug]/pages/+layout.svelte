<script lang="ts">
	import { goto, invalidate } from '$app/navigation';
	import { page } from '$app/stores';
	import PlusNew from '$lib/assets/Plus-New.svelte';
	import PageLink from '$lib/components/projects/pages/PageLink.svelte';
	import { showProjectAside } from '$lib/stores/project';
	import { supabase } from '$lib/supabase';
	import type { LayoutData } from './$types';

	export let data: LayoutData;

	$showProjectAside = false;

	const createNewPage = async () => {
		const { data: result } = await supabase
			.from('pages')
			.insert({ project: data.project.id })
			.select();
		invalidate('project:pages');

		goto(`/app/projects/${data.id}/pages/${result[0].id}`);
	};
</script>

<header class="mb-md items-center md:flex">
	<h2 class="text-md font-semibold text-grey-700 dark:text-grey-200 md:text-lg">Pages</h2>

	<button
		class="button--circle md:button--primary fixed bottom-32 right-[25px] z-50 ml-auto items-center gap-md md:static md:bottom-auto md:right-auto md:flex"
		on:click={createNewPage}
	>
		<PlusNew className="h-8 w-8 md:h-6 md:w-6 stroke-grey-200" />
		<span class="hidden md:block">New Page</span>
	</button>
</header>

<div class="flex flex-col gap-lg md:flex-row md:flex-wrap">
	{#each data.pages as page}
		<PageLink {...page} />
	{/each}
</div>

<slot data={data.pages} />
