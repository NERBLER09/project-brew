<script>
	import { settingsPage } from '$lib/stores/ui';
	import { onMount } from 'svelte';

	onMount(() => {
		$settingsPage = 'About';
	});
</script>

<section>
	<header class="flex items-start gap-md">
		<div class="mb-sm h-20 w-20 rounded-xl bg-grey-300" />
		<div>
			<h2 class="text-lg font-semibold text-grey-900 dark:text-grey-100">Project Brew</h2>
			<!-- TODO: Show app version -->
		</div>
	</header>
	<div class="flex flex-col gap-sm">
		<a
			href="https://github.com/NERBLER09/project-brew/issues/new"
			target="_blank"
			rel="noreferrer"
			class="font-medium text-grey-700 dark:text-grey-200">Submit an issue</a
		>
		<a href="/privacy-policy" class="font-medium text-grey-700 dark:text-grey-200">Privacy Policy</a
		>
	</div>
</section>
<section class="mb-md">
	<header>
		<h2 class="text-lg font-semibold text-grey-900 dark:text-grey-100">Credits</h2>
	</header>
	<div>
		<p class="font-medium text-grey-700 dark:text-grey-200">
			Icons sourced from <a
				href="https://github.com/NERBLER09/project-brew/issues/new"
				target="_blank"
				rel="noreferrer"
				class="underline">Ripple Icons</a
			> from Flowbase
		</p>
	</div>
</section>
