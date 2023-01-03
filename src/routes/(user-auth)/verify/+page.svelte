<script>
	import { signUpEmail } from '$lib/stores/user';
</script>

<section class="grid place-content-center text-center h-screen">
	<header>
		<h1 class="text-xl md:text-2xl font-semibold text-grey-900">
			Please verify your email address
		</h1>
	</header>
	<div>
		<p class="text-grey-700">
			An verification has been sent to {$signUpEmail}. Please verify your email address
		</p>
	</div>
</section>
