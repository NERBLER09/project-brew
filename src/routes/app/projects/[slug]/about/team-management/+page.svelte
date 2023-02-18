<script lang="ts">
	import Back from '$lib/assets/Arrow/Back.svelte';
	import User from '$lib/assets/User.svelte';
	import TeamMember from '$lib/components/team/project/TeamMember.svelte';
	import { currentProject } from '$lib/stores/project';
	import { showMobileNav } from '$lib/stores/ui';
	import { onDestroy, onMount } from 'svelte';
	import type { User as Profile } from '$lib/types/projects';
	import type { PageData } from './$types';
	import UserAdd from '$lib/assets/User-Add.svelte';
	import { supabase } from '$lib/supabase';
	import { invalidate } from '$app/navigation';

	export let data: PageData;

	let emailSearch = '';
	let allUsers: Profile[] = data.users;

	const handleSearchByEmail = () => {
		allUsers = data.users;
		allUsers = allUsers.filter((item) => item.email.includes(emailSearch));
		allUsers = allUsers.filter((item) => !$currentProject.invited_people.includes(item.id));
		allUsers.splice(4);
	};

	const handleInviteNewUser = async (id: string) => {
		const invitedUsers = [...$currentProject.invited_people, id];
		const { error } = await supabase
			.from('projects')
			.update({ invited_people: invitedUsers })
			.eq('id', $currentProject.id);

		if (!error) {
			emailSearch = '';
			invalidate('app:project');
		}
		console.log(error);
	};

	onMount(() => {
		$showMobileNav = false;
	});

	onDestroy(() => {
		$showMobileNav = true;
	});
</script>

<header
	class="relative -top-6 -left-6 flex w-[calc(100%+48px)] items-end rounded-b-3xl bg-cover bg-center object-cover p-4 {!$currentProject.banner
		? 'static w-fit'
		: 'h-[12.5rem]'}"
	style="background-image: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.6) 115.18%), url({$currentProject.banner});"
>
	<a class="flex items-center gap-md" href="/app/projects/{$currentProject.id}/about">
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
	</a>
</header>

<div class="input--text flex w-full items-center">
	<input
		type="text"
		placeholder="Search by email to invite people"
		class="input--text m-0 w-full p-0"
		bind:value={emailSearch}
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
				{:else}
					<p class="text-grey-700 dark:text-grey-200 font-medium">
						No one has been invited to this project.
					</p>
				{/each}
			</div>
		</div>
	</section>
{/if}
