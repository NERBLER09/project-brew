<script lang="ts">
	import { invalidate } from '$app/navigation';

	import MobileSubPageLayout from '$lib/components/layouts/MobileSubPageLayout.svelte';
	import Notification from '$lib/components/notifications/Notification.svelte';
	import { userData } from '$lib/stores/user';
	import { supabase } from '$lib/supabase';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	let notifications = data.notifications;

	const handleSortNotifications = () => {
		const dueTaskNotifications = data?.notifications.filter((item) => {
			if (item.type === 'dueTask') return data.notifcations_settings.push.dueTask;
		});
		const assignedNotifications = data?.notifications.filter((item) => {
			if (item.type === 'assigned') return data.notifcations_settings.push.assigned;
		});
		const invitedNotifications = data?.notifications.filter((item) => {
			if (item.type === 'invite') return data.notifcations_settings.push.invited;
		});

		notifications = [...dueTaskNotifications, ...assignedNotifications, ...invitedNotifications];
		notifications = notifications.sort((item) => {
			return new Date().getTime() - new Date(item.sent!).getTime();
		});
	};

	onMount(handleSortNotifications);

	const handleClearNotifications = async () => {
		const { error } = await supabase.from('notifications').delete().eq('target_user', data.id);
		if (!error) {
			invalidate('app:data');
			notifications = [];
		}
	};
</script>

<MobileSubPageLayout previousPage="/app/home" pageName="Notifications">
	{#if data.notifications.length > 0}
		<div class="flex items-center">
			<p class="font-medium text-grey-700 dark:text-grey-200">
				You have {notifications.length} new notification{notifications.length > 1 ? 's' : ''}
			</p>

			<button
				class="ml-auto font-medium text-grey-700 dark:text-grey-200"
				on:click={handleClearNotifications}>Clear All</button
			>
		</div>
	{/if}
	<div class="mt-md flex flex-col gap-md">
		{#each notifications as notification}
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
</MobileSubPageLayout>
