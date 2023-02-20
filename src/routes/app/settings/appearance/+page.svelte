<script lang="ts">
	import Check from '$lib/assets/Check.svelte';
	import CircleCheck from '$lib/assets/Fill/CircleCheck.svelte';
	import Dark from '$lib/assets/Theme/Dark.svelte';
	import Light from '$lib/assets/Theme/Light.svelte';
	import System from '$lib/assets/Theme/System.svelte';
	import { perferedTheme, settingsPage, useDarkMode, type Theme } from '$lib/stores/ui';
	import { onMount } from 'svelte';
	import toast from 'svelte-french-toast';
	import type { PageData } from './$types';

	export let data: PageData;

	let selectedTheme: Theme = $perferedTheme;

	const handleUpdateTheme = () => {
		$perferedTheme = selectedTheme;

		switch ($perferedTheme) {
			case 'light':
				$useDarkMode = false;
				break;
			case 'dark':
				$useDarkMode = true;
				break;
			case 'system':
				$useDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
				break;
			default:
				$useDarkMode = false;
				break;
		}

		localStorage.setItem('theme', selectedTheme);
		toast.success('Update theme preference.');
	};

	onMount(() => {
		$settingsPage = 'Appearance';
	});
</script>

<section>
	<header>
		<h2 class="text-lg font-semibold text-grey-700 dark:text-grey-200">Theme</h2>
	</header>

	<div class="mt-md flex flex-wrap gap-6">
		<button class="relative text-start" on:click={() => (selectedTheme = 'light')}>
			{#if selectedTheme === 'light'}
				<CircleCheck className="fill-accent-light w-8 h-8 absolute -top-4 -right-4" />
			{/if}
			<div
				class="p-sm {selectedTheme === 'light'
					? 'border-accent-light'
					: 'border-grey-700 dark:border-grey-200'} mb-md rounded-lg border-2"
			>
				<Light />
			</div>
			<span
				class="{selectedTheme === 'light'
					? 'text-accent-light'
					: 'text-grey-700 dark:text-grey-200'} font-bold">Light</span
			>
		</button>
		<button class="relative text-start" on:click={() => (selectedTheme = 'dark')}>
			{#if selectedTheme === 'dark'}
				<CircleCheck className="fill-accent-light w-8 h-8 absolute -top-4 -right-4" />
			{/if}
			<div
				class="p-sm {selectedTheme === 'dark'
					? 'border-accent-light'
					: 'border-grey-700 dark:border-grey-200'} mb-md rounded-lg border-2"
			>
				<Dark />
			</div>
			<span
				class="{selectedTheme === 'dark'
					? 'text-accent-light'
					: 'text-grey-700 dark:text-grey-200'} font-bold">Dark</span
			>
		</button>
		<button class="relative text-start" on:click={() => (selectedTheme = 'system')}>
			{#if selectedTheme === 'system'}
				<CircleCheck className="fill-accent-light w-8 h-8 absolute -top-4 -right-4" />
			{/if}
			<div
				class="p-sm {selectedTheme === 'system'
					? 'border-accent-light'
					: 'border-grey-700 dark:border-grey-200'} mb-md rounded-lg border-2"
			>
				<System />
			</div>
			<span
				class="{selectedTheme === 'system'
					? 'text-accent-light'
					: 'text-grey-700 dark:text-grey-200'} font-bold">System</span
			>
		</button>

		<button
			class="button--circle fixed bottom-32 right-8 z-50 md:hidden"
			on:click={handleUpdateTheme}
		>
			<Check className="h-8 w-8 stroke-grey-200" />
			<span class="sr-only">Save changes</span>
		</button>
		<button
			class="button--primary z-50 hidden md:block {!data.banner
				? 'mx-auto mt-md'
				: 'absolute right-0 -top-36'}"
			on:click={handleUpdateTheme}
		>
			<span>Save changes</span>
		</button>
	</div>
</section>
