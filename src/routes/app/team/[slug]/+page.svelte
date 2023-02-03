<script lang="ts">
	import Back from '$lib/assets/Arrow/Back.svelte';
	import User from '$lib/assets/User.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<svelte:head>
	<title>Member - {data.name}</title>
</svelte:head>

<header
	class="relative -top-6 -left-6 flex h-[13.5rem] w-[calc(100%+48px)] items-end rounded-b-3xl bg-cover bg-center bg-origin-border object-cover p-6 md:top-0 md:left-0 md:w-full md:rounded-xl md:p-md {!data.banner
		? 'bg-grey-100 dark:bg-grey-800'
		: 'bg-grey-100'}"
	style="background-image: url({data.banner});"
>
	<a href="/app/team" class="absolute top-6 left-6">
		<Back
			className="w-8 h-8 {data.banner ? 'stroke-grey-200' : 'stroke-grey-700 dark:stroke-grey-200'}"
		/>
		<span class="sr-only">Back</span>
	</a>
	<div class=" flex items-center gap-lg">
		{#if data.avatar_url}
			<img
				src={data.avatar_url}
				alt="User profile"
				class="aspect-square h-20 w-20 rounded-full object-cover md:h-[6.25rem] md:w-[6.25rem]"
			/>
		{:else}
			<User
				className="w-20 h-20 stroke-grey-700 dark:stroke-grey-200 md:h-[6.25rem] md:w-[6.25rem] {data.banner
					? 'stroke-grey-200'
					: 'stroke-grey-700 dark:stroke-grey-200'}"
			/>
		{/if}

		<div class="flex flex-col items-start gap-sm">
			<h1
				class="text-lg font-semibold {data.banner
					? 'text-grey-200'
					: 'text-grey-700 dark:text-grey-200'} md:text-xl"
			>
				{data.name}
			</h1>

			<span class="font-medium {data.banner ? 'text-grey-200' : 'text-grey-700 dark:text-grey-200'}"
				>Invited to x project(s)</span
			>
			{#if data.location}
				<span
					class="font-medium {data.banner ? 'text-grey-200' : 'text-grey-700 dark:text-grey-200'}"
					>{data.location}</span
				>
			{/if}
			{#if data.role}
				<span
					class="font-medium {data.banner ? 'text-grey-200' : 'text-grey-700 dark:text-grey-200'}"
					>{data.role}</span
				>
			{/if}
		</div>
	</div>
</header>

{#if data.bio}
	<div class="mt-lg md:px-[7.5rem] lg:w-1/2">
		<p class="font-medium text-grey-700 dark:text-grey-100">{data.bio}</p>
	</div>
{/if}
