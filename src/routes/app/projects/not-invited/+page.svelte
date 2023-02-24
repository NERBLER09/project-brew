<script>
	import Back from '$lib/assets/Arrow/Back.svelte';
	import MobileSubPageLayout from '$lib/components/layouts/MobileSubPageLayout.svelte';
</script>

<MobileSubPageLayout pageName="No Access" previousPage="/app/projects">
	<section
		class="absolute top-1/3 left-0 flex flex-col items-center gap-md px-6 text-center md:static md:h-screen md:justify-center"
	>
		<header>
			<h1 class="text-lg font-semibold text-grey-800 dark:text-grey-100">Oops!</h1>

			<p class="font-medium text-grey-700 dark:text-grey-200">
				You are trying to access a project that you haven't been invited to.
			</p>
		</header>

		<button class="button--primary">Request access</button>
		<p class="font-medium text-grey-700 dark:text-grey-200">If you believe this to be an error:</p>
		<button class="button--secondary">Submit a bug report</button>

		<div class="mt-md hidden flex-col items-center gap-md md:flex">
			<hr class="w-28 border-grey-700 dark:border-grey-200" />
			<a href="/app/projects" class="button--text flex items-center gap-md">
				<Back className="h-5 w-5 stroke-grey-70 dark:stroke-grey-200" />
				Go back
			</a>
		</div>
	</section>
</MobileSubPageLayout>
