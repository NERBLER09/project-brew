<script>
	import { tasksCompletedThisDay } from '$lib/stores/project';
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
			<div class="flex items-center gap-md">
				<span class="w-[2ch] text-sm font-bold text-grey-600 dark:text-grey-400">30</span>
				<div class="h-1 w-full rounded-full bg-grey-400 dark:bg-grey-700" />
			</div>
		</div>

		<div class="absolute bottom-2 left-[1.75rem] flex h-full w-[calc(100%-1.75rem)] justify-around">
			<div class="h-full w-1 rounded-full bg-accent-light" />
			<div class="h-full w-1 rounded-full bg-accent-light" />
			<div class="h-full w-1 rounded-full bg-accent-light" />
			<div class="h-full w-1 rounded-full bg-accent-light" />
			<div class="h-full w-1 rounded-full bg-accent-light" />
			<div class="h-full w-1 rounded-full bg-accent-light" />
		</div>

		<div class="ml-auto flex w-[calc(100%-1.75rem)] items-center justify-between">
			<div><span class="text-sm font-medium text-grey-700 dark:text-grey-200">Jan 01</span></div>
			<div><span class="text-sm font-medium text-grey-700 dark:text-grey-200">Jan 02</span></div>
			<div><span class="text-sm font-medium text-grey-700 dark:text-grey-200">Jan 03</span></div>
			<div><span class="text-sm font-medium text-grey-700 dark:text-grey-200">Jan 04</span></div>
			<div><span class="text-sm font-medium text-grey-700 dark:text-grey-200">Jan 05</span></div>
			<div><span class="text-sm font-medium text-grey-700 dark:text-grey-200">Jan 06</span></div>
			<div><span class="text-sm font-bold text-grey-700 dark:text-grey-200">Today</span></div>
		</div>
	</div>
</section>
