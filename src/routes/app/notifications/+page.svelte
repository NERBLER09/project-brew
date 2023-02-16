<script>
	import MobileSubPageLayout from '$lib/components/layouts/MobileSubPageLayout.svelte';
</script>

<MobileSubPageLayout previousPage="/app/home" pageName="Notifications">
	<div class="flex h-[calc(100%-69px)] flex-col items-center justify-center">
		<span class="text-md font-bold text-grey-700 dark:text-grey-200">You are all caught up</span>
		<span class="font-medium text-grey-700 dark:text-grey-200">You have no new notifications</span>
	</div>
</MobileSubPageLayout>
