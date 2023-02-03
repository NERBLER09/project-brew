<script>
	import Check from '$lib/assets/Check.svelte';
	import { settingsPage } from '$lib/stores/ui';
	import { onMount } from 'svelte';

	onMount(() => {
		$settingsPage = 'Account';
	});
</script>

<p class="font-medium text-grey-700 dark:text-grey-200">
	<span class="font-bold">Note:</span> the name you entered, bio, location, and email used to sign up
	will be publicly visible.
</p>

<section>
	<h2 class="text-lg font-semibold text-grey-800 dark:text-grey-100">Info</h2>
	<form on:submit|preventDefault={() => {}} class="flex flex-col gap-sm">
		<div>
			<label for="name-input" class="input--label">Name</label>
			<input
				type="text"
				class="input--text"
				id="name-input"
				name="name"
				placeholder="What should people call you"
			/>
		</div>
		<div>
			<label for="location-input" class="input--label">Location</label>
			<input
				type="text"
				class="input--text"
				id="location-input"
				name="location"
				placeholder="Enter where you are"
			/>
		</div>
		<div>
			<label for="bio-input" class="input--label mb-sm">Bio</label>
			<textarea
				class="input--text h-36 w-full resize-none"
				id="bio-input"
				name="bio"
				placeholder="Write something about yourself"
			/>
		</div>
		<button class="button--circle fixed bottom-32 right-8 z-50 md:hidden">
			<Check className="h-8 w-8 stroke-grey-200" />
			<span class="sr-only">Save info</span>
		</button>
		<button class="button--primary absolute right-0 -top-36 z-50 hidden md:block">
			<span>Save changes</span>
		</button>
	</form>
</section>
