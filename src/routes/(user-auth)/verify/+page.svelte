<script>
	import { signUpEmail } from '$lib/stores/user';
	import { onMount } from 'svelte';
	onMount(() => {
		$signUpEmail = localStorage.getItem('email');
	});
</script>

<section class="mx-6 grid h-screen place-content-center text-center">
	<header>
		<h1 class="text-xl font-semibold text-grey-900 md:text-2xl">
			Please verify your email address
		</h1>
	</header>
	<div class="flex w-full items-center justify-center">
		<p class="min-w-72 px-6 text-grey-700 lg:w-1/2">
			An verification has been sent to {$signUpEmail}. Please verify your email address
		</p>
	</div>
</section>
