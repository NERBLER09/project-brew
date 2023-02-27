<script>
	import CloseMultiply from '$lib/assets/Close-Multiply.svelte';
	import Menu from '$lib/assets/Menu.svelte';

	let showMobileNav = false;
</script>

<header class="relative flex h-20 items-center bg-grey-100 px-lg md:px-28 lg:px-52">
	<div class="flex items-center gap-md">
		<div class="h-12 w-12 rounded-lg bg-grey-300" />
		<span class="text-md font-semibold text-grey-800">Project Brew</span>
	</div>
	<nav class="ml-auto hidden items-center gap-md md:flex">
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
			<a class="button--primary w-full text-center" href="/login">Log in</a>
		</nav>
	</div>
</header>
