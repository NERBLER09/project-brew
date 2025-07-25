<script>
	import { handleGoogleAuth, handleUserSignUp } from '$lib/api/auth';

	import Google from '$lib/assets/Logo/Google.svelte';

	let email = '';
	let password = '';

	const handleSignUp = () => {
		handleUserSignUp(email, password);
	};
</script>

<svelte:head>
	<title>Project Brew - Sign Up</title>
	<meta
		name="description"
		content="Sign up for a Project Brew account. Sign up with Google or email."
	/>
</svelte:head>

<section
	class="absolute top-0 mx-6 grid h-screen place-content-center overflow-hidden text-center md:w-screen"
>
	<header>
		<h1 class="text-xl font-semibold text-grey-800 sm:text-2xl">Sign Up</h1>
	</header>
	<form on:submit|preventDefault={handleSignUp} class="flex flex-col items-center gap-[0.625rem]">
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
		<button class="button--primary w-full" type="submit">Create account</button>
		<span>or</span>
		<button
			class="button--secondary flex items-center justify-center gap-md"
			type="button"
			on:click={handleGoogleAuth}><Google className="h-lg w-lg" /> Continue with Google</button
		>
		<p class="px-6 text-sm font-medium text-grey-700 md:w-72">
			By signing you are agreeing with the Project Brew <a href="/privacy-policy" class="underline"
				>privacy policy</a
			>.
		</p>
	</form>
</section>
