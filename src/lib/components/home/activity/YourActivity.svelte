<script lang="ts">
	import { tasksCompletedThisDay } from '$lib/stores/project';
	import Graph from './Graph.svelte';
</script>

<section
	class="col-span-2 row-span-1 row-start-3 hidden md:block lg:col-span-5 lg:col-start-1 lg:row-start-2 xl:col-start-3"
>
	<header>
		<h2 class="font-semibold text-grey-800 dark:text-grey-100 md:text-lg">Your Activity</h2>
	</header>
	<div>
		<p class="my-md font-medium text-grey-700 dark:text-grey-200">
			You've completed {$tasksCompletedThisDay} tasks today.
		</p>
	</div>
	<Graph />
</section>
