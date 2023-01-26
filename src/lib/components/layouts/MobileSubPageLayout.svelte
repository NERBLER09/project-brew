<script lang="ts">
	import Back from '$lib/assets/Arrow/Back.svelte';
	import { showMobileNav } from '$lib/stores/ui';
	import { onDestroy, onMount } from 'svelte';

	export let pageName: string;
	export let previousPage: string = '/app/home';

	onMount(() => {
		$showMobileNav = false;
	});

	onDestroy(() => {
		$showMobileNav = true;
	});
</script>

<header class="block md:hidden">
	<a class="flex items-center gap-md" href={previousPage}>
		<Back className="w-8 h-8 aspect-square stroke-grey-800 dark:stroke-grey-200" />
		<h1 class="w-fit text-lg text-grey-900 truncate dark:text-grey-200">{pageName}</h1>
	</a>
</header>

<slot />
