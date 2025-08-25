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
	import FileInput from '$lib/components/form/FileInput.svelte';
	import { enhance } from '$app/forms';
	import { invalidate } from '$app/navigation';

	export let data: PageData;

	let selectedTheme: Theme = $perferedTheme;

	let newBanner: FileList | null;
	let bannerURL = data.dashboard_bg ?? '';

	const removeBanner = () => {
		bannerURL = '';
		newBanner = null;
	};

	$: handleUpdateTheme(selectedTheme);
	const handleUpdateTheme = (theme: 'light' | 'dark' | 'system') => {
		$perferedTheme = theme;

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
		<button class="relative text-start" on:click={() => (selectedTheme = 'light')} type="button">
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
		<button class="relative text-start" on:click={() => (selectedTheme = 'dark')} type="button">
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
		<button class="relative text-start" on:click={() => (selectedTheme = 'system')} type="button">
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
	</div>

	<form
		method="POST"
		action="/app/settings?/appearance"
		enctype="multipart/form-data"
		use:enhance={() => {
			return async ({ result }) => {
				if (result.type === 'failure' && result.status === 400) {
					toast.error(result?.data.message);
				} else if (result.type === 'success') {
					toast.success('Updated account settings');
					invalidate('app:user-info');
				}
			};
		}}
	>
		<div class="mb-md">
			<h3 class="input--label mb-sm text-md">Dashboard Background</h3>
			<p class="my-sm font-medium text-grey-700 dark:text-grey-300">
				Make your dashboard more unique by uploading a background image
			</p>

			<input type="text" class="hidden" value={bannerURL} name="set_banner" />
			<FileInput bind:bannerURL bind:newBanner postRemoveBannnerHandle={removeBanner} />
		</div>

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
				: 'absolute -top-36 right-0'}"
			on:click={handleUpdateTheme}
		>
			<span>Save changes</span>
		</button>
	</form>
</section>
