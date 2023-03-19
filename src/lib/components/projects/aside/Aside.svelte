<script>
	import Filter from '$lib/assets/Filter.svelte';
	import Search from '$lib/assets/Search.svelte';
	import Sort from '$lib/assets/Sort.svelte';
</script>

<div class="ml-auto flex items-center gap-md">
	<button>
		<Search className="w-8 h-8 md:w-6 md:h-6 stroke-grey-700 dark:stroke-grey-200" />
		<span class="sr-only">Search through tasks</span>
	</button>
	<button class="flex items-center gap-sm">
		<Filter
			className="w-8 h-8 md:w-6 md:h-6 stroke-grey-700 dark:stroke-grey-200"
			parentBg="white dark:stroke-grey-900"
		/>
		<span class="sr-only font-medium text-grey-700 dark:text-grey-200 md:not-sr-only">Filter</span>
	</button>
	<button class="flex items-center gap-sm">
		<Sort className="w-8 h-8 md:w-6 md:h-6 stroke-grey-700 dark:stroke-grey-200" />
		<span class="sr-only font-medium text-grey-700 dark:text-grey-200 md:not-sr-only">Sort</span>
	</button>
</div>
