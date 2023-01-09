<script lang="ts">
	import User from '$lib/assets/User.svelte';

	import type { LayoutData } from '.svelte-kit/types/src/routes/app/settings/$types';

	export let data: LayoutData;
</script>

<header>
	<div
		class="z-50  h-[15.625rem] flex items-center gap-md {data.avatar_url
			? 'relative -bottom-28 md:-bottom-[4.5rem]'
			: 'bottom-0 items-start h-fit'}"
	>
		{#if data.avatar_url}
			<img
				src={data.avatar_url}
				alt="User profile"
				class="w-[6.25rem] h-[6.25rem] rounded-full aspect-square object-cover mb-lg"
			/>
		{:else}
			<User className="w-[6.25rem] h-[6.25rem] stroke-grey-700 mb-lg" />
		{/if}

		<div class="w-[calc(100%-6.5rem)] mt-sm md:mt-md md:w-auto">
			<h1 class="{data.banner ? 'text-grey-200' : 'text-grey-700'} text-lg md:text-xl">Settings</h1>
			<span class="md:hidden text-grey-700 font-bold inline-block break-words w-full"
				>{data.name}</span
			>
			<span class="md:hidden text-grey-700 font-medium break-words inline-block w-full"
				>{data.email}</span
			>
			<span class="text-grey-700 font-bold hidden md:block"
				>{data.name} <span class="font-medium">- {data.email}</span>
			</span>
		</div>
	</div>

	<img
		src={data.banner}
		alt="Project banner"
		class="absolute top-0 left-0 h-[15.625rem] w-full md:w-[calc(100%-16.625rem)] md:left-auto md:right-0 object-cover rounded-b-3xl bg-gradient-to-t from-grey-900 {data.banner
			? 'block'
			: 'hidden'}"
	/>
</header>

<slot />
