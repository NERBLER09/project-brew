<script lang="ts">
	import { handleGoogleAuth } from '$lib/api/auth';
	import { enhance } from '$app/forms';

	import Google from '$lib/assets/Logo/Google.svelte';
	import type { ActionData } from './$types';

	export let form: ActionData;
</script>

<svelte:head>
	<title>Project Brew - Log In</title>
	<meta name="description" content="Welcome back to Project Brew." />
</svelte:head>

<section
	class="absolute top-0 mx-6 grid h-screen place-content-center overflow-hidden text-center md:w-screen"
>
	<header>
		<h1 class="text-xl font-semibold text-grey-800 sm:text-2xl">Log in</h1>
	</header>
	<form method="POST" class="flex flex-col items-center gap-[0.625rem]" use:enhance>
		<input
			type="email"
			class="input--text w-full md:w-72"
			placeholder="Email"
			name="email"
			required
		/>

		<input
			type="password"
			class="input--text w-full md:w-72"
			placeholder="Password"
			name="password"
			required
		/>

		{#if form?.fail}
			<p class="my-sm font-medium text-red-600">{form?.message}</p>
		{/if}

		<button class="button--primary" type="submit">Log in</button>
		<span>or</span>
		<button
			class="button--secondary flex items-center justify-center gap-md"
			type="button"
			on:click={handleGoogleAuth}><Google className="h-lg w-lg" /> Continue with Google</button
		>
		<p class="px-6 text-sm text-grey-700 md:w-72">
			By signing up with email+password you agree to our privacy policy
		</p>
	</form>
</section>
