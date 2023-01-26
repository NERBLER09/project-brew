<script>
	import Bell from '$lib/assets/Fill/Bell.svelte';
	import CircleInfo from '$lib/assets/Fill/CircleInfo.svelte';
	import Image from '$lib/assets/Fill/Image.svelte';
	import User from '$lib/assets/Fill/User.svelte';
</script>

<nav class="relative top-14 flex flex-col gap-4 z-50 md:flex-row md:top-2">
	<a
		href="/app/settings/account"
		class="gap-md py-sm px-md font-bold text-grey-700 dark:text-grey-200 flex items-center active:bg-grey-200 dark:active:bg-grey-700 rounded-md"
	>
		<User className="w-8 h-8 fill-grey-800 dark:fill-grey-200 md:hidden" />
		Account
	</a>
	<a
		href="/app/settings/appearance"
		class="gap-md py-sm px-md font-bold text-grey-700 dark:text-grey-200 flex items-center active:bg-grey-200 dark:active:bg-grey-700 rounded-md"
	>
		<Image className="w-8 h-8 fill-grey-800 dark:fill-grey-200 md:hidden" />
		Appearance
	</a>
	<a
		href="/app/settings/notifications"
		class="gap-md py-sm px-md font-bold text-grey-700 dark:text-grey-200 flex items-center active:bg-grey-200 dark:active:bg-grey-700 rounded-md"
	>
		<Bell className="w-8 h-8 fill-grey-800 dark:fill-grey-200 md:hidden" />
		Notifications
	</a>
	<a
		href="/app/settings/about"
		class="gap-md py-sm px-md font-bold text-grey-700 dark:text-grey-200 flex items-center active:bg-grey-200 dark:active:bg-grey-700 rounded-md"
	>
		<CircleInfo className="w-8 h-8 fill-grey-800 dark:fill-grey-200 md:hidden" />
		About
	</a>
</nav>
