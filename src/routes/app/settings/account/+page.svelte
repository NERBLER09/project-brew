<script lang="ts">
	import Check from '$lib/assets/Check.svelte';
	import { settingsPage } from '$lib/stores/ui';
	import { onMount } from 'svelte';
	import { enhance } from '$app/forms';
	import type { PageData } from './$types';
	import type { ActionData } from '../$types';
	import Edit from '$lib/assets/Edit.svelte';
	import Trash from '$lib/assets/Trash.svelte';
	import User from '$lib/assets/User.svelte';
	import toast from 'svelte-french-toast';
	import PlusNew from '$lib/assets/Plus-New.svelte';
	import Image from '$lib/assets/Image.svelte';
	import { invalidate } from '$app/navigation';

	export let data: PageData;
	export let form: ActionData;

	let profilePictureElement: HTMLInputElement;
	let newProfilePicture: FileList | null;
	let pfpFileURL = data.avatar_url ?? '';

	const getFileURL = (file: any) => {
		if (!file) return;
		pfpFileURL = URL.createObjectURL(file);
	};

	const removeProfilePicture = () => {
		pfpFileURL = '';
		newProfilePicture = null;
	};

	$: if (newProfilePicture) getFileURL(newProfilePicture[0]);
	let bannerInputElement: HTMLInputElement;
	let newBanner: FileList | null;
	let bannerURL = data.banner ?? '';

	const getBannerPreview = (file: any) => {
		if (!file) return;
		bannerURL = URL.createObjectURL(file);
	};

	const removeBanner = () => {
		bannerURL = '';
		newBanner = null;
	};

	$: if (newBanner) getBannerPreview(newBanner[0]);

	onMount(() => {
		$settingsPage = 'Account';
	});
</script>

<svelte:head>
	<title>Account Settings - Project Brew</title>
</svelte:head>

