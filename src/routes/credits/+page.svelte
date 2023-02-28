<script>
	import Back from '$lib/assets/Arrow/Back.svelte';
</script>

<svelte:head>
	<title>Project Brew - Credits</title>
</svelte:head>

<header class="relative z-50 p-lg">
	<a class="hidden items-center gap-md md:flex" href="/">
		<div class="h-12 w-12 rounded-lg bg-grey-300" />
		<span class="text-md font-semibold text-grey-800">Project Brew</span>
	</a>

	<a class="flex items-center gap-md md:hidden" href="/">
		<Back className="stroke-grey-900 w-8 h-8" />
		<span class="text-lg text-grey-900">Back</span>
	</a>
</header>

<main class="px-lg">
	<header>
		<h1 class="text-lg font-semibold text-grey-900 md:text-xl">Credits</h1>
		<p class="font-medium text-grey-700 md:w-1/2">
			Thanks to all the developers and mainers of these open source libraries that make Project Brew
			possible.
		</p>
	</header>

	<div class="mt-md px-lg">
		<ul>
			<li class="list-disc font-medium text-grey-700">
				Icons: <a href="https://rippleicons.com/" class="underline">Ripple Icons</a>
			</li>
			<li class="list-disc font-medium text-grey-700 underline">
				<a href="https://kit.svelte.dev/">SvelteKit</a>
			</li>
			<li class="list-disc font-medium text-grey-700 underline">
				<a href="https://tailwindcss.com/">Tailwind</a>
			</li>
			<li class="list-disc font-medium text-grey-700 underline">
				<a href="https://supabase.com/">Supabase</a>
			</li>
			<li class="list-disc font-medium text-grey-700 underline">
				<a href="https://svelte-french-toast.com/">svelte-french-toast</a>
			</li>
		</ul>
	</div>
</main>
