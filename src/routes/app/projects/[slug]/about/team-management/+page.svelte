<script lang="ts">
	import Back from '$lib/assets/Arrow/Back.svelte';
	import TeamMember from '$lib/components/team/project/TeamMember.svelte';
	import { showMobileNav } from '$lib/stores/ui';
	import { onDestroy, onMount } from 'svelte';
	import type { PageData } from './$types';
	import { invalidate } from '$app/navigation';
	import toast from 'svelte-french-toast';
	import { enhance } from '$app/forms';
	import UserAdd from '$lib/assets/User-Add.svelte';
	import { currentProject } from '$lib/stores/project';
	import { userRole } from '$lib/stores/team';

	export let data: PageData;

	let emailSearch = '';

	let isOwner = $userRole === 'owner';

	onMount(() => {
		$showMobileNav = false;
	});

	onDestroy(() => {
		$showMobileNav = true;
	});
</script>

<svelte:head>
	<title>Mange Invited People</title>
</svelte:head>

<div class="fixed right-0 top-0 bg-white dark:bg-grey-900">
	<header
		class=" flex w-[calc(100%+48px)] items-end rounded-b-3xl bg-cover bg-center object-cover p-4 {data
			.project?.banner
			? 'h-[12.5rem]'
			: 'static w-fit'}"
		style="background-image: {data.project?.banner
			? 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.6) 115.18%),'
			: ''} url({data.project?.banner});"
	>
		<a class="flex w-full items-center gap-md" href="/app/projects/{data.project?.id}/about">
			<Back
				className="w-8 h-8 aspect-square {data.project?.banner
					? 'stroke-grey-200'
					: 'stroke-grey-700 dark:stroke-grey-200'}"
			/>
			<h1
				class="truncate text-lg {data.project?.banner
					? 'max-w-[calc(100%-80px)] text-grey-200'
					: 'text-grey-700 dark:text-grey-200'} w-fit"
			>
				Manage invited members
			</h1>
		</a>
	</header>

	{#if isOwner}
		<form
			action="?/invite"
			method="POST"
			use:enhance={() => {
				return async ({ result }) => {
					if (result.type === 'success') {
						toast.success(`Added ${emailSearch} to ${data.project?.project_name}`);
						invalidate('project:about');
						invalidate('project:invited');
					} else if (result.data.notFound) {
						toast.error(`A user with the email: ${emailSearch} doesn't exist`);
					} else if (result.data.invited) {
						toast.error(`${emailSearch} has already been invited to this team.`);
					} else if (result.type === 'failure') {
						toast.error(`Failed to add user: ${result.data.message}`);
					}
				};
			}}
			class="px-4"
		>
			<div
				class="input--text relative flex w-full items-center {!$currentProject.banner
					? '-top-6'
					: ''} "
			>
				<input
					type="text"
					placeholder="Search by email to invite people"
					class="input--text m-0 w-full p-0"
					bind:value={emailSearch}
					name="invite_email"
				/>
				<button>
					<UserAdd
						className="stroke-grey-700 dark:stroke-grey-200 w-[1.125rem] h-[1.125rem] ml-auto"
					/>
				</button>
			</div>
		</form>
	{/if}

	<section class="relative mt-md {!$currentProject.banner ? '-top-8' : ''} px-4">
		<header>
			<h2 class="text-md font-semibold text-grey-700 dark:text-grey-200">Invited team members</h2>
		</header>
		<div>
			<div class="mt-md flex w-full flex-col items-start gap-lg md:grid md:grid-cols-2">
				{#each data.project.invited_people as { user_id, id, role, profiles }}
					<TeamMember {user_id} dbId={id} {role} {profiles} />
				{:else}
					<p class="text-grey-700 dark:text-grey-200 font-medium">
						No one has been invited to this project.
					</p>
				{/each}
			</div>
		</div>
	</section>
</div>
