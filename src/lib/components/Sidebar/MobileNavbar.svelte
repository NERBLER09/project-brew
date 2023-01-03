<script>
	import { page } from '$app/stores';

	import Clock from '$lib/assets/Fill/Clock.svelte';
	import Dashboard from '$lib/assets/Fill/Dashboard.svelte';
	import Home from '$lib/assets/Fill/Home.svelte';
	import User from '$lib/assets/Fill/User.svelte';
</script>

<nav
	class="md:hidden flex gap-md bg-grey-100 h-[6.25rem] p-6 items-center justify-evenly fixed bottom-0 w-screen"
>
	<a href="#" class="flex flex-col items-center">
		<span class="sr-only">Home</span>
		<Home
			className="fill-grey-700 h-9 w-9 {$page.url.pathname.includes('home')
				? 'fill-accent-light'
				: 'fill-grey-700'}"
		/>
		<div
			class="w-[1rem] border-2 border-accent-light rounded-full bg-accent-light {$page.url.pathname.includes(
				'home'
			)
				? 'block'
				: 'hidden'}"
		/>
	</a>
	<a href="#" class="flex flex-col items-center">
		<span class="sr-only">Projects</span>
		<Dashboard
			className="fill-grey-700 h-9 w-9 {$page.url.pathname.includes('projects')
				? 'fill-accent-light'
				: 'fill-grey-700'}"
		/>
		<div
			class="w-[1rem] border-2 border-accent-light rounded-full bg-accent-light {$page.url.pathname.includes(
				'projects'
			)
				? 'block'
				: 'hidden'}"
		/>
	</a>
	<a href="#" class="flex flex-col items-center">
		<span class="sr-only">Focus</span>
		<Clock
			className="fill-grey-700 h-9 w-9 {$page.url.pathname.includes('focus')
				? 'fill-accent-light'
				: 'fill-grey-700'}"
		/>
		<div
			class="w-[1rem] border-2 border-accent-light rounded-full bg-accent-light {$page.url.pathname.includes(
				'focus'
			)
				? 'block'
				: 'hidden'}"
		/>
	</a>
	<a href="#" class="flex flex-col items-center">
		<span class="sr-only">Team</span>
		<User
			className="fill-grey-700 h-9 w-9 {$page.url.pathname.includes('team')
				? 'fill-accent-light'
				: 'fill-grey-700'}"
		/>
		<div
			class="w-[1rem] border-2 border-accent-light rounded-full bg-accent-light {$page.url.pathname.includes(
				'team'
			)
				? 'block'
				: 'hidden'}"
		/>
	</a>
</nav>
