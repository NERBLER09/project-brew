<script>
	import Header from '$lib/components/landing/Header.svelte';
</script>

<svelte:head>
	<title>Project Brew</title>
</svelte:head>

<Header />

<section class="mb-md px-lg text-center">
	<header class="mt-md md:mt-lg">
		<h1 class="text-lg font-semibold text-grey-800 sm:text-2xl">Do project management right</h1>
	</header>
	<div class="flex flex-col items-center gap-[10px] text-grey-700 md:mx-auto md:w-1/2">
		<p class="font-medium">
			With Project Brew it is incredibly easy to get started managing projects with your team or by
			yourself.
		</p>
		<p class="font-medium">Do it on the go and at home.</p>
		<p class="font-medium">
			Brew yourself a coffee and start managing projects <span class="underline">right!</span>
		</p>
		<p class="font-medium">
			So, what are you waiting for! Get started for free and get up and running with you and you
			team within minutes.
		</p>
		<a class="button--primary" href="/sign-up">Get Started Today</a>
	</div>
</section>
