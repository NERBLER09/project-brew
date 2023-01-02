<script>
	import Google from '$lib/assets/Logo/Google.svelte';

	const handleSignUp = () => {
		console.log('Handle user sign up');
	};
</script>

<section class="text-center mx-6 h-screen place-content-center grid overflow-hidden">
	<header>
		<h1 class="text-grey-800 text-xl sm:text-2xl">Sign Up</h1>
	</header>
	<form on:submit|preventDefault={handleSignUp} class="flex gap-[0.625rem] flex-col items-center">
		<input type="text" class="input--text w-full md:w-72" placeholder="Name" />
		<input type="email" class="input--text w-full md:w-72" placeholder="Email" />
		<input type="password" class="input--text w-full md:w-72" placeholder="Password" />
		<button class="button--primary">Create account</button>
		<span>or</span>
		<button class="button--secondary flex items-center justify-center gap-md"
			><Google className="h-lg w-lg" /> Continue with Google</button
		>
		<p class="text-sm text-grey-700 px-6 md:w-72">
			By signing up with email+password you agree to our privacy policy
		</p>
	</form>
</section>

