<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import toast from 'svelte-french-toast';
</script>

<svelte:head>
	<title>Project Brew - Welcome</title>
</svelte:head>

<section
	class="mx-6 flex h-screen flex-col items-center justify-center gap-md text-center md:w-screen"
>
	<header>
		<h1 class="text-xl font-semibold text-grey-800 sm:text-2xl">Welcome to Project Brew!</h1>
	</header>
	<div class="flex flex-col items-center gap-md">
		<p class="px-6 text-grey-700 md:w-1/2">
			Please take a few moments to setup your account details. You can always change and set these
			in your account settings.
		</p>
		<form
			method="POST"
			use:enhance={() => {
				return async ({ result }) => {
					if (result.type === 'failure') {
						toast.error(result?.data.message);
					} else if (result.type === 'success') {
						toast.success('Welcome to Project Brew');
						goto('/app/home');
					}
				};
			}}
		>
			<input type="text" class="input--text mb-md" placeholder="Enter your name" name="name" />
			<br />
			<button class="button--primary">Set details</button>
		</form>
	</div>
</section>
