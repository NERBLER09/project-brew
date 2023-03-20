<script lang="ts">
	import { currentProject } from '$lib/stores/project';
	import type { ComponentType } from 'svelte';
	import { page as window } from '$app/stores';

	export let name: string;
	export let page: string;
	export let icon: ComponentType;
</script>

<a
	href="/app/projects/{$currentProject.id}/{page}"
	class="flex items-center gap-md rounded px-md py-sm font-bold text-grey-700 hover:bg-grey-100 dark:text-grey-200 hover:dark:bg-grey-800 {$window.url.pathname.includes(
		page
	)
		? 'md:bg-grey-200 md:dark:bg-grey-700'
		: ''}"
>
	<svelte:component this={icon} className="stroke-grey-700 dark:stroke-grey-200 w-6 h-6" />
	{name}
</a>
