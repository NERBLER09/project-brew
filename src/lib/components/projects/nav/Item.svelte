<script lang="ts">
	import { currentProject } from '$lib/stores/project';
	import type { ComponentType } from 'svelte';
	import { page as window } from '$app/stores';
	import Favorited from '$lib/assets/Fill/Favorited.svelte';
	import Heart from '$lib/assets/Heart.svelte';
	import { supabase } from '$lib/supabase';

	export let name: string;
	export let page: string;
	export let icon: ComponentType;
	export let showFavorite = true;

	const handleSetAsDefaultView = async () => {
		await supabase.from('projects').update({ default_view: page }).eq('id', $currentProject.id);
		$currentProject.default_view = page;
	};
</script>

<a
	href="/app/projects/{$currentProject.id}/{page}"
	class="group flex items-center gap-md rounded px-md py-sm font-bold text-grey-700 hover:bg-grey-100 dark:text-grey-200 hover:dark:bg-grey-800 {$window.url.pathname.includes(
		page
	)
		? 'md:bg-grey-200 md:dark:bg-grey-700'
		: ''}"
>
	<svelte:component this={icon} className="stroke-grey-700 dark:stroke-grey-200 w-6 h-6" />
	{name}

	{#if showFavorite}
		<div class="ml-auto h-6 w-6 group-hover:block md:ml-0 md:hidden">
			{#if $currentProject.default_view === page}
				<Favorited className="fill-grey-700 dark:fill-grey-200 w-6 h-6" />
			{:else}
				<button on:click={handleSetAsDefaultView}>
					<Heart className="stroke-grey-700 dark:stroke-grey-200 w-6 h-6" />
				</button>
			{/if}
		</div>
	{/if}
</a>
