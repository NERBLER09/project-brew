<script lang="ts">
	import CloseMultiply from '$lib/assets/Close-Multiply.svelte';
	import { userData } from '$lib/stores/user';
	import { supabase } from '$lib/supabase';
	import camelCase from 'lodash';
	import toast from 'svelte-french-toast';

	import { goto } from '$app/navigation';
	import { currentProject } from '$lib/stores/project';

	export let shown = false;
	export let name: string;
	export let id: string;

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

	const handleMilestoneDelete = async () => {
		const { error } = await supabase.from('milestones').delete().eq('id', id);

		if (!error) {
			toast.success('Successfully deleted milestone');
			goto(`/app/projects/${$currentProject.id}/milestones`);
		} else {
			toast.error(`Failed to deleted milestone: ${error.message}`);
		}

		shown = false;
	};
</script>

<dialog
	bind:this={dialog}
	class="h-[18.75rem] w-full overflow-hidden rounded-2xl bg-grey-100 p-8 dark:bg-grey-900 md:h-[18.75rem] md:w-[25rem]"
>
	<header class="flex items-center">
		<h2 class="text-lg font-semibold text-grey-800 dark:text-grey-200">Confirm Delete</h2>
		<button on:click={() => (shown = false)} class="ml-auto">
			<CloseMultiply className="stroke-grey-700 dark:stroke-grey-200 w-12 h-12" />
		</button>
	</header>
	<p class="pt-sm font-medium text-grey-700 dark:text-grey-200">
		Are you sure you want to delete {name}.
	</p>
	<p class="pt-sm font-medium text-red-500 dark:text-red-400">
		This action is <span class="font-bold">irreversible</span>.
	</p>
	<div class="mt-md flex flex-col gap-md md:flex-row">
		<button class="button--secondary w-full" on:click={() => (shown = false)}>Cancel</button>
		<button class="button--primary w-full" on:click={handleMilestoneDelete}>Delete</button>
	</div>
</dialog>
