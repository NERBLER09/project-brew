<script lang="ts">
	import { invalidate } from '$app/navigation';
	import CloseMultiply from '$lib/assets/Close-Multiply.svelte';
	import Edit from '$lib/assets/Edit.svelte';
	import Trash from '$lib/assets/Trash.svelte';
	import { currentTeam } from '$lib/stores/team';
	import { currentUsers } from '$lib/stores/user';
	import { supabase } from '$lib/supabase';
	import toast from 'svelte-french-toast';

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

	let newBannerFiles: FileList;
	let fileInput: HTMLInputElement;

	const handleUpdateBanner = async () => {
		const banner = newBannerFiles[0];

		if (banner.size !== 0 && banner.size < 5000000) {
			const { error: uploadErr } = await supabase.storage
				.from('teams')
				.upload(`${$currentUsers.id}/${$currentTeam.name}`, banner, {
					cacheControl: '3600',
					upsert: true
				});
			if (uploadErr) {
				toast.error(`Failed to upload new banner: ${uploadErr.message}`);
				return;
			}

			const { data: url } = supabase.storage
				.from('teams')
				.getPublicUrl(`${$currentUsers.id}/${$currentTeam.name}`);

			const { error } = await supabase
				.from('teams')
				.update({ banner: url.publicUrl })
				.eq('id', $currentTeam.id);
			if (!error) {
				invalidate('app:team');
				$currentTeam.banner = url.publicUrl;
			} else {
				toast.error(`Failed to update team banner: ${error.message}`);
			}
		} else if (banner.size !== 0 && banner.size > 5000000) {
			toast.error('The selected file must be under 5mb in size');
		}
	};
</script>

<dialog
	bind:this={dialog}
	class="h-[18.75rem] w-full overflow-hidden rounded-2xl bg-grey-100 p-8 dark:bg-grey-900 md:h-[18.75rem] md:w-[25rem] md:backdrop:bg-none"
>
	<header class="flex items-center">
		<h2 class="text-lg font-semibold text-grey-800 dark:text-grey-200">Update Banner</h2>
		<button on:click={() => (shown = false)} class="ml-auto">
			<CloseMultiply className="stroke-grey-700 dark:stroke-grey-200 w-12 h-12" />
		</button>
	</header>

	<p class="my-md text-sm font-medium text-grey-700 dark:text-grey-200 md:text-base">
		Change or remove the banner of this team.
	</p>
	<p class="my-md text-sm font-medium text-grey-700 dark:text-grey-200 md:text-base">
		File must be less then 5mb in size.
	</p>

	<form on:submit|preventDefault={() => {}}>
		<input
			type="file"
			name="Select a new banner file"
			class="hidden"
			bind:this={fileInput}
			bind:files={newBannerFiles}
			on:change={handleUpdateBanner}
		/>
		<div class="mt-md flex flex-col gap-md md:flex-row">
			<button
				class="button--secondary flex w-full items-center justify-center gap-md"
				on:click={() => (shown = false)}
				type="button"
			>
				<Trash className="w-6 h-6 dark:stroke-grey-200 stroke-grey-700" />
				Remove
			</button>

			<button
				class="button--primary flex w-full items-center justify-center gap-md"
				on:click={() => fileInput.click()}
			>
				<Edit className="w-6 h-6 stroke-grey-200" />
				Update
			</button>
		</div>
	</form>
</dialog>
