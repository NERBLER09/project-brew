<script>
	import Back from '$lib/assets/Arrow/Back.svelte';
	import CloseMultiply from '$lib/assets/Close-Multiply.svelte';
	import { currentProject } from '$lib/stores/project';
	import { slide } from 'svelte/transition';
</script>

<div
	class="absolute left-0 top-0 z-50 h-full w-screen bg-grey-100 p-lg dark:bg-grey-800 md:left-auto md:right-0 md:w-3/5 md:border-l md:border-l-grey-700 md:dark:border-l-grey-300 lg:w-1/2"
	transition:slide
>
	<header class="block md:hidden">
		<a class="flex items-center gap-md" href="/app/projects/{$currentProject.id}/pages">
			<Back className="w-8 h-8 aspect-square stroke-grey-800 dark:stroke-grey-200" />
			<h1 class="w-fit truncate text-lg text-grey-900 dark:text-grey-200">Sample Page</h1>
		</a>
	</header>
	<div class="hidden items-center gap-sm md:flex">
		<a href="/app/projects/{$currentProject.id}/pages">
			<span class="sr-only">Close this page</span>
			<CloseMultiply className="w-8 h-8 aspect-square stroke-grey-800 dark:stroke-grey-200" />
		</a>
		<h2 class="text-md font-semibold text-grey-700 dark:text-grey-200 md:text-lg">Sample Page</h2>
	</div>

	<hr />
</div>
