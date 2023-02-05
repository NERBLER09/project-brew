<script lang="ts">
	import { tasksCompletedThisDay } from '$lib/stores/project';
	import { onMount } from 'svelte';

	let currentDate: string;

	const mockData = [
		{
			date: '1-1-2023',
			formattedDate: 'Jan 01',
			tasksCompleted: 8
		},
		{
			date: '2-1-2023',
			formattedDate: 'Jan 02',
			tasksCompleted: 17
		},
		{
			date: '3-1-2023',
			formattedDate: 'Jan 03',
			tasksCompleted: 10
		},
		{
			date: '4-1-2023',
			formattedDate: 'Jan 04',
			tasksCompleted: 20
		},
		{
			date: '5-1-2023',
			formattedDate: 'Jan 05',
			tasksCompleted: 10
		},
		{
			date: '6-1-2023',
			formattedDate: 'Jan 06',
			tasksCompleted: 25
		},
		{
			date: '5-2-2023',
			formattedDate: 'Feb 05',
			tasksCompleted: 5
		}
	];

	onMount(() => {
		const date = new Date();

		let day = date.getDate();
		let month = date.getMonth() + 1;
		let year = date.getFullYear();

		currentDate = `${day}-${month}-${year}`;
	});
</script>

<section class="col-span-2 row-span-1 hidden md:block">
	<header>
		<h2 class="font-semibold text-grey-800 dark:text-grey-100 md:text-lg">Your Activity</h2>
	</header>
	<div>
		<p class="my-md font-medium text-grey-700 dark:text-grey-200">
			You've completed {$tasksCompletedThisDay} tasks today.
		</p>
	</div>

	<div class="relative h-[calc(100%-5.5625rem)]">
		<div class="flex h-full flex-col-reverse justify-around text-end">
			<div class="flex items-center gap-md">
				<span class="w-[2ch] text-sm font-bold text-grey-600 dark:text-grey-400">0</span>
				<div class="h-1 w-full rounded-full bg-grey-400 dark:bg-grey-700" />
			</div>
			<div class="flex items-center gap-md">
				<span class="w-[2ch] text-sm font-bold text-grey-600 dark:text-grey-400">5</span>
				<div class="h-1 w-full rounded-full bg-grey-400 dark:bg-grey-700" />
			</div>
			<div class="flex items-center gap-md">
				<span class="w-[2ch] text-sm font-bold text-grey-600 dark:text-grey-400">10</span>
				<div class="h-1 w-full rounded-full bg-grey-400 dark:bg-grey-700" />
			</div>
			<div class="flex items-center gap-md">
				<span class="w-[2ch] text-sm font-bold text-grey-600 dark:text-grey-400">15</span>
				<div class="h-1 w-full rounded-full bg-grey-400 dark:bg-grey-700" />
			</div>
			<div class="flex items-center gap-md">
				<span class="w-[2ch] text-sm font-bold text-grey-600 dark:text-grey-400">20</span>
				<div class="h-1 w-full rounded-full bg-grey-400 dark:bg-grey-700" />
			</div>
			<div class="flex items-center gap-md">
				<span class="w-[2ch] text-sm font-bold text-grey-600 dark:text-grey-400">25</span>
				<div class="h-1 w-full rounded-full bg-grey-400 dark:bg-grey-700" />
			</div>
		</div>

		<div class="ml-auto flex w-[calc(100%-1.75rem)] items-center justify-between">
			{#each mockData as { date, formattedDate, tasksCompleted }}
				<div class="flex flex-col items-center">
					<div
						class="max-h-[calc(100%-1rem)] min-h-[0.5rem] w-1 rounded-full bg-accent-light absolute bottom-2"
						style="height: {(tasksCompleted / 25) * 100}%"
					/>
					{#if date === currentDate}
						<span class="text-sm font-bold text-grey-700 dark:text-grey-200">Today</span>
					{:else}
						<span class="text-sm font-medium text-grey-700 dark:text-grey-200">{formattedDate}</span
						>
					{/if}
				</div>
			{/each}
		</div>
	</div>
</section>
