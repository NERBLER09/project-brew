<script lang="ts">
	import { invalidate } from '$app/navigation';
	import CloseMultiply from '$lib/assets/Close-Multiply.svelte';
	import TeamMember from '$lib/components/team/about/TeamMember.svelte';
	import { currentTeam } from '$lib/stores/team';
	import { supabase } from '$lib/supabase';
	import type { TeamMembers } from '$lib/types/projects';
	import toast from 'svelte-french-toast';

	export let shown = false;
	export let teamMembers: TeamMembers[];
	let dialog: HTMLDialogElement;

	let description = $currentTeam.description;

	const handleUpdateDescription = async () => {
		if (description === $currentTeam.description) return;
		const { error } = await supabase
			.from('teams')
			.update({ description })
			.eq('id', $currentTeam.id);
		if (!error) {
			invalidate('app:team');
			$currentTeam.description = description;
		} else {
			toast.error(`Failed to update team description: ${error.message}`);
		}
	};

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
		class=" -top-8 -left-8 flex items-end rounded-b-3xl bg-cover bg-center object-cover {!$currentTeam.banner
			? 'static w-full'
			: 'relative h-[12.5rem] w-[calc(100%+64px)] p-6'}"
		style="background-image: {$currentTeam.banner
			? 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.6) 115.18%),'
			: ''} url({$currentTeam.banner});"
	>
		<h1
			class="w-fit text-lg {$currentTeam.banner
				? 'text-grey-200'
				: 'text-grey-700 dark:text-grey-200'} truncate font-semibold"
		>
			{$currentTeam?.name}
		</h1>
		<button on:click={() => (shown = false)} class="absolute top-8 right-8">
			<CloseMultiply
				className="{$currentTeam.banner
					? 'stroke-grey-200'
					: 'stroke-grey-700 dark:stroke-grey-200'} w-12 h-12"
			/>
			<span class="sr-only">Close</span>
		</button>
	</header>

	<div class={$currentTeam.banner ? 'relative -top-6' : ''}>
		<p
			class="my-md font-medium text-grey-700 dark:text-grey-300"
			contenteditable="true"
			bind:textContent={description}
			on:blur={handleUpdateDescription}
		>
			{$currentTeam.description}
		</p>
		<section class="mt-md">
			<header>
				<h2 class="text-md font-semibold text-grey-700 dark:text-grey-200">Invited team members</h2>
			</header>
			<div class="mt-sm flex flex-col items-start gap-lg">
				{#each teamMembers as { user_id, role }}
					<TeamMember id={user_id} {role} />
				{/each}
			</div>
		</section>
	</div>
</dialog>
