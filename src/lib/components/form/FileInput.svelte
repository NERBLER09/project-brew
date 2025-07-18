<script lang="ts">
	import Trash from '$lib/assets/Trash.svelte';
	import Edit from '$lib/assets/Edit.svelte';
	import Image from '$lib/assets/Image.svelte';

	export let uploadBanner: () => Promise<void>;
	export let postRemoveBannnerHandle: () => Promise<void>;

	export let bannerURL: string | null;
	export let newBanner: FileList | null;
	let bannerInputElement: HTMLInputElement;

	const removeBanner = async () => {
		bannerURL = null;
		newBanner = null;

		postRemoveBannnerHandle();
	};

	const getFileURL = (file: any) => {
		if (!file) return;
		bannerURL = URL.createObjectURL(file);
	};

	$: if (newBanner) getFileURL(newBanner[0]);
</script>

<input type="text" class="hidden" value={bannerURL} name="set_banner" />
<input
	id="banner-select"
	type="file"
	class="hidden"
	bind:this={bannerInputElement}
	bind:files={newBanner}
	name="banner"
	accept="image/png, image/jpeg"
	on:change={uploadBanner}
/>
{#if bannerURL}
	<div
		class="group flex h-[9.375rem] w-full items-center justify-center rounded-lg bg-cover bg-center font-bold text-grey-700"
		style="background-image: url({bannerURL}); background-color: rgba(0, 0, 0, .15);"
	>
		<div class="flex items-center gap-md rounded-md p-2">
			<button class="hover:bg-grey-700" on:click={removeBanner} type="button">
				<Trash className="h-8 w-8 stroke-grey-200" />
				<span class="sr-only">Remove banner</span>
			</button>
			<button class="hover:bg-grey-700" on:click={() => bannerInputElement.click()} type="button">
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
