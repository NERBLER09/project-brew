<script lang="ts">
	import { supabase } from '$lib/supabase';

	let name = '';

	let error = '';

	const handleSetUserData = async () => {
		const {
			data: { user }
		} = await supabase.auth.getUser();
		const id = user?.id;
		const email = user?.email;

		const { error: errorMsg } = await supabase.from('profiles').insert({
			id,
			email,
			name
		});

		if (error) error = errorMsg?.message!;
		else console.log('User data set! TODO: Route to main page');
	};
</script>

<section
	class="text-center mx-6 h-screen md:w-screen flex items-center justify-center flex-col gap-md"
>
	<header>
		<h1 class="text-xl font-semibold text-grey-800 sm:text-2xl">Welcome to Project Brew!</h1>
	</header>
	<div class="flex flex-col items-center gap-md">
		<p class="text-grey-700 md:w-1/2 px-6">
			Please take a few moments to setup your account details. You can always change and set these
			in your account settings.
		</p>
		<form on:submit|preventDefault={handleSetUserData}>
			<input
				type="text"
				class="input--text mb-md"
				placeholder="Enter your name"
				bind:value={name}
			/>
			<br />
			<button class="button--primary">Set details</button>
		</form>
	</div>
</section>