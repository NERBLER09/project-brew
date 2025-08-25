<script>
	import { handleGoogleAuth, handleUserSignUp } from '$lib/api/auth';
	import Google from '$lib/assets/Logo/Google.svelte';
	import Lock from '$lib/assets/Landing-Page/Lock.svelte';
	import Unlock from '$lib/assets/Unlock.svelte';

	let email = '';
	let password = '';

	const handleSignUp = () => {
		handleUserSignUp(email, password);
	};

	let showPassword = false;
</script>

<svelte:head>
	<title>Project Brew - Sign Up</title>
	<meta
		name="description"
		content="Sign up for a Project Brew account. Sign up with Google or email."
	/>
</svelte:head>

<section
	class="absolute top-0 mx-6 grid h-screen w-screen place-content-center overflow-hidden text-center"
>
	<header>
		<h1 class="text-xl font-semibold text-grey-800 sm:text-2xl">Sign Up</h1>
	</header>
	<form on:submit|preventDefault={handleSignUp} class="flex flex-col items-center gap-[0.625rem]">
		<input
			type="email"
			class="input--text w-full"
			placeholder="Email"
			required
			bind:value={email}
		/>
		<div class="input--text flex max-h-[40px] w-full items-center">
			<input
				type={showPassword ? 'text' : 'password'}
				class="input--text m-0 w-full border-none bg-grey-200 p-0 md:w-72"
				placeholder="Password"
				name="password"
				required
			/>
			<button on:click={() => (showPassword = !showPassword)}>
				{#if !showPassword}
					<Lock className="stroke-grey-700 w-6 h-6 ml-auto" />
					<span class="sr-only">Show password</span>
				{:else}
					<Unlock className="stroke-grey-700 w-6 h-6 ml-auto" />
					<span class="sr-only">Hide password</span>
				{/if}
			</button>
		</div>

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
