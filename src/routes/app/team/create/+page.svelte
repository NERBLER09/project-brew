<script lang="ts">
	import MobileSubPageLayout from '$lib/components/layouts/MobileSubPageLayout.svelte';
	import Image from '$lib/assets/Image.svelte';
	import Check from '$lib/assets/Check.svelte';
	import { enhance } from '$app/forms';
	import toast from 'svelte-french-toast';
	import { goto } from '$app/navigation';

	let files: any = '';
	let fileURL: string;

	const getFileURL = (file: any) => {
		if (!file) return;
		fileURL = URL.createObjectURL(file);
	};

	const resetImages = () => {
		fileURL = '';
		files = null;
	};

	$: if (files) getFileURL(files[0]);
</script>

<MobileSubPageLayout pageName="New Team" previousPage="/app/team">
	<p class="pt-sm pb-md font-medium text-grey-700 dark:text-grey-200">Create a new team</p>

	<form
		method="POST"
		action="?/new"
		use:enhance={() => {
			return async ({ result }) => {
				if (result.type === 'failure') {
					toast.error(result?.data.message);
				} else if (result.type === 'success') {
					toast.success('Created new project');
					// TODO: Route to team setup page after creating a team
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
			<div class="max-w-xl">
				<label
					class="flex h-32 w-full cursor-pointer appearance-none justify-center rounded-md border-2 border-dashed border-grey-800 bg-grey-100 px-4 transition hover:border-grey-600 focus:outline-none dark:bg-grey-800"
				>
					<span class="flex flex-col items-center justify-center space-x-2">
						<Image className="h-8 w-8 stroke-grey-700 dark:stroke-grey-200" />
						<span class="font-medium text-grey-700 dark:text-grey-200">Select a cover image</span>
					</span>
					<input type="file" name="cover" class="hidden" accept=".png, .jpg" bind:files />
				</label>
			</div>

			{#if fileURL}
				<h3 class="mt-md text-md font-semibold text-grey-700 dark:text-grey-200">Cover Preview</h3>
				<img src={fileURL} alt="cover" class="max-h-52 w-full rounded-md bg-center object-cover" />
				<button class="button--secondary mt-sm w-full" type="button" on:click={resetImages}
					>Clear cover</button
				>
			{/if}
		</section>

		<button class="button--circle absolute bottom-8 right-8" type="submit">
			<Check className="h-8 w-8 stroke-grey-200" />
			<span class="sr-only">Create project</span>
		</button>
	</form>
</MobileSubPageLayout>
