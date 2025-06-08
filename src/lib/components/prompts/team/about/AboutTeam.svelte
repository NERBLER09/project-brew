<script lang="ts">
	import { invalidate } from '$app/navigation';
	import CloseMultiply from '$lib/assets/Close-Multiply.svelte';
	import Edit from '$lib/assets/Edit.svelte';
	import TeamMember from '$lib/components/team/about/TeamMember.svelte';
	import { currentTeam, userRole } from '$lib/stores/team';
	import { supabase } from '$lib/supabase';
	import type { TeamMembers } from '$lib/types/projects';
	import toast from 'svelte-french-toast';
	import UpdateBanner from './UpdateBanner.svelte';
	import { enhance } from '$app/forms';
	import UserAdd from '$lib/assets/User-Add.svelte';
	import Trash from '$lib/assets/Trash.svelte';
	import ConfirmDelete from './ConfirmDelete.svelte';
	import Switch from '$lib/components/form/Switch.svelte';
	import FileInput from '$lib/components/form/FileInput.svelte';
	import Copy from '$lib/assets/Copy.svelte';

	export let shown = false;
	export let teamMembers: TeamMembers[];
	let dialog: HTMLDialogElement;

	const isViewer = $userRole === 'viewer';

	let showUpdateBannerDialog = false;
	let showConfirmDelete = false;

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

	const copyJoinCode = () => {
		navigator.clipboard.writeText($currentTeam.id);
		toast.success('Copied team join code');
	};

	const dashboardSettings: object = $currentTeam.dashboard_settings;
	let showMembers = dashboardSettings?.members;
	let showProjects = dashboardSettings?.projects;
	let showProgress = dashboardSettings?.progress;
	let showDueTasks = dashboardSettings?.dueTasks;

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
			.eq('id', $currentTeam.id)
			.select();

		invalidate('app:team');
	};

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

	$: handleUpdateDashboard(showMembers, showProjects, showProgress, showDueTasks);
</script>

<dialog
	bind:this={dialog}
	class="relative h-1/2 w-2/3 rounded-2xl bg-grey-100 p-8 dark:bg-grey-900 xl:h-2/3 xl:w-1/3"
	on:close={() => (shown = false)}
>
	<header
		class=" -left-8 -top-8 flex items-end rounded-b-3xl bg-cover bg-center object-cover {!$currentTeam.banner
			? 'static w-full'
			: 'relative h-[12.5rem] w-[calc(100%+64px)] p-6'}"
		style="background-image: {$currentTeam.banner
			? 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.6) 115.18%),'
			: ''} url({$currentTeam.banner});"
	>
		{#if !isViewer}
			<h1
				class="w-fit text-lg {$currentTeam.banner
					? 'text-grey-200'
					: 'text-grey-700 dark:text-grey-200'} truncate font-semibold"
				contenteditable
				bind:textContent={name}
				on:blur={handleUpdateName}
			>
				{$currentTeam?.name}
			</h1>
		{:else}
			<h1
				class="w-fit text-lg {$currentTeam.banner
					? 'text-grey-200'
					: 'text-grey-700 dark:text-grey-200'} truncate font-semibold"
			>
				{$currentTeam?.name}
			</h1>
		{/if}

		<div class={$currentTeam.banner ? '' : 'ml-auto flex items-center'}>
			<button
				on:click={() => (shown = false)}
				class="{$currentTeam.banner ? 'absolute' : 'static'} right-8 top-8"
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
		{#if !isViewer}
			<p
				class="my-md font-medium text-grey-700 dark:text-grey-300"
				contenteditable="true"
				bind:textContent={description}
				on:blur={handleUpdateDescription}
			>
				{$currentTeam.description}
			</p>

			<FileInput
				bind:newBanner={newBannerFiles}
				postRemoveBannnerHandle={() => {}}
				uploadBanner={handleUpdateBanner}
			/>
		{:else}
			<p class="my-md font-medium text-grey-700 dark:text-grey-300">
				{$currentTeam.description}
			</p>
		{/if}

		{#if $userRole === 'owner'}
			<span class="mb-sm mt-md font-medium text-grey-700 dark:text-grey-200"
				>Team invite code:
				<button
					class="button--text m-0 mb-md flex items-center gap-md p-0 text-start font-medium"
					on:click={copyJoinCode}
				>
					<Copy
						className="w-6 h-6 min-w-[2rem] min-h-[2rem] aspect-square stroke-grey-700 dark:stroke-grey-300"
					/>
					{$currentTeam.id}
				</button>
			</span>
		{/if}

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

		{#if $userRole === 'owner'}
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
	</div>
</dialog>

<UpdateBanner bind:shown={showUpdateBannerDialog} />
