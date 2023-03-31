<script lang="ts">
	import Check from '$lib/assets/Check.svelte';
	import MobileSubPageLayout from '$lib/components/layouts/MobileSubPageLayout.svelte';
	import { currentProject } from '$lib/stores/project';
	import { enhance } from '$app/forms';
	import toast from 'svelte-french-toast';
	import { goto } from '$app/navigation';
	import type { PageData } from './$types';
	import PlusNew from '$lib/assets/Plus-New.svelte';
	import Down from '$lib/assets/Arrow/Chevron/Down.svelte';
	import User from '$lib/assets/User.svelte';
	import Up from '$lib/assets/Arrow/Chevron/Up.svelte';
	import Trash from '$lib/assets/Trash.svelte';

	export let data: PageData;

	let addMilestoneLead = false;
	let milestoneLead = '';
	let leadProfileName = '';
	let leadEmail = '';
	let leadAvatar = '';
</script>

<svelte:head>
	<title>New Milestone</title>
</svelte:head>

<MobileSubPageLayout
	pageName="New Milestone"
	previousPage="/app/projects/{$currentProject.id}/milestones"
>
	<form
		method="POST"
		class="mt-md"
		use:enhance={() => {
			return async ({ result }) => {
				if (result.type === 'failure') {
					toast.error(`Failed to create milestone: ${result.data.errMsg}`);
				} else if (result.type === 'success') {
					toast.success('Created new milestone');
					goto(`/app/projects/${$currentProject.id}/milestones/${result.data.milestone}`);
				}
			};
		}}
	>
		<input
			type="text"
			class="input--text w-full"
			placeholder="What should this milestone be called?"
			required
			name="name"
		/>

		<textarea
			name="description"
			class="input--text mt-md h-36 w-full resize-none"
			placeholder="Write something about this milestone"
		/>

		<div class="mt-md">
			<label for="start-date" class="input--label">Start date:</label>
			<input type="date" class="input--text" id="start-date" required name="start-date" />
		</div>
		<div class="mt-md">
			<label for="end-date" class="input--label">End date:</label>
			<input type="date" class="input--text" id="end-date" required name="end-date" />
		</div>

		<section class="my-md">
			<header class="flex items-center">
				<h4 class="input--label">Select a milestone lead</h4>
				<button
					class="button--secondary m-0 ml-auto border-0 p-0"
					on:click={() => (addMilestoneLead = !milestoneLead)}
					type="button"
				>
					{#if addMilestoneLead}
						<Down className="h-8 w-8 stroke-grey-700 dark:stroke-grey-300" />
						<span class="sr-only">Click to select a milestone lead</span>
					{:else}
						<Up className="h-8 w-8 stroke-grey-700 dark:stroke-grey-300" />
						<span class="sr-only">Cancel adding a milestone lead</span>
					{/if}
				</button>
			</header>

			{#if addMilestoneLead && !milestoneLead}
				{#each data?.project.invited.users as { avatar_url, name, id, email }}
					<div class="flex w-full items-center">
						<div class="flex w-full gap-lg">
							{#if avatar_url}
								<img
									src={avatar_url}
									alt="{name} profile"
									class="aspect-square h-12 w-12 rounded-full object-cover"
								/>
							{:else}
								<User className="h-12 w-12 stroke-grey-700 dark:stroke-grey-200" />
							{/if}

							<div class="flex w-[calc(100%-4.875rem)] flex-col gap-sm">
								<div class="flex items-center gap-sm">
									<span class="truncate font-bold text-grey-700 dark:text-grey-200">{name}</span>
								</div>
								<span class="truncate font-medium text-grey-700 dark:text-grey-300">{email}</span>
							</div>
						</div>

						<button
							class="button--secondary m-0 ml-auto border-0 p-0"
							on:click={() => {
								milestoneLead = id;
								leadProfileName = name;
								leadAvatar = avatar_url ?? '';
								leadEmail = email;
								addMilestoneLead = false;
							}}
							type="button"
						>
							<PlusNew className="h-8 w-8 stroke-grey-700 dark:stroke-grey-300" />
							<span class="sr-only">Have {name} lead this milestone</span>
						</button>
					</div>
				{/each}
			{:else if !addMilestoneLead && milestoneLead}
				<div class="flex w-full items-center">
					<div class="flex w-full gap-lg">
						{#if leadAvatar}
							<img
								src={leadAvatar}
								alt="{leadProfileName} profile"
								class="aspect-square h-12 w-12 rounded-full object-cover"
							/>
						{:else}
							<User className="h-12 w-12 stroke-grey-700 dark:stroke-grey-200" />
						{/if}

						<div class="flex w-[calc(100%-4.875rem)] flex-col gap-sm">
							<div class="flex items-center gap-sm">
								<span class="truncate font-bold text-grey-700 dark:text-grey-200"
									>{leadProfileName}</span
								>
							</div>
							<span class="truncate font-medium text-grey-700 dark:text-grey-300">{leadEmail}</span>
						</div>
					</div>

					<button
						class="button--secondary m-0 ml-auto border-0 p-0"
						on:click={() => {
							milestoneLead = '';
							leadProfileName = '';
							leadAvatar = '';
							leadEmail = '';
							addMilestoneLead = false;
						}}
						type="button"
					>
						<Trash className="h-8 w-8 stroke-grey-700 dark:stroke-grey-300" />
						<span class="sr-only">Remove {leadProfileName} as leader for this milestone</span>
					</button>
				</div>
			{/if}

			<input type="text" class="hidden" name="lead" bind:value={milestoneLead} />
		</section>

		<button class="button--circle absolute bottom-8 right-8" type="submit">
			<Check className="h-8 w-8 stroke-grey-200" />
			<span class="sr-only">Create new milestone</span>
		</button>
	</form>
</MobileSubPageLayout>
