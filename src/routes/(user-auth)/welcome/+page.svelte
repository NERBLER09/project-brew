<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import Back from '$lib/assets/Arrow/Back.svelte';
	import Edit from '$lib/assets/Edit.svelte';
	import Image from '$lib/assets/Image.svelte';
	import PlusNew from '$lib/assets/Plus-New.svelte';
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

<header>
	<h1 class="text-lg font-semibold text-grey-800 sm:text-xl">Welcome to Project Brew!</h1>

	<p class="text-grey-700 md:px-6">Please take a few moments to setup your account.</p>
</header>

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
	class="mt-md w-full md:px-20"
>
	<section>
		<header>
			<h2 class="w-full text-start text-md font-semibold text-grey-700">Account Details</h2>
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
					name="name"
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
					name="name"
					placeholder="Enter your company"
				/>
			</div>
			<div class="mt-sm flex items-center">
				<label for="pronouns-input" class="input--label mb-sm inline-block min-w-[4.6875rem]"
					>Pronouns</label
				>
				<select name="pronouns" id="pronouns-input" class="input--text w-full">
					<option>Don't show</option>
					<option>He/Him</option>
					<option>She/Her</option>
					<option>They/Them</option>
					<option>Custom</option>
				</select>
			</div>
			<div class="w-full">
				<label for="bio-input" class="input--label mb-sm inline-block w-full text-start">Bio</label>
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
			<h2 class="mb-sm w-full text-start text-md font-semibold text-grey-700">
				Account Appearance
			</h2>
		</header>

		<div class="mb-md">
			<label for="pfp-select" class="input--label mb-sm">Profile picture</label>
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
						className="h-[9.375rem] w-[9.375rem] rounded-full object-cover stroke-grey-700 bg-grey-100 opacity-90 border-grey-600 border shadow"
					/>
				{/if}
				<div class="absolute right-0 top-0 flex h-full w-full items-end justify-between gap-lg">
					{#if pfpFileURL}
						<button type="button" class="rounded bg-grey-200" on:click={removeProfilePicture}>
							<Trash className="h-12 w-12 stroke-grey-700" />
							<span class="sr-only">Remove profile picture</span>
						</button>
					{/if}

					<button
						type="button"
						class="relative ml-auto h-12 w-12 rounded-md bg-grey-200"
						on:click={() => profilePictureElement.click()}
					>
						<PlusNew
							className="h-12 w-12 stroke-grey-700 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
						/>
						<span class="sr-only">Select a profile picture</span>
					</button>
				</div>
			</div>
		</div>

		<div class="mb-md">
			<label for="pfp-select" class="input--label mb-sm">Profile Banner</label>
			<p class="my-sm font-medium text-grey-700">Spice up your profile by uploading a banner</p>
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
					class="group flex h-[9.375rem] w-full items-center justify-center rounded-lg border border-dashed border-grey-700 bg-grey-100 font-bold text-grey-700"
					type="button"
					on:click={() => bannerInputElement.click()}
				>
					<div class="flex items-center gap-md rounded-md p-2 group-hover:bg-grey-200">
						<Image className="h-8 w-8 stroke-grey-700" />
						Select a profile banner
					</div>
				</button>
			{/if}
		</div>
	</section>

	<button class="button--primary flex w-full items-center justify-center gap-md">
		Next
		<Back className="h-8 w-8 stroke-grey-200 rotate-180" />
	</button>
</form>
