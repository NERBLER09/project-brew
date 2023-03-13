<script lang="ts">
	import { deserialize } from '$app/forms';
	import { goto, invalidate } from '$app/navigation';
	import CloseMultiply from '$lib/assets/Close-Multiply.svelte';
	import Image from '$lib/assets/Image.svelte';
	import NewTagsInput from '$lib/components/projects/edit/NewTagsInput.svelte';
	import type { ActionResult } from '@sveltejs/kit';
	import InviteTeamMember from '$lib/components/projects/new/InviteTeamMember.svelte';
	import { currentUsers, invitedTeamMembers, userData } from '$lib/stores/user';
	import toast from 'svelte-french-toast';
	import { supabase } from '$lib/supabase';
	import AddTeam from '$lib/components/projects/new/AddTeam.svelte';
	import Down from '$lib/assets/Arrow/Chevron/Down.svelte';

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

	let files: any = '';
	let fileURL: string;

	const getFileURL = (file: any) => {
		if (!file) return;
		fileURL = URL.createObjectURL(file);
	};

	$: getFileURL(files[0]);

	let name = '';
	let description = '';
	let invitedMembers: string[];
	let tags: string[] = [];
	let selectedTeam: string;

	const handleSubmit = async (event) => {
		const data = new FormData(this);
		data.append('cover-url', files[0] ?? '');
		data.append('name', name);
		data.append('description', description);
		data.append('tags', tags.toString() ?? null);
		data.append('invited', invitedMembers.toString());
		data.append('user', JSON.stringify($currentUsers));
		data.append('team', selectedTeam);

		const response = await fetch('/app/projects?/new', {
			method: 'POST',
			body: data
		});
		const result: ActionResult = deserialize(await response.text());
		if (result.type === 'success') {
			toast.success('Created new project');
			goto(`/app/projects/${result?.data.id}`);
		} else {
			toast.error(`Failed to create project: ${result?.data.message}`);
		}
	};

	const resetImages = () => {
		fileURL = '';
		files = null;
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

		<InviteTeamMember allTeamMembers={$invitedTeamMembers} bind:invitedUserIds={invitedMembers} />

		<section>
			<section>
				<header>
					<h2 class="text-md font-bold text-grey-700 dark:text-grey-200">Cover image</h2>
				</header>
				<div>
					<label
						class="flex h-32 w-full cursor-pointer appearance-none justify-center rounded-md border-2 border-dashed border-grey-800 bg-grey-100 px-4 transition hover:border-grey-600 focus:outline-none dark:bg-grey-800"
					>
						<span class="flex flex-col items-center justify-center space-x-2">
							<Image className="h-8 w-8 stroke-grey-700 dark:stroke-grey-200" />
							<span class="font-medium text-grey-700 dark:text-grey-200">Drag and drop</span>
							<span class="font-medium text-grey-700 dark:text-grey-200">or</span>
							<span class="font-medium text-grey-700 dark:text-grey-200">select a cover image</span>
						</span>
						<input type="file" name="file_upload" class="hidden" accept=".png, .jpg" bind:files />
					</label>
				</div>

				{#if fileURL}
					<h3 class="mt-md text-md font-semibold text-grey-700 dark:text-grey-200">
						Cover Preview
					</h3>
					<img src={fileURL} alt="cover" class="max-h-52 rounded-md bg-center object-cover" />
					<button class="button--secondary mt-sm w-full" type="button" on:click={resetImages}
						>Clear cover</button
					>
				{/if}
			</section>
			<footer class="mx-auto mt-xl flex w-1/2 items-center justify-around">
				<button class="button--secondary" on:click={() => (shown = false)} type="button"
					>Cancel</button
				>
				<button class="button--primary" type="submit">Create</button>
			</footer>
		</section>
	</form>
</dialog>
