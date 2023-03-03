<script lang="ts">
	import Notification from './Notification.svelte';
	import type { Notification as NotificationItem } from '$lib/types/projects';
	import { invalidate } from '$app/navigation';
	import { supabase } from '$lib/supabase';
	import { userData } from '$lib/stores/user';
	import { onMount } from 'svelte';

	export let notifications: NotificationItem[];

	let filteredNotifications = notifications;
	onMount(() => {
		invalidate('app:data');
		filteredNotifications = notifications;
		const dueTaskNotifications = filteredNotifications.filter((item) => {
			if (item.type === 'dueTask') return $userData.notifcations_settings.push.dueTask;
		});
		const assignedNotifications = filteredNotifications.filter((item) => {
			if (item.type === 'assigned') return $userData.notifcations_settings.push.assigned;
		});
		const invitedNotifications = filteredNotifications.filter((item) => {
			if (item.type === 'invite') return $userData.notifcations_settings.push.invited;
		});

		filteredNotifications = [
			...dueTaskNotifications,
			...assignedNotifications,
			...invitedNotifications
		];

		filteredNotifications = filteredNotifications.sort((item) => {
			return new Date().getTime() - new Date(item.sent!).getTime();
		});
	});

	const handleClearNotifications = async () => {
		const { error } = await supabase.from('notifications').delete().eq('target_user', $userData.id);
		if (!error) {
			invalidate('app:data');
			filteredNotifications = [];
		}
	};
</script>

<div
	class="absolute right-0 top-8 z-40 h-fit max-h-[25rem] min-h-[12.5rem] w-[18.75rem] overflow-y-auto rounded-lg bg-grey-100 p-3 dark:bg-grey-800"
>
	<header class="sticky -top-3 mb-sm bg-grey-100 dark:bg-grey-800">
		<h3 class="text-md font-semibold text-grey-800 dark:text-grey-200">Notifications</h3>
		{#if filteredNotifications.length > 0}
			<div class="flex items-center">
				<p class="text-sm font-medium text-grey-700 dark:text-grey-200">
					{filteredNotifications.length} new notification{filteredNotifications.length > 1
						? 's'
						: ''}
				</p>

				<button
					class="ml-auto text-sm font-medium text-grey-700 dark:text-grey-200"
					on:click={handleClearNotifications}>Clear All</button
				>
			</div>
		{/if}
	</header>

	<div class="mt-md flex flex-col gap-md">
		{#each filteredNotifications as notification}
			<Notification {...notification} />
		{:else}
			<div class="flex h-[calc(100%-69px)] flex-col items-center justify-center">
				<span class="text-md font-semibold text-grey-700 dark:text-grey-200"
					>You are all caught up</span
				>
				<span class="font-medium text-grey-700 dark:text-grey-200"
					>You have no new notifications</span
				>
			</div>
		{/each}
	</div>
</div>
