<script lang="ts">
	import Notification from './Notification.svelte';
	import type { Notification as NotificationItem } from '$lib/types/projects';

	export let notifications: NotificationItem[];
</script>

<div
	class="absolute right-0 top-8 z-40 h-fit max-h-[25rem] min-h-[12.5rem] w-[18.75rem] rounded-lg bg-grey-100 p-3 dark:bg-grey-800"
>
	<header class="mb-sm">
		<h3 class="text-md font-semibold text-grey-800 dark:text-grey-200">Notifications</h3>
	</header>
	{#if notifications.length > 0}
		<p class="font-medium text-grey-700 dark:text-grey-200">
			You have {notifications.length} new notification{notifications.length > 1 ? 's' : ''}
		</p>
	{/if}
	<div class="mt-md flex flex-col gap-md">
		{#each notifications as notification}
			<Notification {...notification} />
		{:else}
			<div class="flex h-[calc(100%-69px)] flex-col items-center justify-center">
				<span class="text-md font-bold text-grey-700 dark:text-grey-200">You are all caught up</span
				>
				<span class="font-medium text-grey-700 dark:text-grey-200"
					>You have no new notifications</span
				>
			</div>
		{/each}
	</div>
</div>
