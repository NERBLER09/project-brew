<script lang="ts">
	import PlusNew from '$lib/assets/Plus-New.svelte';
	import Search from '$lib/assets/Search.svelte';
	import Sort from '$lib/assets/Sort.svelte';
	import MilestoneLink from '$lib/components/projects/milestones/MilestoneLink.svelte';
	import MilestonePageSorting from '$lib/components/projects/milestones/MilestonePageSorting.svelte';
	import NewMilestonePrompt from '$lib/components/projects/milestones/NewMilestonePrompt.svelte';

	import { currentProject, showProjectAside } from '$lib/stores/project';
	import { onDestroy, onMount } from 'svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	let showSearch = false;
	let query = '';
	let milestones = data.milestones;
	let searchContainer: HTMLElement;

	let showSort = false;

	interface MilestoneSorting {
		endDate: 'asc' | 'dsc' | null;
	}
	export let milestoneSorting: MilestoneSorting = {
		endDate: null
	};

	const handleMilestoneSearch = (query: string) => {
		milestones = data.milestones;
		milestones = milestones.filter((item) => item.name.toLowerCase().includes(query));
	};

	const handleSorting = (sortOptions: MilestoneSorting) => {
		if (sortOptions.endDate === 'asc') {
			milestones = milestones.sort((item) => {
				return new Date().getTime() - new Date(item.end_date).getTime();
			});
		} else if (sortOptions.endDate === 'dsc') {
			milestones = milestones.sort((item) => {
				return new Date(item.end_date).getTime() - new Date().getTime();
			});
		}

		milestones = milestones.sort((item) => item?.completed);
	};

	const handleAutoCloseSearch = (event: Event) => {
		if (!searchContainer.contains(event.target)) {
			showSearch = false;
			query = '';
		}
	};

	$: handleMilestoneSearch(query);
	$: handleSorting(milestoneSorting);

	let showNewMilestonePrompt = false;

	onMount(() => {
		$showProjectAside = false;
	});

	onDestroy(() => {
		$showProjectAside = true;
	});
</script>

<svelte:head>
	<title>{$currentProject.project_name} - Milestones</title>
</svelte:head>

<svelte:window on:click={handleAutoCloseSearch} />

<header class="mb-md flex items-center">
	<h2 class="text-md font-semibold text-grey-700 dark:text-grey-200 md:text-lg">Milestones</h2>
	<div class="ml-auto flex items-center gap-lg">
		<a
			class="button--circle absolute bottom-32 right-8 z-50 md:hidden"
			href="/app/projects/{$currentProject.id}/milestones/new"
		>
			<PlusNew className="h-8 w-8 stroke-grey-200" />
			<span class="sr-only">Create a new milestone</span>
		</a>

		<div class="relative flex items-center" bind:this={searchContainer}>
			{#if showSearch}
				<input
					type="text"
					class="input--text absolute right-0 top-8 z-50 md:top-6 lg:static lg:mr-md"
					bind:value={query}
					placeholder="Search for a milestone"
				/>
			{/if}
			<button on:click={() => (showSearch = !showSearch)}>
				<Search className="w-8 h-8 md:w-6 md:h-6 stroke-grey-700 dark:stroke-grey-200" />
				<span class="sr-only">Search through milestones</span>
			</button>
		</div>

		<div class="md:relative">
			<button class="flex items-center gap-sm" on:click={() => (showSort = true)}>
				<Sort className="w-8 h-8 md:w-6 md:h-6 stroke-grey-700 dark:stroke-grey-200" />
				<span class="sr-only font-medium text-grey-700 dark:text-grey-200 md:not-sr-only">
					Sort
				</span>
			</button>

			{#if showSort}
				<MilestonePageSorting bind:milestoneSorting />
			{/if}
		</div>
		<button
			class="lg:button--primary button--circle hidden items-center gap-md md:flex"
			on:click={() => (showNewMilestonePrompt = true)}
		>
			<PlusNew className="h-6 w-6 stroke-grey-200" />
			<span class="md:sr-only lg:not-sr-only"> New Milestone </span>
		</button>
	</div>
</header>

<div class="flex flex-wrap gap-lg">
	{#each milestones as milestone}
		<MilestoneLink {...milestone} />
	{/each}
</div>
<NewMilestonePrompt
	bind:shown={showNewMilestonePrompt}
	invited_users={data.project?.invite.profiles}
/>
