<script lang="ts">
	import User from '$lib/assets/User.svelte';
	import type { User as Profile } from '$lib/types/projects';
	import { onMount } from 'svelte';

	export let message: string;
	export let sentBy: Profile | null;
	export let sent: string | null;
	export let title: string | null;

	let received: string = '';

	onMount(() => {
		const sentDate = new Date(sent!);
		const today = new Date();
		if (sentDate.getDay() === today.getDay() && sentDate.getMonth() === today.getMonth()) {
			received = 'Today';
		} else {
			received = today.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
		}
	});
</script>

<div class="flex items-center">
	{#if sentBy}
		{#if sentBy?.avatar_url}
			<img src={sentBy?.avatar_url} alt="profile" class="h-10 w-10 rounded-full" />
		{:else}
			<User className="h-10 w-10 stroke-grey-700 dark:stroke-grey-200" />
		{/if}
	{/if}

	<div class="ml-md">
		<div class="flex items-center">
			<span class="font-bold text-grey-700 dark:text-grey-200">
				{#if sentBy}
					{sentBy?.name}
				{:else}
					{title}
				{/if}
			</span>

			<span class="ml-auto font-medium text-grey-700 dark:text-grey-200">{received}</span>
		</div>
		<div>
			<span class="text-sm font-medium text-grey-700 dark:text-grey-200">{message}</span>
		</div>
	</div>
</div>
