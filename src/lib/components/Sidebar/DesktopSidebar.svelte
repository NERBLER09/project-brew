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
	import { useDarkMode } from '$lib/stores/ui';
	import Switch from '../form/Switch.svelte';

	const handleSearch = () => {
		console.log('Handle search');
	};
</script>

<section
	class="hidden h-screen w-[16.625rem] flex-col bg-grey-100 px-md py-[1rem] dark:bg-grey-800 md:flex"
>
	<header class="ml-md flex items-center gap-md">
		<div class="h-xl w-xl rounded-lg bg-grey-300" />
		<span class="text-md font-semibold text-grey-800 dark:text-grey-200">Project Brew</span>
	</header>
	<div
		class="mx-auto mt-lg h-[2px] w-11/12 rounded-full border border-solid border-grey-600 drop-shadow-md"
	/>
	<!-- TODO: Implement app wide search -->
	<!-- <form on:submit|preventDefault={handleSearch}>
		<div class="input--search my-lg p-md">
			<Search className="stroke-grey-700 w-6 h-6" />
			<input type="text" placeholder="Search" class="bg-grey-200 border-none w-full p-0" />
		</div>
	</form>
 -->
	<nav class="mt-lg flex flex-col gap-lg">
		<a
			href="/app/home"
			class="button--text flex w-full items-start gap-md rounded p-md text-grey-700 hover:bg-gradient-to-r hover:from-grey-200 hover:text-grey-700 hover:no-underline dark:text-grey-200 dark:hover:from-grey-600 {$page.url.pathname.includes(
				'home'
			)
				? 'bg-grey-200 dark:bg-grey-700'
				: ''} "
		>
			<Home className="stroke-grey-700 dark:stroke-grey-200 h-6 w-6" />
			Dashboard
		</a>
		<a
			href="/app/projects"
			class="button--text flex w-full items-start gap-md rounded p-md text-grey-700 hover:bg-gradient-to-r hover:from-grey-200 hover:text-grey-700 hover:no-underline dark:text-grey-200 dark:hover:from-grey-600 {$page.url.pathname.includes(
				'projects'
			)
				? 'bg-grey-200 dark:bg-grey-700'
				: ''} "
		>
			<Dashboard className="stroke-grey-700 dark:stroke-grey-200 h-6 w-6" />
			Projects
		</a>

		<a
			href="/app/focus"
			class="button--text flex w-full items-start gap-md rounded p-md text-grey-700 hover:bg-gradient-to-r hover:from-grey-200 hover:text-grey-700 hover:no-underline dark:text-grey-200 dark:hover:from-grey-600 {$page.url.pathname.includes(
				'focus'
			)
				? 'bg-grey-200 dark:bg-grey-700'
				: ''} "
		>
			<Clock className="stroke-grey-700 dark:stroke-grey-200 h-6 w-6" />
			Focus
		</a>

		<a
			href="/app/team"
			class="button--text flex w-full items-start gap-md rounded p-md text-grey-700 hover:bg-gradient-to-r hover:from-grey-200 hover:text-grey-700 hover:no-underline dark:text-grey-200 dark:hover:from-grey-600 {$page.url.pathname.includes(
				'team'
			)
				? 'bg-grey-200 dark:bg-grey-700'
				: ''} "
		>
			<User className="stroke-grey-700 dark:stroke-grey-200 h-6 w-6" />
			Team
		</a>
	</nav>
	<div class="mt-auto flex flex-col gap-lg">
		<a
			href="/app/settings"
			class="button--text flex w-full items-start gap-md rounded p-md text-grey-700 hover:bg-gradient-to-r hover:from-grey-200 hover:text-grey-700 hover:no-underline dark:text-grey-200 dark:hover:from-grey-600 {$page.url.pathname.includes(
				'settings'
			)
				? 'bg-grey-200 dark:bg-grey-700'
				: ''} "
		>
			<Settings className="stroke-grey-700 dark:stroke-grey-200 h-6 w-6" />
			Settings
		</a>

		<button
			class="button--text flex w-full items-start gap-md rounded p-md text-grey-700 hover:bg-gradient-to-r hover:from-grey-200 hover:text-grey-700 hover:no-underline dark:text-grey-200 dark:hover:from-grey-600"
			on:click={signOut}
		>
			<LogOut className="stroke-grey-700 dark:stroke-grey-200 h-6 w-6" />
			Log out
		</button>
		<div
			class="mx-auto h-[2px] w-11/12 rounded-full border border-solid border-grey-600 drop-shadow-md"
		/>
		<div class="ml-md">
			<Switch id="dark-mode" text="Dark Mode" bind:checked={$useDarkMode} />
		</div>
	</div>
</section>
