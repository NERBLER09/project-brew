<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import Edit from '$lib/assets/Edit.svelte';
	import Trash from '$lib/assets/Trash.svelte';
	import User from '$lib/assets/User.svelte';
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
		bannerInputElement.value = '';
	};

	$: if (newBanner) getBannerPreview(newBanner[0]);

	let profilePictureElement: HTMLInputElement;
	let newProfilePicture: FileList | null;
	let pfpFileURL = '';

	const getFileURL = (file: any) => {
		if (!file) return;
		pfpFileURL = URL.createObjectURL(file);
	};

	const removeProfilePicture = () => {
		pfpFileURL = '';
		profilePictureElement.value = '';
	};

	$: if (newProfilePicture) getFileURL(newProfilePicture[0]);
</script>

<svelte:head>
	<title>Project Brew - Welcome</title>
</svelte:head>

<main
	class="flex flex-col items-center justify-center gap-md overflow-y-auto p-6 text-center md:w-screen md:p-8"
>
	<header>
		<h1 class="text-lg font-semibold text-grey-800 sm:text-2xl">Welcome to Project Brew!</h1>
	</header>
	<div class="flex w-full max-w-xl flex-col items-center gap-md md:w-2/3">
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

				<div>
					<h3 class="my-md text-start font-bold text-grey-700">Profile Picture</h3>
					<input
						type="file"
						class="hidden"
						bind:this={profilePictureElement}
						bind:files={newProfilePicture}
						name="profile"
						accept="image/png, image/jpeg"
					/>
					<div class="flex items-center gap-lg">
						{#if pfpFileURL !== ''}
							<img
								src={pfpFileURL}
								alt="user profile"
								class="aspect-square h-20 w-20 rounded-full object-cover"
							/>
						{:else}
							<User className="w-20 h-20 stroke-grey-700 md:h-16 md:w-16" />
						{/if}

						<div class="flex h-fit w-full flex-col gap-sm md:gap-md">
							<button
								class="button--primary flex w-full items-center justify-center gap-md"
								type="button"
								on:click={() => profilePictureElement.click()}
							>
								<Edit className="stroke-grey-200 w-6 h-6" />
								Select
							</button>
							{#if pfpFileURL}
								<button
									class="button--secondary flex w-full items-center justify-center gap-md"
									type="button"
									on:click={removeProfilePicture}
								>
									<Trash className="stroke-grey-700 dark:stroke-grey-200 w-6 h-6" />
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
</main>
