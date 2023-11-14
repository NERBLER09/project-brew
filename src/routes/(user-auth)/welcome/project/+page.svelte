<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import Back from '$lib/assets/Arrow/Back.svelte';
	import Edit from '$lib/assets/Edit.svelte';
	import Image from '$lib/assets/Image.svelte';
	import Trash from '$lib/assets/Trash.svelte';
	import ProjectsPage from '$lib/assets/Landing-Page/ProjectsPage.png';
	import toast from 'svelte-french-toast';
	import NewTagsInput from '$lib/components/projects/edit/NewTagsInput.svelte';
	import FileInput from '$lib/components/form/FileInput.svelte';

	let bannerInputElement: HTMLInputElement;
	let newBanner: FileList | null;
	let bannerURL = '';
	let tags: string[] = [];

	const getBannerPreview = (file: any) => {
		if (!file) return;
		bannerURL = URL.createObjectURL(file);
	};

	const removeBanner = () => {
		bannerURL = '';
		bannerInputElement.value = '';
	};

	$: if (newBanner) getBannerPreview(newBanner[0]);
</script>

<svelte:head>
	<title>Project Brew - Welcome</title>
</svelte:head>

<div class="relative flex items-center gap-10 md:flex lg:gap-[10%]">
	<div class="p-6 md:w-1/2 md:p-8 md:pr-0">
		<header>
			<h1 class="w-fit text-lg font-semibold text-grey-800 sm:text-xl lg:whitespace-nowrap">
				Let's get your first project setup
			</h1>

			<p class="w-full font-medium text-grey-700">
				You can take a few moments to setup a basic project. You can invite people to this project
				once you are done setting up your account.
			</p>
		</header>

		<form
			method="POST"
			use:enhance={() => {
				return async ({ result }) => {
					if (result.type === 'failure') {
						toast.error('Failed to create project');
						goto('/welcome/team');
					} else if (result.type === 'success') {
						goto('/welcome/team');
					}
				};
			}}
			class="mt-md w-full md:w-[31.025rem] md:min-w-[31.025rem]"
		>
			<section>
				<header>
					<h2 class="w-full text-start text-md font-semibold text-grey-700">Project Details</h2>
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
							placeholder="What should this project be called?"
							required
						/>
					</div>
					<div class="w-full">
						<label for="bio-input" class="input--label mb-sm inline-block w-full text-start"
							>Description</label
						>
						<textarea
							class="input--text h-36 w-full resize-none"
							id="bio-input"
							name="bio"
							placeholder="What is this project about?"
						/>
					</div>
				</div>
				<section>
					<header>
						<h3 class="input--label">Tags</h3>
					</header>

					<input type="text" class="hidden" bind:value={tags} name="tags" />

					<div class="mb-md flex flex-wrap gap-md">
						<NewTagsInput bind:newTags={tags} />
					</div>
				</section>
			</section>

			<section>
				<header>
					<h2 class="mb-sm w-full text-start text-md font-semibold text-grey-700">
						Project Appearance
					</h2>
				</header>

				<div class="mb-md">
					<label for="pfp-select" class="input--label mb-sm">Profile Banner</label>
					<p class="my-sm font-medium text-grey-700">Spice up this project by uploading a banner</p>

					<FileInput bind:newBanner postRemoveBannnerHandle={removeBanner} />
				</div>
			</section>

			<div class="flex flex-col-reverse items-center gap-md md:flex-row">
				<a
					class="button--secondary gap-mdm flex w-full items-center justify-center md:w-fit"
					type="button"
					href="/welcome/team"
				>
					Skip
				</a>

				<button class="button--primary gap-mdm flex w-full items-center justify-center md:w-fit">
					Next
					<Back className="h-8 w-8 stroke-grey-200 rotate-180" />
				</button>
			</div>
		</form>
	</div>

	<div
		class="rouned-lg relative top-0 my-md hidden aspect-[77/47] shadow-md md:inline lg:h-[100vh-20px] lg:w-full"
	>
		<img
			src={ProjectsPage}
			alt="project page"
			class="fixed top-0 aspect-auto h-[100vh] lg:h-[100vh-20px]"
		/>
	</div>
</div>
