<script lang="ts">
	import Back from '$lib/assets/Arrow/Back.svelte';
	import type { PageData } from './$types';
	import { onDestroy, onMount } from 'svelte';
	import { showMobileNav } from '$lib/stores/ui';
	import TeamMember from '$lib/components/team/about/TeamMember.svelte';
	import { supabase } from '$lib/supabase';
	import { invalidate } from '$app/navigation';
	import toast from 'svelte-french-toast';
	import UserAdd from '$lib/assets/User-Add.svelte';
	import { enhance } from '$app/forms';
	import Image from '$lib/assets/Image.svelte';
	import UpdateBanner from '$lib/components/prompts/team/about/UpdateBanner.svelte';

	export let data: PageData;

	let description = data.team.description;
	let name = data.team.name;
	const isViewer = data.role === 'viewer';

	const handleUpdateDescription = async () => {
		if (description === data.team.description) return;
		const { error } = await supabase.from('teams').update({ description }).eq('id', data.team.id);
		if (!error) {
			invalidate('app:team');
		} else {
			toast.error(`Failed to update team description: ${error.message}`);
		}
	};

	const handleUpdateName = async () => {
		if (name === data.team.name) return;
		const { error } = await supabase.from('teams').update({ name }).eq('id', data.team.id);
		if (!error) {
			invalidate('app:team');
		} else {
			toast.error(`Failed to update team name: ${error.message}`);
		}
	};

	onMount(() => {
		$showMobileNav = false;
	});

	onDestroy(() => {
		$showMobileNav = true;
	});

	let emailSearch = '';
	let showUpdateBannerPrompt = false;
</script>

<svelte:head>
	<title>About {data.team.name}</title>
</svelte:head>

<header
	class=" -top-6 -left-6 flex  items-end rounded-b-3xl bg-cover bg-center object-cover  
    {!data.team.banner ? 'static w-full' : 'relative h-[12.5rem] w-[calc(100%+48px)] p-6'}"
	style="background-image: {data.team.banner
		? 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.6) 115.18%),'
		: ''} url({data.team.banner});"
>
	<div class="flex w-full items-center gap-md">
		<a href="/app/team/{data.team.id}">
			<Back
				className="min-w-[2rem] min-h-[2rem] h-8 w-8 aspect-square {data.team.banner
					? 'stroke-grey-200'
					: 'stroke-grey-700 dark:stroke-grey-200'}"
			/>
		</a>
		{#if !isViewer}
			<h1
				class="text-lg {data.team.banner
					? 'max-w-[calc(100%-80px)] text-grey-200'
					: 'w-full text-grey-700 dark:text-grey-200'} truncate"
				contenteditable="true"
				bind:textContent={name}
				on:blur={handleUpdateName}
			>
				{data.team.name}
			</h1>
		{:else}
			<h1
				class="text-lg {data.team.banner
					? 'max-w-[calc(100%-80px)] text-grey-200'
					: 'w-full text-grey-700 dark:text-grey-200'} truncate"
			>
				{data.team.name}
			</h1>
		{/if}
	</div>
</header>

{#if !isViewer}
	<button
		class="button--secondary mt-md flex w-full items-center justify-center gap-md"
		on:click={() => (showUpdateBannerPrompt = true)}
	>
		<Image className="w-6 h-6 stroke-grey-700 dark:stroke-grey-200" />
		Modify Banner
	</button>
{/if}

{#if !isViewer}
	<p
		class="my-md font-medium text-grey-700 dark:text-grey-300"
		contenteditable="true"
		bind:textContent={description}
		on:blur={handleUpdateDescription}
	>
		{data.team.description}
	</p>
{:else}
	<p class="my-md font-medium text-grey-700 dark:text-grey-300">
		{data.team.description}
	</p>
{/if}

<form
	action="?/invite"
	method="POST"
	use:enhance={() => {
		return async ({ result }) => {
			if (result.type === 'success') {
				toast.success(`Added ${emailSearch} to ${data.team.name}`);
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

<section class="mt-md">
	<header>
		<h2 class="text-md font-semibold text-grey-700 dark:text-grey-200">Invited team members</h2>
	</header>
	<div class="mt-sm flex flex-col items-start gap-lg">
		{#each data.team.team_members as { user_id, role }}
			<TeamMember id={user_id} {role} />
		{/each}
	</div>
</section>

<UpdateBanner bind:shown={showUpdateBannerPrompt} />
