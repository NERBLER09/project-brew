<script>
	import { page } from '$app/stores';
	import { signOut } from '$lib/api/auth';
	import LogOut from '$lib/assets/Arrow/Log-Out.svelte';
	import Clock from '$lib/assets/Clock.svelte';
	import Dashboard from '$lib/assets/Dashboard.svelte';

	import Home from '$lib/assets/Home.svelte';
	import Search from '$lib/assets/Search.svelte';
	import Settings from '$lib/assets/Settings.svelte';
	import User from '$lib/assets/User.svelte';
	import Switch from '../form/Switch.svelte';

	const handleSearch = () => {
		console.log('Handle search');
	};
</script>

<section class="hidden md:flex flex-col h-screen w-[16.625rem] bg-grey-100 px-md py-[1rem]">
	<header class="flex items-center gap-md ml-md">
		<div class="w-xl h-xl bg-grey-300 rounded-lg" />
		<span class="text-md font-semibold text-grey-800">Project Brew</span>
	</header>
	<div
		class="h-[2px] border-solid border border-grey-600 mt-lg w-11/12 rounded-full mx-auto drop-shadow-md"
	/>
	<form on:submit|preventDefault={handleSearch}>
		<div
			class="font-bold border-2 border-grey-600 border-solid box-border input--text flex items-center gap-md my-lg p-md placeholder:text-grey-700 text-grey-700"
		>
			<Search className="stroke-grey-700 w-6 h-6" />
			<input type="text" placeholder="Search" class="bg-grey-200 border-none w-full p-0" />
		</div>
	</form>
	<nav class="flex flex-col gap-lg">
		<a
			href="/app/home"
			class="button--text items-start text-grey-700 hover:no-underline flex gap-md p-md w-full rounded hover:bg-gradient-to-r hover:from-grey-200 {$page.url.pathname.includes(
				'home'
			)
				? 'bg-grey-200'
				: ''} "
		>
			<Home className="stroke-grey-700 h-6 w-6" />
			Dashboard
		</a>
		<a
			href="/app/projects"
			class="button--text items-start text-grey-700 hover:no-underline flex gap-md p-md w-full rounded hover:bg-gradient-to-r hover:from-grey-200 {$page.url.pathname.includes(
				'projects'
			)
				? 'bg-grey-200'
				: ''} "
		>
			<Dashboard className="stroke-grey-700 h-6 w-6" />
			Projects
		</a>

		<a
			href="/app/focus"
			class="button--text items-start text-grey-700 hover:no-underline flex gap-md p-md w-full rounded hover:bg-gradient-to-r hover:from-grey-200 {$page.url.pathname.includes(
				'focus'
			)
				? 'bg-grey-200'
				: ''} "
		>
			<Clock className="stroke-grey-700 h-6 w-6" />
			Focus
		</a>

		<a
			href="/app/team"
			class="button--text items-start text-grey-700 hover:no-underline flex gap-md p-md w-full rounded hover:bg-gradient-to-r hover:from-grey-200 {$page.url.pathname.includes(
				'team'
			)
				? 'bg-grey-200'
				: ''} "
		>
			<User className="stroke-grey-700 h-6 w-6" />
			Team
		</a>
	</nav>
	<div class="mt-auto flex flex-col gap-lg">
		<a
			href="/app/settings"
			class="button--text items-start text-grey-700 hover:no-underline flex gap-md p-md w-full rounded hover:bg-gradient-to-r hover:from-grey-200 {$page.url.pathname.includes(
				'settings'
			)
				? 'bg-grey-200'
				: ''} "
		>
			<Settings className="stroke-grey-700 h-6 w-6" />
			Settings
		</a>

		<button
			class="button--text items-start text-grey-700 hover:no-underline flex gap-md p-md w-full rounded hover:bg-gradient-to-r hover:from-grey-200"
			on:click={signOut}
		>
			<LogOut className="stroke-grey-700 h-6 w-6" />
			Log out
		</button>
		<div
			class="h-[2px] border-solid border border-grey-600 w-11/12 rounded-full mx-auto drop-shadow-md"
		/>
		<div class="ml-md">
			<Switch id="dark-mode" text="Dark Mode" />
		</div>
	</div>
</section>
