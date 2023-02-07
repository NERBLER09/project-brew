<script lang="ts">
	import Back from '$lib/assets/Arrow/Back.svelte';
	import UserAdd from '$lib/assets/User-Add.svelte';
	import User from '$lib/assets/User.svelte';
	import TeamMember from '$lib/components/team/project/TeamMember.svelte';

	import { currentProject } from '$lib/stores/project';
	import { showManageInvitedPrompt } from '$lib/stores/ui';
	import { supabase } from '$lib/supabase';
	import type { User as Profile } from '$lib/types/projects';
	import { onMount } from 'svelte';

	export let shown = false;
	let dialog: HTMLDialogElement;

	let emailSearch = '';
	let unfilteredUsers: Profile[] = [];
	let allUsers: Profile[] = [];

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

	const handleSearchByEmail = () => {
		allUsers = unfilteredUsers;
		allUsers = allUsers.filter((item) => item.email.includes(emailSearch));
		allUsers.splice(4);
		console.log('test');
	};

	const handleInviteNewUser = async (id: string) => {
		const invitedUsers = [...$currentProject.invited_people, id];
		const { error } = await supabase
			.from('projects')
			.update({ invited_people: invitedUsers })
			.eq('id', $currentProject.id);
		if (!error) {
			emailSearch = '';
		}
		console.log(error);
	};

	$: handleModalStatus(shown);

	onMount(async () => {
		const { data: session } = await supabase.auth.getUser();
		const { data: users, error: err } = await supabase
			.from('profiles')
			.select()
			.neq('id', session?.user?.id);
		if (users) {
			allUsers = users;
			unfilteredUsers = allUsers;
		} else {
			console.error(err);
		}
	});

	$: console.log(emailSearch === '');
</script>

<dialog
	bind:this={dialog}
	class="h-1/2 w-2/3 rounded-2xl bg-grey-100 p-8 dark:bg-grey-900 xl:h-2/3 xl:w-1/3"
>
	<header
		class="relative -top-8 -left-8 flex w-[calc(100%+64px)] items-end rounded-b-3xl bg-cover bg-center object-cover p-6 {!$currentProject.banner
			? 'w-fit'
			: 'h-[12.5rem]'}"
		style="background-image: url({$currentProject.banner});"
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

	<div class="input--text flex w-full items-center">
		<input
			type="text"
			placeholder="Search by name or email to invite people"
			class="input--text m-0 w-full p-0"
			on:keyup={handleSearchByEmail}
		/>
		<button>
			<User className="stroke-grey-700 dark:stroke-grey-200 w-[1.125rem] h-[1.125rem] ml-auto" />
		</button>
	</div>

	{#if emailSearch}
		<section class="mt-md">
			<header>
				<h2 class="text-md font-semibold text-grey-700 dark:text-grey-200">Search results</h2>
			</header>
			<div>
				<div class="mt-md flex w-full flex-col items-start gap-lg md:grid md:grid-cols-2">
					{#each allUsers as { avatar_url, name, email, id }}
						<div class="flex w-full items-center md:relative">
							<div class="flex items-start gap-md">
								{#if avatar_url}
									<img
										src={avatar_url}
										alt="User profile"
										class="aspect-square h-12 w-12 rounded-full object-cover"
									/>
								{:else}
									<User className="w-12 h-12 stroke-grey-700 dark:stroke-grey-200" />
								{/if}
								<div class="flex flex-col items-start justify-start gap-sm">
									<p class="font-bold text-grey-700 dark:text-grey-100">{name}</p>
									<p class="font-bold text-grey-700 dark:text-grey-100">{email}</p>
								</div>
							</div>

							<button class="ml-auto" on:click={() => handleInviteNewUser(id)}>
								<UserAdd className="w-8 h-8 stroke-grey-700 dark:stroke-grey-200" />
								<span class="sr-only">Add {email} to this project</span>
							</button>
						</div>
					{:else}
						<p class="text-grey-700 dark:text-grey-200 font-medium">
							It looks like that a user with that email doesn't exists.
						</p>
					{/each}
				</div>
			</div>
		</section>
	{:else}
		<section class="mt-md">
			<header>
				<h2 class="text-md font-semibold text-grey-700 dark:text-grey-200">Invited team members</h2>
			</header>
			<div>
				<div class="mt-md flex w-full flex-col items-start gap-lg md:grid md:grid-cols-2">
					{#each $currentProject.invited_people as id}
						<TeamMember {id} />
					{/each}
				</div>
			</div>
		</section>
	{/if}
</dialog>
