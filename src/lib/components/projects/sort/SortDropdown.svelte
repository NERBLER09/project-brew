<script>
	import { projectSort } from '$lib/stores/project';

	import { showProjectsSort } from '$lib/stores/ui';

	const handleAZSort = () => {
		$projectSort = 'a-z';
		$showProjectsSort = !$showProjectsSort;
	};

	const handleZASort = () => {
		$projectSort = 'z-a';
		$showProjectsSort = !$showProjectsSort;
	};
</script>

<div
	class="bg-grey-100 dark:bg-grey-800 rounded-lg flex flex-col p-md gap-4 min-w-max border-2 border-grey-700 w-[12.5rem] md:w-[10.3125rem] md:border-t-0"
>
	<header class="md:hidden">
		<h3 class="text-grey-700 dark:text-grey-200 font-semibold text-md">Sort Options</h3>
	</header>

	<div class="flex flex-col gap-md items-start justify-start">
		<p class="text-grey-700 dark:text-grey-200 font-medium md:hidden">Sorting by: {$projectSort}</p>
		<button class="dropdown--item w-full" on:click={handleAZSort}>
			<span class="dropdown--label">A-Z</span>
		</button>

		<button class="dropdown--item w-full" on:click={handleZASort}>
			<span class="dropdown--label">Z-A</span>
		</button>
	</div>
</div>
