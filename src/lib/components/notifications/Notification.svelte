<script lang="ts">
	import User from '$lib/assets/User.svelte';
	import type { User as Profile } from '$lib/types/projects';

	export let message: string;
	export let sentBy: Profile | null;
	export let sent: string | null;
	export let title: string | null;
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
		<div>
			<span class="font-bold text-grey-700 dark:text-grey-200">
				{#if sentBy}
					{sentBy?.name}
				{:else}
					{title}
				{/if}
			</span>
		</div>
		<div>
			<span class="text-sm font-medium text-grey-700 dark:text-grey-200">{message}</span>
		</div>
	</div>
</div>
