<script>
	import { page } from '$app/stores';

	import Clock from '$lib/assets/Fill/Clock.svelte';
	import Dashboard from '$lib/assets/Fill/Dashboard.svelte';
	import Home from '$lib/assets/Fill/Home.svelte';
	import User from '$lib/assets/Fill/User.svelte';
</script>

<nav
	class="z-40 flex h-[6.25rem] w-screen items-center justify-evenly gap-md bg-grey-100 p-6 dark:bg-grey-800 md:hidden"
>
	<a href="/app/home" class="flex flex-col items-center">
		<span class="sr-only">Home</span>
		<Home
			className="h-9 w-9 {$page.url.pathname.includes('home')
				? 'fill-accent-light'
				: 'fill-grey-700 dark:fill-grey-200'}"
		/>
		<div
			class="w-[1rem] rounded-full border-2 border-accent-light bg-accent-light {$page.url.pathname.includes(
				'home'
			)
				? 'block'
				: 'hidden'}"
		/>
	</a>
	<a href="/app/projects" class="flex flex-col items-center">
		<span class="sr-only">Projects</span>
		<Dashboard
			className="h-9 w-9 {$page.url.pathname.includes('projects')
				? 'fill-accent-light'
				: 'fill-grey-700 dark:fill-grey-200'}"
		/>
		<div
			class="w-[1rem] rounded-full border-2 border-accent-light bg-accent-light {$page.url.pathname.includes(
				'projects'
			)
				? 'block'
				: 'hidden'}"
		/>
	</a>
	<a href="/app/focus" class="flex flex-col items-center">
		<span class="sr-only">Focus</span>
		<Clock
			className="h-9 w-9 {$page.url.pathname.includes('focus')
				? 'fill-accent-light'
				: 'fill-grey-700 dark:fill-grey-200'}"
		/>
		<div
			class="w-[1rem] rounded-full border-2 border-accent-light bg-accent-light {$page.url.pathname.includes(
				'focus'
			)
				? 'block'
				: 'hidden'}"
		/>
	</a>
	<a href="/app/team" class="flex flex-col items-center">
		<span class="sr-only">Team</span>
		<User
			className="h-9 w-9 {$page.url.pathname.includes('team')
				? 'fill-accent-light'
				: 'fill-grey-700 dark:fill-grey-200'}"
		/>
		<div
			class="w-[1rem] rounded-full border-2 border-accent-light bg-accent-light {$page.url.pathname.includes(
				'team'
			)
				? 'block'
				: 'hidden'}"
		/>
	</a>
</nav>
