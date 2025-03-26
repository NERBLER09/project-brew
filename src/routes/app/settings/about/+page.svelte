<script>
	import { env } from '$env/dynamic/public';
	import Logo from '$lib/assets/Logo/Logo.svelte';
	import { settingsPage } from '$lib/stores/ui';
	import { onMount } from 'svelte';

	onMount(() => {
		$settingsPage = 'About';
	});
</script>

<section>
	<header class="mb-md flex items-start gap-lg">
		<Logo className="mb-sm h-20 w-20 rounded-xl dark:bg-grey-100" />
		<div>
			<h2 class="text-lg font-semibold text-grey-900 dark:text-grey-100">Project Brew</h2>
			<p class="mt-sm font-medium text-grey-700 dark:text-grey-200">Version {env.PUBLIC_VERSION}</p>
		</div>
	</header>
	<div class="flex flex-col gap-sm">
		<a
			href="https://github.com/NERBLER09/project-brew/issues/new"
			target="_blank"
			rel="noreferrer"
			class="font-medium text-grey-700 dark:text-grey-200">Submit an issue</a
		>
		<a
			href="/privacy-policy"
			class="font-medium text-grey-700 dark:text-grey-200"
			target="_blank"
			rel="noreferrer"
			>Privacy Policy
		</a>
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

		<a href="/credits" class="my-sm font-medium text-grey-700 underline dark:text-grey-200"
			>See full list of credits</a
		>
	</div>
</section>
