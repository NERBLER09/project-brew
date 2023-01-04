<script lang="ts">
	import Back from '$lib/assets/Arrow/Back.svelte';

	export let pageName: string;
	export let previousPage: string = '/app/home';
</script>

<header class="block md:hidden">
	<a class="flex items-center gap-md" href={previousPage}>
		<Back className="w-8 h-8 aspect-square stroke-grey-800" />
		<h1 class="w-fit text-lg text-grey-900 truncate">{pageName}</h1>
	</a>
</header>

<slot />
