<script>
	import Bell from '$lib/assets/Fill/Bell.svelte';
	import CircleInfo from '$lib/assets/Fill/CircleInfo.svelte';

	import Image from '$lib/assets/Fill/Image.svelte';

	import User from '$lib/assets/Fill/User.svelte';
</script>

<nav class="relative top-14 flex flex-col gap-4 z-50">
	<a href="#" class="gap-md py-sm px-md font-bold text-grey-700 flex items-center">
		<User className="w-8 h-8 fill-grey-800" />
		Account
	</a>
	<a href="#" class="gap-md py-sm px-md font-bold text-grey-700 flex items-center">
		<Image className="w-8 h-8 fill-grey-800" />
		Appearance
	</a>
	<a href="#" class="gap-md py-sm px-md font-bold text-grey-700 flex items-center">
		<Bell className="w-8 h-8 fill-grey-800" />
		Notifications
	</a>
	<a href="#" class="gap-md py-sm px-md font-bold text-grey-700 flex items-center">
		<CircleInfo className="w-8 h-8 fill-grey-800" />
		About
	</a>
</nav>
