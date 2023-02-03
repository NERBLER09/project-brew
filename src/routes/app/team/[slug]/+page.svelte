<script lang="ts">
	import User from '$lib/assets/User.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<header class="flex gap-md">
	{#if data.avatar_url}
		<img
			src={data.avatar_url}
			alt="User profile"
			class="aspect-square h-20 w-20 rounded-full object-cover md:h-[6.25rem] md:w-[6.25rem]"
		/>
	{:else}
		<User className="w-20 h-20 stroke-grey-700 dark:stroke-grey-200 md:h-[6.25rem] md:w-[6.25rem]" />
	{/if}

	<h1 class="text-lg md:text-xl font-semibold text-grey-700 dark:text-grey-100">{data.name}</h1>
</header>
