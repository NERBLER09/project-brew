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

<p class="font-medium text-grey-700 dark:text-grey-200">
	<span class="font-bold">Note:</span> the name you entered, bio, location, and email used to sign up
	will be publicly visible.
</p>

<svelte:head>
	<title>Account Settings - Project Brew</title>
</svelte:head>

<section>
	<header>
		<h2 class="text-lg font-semibold text-grey-800 dark:text-grey-100">Info</h2>
	</header>
	<form
		method="POST"
		action="/app/settings?/account"
		class="flex flex-col gap-sm"
		use:enhance={() => {
			return async ({ result }) => {
				if (result.type === 'failure') {
					toast.error(result?.data.message);
				} else if (result.type === 'success') {
					toast.success('Updated account settings');
				}
			};
		}}
	>
		<div class="flex max-w-sm items-center">
			<label for="name-input" class="input--label">Name</label>
			<input
				type="text"
				class="input--text w-full"
				id="name-input"
				name="name"
				placeholder="What should people call you"
				required
				value={data.name}
			/>
		</div>
		<div class="flex max-w-sm items-center">
			<label for="location-input" class="input--label">Location</label>
			<input
				type="text"
				class="input--text w-full"
				id="location-input"
				name="location"
				placeholder="Enter where you are"
				value={data.location}
			/>
		</div>
		<div class="flex max-w-sm items-center">
			<label for="location-input" class="input--label">Job/Role</label>
			<input
				type="text"
				class="input--text w-full"
				id="location-input"
				name="role"
				placeholder="Enter what you work as and who you work for"
				value={data.role}
			/>
		</div>
		<div>
			<label for="bio-input" class="input--label mb-sm">Bio</label>
			<textarea
				class="input--text h-36 w-full resize-none"
				id="bio-input"
				name="bio"
				placeholder="Write something about yourself"
				value={data.bio}
			/>
		</div>

		<section class="mt-md">
			<header>
				<h2 class="text-md font-semibold text-grey-800 dark:text-grey-100">Profile Picture</h2>
			</header>
			<div class="mt-sm flex items-center gap-lg">
				<input
					type="file"
					class="hidden"
					bind:this={profilePictureElement}
					bind:files={newProfilePicture}
					name="profile"
					accept="image/png, image/jpeg"
				/>

				<input type="text" bind:value={data.avatar_url} class="hidden" name="avatar_url" />
				<input type="text" bind:value={pfpFileURL} class="hidden" name="avatar_preview" />

				{#if pfpFileURL !== ''}
					<img
						src={pfpFileURL}
						alt="user profile"
						class="aspect-square h-20 w-20 rounded-full object-cover"
					/>
				{:else}
					<User className="w-20 h-20 stroke-grey-700 dark:stroke-grey-200 md:h-16 md:w-16" />
				{/if}

				<div class="flex h-fit flex-col gap-sm md:flex-row md:gap-md">
					<button
						class="button--primary flex w-full items-center justify-center gap-md"
						type="button"
						on:click={() => profilePictureElement.click()}
					>
						<Edit className="stroke-grey-200 w-6 h-6" />
						Change
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
					{:else if data.avatar_url}
						<button
							class="button--secondary"
							on:click={() => (pfpFileURL = data.avatar_url ?? '')}
							type="button"
						>
							Reset
						</button>
					{/if}
				</div>
			</div>
		</section>

		<section class="mt-md">
			<header>
				<h2 class="text-md font-semibold text-grey-800 dark:text-grey-100">Banner</h2>
			</header>

			<div class="mt-sm">
				{#if bannerURL}
					<img src={bannerURL} alt="" class="h-[12.5rem] w-full rounded object-cover" />
				{:else}
					<p class="my-sm font-medium text-grey-700 dark:text-grey-200">
						Select a file to preview it.
					</p>
				{/if}
				<input
					type="file"
					name="banner"
					class="hidden"
					bind:this={bannerInputElement}
					bind:files={newBanner}
					accept="image/png, image/jpeg"
				/>

				<input type="text" bind:value={data.banner} class="hidden" name="banner_url" />
				<input type="text" bind:value={bannerURL} class="hidden" name="banner_preview" />

				<div class="mx-auto mt-md flex gap-md md:w-3/4 md:max-w-xl">
					<button
						class="button--primary flex w-full items-center justify-center gap-md md:w-1/2"
						type="button"
						on:click={() => bannerInputElement.click()}
					>
						<Edit className="stroke-grey-200 w-6 h-6" />
						Change
					</button>
					{#if bannerURL}
						<button
							class="button--secondary flex w-full items-center justify-center gap-md md:w-1/2"
							type="button"
							on:click={removeBanner}
						>
							<Trash className="stroke-grey-700 dark:stroke-grey-200 w-6 h-6" />
							Remove
						</button>
					{:else if data.banner}
						<button
							class="button--secondary md:w-1/2"
							on:click={() => (bannerURL = data.banner ?? '')}
							type="button">Reset</button
						>
					{/if}
				</div>
			</div>
		</section>

		<button class="button--circle fixed bottom-32 right-8 z-50 md:hidden">
			<Check className="h-8 w-8 stroke-grey-200" />
			<span class="sr-only">Save info</span>
		</button>
		<button
			class="button--primary z-50 hidden md:block {!data.banner
				? 'mx-auto mt-md'
				: 'absolute right-0 -top-36'}"
		>
			<span>Save changes</span>
		</button>
	</form>
</section>
