<script>
	import Back from '$lib/assets/Arrow/Back.svelte';
	import MobileSubPageLayout from '$lib/components/layouts/MobileSubPageLayout.svelte';
</script>

<MobileSubPageLayout pageName="No Access" previousPage="/app/projects">
	<section
		class="text-center absolute top-1/3 left-0 px-6 flex flex-col gap-md items-center md:static md:h-screen md:justify-center"
	>
		<header>
			<h1 class="text-lg text-grey-800 font-semibold">Oops!</h1>

			<p class="text-grey-700 font-medium">
				You are trying to access a project that you haven't been invited to.
			</p>
		</header>

		<button class="button--primary">Request access</button>
		<p class="text-grey-700 font-medium">If you believe this to be an error:</p>
		<button class="button--secondary">Submit a bug report</button>

		<div class="hidden md:flex flex-col items-center gap-md mt-md">
			<hr class="border-grey-700 w-28" />
			<a href="/app/projects" class="button--text flex items-center gap-md">
				<Back className="h-5 w-5 stroke-grey-700" />
				Go back
			</a>
		</div>
	</section>
</MobileSubPageLayout>
