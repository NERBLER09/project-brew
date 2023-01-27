<script lang="ts">
	import Menu from '$lib/assets/Menu.svelte';
	import User from '$lib/assets/User.svelte';
	import { showMobileSettingsNav } from '$lib/stores/ui';
	export let data: any;
</script>

<header
	style="background-image: url({data.banner});"
	class="object-cover relative rounded-b-3xl md:px-8 px-6 h-[15.625rem] flex items-end bg-center"
>
	<div class="flex items-start gap-md absolute -bottom-12 w-[calc(100%-48px)] md:-bottom-8">
		{#if data.avatar_url}
			<img
				src={data.avatar_url}
				alt="User profile"
				class="w-[6.25rem] h-[6.25rem] rounded-full aspect-square object-cover relative -top-2"
			/>
		{:else}
			<User className="w-[6.25rem] h-[6.25rem] stroke-grey-700 dark:stroke-grey-200" />
		{/if}

		<div class="mt-sm md:mt-md md:w-auto flex flex-col z-50 w-full h-full overflow-hidden">
			<h1 class="text-grey-100 text-lg md:text-xl">Settings</h1>
			<div class="md:hidden flex w-full gap-md">
				<div class="flex flex-col w-3/4">
					<span class="md:hidden text-grey-700 dark:text-grey-200 font-bold inline-block truncate"
						>{data.name}</span
					>
					<span class="md:hidden text-grey-700 dark:text-grey-200 font-medium inline-block truncate"
						>{data.email}</span
					>
				</div>
				<button class="ml-auto" on:click={() => ($showMobileSettingsNav = !$showMobileSettingsNav)}>
					<Menu className="w-8 h-8 stroke-grey-700 dark:stroke-grey-200" />
					<span class="sr-only">Show nav menu</span>
				</button>
			</div>
			<span class="text-grey-700 dark:text-grey-200 font-bold hidden md:block truncate"
				>{data.name} <span class="font-medium">- {data.email}</span>
			</span>
		</div>
	</div>
</header>
