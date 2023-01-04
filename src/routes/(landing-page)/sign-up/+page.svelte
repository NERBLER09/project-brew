<script>
	import { handleGoogleAuth, handleUserSignUp } from '$lib/api/auth';

	import Google from '$lib/assets/Logo/Google.svelte';

	let email = '';
	let password = '';

	const handleSignUp = () => {
		handleUserSignUp(email, password);
	};
</script>

<section
	class="text-center mx-6 h-screen md:w-screen place-content-center grid overflow-hidden absolute top-0"
>
	<header>
		<h1 class="text-grey-800 font-semibold text-xl sm:text-2xl">Sign Up</h1>
	</header>
	<form on:submit|preventDefault={handleSignUp} class="flex gap-[0.625rem] flex-col items-center">
		<input
			type="email"
			class="input--text w-full md:w-72"
			placeholder="Email"
			required
			bind:value={email}
		/>
		<input
			type="password"
			class="input--text w-full md:w-72"
			placeholder="Password"
			required
			bind:value={password}
		/>
		<button class="button--primary" type="submit">Create account</button>
		<span>or</span>
		<button
			class="button--secondary flex items-center justify-center gap-md"
			type="button"
			on:click={handleGoogleAuth}><Google className="h-lg w-lg" /> Continue with Google</button
		>
		<p class="text-sm text-grey-700 px-6 md:w-72">
			By signing up with email+password you agree to our privacy policy
		</p>
	</form>
</section>
