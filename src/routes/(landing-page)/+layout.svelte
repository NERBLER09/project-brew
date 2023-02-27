<script>
	import Back from '$lib/assets/Arrow/Back.svelte';
	import Logo from '$lib/assets/Logo/Logo.svelte';
</script>

<header class="absolute z-50 p-lg">
	<a class="hidden items-center gap-md md:flex" href="/">
		<Logo className="h-12 w-12 rounded-lg bg-grey-300" />
		<span class="text-md font-semibold text-grey-800">Project Brew</span>
	</a>

	<a class="flex items-center gap-md md:hidden" href="/">
		<Back className="stroke-grey-900 w-8 h-8" />
		<span class="text-lg text-grey-900">Back</span>
	</a>
</header>

<slot />
