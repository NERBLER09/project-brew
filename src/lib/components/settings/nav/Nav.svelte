<script>
	import Bell from '$lib/assets/Fill/Bell.svelte';
	import CircleInfo from '$lib/assets/Fill/CircleInfo.svelte';

	import Image from '$lib/assets/Fill/Image.svelte';

	import User from '$lib/assets/Fill/User.svelte';
</script>

<nav class="relative top-14 flex flex-col gap-4 z-50 md:flex-row md:top-2">
	<a
		href="#"
		class="gap-md py-sm px-md font-bold text-grey-700 flex items-center active:bg-grey-200 rounded-md"
	>
		<User className="w-8 h-8 fill-grey-800 md:hidden" />
		Account
	</a>
	<a
		href="#"
		class="gap-md py-sm px-md font-bold text-grey-700 flex items-cente active:bg-grey-200 rounded-mdr"
	>
		<Image className="w-8 h-8 fill-grey-800 md:hidden" />
		Appearance
	</a>
	<a
		href="#"
		class="gap-md py-sm px-md font-bold text-grey-700 flex items-center active:bg-grey-200 rounded-md"
	>
		<Bell className="w-8 h-8 fill-grey-800 md:hidden" />
		Notifications
	</a>
	<a
		href="#"
		class="gap-md py-sm px-md font-bold text-grey-700 flex items-center active:bg-grey-200 rounded-md"
	>
		<CircleInfo className="w-8 h-8 fill-grey-800 md:hidden" />
		About
	</a>
</nav>
