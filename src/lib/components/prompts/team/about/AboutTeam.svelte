<script lang="ts">
	import { invalidate } from '$app/navigation';
	import CloseMultiply from '$lib/assets/Close-Multiply.svelte';
	import Edit from '$lib/assets/Edit.svelte';
	import TeamMember from '$lib/components/team/about/TeamMember.svelte';
	import { currentTeam } from '$lib/stores/team';
	import { supabase } from '$lib/supabase';
	import type { TeamMembers } from '$lib/types/projects';
	import toast from 'svelte-french-toast';
	import UpdateBanner from './UpdateBanner.svelte';
	import { enhance } from '$app/forms';
	import UserAdd from '$lib/assets/User-Add.svelte';

	export let shown = false;
	export let teamMembers: TeamMembers[];
	let dialog: HTMLDialogElement;

	let showUpdateBannerDialog = false;

	let description = $currentTeam.description;
	let name = $currentTeam.name;

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

	const handleUpdateName = async () => {
		if (name === $currentTeam.name) return;
		const { error } = await supabase.from('teams').update({ name }).eq('id', $currentTeam.id);
		if (!error) {
			invalidate('app:team');
			$currentTeam.name = name;
		} else {
			toast.error(`Failed to update team name: ${error.message}`);
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

	let emailSearch = '';
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
			contenteditable="true"
			bind:textContent={name}
			on:blur={handleUpdateName}
		>
			{$currentTeam?.name}
		</h1>
		<div class={$currentTeam.banner ? '' : 'ml-auto flex items-center'}>
			<button
				class="top-8 left-8 {$currentTeam.banner ? 'absolute' : 'static'}"
				on:click={() => (showUpdateBannerDialog = true)}
			>
				<Edit
					className="{$currentTeam.banner
						? 'stroke-grey-200'
						: 'stroke-grey-700 dark:stroke-grey-200'} w-8 h-8"
				/>
				<span class="sr-only">Modify team banner</span>
			</button>
			<button
				on:click={() => (shown = false)}
				class="{$currentTeam.banner ? 'absolute' : 'static'} top-8 right-8"
			>
				<CloseMultiply
					className="{$currentTeam.banner
						? 'stroke-grey-200'
						: 'stroke-grey-700 dark:stroke-grey-200'} w-12 h-12"
				/>
				<span class="sr-only">Close</span>
			</button>
		</div>
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
			<form
				action="/app/team/{$currentTeam.id}/about?/invite"
				method="POST"
				class="mb-md"
				use:enhance={() => {
					return async ({ result }) => {
						if (result.type === 'success') {
							toast.success(`Added ${emailSearch} to ${$currentTeam.name}`);
							invalidate('app:team');
						} else if (result.data.notFound) {
							toast.error(`A user with the email: ${emailSearch} doesn't exist`);
						} else if (result.data.invited) {
							toast.error(`${emailSearch} has already been invited to this team.`);
						} else if (result.type === 'failure') {
							toast.error(`Failed to add user: ${result.data.message}`);
						}
					};
				}}
			>
				<div class="input--text relative flex w-full items-center">
					<input
						type="email"
						placeholder="Search by email to invite people"
						class="input--text m-0 w-full p-0"
						bind:value={emailSearch}
						name="invite_email"
					/>
					<button>
						<UserAdd className="stroke-grey-700 dark:stroke-grey-200 w-6 h-6 ml-auto" />
					</button>
				</div>
			</form>
			<div class="mt-sm flex flex-col items-start gap-lg">
				{#each teamMembers as { user_id, role }}
					<TeamMember id={user_id} {role} />
				{/each}
			</div>
		</section>
	</div>
</dialog>

<UpdateBanner bind:shown={showUpdateBannerDialog} />