<section>
	<form
		class="mt-md w-full"
		method="POST"
		action="/app/settings?/account"
		use:enhance={() => {
			return async ({ result }) => {
				if (result.type === 'failure') {
					toast.error(result?.data.message);
				} else if (result.type === 'success') {
					toast.success('Updated account settings');
					invalidate('app:user-info');
				}
			};
		}}
	>
		<section>
			<header>
				<h2
					class="w-full text-start text-md font-semibold text-grey-800 dark:text-grey-200 md:text-lg"
				>
					Account Details
				</h2>
				<p class="font-medium text-grey-700 dark:text-grey-300">
					<span class="font-bold">Note:</span> the name you entered, bio, location, and email used to
					sign up will be publicly visible.
				</p>
			</header>
			<div class="mb-md mt-2 w-full">
				<div class="flex items-center">
					<label for="name-input" class="input--label mb-sm inline-block min-w-[4.6875rem]"
						>Name</label
					>
					<input
						type="text"
						class="input--text w-full"
						id="name-input"
						name="name"
						placeholder="Enter your name"
						required
					/>
				</div>
				<div class="my-sm flex items-center">
					<label for="location-input" class="input--label mb-sm inline-block min-w-[4.6875rem]"
						>Location</label
					>
					<input
						type="text"
						class="input--text w-full"
						id="location-input"
						name="location"
						placeholder="Enter your location"
					/>
				</div>
				<div class="flex items-center">
					<label for="company-input" class="input--label mb-sm inline-block min-w-[4.6875rem]"
						>Company</label
					>
					<input
						type="text"
						class="input--text w-full"
						id="company-input"
						name="company"
						placeholder="Enter your company"
					/>
				</div>
				<div class="mt-sm flex items-center">
					<label for="pronouns-input" class="input--label mb-sm inline-block min-w-[4.6875rem]"
						>Pronouns</label
					>
					<input
						type="text"
						class="input--text w-full"
						id="pronouns-input"
						name="pronouns"
						placeholder="Enter your company"
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

		<section>
			<header>
				<h2
					class="mb-sm w-full text-start text-md font-semibold text-grey-800 dark:text-grey-200 md:text-lg"
				>
					Account Appearance
				</h2>
			</header>

			<div class="mb-md">
				<label for="pfp-select" class="input--label mb-sm text-md">Profile picture</label>
				<input type="text" class="hidden" value={pfpFileURL} name="set_avatar" />
				<input
					id="pfp-select"
					type="file"
					class="hidden"
					bind:this={profilePictureElement}
					bind:files={newProfilePicture}
					name="profile"
					accept="image/png, image/jpeg"
				/>
				<div class="relative h-[9.375rem] w-[9.375rem]">
					{#if pfpFileURL !== ''}
						<img
							src={pfpFileURL}
							alt="user profile"
							class="h-[9.375rem] w-[9.375rem] rounded-full border border-grey-600 bg-grey-100 stroke-grey-700 object-cover opacity-90 shadow"
						/>
					{:else}
						<User
							className="h-[9.375rem] w-[9.375rem] rounded-full object-cover stroke-grey-700 bg-grey-100 opacity-90 border-grey-600 border shadow dark:bg-grey-800 dark:stroke-grey-200"
						/>
					{/if}
					<div class="absolute right-0 top-0 flex h-full w-full items-end justify-between gap-lg">
						{#if pfpFileURL}
							<button
								type="button"
								class="rounded bg-grey-200 dark:bg-grey-700"
								on:click={removeProfilePicture}
							>
								<Trash className="h-12 w-12 stroke-grey-700 dark:stroke-grey-300" />
								<span class="sr-only">Remove profile picture</span>
							</button>
						{/if}

						<button
							type="button"
							class="relative ml-auto h-12 w-12 rounded-md bg-grey-200 dark:bg-grey-700"
							on:click={() => profilePictureElement.click()}
						>
							<PlusNew className="h-12 w-12 stroke-grey-700 dark:stroke-grey-300" />
							<span class="sr-only">Select a profile picture</span>
						</button>
					</div>
				</div>
			</div>

			<div class="mb-md">
				<h3 class="input--label mb-sm text-md">Profile Banner</h3>
				<p class="my-sm font-medium text-grey-700 dark:text-grey-300">
					Spice up your profile by uploading a banner
				</p>

				<input type="text" class="hidden" value={bannerURL} name="set_banner" />
				<input
					id="banner-select"
					type="file"
					class="hidden"
					bind:this={bannerInputElement}
					bind:files={newBanner}
					name="banner"
					accept="image/png, image/jpeg"
				/>
				{#if bannerURL}
					<div
						class="group flex h-[9.375rem] w-full items-center justify-center rounded-lg bg-cover bg-center font-bold text-grey-700"
						style="background-image: url({bannerURL}); background-color: rgba(0, 0, 0, .15);"
					>
						<div class="flex items-center gap-md rounded-md p-2">
							<button class="hover:bg-grey-700" on:click={removeBanner}>
								<Trash className="h-8 w-8 stroke-grey-200" />
								<span class="sr-only">Remove banner</span>
							</button>
							<button class="hover:bg-grey-700" on:click={() => bannerInputElement.click()}>
								<Edit className="h-8 w-8 stroke-grey-200" />
								<span class="sr-only">Change banner</span>
							</button>
						</div>
					</div>
				{:else}
					<button
						class="group flex h-[9.375rem] w-full items-center justify-center rounded-lg border border-dashed border-grey-700 bg-grey-100 font-bold text-grey-700 dark:bg-grey-700 dark:text-grey-300"
						type="button"
						on:click={() => bannerInputElement.click()}
					>
						<div
							class="flex items-center gap-md rounded-md p-2 group-hover:bg-grey-200 dark:group-hover:bg-grey-800"
						>
							<Image className="h-8 w-8 stroke-grey-700 dark:stroke-grey-300" />
							Select a profile banner
						</div>
					</button>
				{/if}
			</div>
		</section>

		<button class="button--circle fixed bottom-32 right-8 z-50 md:hidden">
			<Check className="h-8 w-8 stroke-grey-200" />
			<span class="sr-only">Save info</span>
		</button>

		<button
			class="button--primary z-50 hidden md:block {!data.banner
				? 'mx-auto mt-md'
				: 'absolute -top-36 right-0'}"
		>
			<span>Save changes</span>
		</button>
	</form>
</section>

<header>
	<h2
		class="mb-sm w-full text-start text-md font-semibold text-grey-800 dark:text-grey-200 md:text-lg"
	>
		Account Control
	</h2>
</header>

<section class="pb-lg">
	<header>
		<h3 class="input--label mb-sm text-md">Change your password</h3>
	</header>
	<form action="">
		<label for="old-password" class="input--label">Old password</label>
		<input
			type="password"
			class="input--text"
			name="old-password"
			placeholder="Enter your old password"
		/>
		<br />
		<label for="new-password" class="input--label">New Password</label>
		<input
			type="password"
			class="input--text"
			name="new-password"
			placeholder="Enter your new password"
		/>
		<br />
		<label for="confirm-password" class="input--label">Confirm Password</label>
		<input
			type="password"
			class="input--text"
			name="confirm-password"
			placeholder="Re-enter your new password again"
		/>
		<br />
		<button class="button--primary">Confirm password</button>
	</form>
</section>
