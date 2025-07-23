<script lang="ts">
	import { deserialize } from '$app/forms';
	import { goto } from '$app/navigation';
	import toast from 'svelte-french-toast';
	import Check from '$lib/assets/Check.svelte';

	import Image from '$lib/assets/Image.svelte';
	import MobileSubPageLayout from '$lib/components/layouts/MobileSubPageLayout.svelte';
	import NewTagsInput from '$lib/components/projects/edit/NewTagsInput.svelte';
	import InviteTeamMember from '$lib/components/projects/new/InviteTeamMember.svelte';
	import { currentUsers, invitedTeamMembers } from '$lib/stores/user';
	import type { ActionResult } from '@sveltejs/kit';
	import type { PageData } from './$types';
	import Down from '$lib/assets/Arrow/Chevron/Down.svelte';
	import AddTeam from '$lib/components/projects/new/AddTeam.svelte';
	import { supabase } from '$lib/supabase';
	import UpdateBanner from '$lib/components/prompts/team/about/UpdateBanner.svelte';
	import FileInput from '$lib/components/form/FileInput.svelte';

	export let user: PageData;

	let tags: string[] = [];

	let newBanner: any = '';
	let fileURL: string;

	let name = '';
	let description = '';
	let invitedMembers: string[];
	let selectedTeam: string;
	let useTemplate = false;

	const handleSubmit = async (event) => {
		const data = new FormData(this);
		data.append('cover-url', newBanner[0] ?? '');
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
		const { data: team, error } = await supabase
			.from('teams')
			.select()
			.eq('id', id)
			.limit(1)
			.single();
		if (team) {
			teamName = team.name;
		}
	};

	$: getTeamName(selectedTeam);
</script>

<svelte:window on:click={handleAutoCloseDropdown} />

<svelte:head>
	<title>New Project</title>
</svelte:head>

<MobileSubPageLayout pageName="New Project" previousPage="/app/projects">
	<p class="pb-md pt-sm font-medium text-grey-700 dark:text-grey-200">
		Chose what projects are displayed on top.
	</p>

	<form method="POST" on:submit|preventDefault={handleSubmit}>
		<section>
			<header>
				<h2 class="text-md font-bold text-grey-700 dark:text-grey-200">Basic Details</h2>
			</header>
			<div>
				<input
					name="name"
					type="text"
					class="input--text mb-4 w-full"
					placeholder="Enter a project name"
					bind:value={name}
					required
				/>
				<textarea
					name="description"
					class="input--text h-36 w-full resize-none"
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

		<section>
			<header>
				<h2 class="text-md font-bold text-grey-700 dark:text-grey-200">Tags</h2>
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

		<button class="button--circle absolute bottom-8 right-8" type="submit">
			<Check className="h-8 w-8 stroke-grey-200" />
			<span class="sr-only">Create project</span>
		</button>
	</form>
</MobileSubPageLayout>
