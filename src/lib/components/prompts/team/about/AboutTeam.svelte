<script lang="ts">
	import CloseMultiply from '$lib/assets/Close-Multiply.svelte';
	import { currentTeam } from '$lib/stores/team';

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

<dialog
	bind:this={dialog}
	class="relative h-1/2 w-2/3 rounded-2xl bg-grey-100 p-8 dark:bg-grey-900 xl:h-2/3 xl:w-1/3"
	on:close={() => (shown = false)}
>
	<header
		class="relative -top-8 -left-8 flex w-[calc(100%+64px)] items-end rounded-b-3xl bg-cover bg-center object-cover p-6 {!$currentTeam.banner
			? 'w-[calc(100%+64px)]'
			: 'h-[12.5rem]'}"
		style="background-image: {$currentTeam.banner
			? 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.6) 115.18%),'
			: ''} url({$currentTeam.banner});"
	>
		<h1
			class="w-fit text-lg {$currentTeam.banner
				? 'text-grey-200'
				: 'text-grey-700 dark:text-grey-200'} truncate"
		>
			{$currentTeam?.name}
		</h1>
		<button on:click={() => (shown = false)} class="absolute top-6 right-6">
			<CloseMultiply
				className="{$currentTeam.banner
					? 'stroke-grey-200'
					: 'stroke-grey-700 dark:stroke-grey-200'} w-12 h-12"
			/>
			<span class="sr-only">Close</span>
		</button>
	</header>
</dialog>
