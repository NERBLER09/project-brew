<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import Edit from '$lib/assets/Edit.svelte';
	import Trash from '$lib/assets/Trash.svelte';
	import toast from 'svelte-french-toast';

	let bannerInputElement: HTMLInputElement;
	let newBanner: FileList | null;
	let bannerURL = '';

	const getBannerPreview = (file: any) => {
		if (!file) return;
		bannerURL = URL.createObjectURL(file);
	};

	const removeBanner = () => {
		bannerURL = '';
		newBanner = undefined;
		bannerInputElement.value = '';
	};

	$: if (newBanner) getBannerPreview(newBanner[0]);

	$: console.log(newBanner);
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
						// goto('/app/home');
					}
				};
			}}
			class="w-full md:px-20"
		>
			<section>
				<header>
					<h2 class="w-full text-start text-md font-semibold text-grey-700">About you</h2>
				</header>
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
			</section>

			<section class="mb-md">
				<header>
					<h2 class="w-full text-start text-md font-semibold text-grey-700">Profile Appearance</h2>
				</header>

				<div>
					<h3 class="text-start font-bold text-grey-700">Banner</h3>
					<div class="mt-sm">
						{#if bannerURL}
							<img
								src={bannerURL}
								alt="selected user banner"
								class="h-[12.5rem] w-full rounded object-cover"
							/>
						{:else}
							<p class="my-sm text-start font-medium text-grey-700">Select a file to preview it.</p>
						{/if}
						<input
							type="file"
							name="banner"
							class="hidden"
							bind:this={bannerInputElement}
							bind:files={newBanner}
							accept="image/png, image/jpeg"
						/>

						<div class="mx-auto mt-md flex w-full gap-md">
							<button
								class="button--primary flex w-full items-center justify-center gap-md"
								type="button"
								on:click={() => bannerInputElement.click()}
							>
								<Edit className="stroke-grey-200 w-6 h-6" />
								Select
								<span class="sr-only">Select a banner from the file system</span>
							</button>
							{#if bannerURL}
								<button
									class="button--secondary flex w-full items-center justify-center gap-md md:w-1/2"
									type="button"
									on:click={removeBanner}
								>
									<Trash className="stroke-grey-700 w-6 h-6" />
									Remove
								</button>
							{/if}
						</div>
					</div>
				</div>
			</section>

			<button class="button--primary w-full">Finish Setup</button>

			<p class="mt-sm text-sm text-grey-700">
				Note: What you have inputted will be publicly visible, so make sure you haven't inputted
				anything private.
			</p>
		</form>
	</div>
</section>
