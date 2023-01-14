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
	class="bg-grey-100 rounded-lg flex flex-col p-md gap-4 min-w-max border-2 border-grey-700 w-[12.5rem] md:w-[10.3125rem] md:border-t-0 md:rounded-t-none"
>
	<header class="md:hidden">
		<h3 class="text-grey-700 font-semibold text-md">Sort Options</h3>
	</header>

	<div class="flex flex-col gap-md items-start justify-start">
		<p class="text-grey-700 font-medium md:hidden">Sorting by: [sort option]</p>
		<button
			class="font-bold text-grey-700 p-sm m-sm hover:bg-grey-200 active:bg-grey-200 w-full text-start rounded-sm"
			on:click={handleAZSort}>A-Z</button
		>
		<button
			class="font-bold text-grey-700 p-sm m-sm hover:bg-grey-200 active:bg-grey-200 w-full text-start rounded-sm"
			on:click={handleZASort}>Z-A</button
		>
	</div>
</div>
