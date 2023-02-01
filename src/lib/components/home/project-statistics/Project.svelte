<script lang="ts">
	export let project_name: string | undefined;
	export let id: number | undefined;
</script>

<section class="text-center">
	<header>
		<h3 class="mb-md text-md font-semibold text-grey-700 dark:text-grey-200">{project_name}</h3>
	</header>

	<div
		class="flex aspect-square h-32 w-32 flex-col items-center justify-center gap-sm rounded-full border-8 border-grey-200 dark:border-grey-700"
	>
		<span class="font-bold text-grey-700 dark:text-grey-200">50%</span>
		<span class="font-medium text-grey-700 dark:text-grey-200">Completed</span>
	</div>
</section>
