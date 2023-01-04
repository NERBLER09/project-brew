<script>
	import { userData } from '$lib/stores/user';
</script>

<header>
	<!-- Mobile welcome text -->
	<div class="flex md:hidden flex-col items-start">
		<span class="text-grey-800">Welcome Back</span>
		<span class="text-lg font-semibold text-grey-900">{$userData?.name}</span>
	</div>
	<!-- Desktop welcome text -->
	<span class="hidden md:block md:text-lg lg:text-xl text-grey-900"
		>Welcome Back, <span class="font-semibold">{$userData?.name}</span></span
	>
</header>
