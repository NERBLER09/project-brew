<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import Back from '$lib/assets/Arrow/Back.svelte';
	import Edit from '$lib/assets/Edit.svelte';
	import Image from '$lib/assets/Image.svelte';
	import PlusNew from '$lib/assets/Plus-New.svelte';
	import Trash from '$lib/assets/Trash.svelte';
	import User from '$lib/assets/User.svelte';
	import DashboardPage from '$lib/assets/Landing-Page/Dashboard.svg';
	import toast from 'svelte-french-toast';
	import FileInput from '$lib/components/form/FileInput.svelte';

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

<div class="relative flex items-center gap-10 md:flex lg:gap-[10%]">
	<div class="p-6 md:w-1/2 md:p-8 md:pr-0 lg:w-1/3">
		<header>
			<h1 class="w-fit text-lg font-semibold text-grey-800 sm:text-xl">Welcome to Project Brew!</h1>

			<p class="font-medium text-grey-700">Please take a few moments to setup your account.</p>
		</header>

		<form
			method="POST"
			enctype="multipart/form-data"
			use:enhance={() => {
				return async ({ result }) => {
					if (result.type === 'failure') {
						toast.error(result?.data.message);
					} else if (result.type === 'success') {
						goto('/welcome/project');
					}
				};
			}}
			class="mt-md w-full md:w-[31.025rem] md:min-w-[31.025rem]"
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

					<FileInput bind:newBanner postRemoveBannnerHandle={removeBanner} />
				</div>
			</section>

			<button class="button--primary gap-mdm flex w-full items-center justify-center md:w-fit">
				Next
				<Back className="h-8 w-8 stroke-grey-200 rotate-180" />
			</button>
		</form>
	</div>

	<div
		class="rouned-lg relative top-0 my-md hidden aspect-[77/47] shadow-md md:inline lg:h-[100vh-20px] lg:w-full"
	>
		<img
			src={DashboardPage}
			alt="dashboard page"
			class="fixed top-0 aspect-auto h-[100vh] lg:h-[100vh-20px]"
		/>
	</div>
</div>
