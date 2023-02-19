<script lang="ts">
	import CloseMultiply from '$lib/assets/Close-Multiply.svelte';

	import PlusNew from '$lib/assets/Plus-New.svelte';
	import User from '$lib/assets/User.svelte';
	import { invitedTeamMembers } from '$lib/stores/project';
	import { userData } from '$lib/stores/user';

	import type { User as Profile } from '$lib/types/projects';

	let displayAssignUser = false;
	let assingedUsers: Profile[] = [];
	export let assingedUserIds: string[] = [];

	let query = '';
	let filteredList = $invitedTeamMembers ?? [];
	filteredList = [...($invitedTeamMembers ?? []), $userData];

	const handleSearch = () => {
		filteredList = $invitedTeamMembers ?? [];
		filteredList = [...($invitedTeamMembers ?? []), $userData];

		filteredList = filteredList.filter((item) => item.email.includes(query));
		filteredList = filteredList.filter((item) => !assingedUserIds.includes(item.id));
		filteredList = filteredList.splice(4);
	};

	const handleAddItem = (id: string, member: Profile) => {
		query = '';
		filteredList = $invitedTeamMembers ?? [];
		displayAssignUser = false;
		assingedUserIds = [id, ...assingedUserIds];
		assingedUsers = [member, ...assingedUsers];
	};
</script>

<section>
	<header>
		<h2 class="font-bold text-grey-700 dark:text-grey-200">Assign a person</h2>
	</header>
	<div class="my-md flex items-center">
		<div class="flex items-center">
			{#each assingedUsers as { avatar_url }}
				{#if avatar_url}
					<img
						src={avatar_url}
						alt=""
						class="-ml-lg aspect-square h-10 w-10 rounded-full object-cover first:ml-0"
					/>
				{:else}
					<User
						className="bg-grey-200 dark:bg-grey-700 rounded-full w-10 h-10 stroke-grey-700 dark:stroke-grey-200 -ml-lg first:ml-0"
					/>
				{/if}
			{/each}
		</div>

		{#if !displayAssignUser}
			<button
				type="button"
				on:click={() => (displayAssignUser = true)}
				class="button--text m-0 ml-auto p-0"
			>
				<PlusNew className="h-8 w-8 stroke-grey-700 dark:stroke-grey-200" />
				<span class="sr-only">Add new team member</span>
			</button>
		{/if}
	</div>

	{#if displayAssignUser}
		<div class="flex items-center">
			<input
				type="text"
				class="input--text"
				placeholder="Search by name"
				bind:value={query}
				on:keyup={handleSearch}
			/>
			<button type="button" on:click={() => (displayAssignUser = false)} class="ml-auto">
				<CloseMultiply className="h-8 w-8 stroke-grey-700 dark:stroke-grey-200" />
				<span class="sr-only">Hide team member assign</span>
			</button>
		</div>

		<div class="mt-md flex flex-col gap-sm">
			{#each filteredList as user}
				<button
					class="flex items-center gap-md rounded p-2 hover:bg-grey-200 hover:dark:bg-grey-700"
					on:click={() => handleAddItem(user.id, user)}
					type="button"
				>
					<img
						src={user.avatar_url}
						alt=""
						class="aspect-square h-10 w-10 rounded-full object-cover"
					/>
					<div class="flex flex-col items-start gap-sm">
						<span class="font-bold text-grey-700 dark:text-grey-200">{user.name}</span>
						<span class="text-sm font-medium text-grey-700 dark:text-grey-200">{user.email}</span>
					</div>
				</button>
			{/each}
		</div>
	{/if}
</section>
