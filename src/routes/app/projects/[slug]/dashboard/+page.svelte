<script lang="ts">
	import MilestoneItem from '$lib/components/projects/dashboard/MilestoneItem.svelte';
	import TaskItem from '$lib/components/projects/dashboard/TaskItem.svelte';
	import TodayProgress from '$lib/components/projects/dashboard/TodayProgress.svelte';
	import Assigned from '$lib/components/projects/dashboard/workload/assigned/Assigned.svelte';
	import AssignedDark from '$lib/components/projects/dashboard/workload/assigned/AssignedDark.svelte';
	import Tags from '$lib/components/projects/dashboard/workload/tags/Tags.svelte';
	import TagsDark from '$lib/components/projects/dashboard/workload/tags/TagsDark.svelte';
	import { showProjectAside } from '$lib/stores/project';
	import { onDestroy, onMount } from 'svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	let invitedUserIds = data.project?.invite.profiles?.map((item) => item.id) ?? [];
	let invitedUserNames = data.project?.invite.profiles.map((item) => item.name) ?? [];

	let due = data.dashboard?.today?.filter((item) => item.status !== 'done');

	onMount(() => {
		$showProjectAside = false;
	});

	onDestroy(() => {
		$showProjectAside = true;
	});
</script>

<svelte:head>
	<title>{data.project?.project_name} - Dashboard</title>
</svelte:head>

<div class="grid gap-md md:grid-cols-2 md:gap-lg lg:grid-cols-5 lg:gap-2xl">
	<section class="md:col-span-2 lg:col-span-3">
		<header class="mb-sm">
			<h2 class="text-md font-semibold text-grey-800 dark:text-grey-200">Today's Progress</h2>
		</header>

		<TodayProgress today={data.dashboard?.today ?? []} {due} />
	</section>
	<section class="md:col-span-1 md:row-start-3 lg:col-span-2 lg:col-start-4 lg:row-start-1">
		<header>
			<h2 class="text-md font-semibold text-grey-800 dark:text-grey-200">Behind Tasks</h2>
		</header>
		<div class="hidden w-full flex-col gap-md md:flex">
			{#each data.dashboard.behind as behind}
				<TaskItem {...behind} />
			{:else}
				<h2 class="text-grey-800 dark:text-grey-200 font-medium">
					There are no tasks that are overdue.
				</h2>
			{/each}
		</div>
	</section>

	<section
		class="row-start-4 md:col-span-1 md:row-start-3 lg:col-span-2 lg:col-start-1 lg:row-start-2"
	>
		<header>
			<h2 class="text-md font-semibold text-grey-800 dark:text-grey-200">Task Workload</h2>
		</header>

		<div class="flex-wrap items-center lg:flex">
			<section>
				<header>
					<h4 class="my-sm font-semibold text-grey-700 dark:text-grey-300">Tags</h4>
				</header>
				<div class="inline dark:hidden">
					<Tags tasks={data.dashboard?.tasks} />
				</div>
				<div class="hidden dark:inline">
					<TagsDark tasks={data.dashboard?.tasks} />
				</div>
			</section>

			<section>
				<header>
					<h4 class="my-sm font-semibold text-grey-700 dark:text-grey-300">Assigned People</h4>
				</header>
				<div class="inline dark:hidden">
					<Assigned tasks={data.dashboard?.tasks} {invitedUserNames} {invitedUserIds} />
				</div>
				<div class="hidden dark:inline">
					<AssignedDark tasks={data.dashboard?.tasks} {invitedUserNames} {invitedUserIds} />
				</div>
			</section>
		</div>
	</section>

	<section
		class="row-start-3 overflow-hidden md:col-span-2 md:row-start-2 lg:col-span-3 lg:col-start-3 lg:row-start-2"
	>
		<header>
			<h2 class="text-md font-semibold text-grey-800 dark:text-grey-200">Milestone Progress</h2>
		</header>

		<div class="flex w-full flex-nowrap items-start gap-lg overflow-x-auto md:flex-wrap">
			{#each data.dashboard?.milestones as milestone}
				<MilestoneItem {...milestone} />
			{/each}
		</div>
	</section>
</div>
