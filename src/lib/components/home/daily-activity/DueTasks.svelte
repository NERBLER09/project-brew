<script lang="ts">
	import OpenShare from '$lib/assets/Open-Share.svelte';

	export let tasks;
	const date = new Date();
	const today = date.toISOString().split('T')[0];
	const dueTasks = tasks.filter((item) => {
		return item.due_date === today && item.status !== 'done';
	});
</script>

<div
	class="col-span-5 row-start-2 flex flex-col gap-md lg:col-span-2 lg:col-start-3 lg:row-start-1 lg:flex-wrap xl:col-span-4 xl:col-start-2"
>
	<header>
		<h2 class="text-md font-semibold text-grey-800 dark:text-grey-100">Due tasks</h2>
	</header>
	{#each dueTasks as task}
		<div class="flex items-center rounded bg-grey-100 p-md dark:bg-grey-800">
			<span class="font-medium text-grey-700 dark:text-grey-200">{task.name}</span>
			<a href="/app/projects/{task.project}" class="ml-auto">
				<OpenShare className="stroke-grey-700 dark:stroke-grey-200 h-9 w-9" />
			</a>
		</div>
	{:else}
		<span class="my-md font-medium text-grey-700 dark:text-grey-200"
			>There are no tasks that are due today.</span
		>
	{/each}
</div>
