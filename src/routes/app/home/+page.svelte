<script lang="ts">
	import Bell from '$lib/assets/Bell.svelte';
	import PlusNew from '$lib/assets/Plus-New.svelte';
	import User from '$lib/assets/User.svelte';
	import UserDropdown from '$lib/components/dropdowns/UserDropdown.svelte';
	import { userData } from '$lib/stores/user';
	import type { PageData } from './$types';

	export let data: PageData;

	let showUserDropdown = false;
</script>

<svelte:head>
	<title>Project Brew - Home</title>
</svelte:head>

<header class="flex items-start">
	<!-- Mobile welcome text -->
	<div class="flex md:hidden flex-col items-start">
		<span class="text-grey-800 font-medium">Welcome Back</span>
		<span class="text-lg font-semibold text-grey-900 w-1/2">{data.name}</span>
	</div>
	<!-- Desktop welcome text -->
	<span class="hidden md:block md:text-lg lg:text-xl text-grey-900 w-1/2 break-words"
		>Welcome Back, <br class="hidden lg:block" /><span class="font-semibold">{data.name}</span
		></span
	>

	<div class="ml-auto flex items-center gap-lg md:gap-xl">
		<button class="button--primary items-center gap-md hidden lg:flex">
			<PlusNew className="h-5 w-5" />
			New Project
		</button>
		<Bell className="stroke-grey-700 h-9 w-9 md:w-[2rem] md:h-[2rem]" />
		<button class="relative" on:click={() => (showUserDropdown = !showUserDropdown)}>
			{#if data.avatar_url}
				<img
					src={data.avatar_url}
					alt="User profile"
					class="w-2xl h-2xl md:h-16 md:w-16 rounded-full aspect-square object-cover"
				/>
			{:else}
				<User className="w-2xl h-2xl stroke-grey-700 md:h-16 md:w-16" />
			{/if}
		</button>
	</div>
	{#if showUserDropdown}
		<UserDropdown bind:visibility={showUserDropdown} />
	{/if}
</header>
