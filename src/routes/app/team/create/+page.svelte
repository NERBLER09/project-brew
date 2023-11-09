<script lang="ts">
	import MobileSubPageLayout from '$lib/components/layouts/MobileSubPageLayout.svelte';
	import Image from '$lib/assets/Image.svelte';
	import Check from '$lib/assets/Check.svelte';
	import { enhance } from '$app/forms';
	import toast from 'svelte-french-toast';
	import { goto } from '$app/navigation';
	import FileInput from '$lib/components/form/FileInput.svelte';

	let files: any = '';
	let fileURL: string;
	let fileInput: HTMLInputElement;

	const getFileURL = (file: any) => {
		if (!file) return;
		fileURL = URL.createObjectURL(file);
	};

	const resetImages = () => {
		fileURL = '';
		files = null;
		fileInput.value = '';
	};

	$: if (files) getFileURL(files[0]);
</script>

<svelte:head>
	<title>New Team - Project Brew</title>
</svelte:head>

<MobileSubPageLayout pageName="New Team" previousPage="/app/team">
	<p class="pb-md pt-sm font-medium text-grey-700 dark:text-grey-200">Create a new team</p>

	<form
		method="POST"
		action="?/new"
		use:enhance={() => {
			return async ({ result }) => {
				if (result.type === 'failure') {
					toast.error(result?.data.message);
				} else if (result.type === 'success') {
					toast.success('Created new project');
					goto(`/app/team/${result.data.team_id}`);
				}
			};
		}}
	>
		<input
			type="text"
			class="input--text mb-md w-full"
			placeholder="What should this team be called"
			name="name"
		/>
		<textarea
			name="description"
			class="input--text h-36 w-full resize-none"
			placeholder="Enter a brief description"
		/>

		<section>
			<header>
				<h2 class="text-md font-bold text-grey-700 dark:text-grey-200">Cover image</h2>
			</header>
			<p class="font-semibold text-grey-700 dark:text-grey-300">
				Spice up your team by setting a team banner
			</p>

			<FileInput
				bind:bannerURL={fileURL}
				postRemoveBannnerHandle={() => {}}
				bind:newBanner={files}
			/>
		</section>

		<button class="button--circle absolute bottom-8 right-8" type="submit">
			<Check className="h-8 w-8 stroke-grey-200" />
			<span class="sr-only">Create project</span>
		</button>
	</form>
</MobileSubPageLayout>
