<script>
	import { signUpEmail } from '$lib/stores/user';
</script>

<section class="mx-6 grid place-content-center text-center h-screen">
	<header>
		<h1 class="text-xl md:text-2xl font-semibold text-grey-900">
			Please verify your email address
		</h1>
	</header>
	<div class="flex w-full items-center justify-center">
		<p class="text-grey-700 px-6 md:w-72">
			An verification has been sent to {$signUpEmail}. Please verify your email address
		</p>
	</div>
</section>
