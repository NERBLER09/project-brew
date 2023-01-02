<script>
	import Back from '$lib/assets/Arrow/Back.svelte';
</script>

<header class="p-lg z-50 absolute">
	<a class="hidden md:flex items-center gap-md" href="/">
		<div class="w-12 h-12 bg-grey-300 rounded-lg" />
		<span class="text-md font-bold text-grey-800">Project Brew</span>
	</a>

	<a class="flex items-center gap-md md:hidden" href="/">
		<Back className="stroke-grey-900 w-8 h-8" />
		<span class="text-lg text-grey-900">Back</span>
	</a>
</header>

<slot />
