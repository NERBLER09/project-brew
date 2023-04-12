<script lang="ts">
	import TaskItem from '$lib/components/projects/table/TaskItem.svelte';
	import { searchQuery } from '$lib/stores/project';
	import type { PageData } from './$types';
	export let data: PageData;

	let filteredTasks = data.project?.tasks ?? [];

	const handleSearch = (query: string) => {
		filteredTasks = data.project?.tasks ?? [];
		filteredTasks = filteredTasks.filter((item) => item.name.toLowerCase().includes(query));
		filteredTasks = [...filteredTasks];
	};
	$: handleSearch($searchQuery);
</script>

<svelte:head>
	<title>{data.project?.project_name} - List</title>
</svelte:head>

<div class="overflow-x-auto">
	<div class="relative flex flex-nowrap items-start gap-lg pb-4 md:gap-2xl">
		<div class="relative flex items-center">
			<div class="relative mr-md w-[15.625rem]">
				<span class="font-bold text-grey-700 dark:text-grey-300">Name</span>
				<div
					class="absolute right-0 top-0 h-full w-1 rounded-t-full bg-grey-700 dark:bg-grey-300"
				/>
			</div>
			<div class="relative mr-md w-[10.625rem]">
				<span class="font-bold text-grey-700 dark:text-grey-300">Due Date</span>
				<div
					class="absolute right-0 top-0 h-full w-1 rounded-t-full bg-grey-700 dark:bg-grey-300"
				/>
			</div>
			<div class="relative mr-md w-[10.625rem]">
				<span class="font-bold text-grey-700 dark:text-grey-300">Status</span>
				<div
					class="absolute right-0 top-0 h-full w-1 rounded-t-full bg-grey-700 dark:bg-grey-300"
				/>
			</div>
			<div class="relative mr-md w-[10.625rem]">
				<span class="font-bold text-grey-700 dark:text-grey-300">Priority</span>
				<div
					class="absolute right-0 top-0 h-full w-1 rounded-t-full bg-grey-700 dark:bg-grey-300"
				/>
			</div>
			<div class="relative mr-md w-[10.625rem]">
				<span class="font-bold text-grey-700 dark:text-grey-300">Assigned</span>
				<div
					class="absolute right-0 top-0 h-full w-1 rounded-t-full bg-grey-700 dark:bg-grey-300"
				/>
			</div>
			<div class="relative mr-md w-[10.625rem]">
				<span class="font-bold text-grey-700 dark:text-grey-300">Milestone</span>
				<div
					class="absolute right-0 top-0 h-full w-1 rounded-t-full bg-grey-700 dark:bg-grey-300"
				/>
			</div>
			<div class="w-[170px]">
				<span class="font-bold text-grey-700 dark:text-grey-300">Tags</span>
			</div>

			<div class="absolute left-0 -bottom-1 h-1 w-full rounded-full bg-grey-700 dark:bg-grey-300" />
		</div>
	</div>

	<div class="relative flex flex-col flex-nowrap items-start gap-md">
		{#each filteredTasks as task}
			<TaskItem {...task} />
		{/each}
	</div>
</div>
