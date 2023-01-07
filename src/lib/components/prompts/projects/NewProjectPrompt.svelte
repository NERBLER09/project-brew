<script lang="ts">
	import CloseMultiply from '$lib/assets/Close-Multiply.svelte';
	import Image from '$lib/assets/Image.svelte';
	import PlusNew from '$lib/assets/Plus-New.svelte';

	export let shown = false;
	let dialog: HTMLDialogElement;

	const handleModalStatus = (status: boolean) => {
		if (!dialog) return;
		if (status) {
			shown = true;
			dialog.showModal();
		} else {
			shown = false;
			dialog.close();
		}
	};

	$: handleModalStatus(shown);
</script>

<dialog bind:this={dialog} class="bg-grey-100 rounded-2xl p-8 w-2/3 h-1/2 xl:w-1/3 xl:h-2/3">
	<header class="flex items-center mb-md sticky top-0 bg-grey-100">
		<h2 class="font-semibold text-grey-800 text-lg">Create a new project</h2>
		<button on:click={() => (shown = false)} class="ml-auto">
			<CloseMultiply className="stroke-grey-700 w-12 h-12" />
		</button>
	</header>

	<form method="POST" action="/app/projects?/new">
		<section class="mt-sm">
			<header>
				<h2 class="font-bold text-grey-700 text-md mb-sm">Basic Details</h2>
			</header>
			<div class="flex gap-4 items-center mb-lg">
				<label for="name-input" class="input--label w-[22ch]">Enter a project name</label>
				<input
					id="name-input"
					name="name"
					type="text"
					class="input--text w-full"
					placeholder="Enter a project name"
					required
				/>
			</div>
			<div class="flex flex-col gap-sm">
				<label for="description-input" class="input--label">Enter a description</label>
				<textarea
					name="description"
					id="description-input"
					class="input--text resize-none h-36"
					placeholder="Enter a breif description"
				/>
			</div>
		</section>

		<section class="my-md">
			<header>
				<h2 class="font-bold text-grey-700 text-md mt-md">Tags</h2>
			</header>
			<div>
				<button type="button">
					<PlusNew className="h-8 w-8 stroke-grey-700" />
					<span class="sr-only">Add new tag</span>
				</button>
			</div>
		</section>
		<section class="mb-sm">
			<header>
				<h2 class="font-bold text-grey-700 text-md">Invite team members</h2>
			</header>
			<div>
				<button type="button">
					<PlusNew className="h-8 w-8 stroke-grey-700" />
					<span class="sr-only">Add new team member</span>
				</button>
			</div>
		</section>
		<section>
			<header>
				<h2 class="font-bold text-grey-700 text-md">Cover image</h2>
			</header>
			<div>
				<label
					class="flex justify-center w-full h-32 px-4 transition bg-grey-100 border-2 border-grey-800 border-dashed rounded-md appearance-none cursor-pointer hover:border-grey-600 focus:outline-none"
				>
					<span class="flex flex-col justify-center items-center space-x-2">
						<Image className="h-8 w-8 stroke-grey-700" />
						<span class="font-medium text-grey-700">Drag and drop</span>
						<span class="font-medium text-grey-700">or</span>
						<span class="font-medium text-grey-700">select a cover image</span>
					</span>
					<input type="file" name="file_upload" class="hidden" />
				</label>
			</div>
		</section>
		<footer class="w-1/2 flex items-center justify-around mx-auto mt-xl">
			<button class="button--secondary" on:click={() => (shown = false)}>Cancel</button>
			<button class="button--primary">Update</button>
		</footer>
	</form>
</dialog>
