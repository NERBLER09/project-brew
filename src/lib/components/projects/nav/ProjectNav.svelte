<script lang="ts">
	import Down from '$lib/assets/Arrow/Chevron/Down.svelte';
	import DashboardHome from '$lib/assets/DashboardHome.svelte';
	import List from '$lib/assets/List.svelte';
	import Milestone from '$lib/assets/Milestone.svelte';
	import Roadmap from '$lib/assets/Roadmap.svelte';
	import Stack from '$lib/assets/Stack.svelte';
	import Item from './Item.svelte';

	let currentPage = 'dashboard';
	let showPageSwitcher = false;

	let navContainer: HTMLElement;
	const handleAutoClose = (event: Event) => {
		if (!navContainer) return;
		if (!navContainer.contains(event.target)) {
			showPageSwitcher = false;
		}
	};
</script>

<svelte:window on:click={handleAutoClose} />

<div class="flex items-start gap-sm" bind:this={navContainer}>
	<nav class="flex items-center md:hidden">
		<button on:click={() => (showPageSwitcher = !showPageSwitcher)}>
			{#if currentPage === 'dashboard'}
				<Item name="Dashboard" page="#" icon={DashboardHome} />
			{:else if currentPage === 'milestones'}
				<Item name="Milestones" page="#" icon={Milestone} />
			{:else if currentPage === 'board'}
				<Item name="Board" page="#" icon={Stack} />
			{:else if currentPage === 'list'}
				<Item name="List" page="#" icon={List} />
			{:else if currentPage === 'roadmap'}
				<Item name="Roadmap" page="#" icon={Roadmap} />
			{/if}
		</button>
		{#if showPageSwitcher}
			<div class="dropdown--container z-50">
				<Item name="Dashboard" page="#" icon={DashboardHome} />
				<Item name="Milestones" page="#" icon={Milestone} />
				<Item name="Board" page="#" icon={Stack} />
				<Item name="List" page="#" icon={List} />
				<Item name="Roadmap" page="#" icon={Roadmap} />
			</div>
		{/if}
	</nav>
	<nav class="hidden items-center gap-md overflow-scroll md:flex">
		<Item name="Dashboard" page="#" icon={DashboardHome} />
		<Item name="Milestones" page="#" icon={Milestone} />
		<Item name="Board" page="#" icon={Stack} />
		<Item name="List" page="#" icon={List} />
		<Item name="Roadmap" page="#" icon={Roadmap} />
	</nav>
	<button on:click={() => (showPageSwitcher = !showPageSwitcher)}>
		<Down className="w-8 h-8 stroke-grey-700 dark:stroke-grey-200 md:hidden" />
	</button>
</div>
