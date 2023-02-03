<script lang="ts">
	import User from '$lib/assets/User.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<header class="flex items-center gap-lg">
	{#if data.avatar_url}
		<img
			src={data.avatar_url}
			alt="User profile"
			class="aspect-square h-20 w-20 rounded-full object-cover md:h-[6.25rem] md:w-[6.25rem]"
		/>
	{:else}
		<User
			className="w-20 h-20 stroke-grey-700 dark:stroke-grey-200 md:h-[6.25rem] md:w-[6.25rem]"
		/>
	{/if}

	<div class="flex flex-col items-start gap-sm">
		<h1 class="text-lg font-semibold text-grey-700 dark:text-grey-100 md:text-xl">{data.name}</h1>

		<span class="font-medium text-grey-700 dark:text-grey-100">Invited to x project(s)</span>
		{#if data.location}
			<span class="font-medium text-grey-700 dark:text-grey-100">{data.location}</span>
		{/if}
		{#if data.role}
			<span class="font-medium text-grey-700 dark:text-grey-100">{data.role}</span>
		{/if}
	</div>
</header>

<div class="mt-lg md:px-[7.5rem] lg:w-1/2">
	<p class="font-medium text-grey-700 dark:text-grey-100">{data.bio}</p>
</div>
