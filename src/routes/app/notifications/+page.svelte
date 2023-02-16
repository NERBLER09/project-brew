<script lang="ts">
	import { invalidate } from '$app/navigation';

	import MobileSubPageLayout from '$lib/components/layouts/MobileSubPageLayout.svelte';
	import Notification from '$lib/components/notifications/Notification.svelte';
	import { userData } from '$lib/stores/user';
	import { supabase } from '$lib/supabase';
	import type { PageData } from './$types';

	export let data: PageData;

	const handleClearNotifications = async () => {
		const { error } = await supabase.from('notifications').delete().eq('target_user', $userData.id);
		if (!error) {
			invalidate('app:data');
		}
	};
</script>

<MobileSubPageLayout previousPage="/app/home" pageName="Notifications">
	{#if data.notifications.length > 0}
		<div class="flex items-center">
			<p class="font-medium text-grey-700 dark:text-grey-200">
				You have {data.notifications.length} new notification{data.notifications.length > 1
					? 's'
					: ''}
			</p>

			<button
				class="ml-auto font-medium text-grey-700 dark:text-grey-200"
				on:click={handleClearNotifications}>Clear All</button
			>
		</div>
	{/if}
	<div class="mt-md flex flex-col gap-md">
		{#each data.notifications as notification}
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
