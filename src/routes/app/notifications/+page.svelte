<script lang="ts">
	import MobileSubPageLayout from '$lib/components/layouts/MobileSubPageLayout.svelte';
	import Invite from '$lib/components/notifications/Invite.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<MobileSubPageLayout previousPage="/app/home" pageName="Notifications">
	{#if data.notfications.length > 0}
		<p class="font-medium text-grey-700 dark:text-grey-200">
			You have {data.notfications.length}{data.notfications.length > 1 ? 's' : ''} new notification
		</p>
	{/if}
	<div class="mt-md flex flex-col gap-md">
		{#each data.notfications as notification}
			{#if notification.type === 'invite'}
				<Invite {...notification} />
			{/if}
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
</MobileSubPageLayout>
