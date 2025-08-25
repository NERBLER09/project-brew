<script lang="ts">
	import { invalidate } from '$app/navigation';
	import { enhance } from '$app/forms';

	import Back from '$lib/assets/Arrow/Back.svelte';
	import TeamMember from '$lib/components/team/project/TeamMember.svelte';

	import { currentProject } from '$lib/stores/project';
	import { showManageInvitedPrompt } from '$lib/stores/ui';
	import toast from 'svelte-french-toast';
	import UserAdd from '$lib/assets/User-Add.svelte';
	import { userRole } from '$lib/stores/team';

	export let shown = false;
	let dialog: HTMLDialogElement;

	let isOwner = $userRole === 'owner';

	let emailSearch = '';
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
	class="h-1/2 w-2/3 rounded-2xl bg-grey-100 p-8 dark:bg-grey-900 xl:h-2/3 xl:w-1/3"
	on:close={() => (shown = false)}
>
	<header
		class="relative -left-8 -top-8 flex w-[calc(100%+64px)] items-end rounded-b-3xl bg-cover bg-center object-cover p-6 font-semibold {!$currentProject.banner
			? 'w-fit'
			: 'h-[12.5rem]'}"
		style="background-image: {$currentProject.banner
			? 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.6) 115.18%),'
			: ''} url({$currentProject.banner});"
	>
		<button class="flex items-center gap-md" on:click={() => ($showManageInvitedPrompt = false)}>
			<Back
				className="w-8 h-8 aspect-square {$currentProject.banner
					? 'stroke-grey-200'
					: 'stroke-grey-700 dark:stroke-grey-200'}"
			/>
			<h1
				class="w-fit text-lg {$currentProject.banner
					? 'text-grey-200'
					: 'text-grey-700 dark:text-grey-200'} truncate"
			>
				Manage invited members
			</h1>
		</button>
	</header>

	{#if isOwner}
		<form
			action="about/team-management?/invite"
			method="POST"
			use:enhance={() => {
				return async ({ result }) => {
					if (result.type === 'success') {
						toast.success(`Added ${emailSearch} to ${$currentProject.project_name}`);
						invalidate('app:project');
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
			<div
				class="input--text relative flex w-full items-center {!$currentProject.banner
					? '-top-8'
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

	<section class="relative mt-md {!$currentProject.banner ? '-top-8' : ''}">
		<header>
			<h2 class="text-md font-semibold text-grey-700 dark:text-grey-200">Invited team members</h2>
		</header>
		<div class="mt-md flex flex-col gap-md">
			{#each $currentProject.invited_people as { user_id, id, role, profiles }}
				<TeamMember {user_id} dbId={id} {role} {profiles} />
			{:else}
				<p class="text-grey-700 dark:text-grey-200 font-medium">
					No one has been invited to this project.
				</p>
			{/each}
		</div>
	</section>
</dialog>
