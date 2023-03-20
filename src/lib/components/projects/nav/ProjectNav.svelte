<script lang="ts">
	import { page } from '$app/stores';
	import Down from '$lib/assets/Arrow/Chevron/Down.svelte';
	import Up from '$lib/assets/Arrow/Chevron/Up.svelte';
	import DashboardHome from '$lib/assets/DashboardHome.svelte';
	import List from '$lib/assets/List.svelte';
	import Milestone from '$lib/assets/Milestone.svelte';
	import Roadmap from '$lib/assets/Roadmap.svelte';
	import Stack from '$lib/assets/Stack.svelte';
	import { currentProject } from '$lib/stores/project';
	import Item from './Item.svelte';

	$: currentPage = $page.url.pathname.replace(`/app/projects/${$currentProject.id}/`, '');
	let showPageSwitcher = false;

	let navContainer: HTMLElement;
	const handleAutoClose = (event: Event) => {
		if (!navContainer) return;
		if (!navContainer.contains(event.target)) {
			showPageSwitcher = false;
		}
	};

	page.subscribe((page) => {
		showPageSwitcher = false;
	});
</script>

<svelte:window on:click={handleAutoClose} />

<div class="flex items-start gap-sm md:w-[calc(100%-12.3125rem)]" bind:this={navContainer}>
	<nav class="flex items-center md:hidden">
		<button on:click={() => (showPageSwitcher = !showPageSwitcher)}>
			{#if currentPage === 'dashboard'}
				<Item name="Dashboard" page="dashboard" icon={DashboardHome} />
			{:else if currentPage === 'milestones'}
				<Item name="Milestones" page="milestones" icon={Milestone} />
			{:else if currentPage === 'board'}
				<Item name="Board" page="board" icon={Stack} />
			{:else if currentPage === 'list'}
				<Item name="Table" page="list" icon={List} />
			{:else if currentPage === 'roadmap'}
				<Item name="Roadmap" page="roadmap" icon={Roadmap} />
			{/if}
		</button>
		{#if showPageSwitcher}
			<div class="dropdown--container z-50">
				<Item name="Dashboard" page="dashboard" icon={DashboardHome} />
				<Item name="Milestones" page="milestones" icon={Milestone} />
				<Item name="Board" page="board" icon={Stack} />
				<Item name="Table" page="list" icon={List} />
				<Item name="Roadmap" page="roadmap" icon={Roadmap} />
			</div>
		{/if}
	</nav>
	<nav class="hidden items-center gap-md overflow-scroll md:flex">
		<Item name="Dashboard" page="dashboard" icon={DashboardHome} />
		<Item name="Milestones" page="milestones" icon={Milestone} />
		<Item name="Board" page="board" icon={Stack} />
		<Item name="Table" page="list" icon={List} />
		<Item name="Roadmap" page="roadmap" icon={Roadmap} />
	</nav>
	<button on:click={() => (showPageSwitcher = !showPageSwitcher)}>
		{#if !showPageSwitcher}
			<Down className="w-8 h-8 stroke-grey-700 dark:stroke-grey-200 md:hidden" />
		{:else}
			<Up className="w-8 h-8 stroke-grey-700 dark:stroke-grey-200 md:hidden" />
		{/if}
	</button>
</div>
