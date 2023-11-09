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
	import Trash from '$lib/assets/Trash.svelte';
	import ConfirmDelete from '$lib/components/prompts/team/about/ConfirmDelete.svelte';
	import Switch from '$lib/components/form/Switch.svelte';
	import FileInput from '$lib/components/form/FileInput.svelte';
	import Copy from '$lib/assets/Copy.svelte';

	export let data: PageData;

	let description = data.team.description;
	let name = data.team.name;
	const isViewer = data.role === 'viewer';
	let showConfirmDelete = false;

	const dashboardSettings: object = data.team.dashboard_settings;
	let showMembers = dashboardSettings?.members;
	let showProjects = dashboardSettings?.projects;
	let showProgress = dashboardSettings?.progress;
	let showDueTasks = dashboardSettings?.dueTasks;

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

	const copyJoinCode = () => {
		navigator.clipboard.writeText(data.team.id);
		toast.success('Copied team join code');
	};

	onMount(() => {
		$showMobileNav = false;
	});

	onDestroy(() => {
		$showMobileNav = true;
	});

	let emailSearch = '';
	let showUpdateBannerPrompt = false;

	const handleUpdateDashboard = async (
		showMembers: boolean,
		showProjects: boolean,
		showProgress: boolean,
		showDueTasks: boolean
	) => {
		const settings = {
			members: showMembers,
			projects: showProjects,
			progress: showProgress,
			dueTasks: showDueTasks
		};

		const { error } = await supabase
			.from('teams')
			.update({ dashboard_settings: settings })
			.eq('id', data.team.id)
			.select();

		invalidate('app:team');
	};

	$: handleUpdateDashboard(showMembers, showProjects, showProgress, showDueTasks);

	let newBannerFiles: FileList;
	const handleUpdateBanner = async () => {
		const banner = newBannerFiles[0];

		const { data: user } = await supabase.auth.getUser();
		const userId = user.user?.id;

		if (banner.size !== 0 && banner.size < 5000000) {
			const { error: uploadErr } = await supabase.storage
				.from('teams')
				.upload(`${userId}/${$currentTeam.name}`, banner, {
					cacheControl: '3600',
					upsert: true
				});
			if (uploadErr) {
				toast.error(`Failed to upload new banner: ${uploadErr.message}`);
				return;
			}

			const { data: url } = supabase.storage
				.from('teams')
				.getPublicUrl(`${userId}/${$currentTeam.name}`);

			const { error } = await supabase
				.from('teams')
				.update({ banner: url.publicUrl })
				.eq('id', $currentTeam.id);

			if (!error) {
				invalidate('app:team');
				$currentTeam.banner = url.publicUrl;
			} else {
				toast.error(`Failed to update team banner: ${error.message}`);
			}
		} else if (banner.size !== 0 && banner.size > 5000000) {
			toast.error('The selected file must be under 5mb in size');
		}
	};
</script>

<svelte:head>
	<title>About {data.team.name}</title>
</svelte:head>

<header
	class=" -left-6 -top-6 flex items-end rounded-b-3xl bg-cover bg-center object-cover
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
	<p
		class="my-md font-medium text-grey-700 dark:text-grey-300"
		contenteditable="true"
		bind:textContent={description}
		on:blur={handleUpdateDescription}
	>
		{data.team.description}
	</p>

	<FileInput
		bind:newBanner={newBannerFiles}
		postRemoveBannnerHandle={() => {}}
		uploadBanner={handleUpdateBanner}
	/>
{:else}
	<p class="my-md font-medium text-grey-700 dark:text-grey-300">
		{data.team.description}
	</p>
{/if}

{#if data.role === 'owner'}
	<span class="mb-sm mt-md font-medium text-grey-700 dark:text-grey-200"
		>Team invite code:
		<button
			class="button--text m-0 mb-md flex items-center gap-md p-0 text-start font-medium"
			on:click={copyJoinCode}
		>
			<Copy
				className="w-6 h-6 min-w-[2rem] min-h-[2rem] aspect-square stroke-grey-700 dark:stroke-grey-300"
			/>
			{data.team.id}</button
		>
	</span>
{/if}

<section class="mt-md">
	<header>
		<h2 class="text-md font-semibold text-grey-700 dark:text-grey-200" id="team">Team members</h2>

		<form
			action="?/invite"
			method="POST"
			class="my-md"
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
	</header>
	<div class="mt-sm flex flex-col items-start gap-lg">
		{#each data.team.team_members as { user_id, role }}
			<TeamMember id={user_id} {role} />
		{/each}
	</div>
</section>

{#if data.role === 'owner'}
	<section class="mt-md">
		<header>
			<h2 class="text-md font-semibold text-grey-700 dark:text-grey-200">
				Dashboard Customization
			</h2>

			<p class="my-sm font-medium text-grey-700 dark:text-grey-200">
				Change how the team dashboard appears for everyone.
			</p>
		</header>

		<div class="flex flex-col gap-sm">
			<Switch text="Show team members" id="team-members" bind:checked={showMembers} />
			<Switch text="Show team projects" id="team-projects" bind:checked={showProjects} />
			<Switch text="Show today's progress" id="todays-progress" bind:checked={showProgress} />
			<Switch text="Show due tasks" id="due-tasks" bind:checked={showDueTasks} />
		</div>
	</section>

	<section class="mt-md">
		<header>
			<h2 class="text-md font-semibold text-grey-700 dark:text-grey-200">Danger Zone</h2>
		</header>

		<button
			class="button--primary mt-md flex w-full items-center justify-center gap-md"
			on:click={() => (showConfirmDelete = true)}
		>
			<Trash className="h-6 w-6 stroke-grey-200" />
			Delete Team
		</button>

		<ConfirmDelete bind:shown={showConfirmDelete} />
	</section>
{/if}

<UpdateBanner bind:shown={showUpdateBannerPrompt} />
