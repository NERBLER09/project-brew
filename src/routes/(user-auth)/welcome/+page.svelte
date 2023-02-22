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
		<h1 class="text-lg font-semibold text-grey-800 sm:text-2xl">Welcome to Project Brew!</h1>
	</header>
	<div class="flex w-full flex-col items-center gap-md md:w-1/2">
		<p class="text-grey-700 md:px-6">
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
						toast.success('Welcome to Project Brew!');
						goto('/app/home');
					}
				};
			}}
			class="w-full md:px-20"
		>
			<div class="mb-md w-full">
				<div class="flex items-center">
					<label for="name-input" class="input--label mb-sm inline-block">Name</label>
					<input
						type="text"
						class="input--text w-full"
						id="name-input"
						name="name"
						placeholder="What should people call you"
						required
					/>
				</div>
				<div class="w-full">
					<label for="bio-input" class="input--label mb-sm inline-block w-full text-start"
						>Bio</label
					>
					<textarea
						class="input--text h-36 w-full resize-none"
						id="bio-input"
						name="bio"
						placeholder="Write something about yourself"
					/>
				</div>
			</div>

			<button class="button--primary w-full">Finish Setup</button>

			<p class="mt-sm text-sm text-grey-700">
				Note: What you have inputted will be publicly visible, so make sure you haven't inputted
				anything private.
			</p>
		</form>
	</div>
</section>
