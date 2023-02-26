<script>
	import CloseMultiply from '$lib/assets/Close-Multiply.svelte';
	import Menu from '$lib/assets/Menu.svelte';

	let showMobileNav = false;
</script>

<svelte:head>
	<title>Project Brew</title>
</svelte:head>

<header class="flex h-20 items-center bg-grey-100 py-lg px-lg">
	<div class="flex items-center gap-md">
		<div class="h-12 w-12 rounded-lg bg-grey-300" />
		<span class="text-md font-semibold text-grey-800">Project Brew</span>
	</div>
	<nav class="ml-auto hidden items-center gap-md md:flex">
		<a href="/" class="font-bold text-grey-700">About</a>
		<a
			href="https://github.com/nerbler09/project-brew"
			target="__blank"
			class="mr-md font-bold text-grey-700">Github</a
		>
		<a class="button--secondary" href="sign-up">Sign up</a>
		<a class="button--primary" href="/login">Log in</a>
	</nav>

	<div class="ml-auto block items-center md:hidden">
		<button
			on:click={() => (showMobileNav = !showMobileNav)}
			class="absolute right-lg top-6 z-50"
			aria-controls="landing page navigation"
			aria-expanded={showMobileNav}
		>
			<span class="sr-only">Menu</span>
			{#if showMobileNav}
				<CloseMultiply className="stroke-grey-700 h-8 w-8" />
			{:else}
				<Menu className="stroke-grey-700 h-8 w-8" />
			{/if}
		</button>
		<nav
			class="fixed top-0 right-0 ml-auto flex h-screen w-7/12 flex-col items-start justify-end gap-md bg-grey-100 p-6 
			{showMobileNav ? 'translate-x-0' : 'translate-x-full'} transition-all duration-300 ease-out"
		>
			<a href="/" class="font-bold text-grey-700">About</a>
			<a
				href="https://github.com/nerbler09/project-brew"
				target="__blank"
				class="mb-auto font-bold text-grey-700">Github</a
			>
			<a class="button--secondary w-full text-center" href="sign-up">Sign up</a>
			<a class="button--primary w-full text-center" href="/login">Log in</a>
		</nav>
	</div>
</header>

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
