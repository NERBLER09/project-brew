<script lang="ts">
	import { handleGoogleAuth } from '$lib/api/auth';
	import { enhance } from '$app/forms';

	import Google from '$lib/assets/Logo/Google.svelte';
	import type { ActionData } from './$types';
	import Lock from '$lib/assets/Landing-Page/Lock.svelte';
	import Unlock from '$lib/assets/Unlock.svelte';

	export let form: ActionData;

	let showPassword = false;
</script>

<svelte:head>
	<title>Project Brew - Log In</title>
	<meta name="description" content="Welcome back to Project Brew." />
</svelte:head>

<section
	class="absolute top-0 grid h-screen w-screen place-content-center overflow-hidden text-center"
>
	<header>
		<h1 class="text-xl font-semibold text-grey-800 sm:text-2xl">Log in</h1>
	</header>
	<form method="POST" class="flex flex-col items-center gap-[0.625rem]" use:enhance>
		<input type="email" class="input--text w-full" placeholder="Email" name="email" required />

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

		{#if form?.fail}
			<p class="my-sm font-medium text-red-600">{form?.message}</p>
		{/if}

		<button class="button--primary w-full" type="submit">Log in</button>
		<span>or</span>
		<button
			class="button--secondary flex items-center justify-center gap-md"
			type="button"
			on:click={handleGoogleAuth}><Google className="h-lg w-lg" /> Continue with Google</button
		>
		<p class="px-6 text-sm text-grey-700 md:w-72">
			New to Project Brew? Create your account <a href="/sign-up" class="underline">here</a>
		</p>
	</form>
</section>
