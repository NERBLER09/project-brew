<script lang="ts">
	import { page } from '$app/stores';
	import Down from '$lib/assets/Arrow/Chevron/Down.svelte';
	import Up from '$lib/assets/Arrow/Chevron/Up.svelte';
	import DashboardHome from '$lib/assets/DashboardHome.svelte';
	import List from '$lib/assets/List.svelte';
	import Milestone from '$lib/assets/Milestone.svelte';
	import Roadmap from '$lib/assets/Roadmap.svelte';
	import Stack from '$lib/assets/Stack.svelte';
	import File from '$lib/assets/File.svelte';
	import { currentProject, showProjectAside } from '$lib/stores/project';
	import Item from './Item.svelte';

	$: currentPage = $page.url.pathname.replace(`/app/projects/${$currentProject.id}/`, '');
	let showPageSwitcher = true;

	let navContainer: HTMLElement;
	const handleAutoClose = (event: Event) => {
		if (!navContainer) return;
		if (!navContainer.contains(event.target)) {
			showPageSwitcher = false;
		}
	};

	page.subscribe((page) => {
		if (page.url.pathname.replace(`/app/projects/${$currentProject.id}/`, '') !== currentPage) {
			showPageSwitcher = false;
		}
	});
</script>

<svelte:window on:click={handleAutoClose} />

<div
	class="flex items-start gap-sm overflow-x-auto overflow-y-clip {$showProjectAside
		? 'md:w-[calc(100%-12.3125rem)]'
		: 'w-full'}"
	bind:this={navContainer}
>
	<nav class="flex items-center md:hidden">
		<button
			on:click={() => (showPageSwitcher = !showPageSwitcher)}
			class="flex items-center gap-sm {showPageSwitcher
				? 'rounded-md bg-grey-200 dark:bg-grey-800'
				: ''}"
		>
			{#if currentPage === 'dashboard'}
				<Item name="Dashboard" page="dashboard" icon={DashboardHome} showFavorite={false} />
			{:else if currentPage === 'milestones'}
				<Item name="Milestones" page="milestones" icon={Milestone} showFavorite={false} />
			{:else if currentPage === 'board'}
				<Item name="Board" page="board" icon={Stack} showFavorite={false} />
			{:else if currentPage === 'list'}
				<Item name="Table" page="list" icon={List} showFavorite={false} />
			{:else if currentPage === 'pages'}
				<Item name="Pages" page="pages" icon={File} showFavorite={false} />
			{/if}

			{#if !showPageSwitcher}
				<Down className="w-8 h-8 stroke-grey-700 dark:stroke-grey-200 md:hidden" />
			{:else}
				<Up className="w-8 h-8 stroke-grey-700 dark:stroke-grey-200 md:hidden" />
			{/if}
			<span class="sr-only">Switch project view</span>
		</button>
		{#if showPageSwitcher}
			<div class="dropdown--container z-50 -translate-x-[24px] translate-y-[calc(100vh-178px)]">
				<Item name="Dashboard" page="dashboard" icon={DashboardHome} />
				<Item name="Milestones" page="milestones" icon={Milestone} />
				<Item name="Board" page="board" icon={Stack} />
				<Item name="Table" page="list" icon={List} />
				<Item name="Pages" page="pages" icon={File} />
				<!-- <Item name="Roadmap" page="roadmap" icon={Roadmap} /> -->
			</div>
		{/if}
	</nav>

	<button on:click={() => (showPageSwitcher = true)} />

	<!-- Only visible on desktop -->
	<nav class="hidden items-center gap-md overflow-x-auto md:flex md:w-full">
		<Item name="Dashboard" page="dashboard" icon={DashboardHome} />
		<Item name="Milestones" page="milestones" icon={Milestone} />
		<Item name="Board" page="board" icon={Stack} />
		<Item name="Table" page="list" icon={List} />
		<Item name="Pages" page="pages" icon={File} />
		<!-- <Item name="Roadmap" page="roadmap" icon={Roadmap} /> -->
	</nav>
</div>
