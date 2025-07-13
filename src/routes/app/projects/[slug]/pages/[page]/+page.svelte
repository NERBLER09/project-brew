<script>
	import CloseMultiply from '$lib/assets/Close-Multiply.svelte';
	import MobileSubPageLayout from '$lib/components/layouts/MobileSubPageLayout.svelte';
	import { currentProject } from '$lib/stores/project';
	import { slide } from 'svelte/transition';
</script>

<div
	class="absolute left-0 top-0 h-[calc(100vh-6.25rem)] w-screen bg-white p-lg dark:bg-grey-900 md:left-auto md:right-0 md:w-3/5 lg:w-1/2"
	transition:slide
>
	<MobileSubPageLayout
		pageName="Sample Page"
		previousPage="/app/projects/{$currentProject.id}/pages"
	/>
	<div class="hidden items-center gap-sm md:flex">
		<a href="/app/projects/{$currentProject.id}/pages">
			<span class="sr-only">Close this page</span>
			<CloseMultiply className="w-8 h-8 aspect-square stroke-grey-800 dark:stroke-grey-200" />
		</a>
		<h2 class="text-md font-semibold text-grey-700 dark:text-grey-200 md:text-lg">Sample Page</h2>
	</div>
</div>
