<script>
	import Header from '$lib/components/landing/Header.svelte';
	import Computer from '$lib/assets/Landing-Page/Computer.png';
</script>

<svelte:head>
	<title>Project Brew</title>
</svelte:head>

<Header />

<main class="mx-lg md:mx-52">
	<header class="lg items-center md:flex">
		<div>
			<h1 class="text-2xl font-semibold text-grey-900">Do project management right</h1>
			<p class="my-md text-lg font-semibold text-grey-800">
				Start managing project easily, today for free
			</p>
			<button class="button--primary">Get started (its free)</button>
		</div>

		<img src={Computer} alt="computer on a project's page" class="mt-md md:min-h-[400px]" />
	</header>
</main>
