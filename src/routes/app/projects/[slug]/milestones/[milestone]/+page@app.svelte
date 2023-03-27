<script lang="ts">
	import MobileSubPageLayout from '$lib/components/layouts/MobileSubPageLayout.svelte';
	import { currentProject } from '$lib/stores/project';
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<svelte:head>
	<title>{data.milestone.name}</title>
</svelte:head>

<MobileSubPageLayout
	pageName={data.milestone.name}
	previousPage="/app/projects/{$currentProject.id}/milestones"
>
	<header class="hidden md:inline">
		<h1 class="text-2xl font-semibold text-grey-900 dark:text-grey-100">{data.milestone.name}</h1>
	</header>
</MobileSubPageLayout>
