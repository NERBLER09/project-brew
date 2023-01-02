<script>
	import CloseMultiply from '$lib/assets/Close-Multiply.svelte';
	import Menu from '$lib/assets/Menu.svelte';

	let showMobileNav = false;
</script>

<header class="h-20 bg-grey-100 py-lg flex items-center px-lg">
	<div class="flex items-center gap-md">
		<div class="w-12 h-12 bg-grey-300 rounded-lg" />
		<span class="text-md font-bold text-grey-800">Project Brew</span>
	</div>
	<nav class="hidden items-center ml-auto gap-md md:flex">
		<a href="/" class="font-bold text-grey-700">About</a>
		<a href="/" class="font-bold text-grey-700 mr-md">Github</a>
		<a class="button--secondary" href="sign-up">Sign up</a>
		<a class="button--primary" href="login">Log in</a>
	</nav>

	<div class="block md:hidden items-center ml-auto">
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
			class="items-start justify-end ml-auto gap-md flex flex-col fixed top-0 right-0 bg-grey-100 h-screen w-7/12 p-6 
			{showMobileNav ? 'translate-x-0' : 'translate-x-full'} transition-all duration-300 ease-out"
		>
			<a href="/" class="font-bold text-grey-700">About</a>
			<a href="/" class="font-bold text-grey-700 mb-auto">Github</a>
			<a class="button--secondary w-full text-center" href="sign-up">Sign up</a>
			<a class="button--primary w-full text-center" href="login">Log in</a>
		</nav>
	</div>
</header>

<section class="text-center mb-md px-lg">
	<header class="mt-md md:mt-lg">
		<h1 class="text-lg font-bold text-grey-800 sm:text-2xl">Do project management right</h1>
	</header>
	<div class="flex flex-col gap-[10px] items-center text-grey-700 md:w-1/2 md:mx-auto">
		<p>
			With Project Brew it is incredibly easy to get started managing projects with your team or by
			yourself.
		</p>
		<p>Do it on the go and at home.</p>
		<p>Brew yourself a coffee and start managing projects <span class="underline">right!</span></p>
		<p>
			So, what are you waiting for! Get started for free and get up and running with you and you
			team within minutes.
		</p>
		<button class="button--primary">Get Started Today</button>
	</div>
</section>
