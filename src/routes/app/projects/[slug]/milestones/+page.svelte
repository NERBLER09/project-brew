<script>
	import PlusNew from '$lib/assets/Plus-New.svelte';
	import Search from '$lib/assets/Search.svelte';
</script>

<header class="flex items-center">
	<h2 class="text-md font-semibold text-grey-700 dark:text-grey-200 md:text-lg">Milestones</h2>
	<div class="ml-auto flex items-center gap-md lg:gap-2xl">
		<button class="button--primary hidden items-center gap-md md:flex">
			<PlusNew className="h-5 w-5 stroke-grey-200" />
			New Milestone
		</button>

		<a class="button--circle absolute bottom-32 right-8 z-50 md:hidden" href="#">
			<PlusNew className="h-8 w-8 stroke-grey-200" />
			<span class="sr-only">Create a new milestone</span>
		</a>

		<button>
			<Search className="w-8 h-8 md:w-6 md:h-6 stroke-grey-700 dark:stroke-grey-200" />
			<span class="sr-only">Search through milestones</span>
		</button>
	</div>
</header>
