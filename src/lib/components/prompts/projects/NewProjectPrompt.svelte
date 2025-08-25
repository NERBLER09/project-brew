<script lang="ts">
	import { deserialize } from '$app/forms';
	import { goto } from '$app/navigation';
	import CloseMultiply from '$lib/assets/Close-Multiply.svelte';
	import NewTagsInput from '$lib/components/projects/edit/NewTagsInput.svelte';
	import type { ActionResult } from '@sveltejs/kit';
	import InviteTeamMember from '$lib/components/projects/new/InviteTeamMember.svelte';
	import { currentUsers, invitedTeamMembers } from '$lib/stores/user';
	import toast from 'svelte-french-toast';
	import { supabase } from '$lib/supabase';
	import AddTeam from '$lib/components/projects/new/AddTeam.svelte';
	import Down from '$lib/assets/Arrow/Chevron/Down.svelte';
	import FileInput from '$lib/components/form/FileInput.svelte';

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

	let newBanner: any = '';
	let fileURL: string;

	const getFileURL = (file: any) => {
		if (!file) return;
		fileURL = URL.createObjectURL(file);
	};

	$: getFileURL(newBanner[0]);

	let name = '';
	let description = '';
	let tags: string[] = [];
	let selectedTeam = '';
	let useTemplate = false;

	const handleSubmit = async (event) => {
		const data = new FormData(event.target);
		data.append('cover-url', newBanner[0] ?? '');
		data.append('name', name);
		data.append('description', description);
		data.append('tags', tags.toString() ?? null);
		data.append('user', JSON.stringify($currentUsers));
		data.append('team', selectedTeam);

		const response = await fetch('/app/projects?/new', {
			method: 'POST',
			body: data
		});
		const result: ActionResult = deserialize(await response.text());
		if (result.type === 'success') {
			if (useTemplate) {
				const { data: user } = await supabase.auth.getUser();
				const { error: err } = await supabase.from('lists').insert([
					{
						project: result.data.id,
						position: 0,
						list_name: 'To-Do',
						status: 'todo',
						user_id: user.user?.id
					},
					{
						project: result.data.id,
						position: 1,
						list_name: 'Doing',
						status: 'doing',
						user_id: user.user?.id
					},
					{
						project: result.data.id,
						position: 2,
						list_name: 'Done',
						status: 'done',
						user_id: user.user?.id
					}
				]);
			}
			toast.success('Created new project');
			goto(`/app/projects/${result?.data.id}`);
		} else {
			toast.error(`Failed to create project: ${result?.data.message}`);
		}
	};

	let showTransferTeamDropdown = false;
	let transferDropdownContainer: HTMLElement;
	const handleAutoCloseDropdown = (event: Event) => {
		if (!transferDropdownContainer.contains(event.target)) showTransferTeamDropdown = false;
	};

	let teamName = '';
	const getTeamName = async (id: string) => {
		if (!selectedTeam) return;
		const { data: team } = await supabase.from('teams').select().eq('id', id).limit(1).single();
		if (team) {
			showTransferTeamDropdown = false;
			teamName = team.name;
		}
	};

	$: getTeamName(selectedTeam);
</script>

<dialog
	bind:this={dialog}
	class="h-1/2 w-2/3 rounded-2xl bg-grey-100 p-8 dark:bg-grey-900 xl:h-2/3 xl:w-1/3"
	on:close={() => (shown = false)}
>
	<header class="mb-md flex items-center">
		<h2 class="text-lg font-semibold text-grey-800 dark:text-grey-200">Create a new project</h2>
		<button on:click={() => (shown = false)} class="ml-auto">
			<CloseMultiply className="stroke-grey-700 dark:stroke-grey-200 w-12 h-12" />
		</button>
	</header>

	<form method="POST" on:submit|preventDefault={handleSubmit}>
		<section class="mt-sm">
			<header>
				<h2 class="mb-sm text-md font-bold text-grey-700 dark:text-grey-200">Basic Details</h2>
			</header>
			<div class="mb-lg flex items-center gap-4">
				<label for="name-input" class="input--label w-[22ch]">Enter a project name</label>
				<input
					id="name-input"
					name="name"
					type="text"
					class="input--text w-full"
					placeholder="Enter a project name"
					bind:value={name}
					required
				/>
			</div>
			<div class="flex flex-col gap-sm">
				<label for="description-input" class="input--label">Enter a description</label>
				<textarea
					name="description"
					id="description-input"
					class="input--text h-36 resize-none"
					placeholder="Enter a brief description"
					bind:value={description}
				/>
			</div>
		</section>

		<section>
			<header>
				<h2 class="mb-sm w-full text-start text-md font-semibold text-grey-700 dark:text-grey-300">
					Project Appearance
				</h2>
			</header>

			<div class="mb-md">
				<label for="pfp-select" class="input--label mb-sm">Project Banner</label>
				<p class="my-sm font-medium text-grey-700 dark:text-grey-300">
					Spice up this project by uploading a banner
				</p>
				<FileInput
					bind:bannerURL={fileURL}
					bind:newBanner
					uploadBanner={async () => {
						return;
					}}
					postRemoveBannnerHandle={async () => {
						return;
					}}
				/>
			</div>
		</section>

		<section class="my-md">
			<header>
				<h2 class="mt-md text-md font-bold text-grey-700 dark:text-grey-200">Tags</h2>
			</header>
			<div class="mb-md flex flex-wrap gap-md">
				<NewTagsInput bind:newTags={tags} />
			</div>
		</section>

		<section class="my-md">
			<header>
				<h2 class="text-md font-semibold text-grey-700 dark:text-grey-200">Team</h2>
			</header>
			<div
				class="relative mt-md flex items-center gap-sm overflow-visible font-medium text-grey-700 dark:text-grey-200 md:static"
				bind:this={transferDropdownContainer}
			>
				{#if selectedTeam}
					<span>Added to</span>
					<button
						class="button--text m-0 flex items-center gap-sm p-0 md:relative"
						on:click={() => (showTransferTeamDropdown = !showTransferTeamDropdown)}
					>
						{teamName}
						<Down className="w-6 h-6 stroke-grey-700 dark:stroke-grey-200" />
						{#if showTransferTeamDropdown}
							<AddTeam bind:visibility={showTransferTeamDropdown} bind:selectedTeam />
						{/if}
					</button>
				{:else}
					<span>Add this project to a</span>
					<button
						class="button--text m-0 flex items-center gap-sm p-0 md:relative"
						on:click={() => (showTransferTeamDropdown = !showTransferTeamDropdown)}
						type="button"
					>
						team
						<Down className="w-6 h-6 stroke-grey-700 dark:stroke-grey-200" />
						{#if showTransferTeamDropdown}
							<AddTeam bind:visibility={showTransferTeamDropdown} bind:selectedTeam />
						{/if}
					</button>
				{/if}
			</div>
		</section>

		<input type="checkbox" id="template" class="input--checkbox" bind:checked={useTemplate} />
		<label for="template" class="input--label">Use basic project template</label>

		<footer class="mx-auto mt-xl flex w-1/2 items-center justify-around">
			<button class="button--secondary" on:click={() => (shown = false)} type="button"
				>Cancel</button
			>
			<button class="button--primary" type="submit">Create</button>
		</footer>
	</form>
</dialog>
