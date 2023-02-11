<script lang="ts">
	import Menu from '$lib/assets/Menu.svelte';
	import User from '$lib/assets/User.svelte';
	import { settingsPage, showMobileSettingsNav } from '$lib/stores/ui';
	export let data: any;

	const showMobileNav = () => {
		$showMobileSettingsNav = !$showMobileSettingsNav;
		$settingsPage = 'Settings';
	};
</script>

<header
	style="background-image: linear-gradient(180deg, rgba(0, 0, 0, 0) 35.95%, rgba(0, 0, 0, 0.6) 100%), url({data.banner}) ;"
	class="relative flex h-[15.625rem] items-end rounded-b-3xl bg-cover bg-center bg-no-repeat object-cover px-6 md:px-8"
>
	<div class="absolute -bottom-12 flex w-[calc(100%-48px)] items-start gap-md md:-bottom-8">
		{#if data.avatar_url}
			<img
				src={data.avatar_url}
				alt="User profile"
				class="relative -top-2 aspect-square h-[6.25rem] w-[6.25rem] rounded-full object-cover"
			/>
		{:else}
			<User className="w-[6.25rem] h-[6.25rem] stroke-grey-700 dark:stroke-grey-200" />
		{/if}

		<div class="z-50 mt-sm flex h-full w-full flex-col overflow-hidden md:mt-md md:w-auto">
			<h1 class="text-lg text-grey-100 md:text-xl">{$settingsPage}</h1>
			<div class="flex w-full gap-md md:hidden">
				<div class="flex w-3/4 flex-col">
					<span class="inline-block truncate font-bold text-grey-700 dark:text-grey-200 md:hidden"
						>{data.name}</span
					>
					<span class="inline-block truncate font-medium text-grey-700 dark:text-grey-200 md:hidden"
						>{data.email}</span
					>
				</div>
				<button class="ml-auto" on:click={showMobileNav}>
					<Menu className="w-8 h-8 stroke-grey-700 dark:stroke-grey-200" />
					<span class="sr-only">Show nav menu</span>
				</button>
			</div>
			<span class="hidden truncate font-bold text-grey-700 dark:text-grey-200 md:block"
				>{data.name} <span class="font-medium">- {data.email}</span>
			</span>
		</div>
	</div>
</header>
