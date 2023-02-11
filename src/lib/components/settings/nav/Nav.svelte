<script>
	import Bell from '$lib/assets/Fill/Bell.svelte';
	import CircleInfo from '$lib/assets/Fill/CircleInfo.svelte';
	import Image from '$lib/assets/Fill/Image.svelte';
	import User from '$lib/assets/Fill/User.svelte';
	import { showMobileSettingsNav } from '$lib/stores/ui';
</script>

<nav class="relative top-14 z-50 flex flex-col gap-4 p-6 md:top-2 md:w-fit md:flex-row md:p-0">
	<a
		href="/app/settings/account"
		class="flex items-center gap-md rounded-md py-sm px-md font-bold text-grey-700 active:bg-grey-200 dark:text-grey-200 dark:active:bg-grey-700"
		on:click={() => ($showMobileSettingsNav = false)}
	>
		<User className="w-8 h-8 fill-grey-800 dark:fill-grey-200 md:hidden" />
		Account
	</a>
	<a
		href="/app/settings/appearance"
		class="flex items-center gap-md rounded-md py-sm px-md font-bold text-grey-700 active:bg-grey-200 dark:text-grey-200 dark:active:bg-grey-700"
		on:click={() => ($showMobileSettingsNav = false)}
	>
		<Image className="w-8 h-8 fill-grey-800 dark:fill-grey-200 md:hidden" />
		Appearance
	</a>
	<a
		href="/app/settings/notifications"
		class="flex items-center gap-md rounded-md py-sm px-md font-bold text-grey-700 active:bg-grey-200 dark:text-grey-200 dark:active:bg-grey-700"
		on:click={() => ($showMobileSettingsNav = false)}
	>
		<Bell className="w-8 h-8 fill-grey-800 dark:fill-grey-200 md:hidden" />
		Notifications
	</a>
	<a
		href="/app/settings/about"
		class="flex items-center gap-md rounded-md py-sm px-md font-bold text-grey-700 active:bg-grey-200 dark:text-grey-200 dark:active:bg-grey-700"
		on:click={() => ($showMobileSettingsNav = false)}
	>
		<CircleInfo className="w-8 h-8 fill-grey-800 dark:fill-grey-200 md:hidden" />
		About
	</a>
</nav>
