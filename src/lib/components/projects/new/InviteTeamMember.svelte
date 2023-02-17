<script lang="ts">
	import CloseMultiply from '$lib/assets/Close-Multiply.svelte';

	import PlusNew from '$lib/assets/Plus-New.svelte';
	import User from '$lib/assets/User.svelte';

	import type { User as Profile } from '$lib/types/projects';

	let displayAssignUser = false;
	let invitedUsers: Profile[] = [];
	export let invitedUserIds: string[] = [];
	export let allTeamMembers: Profile[] = [];

	let query = '';
	let filteredList = allTeamMembers ?? [];
	const handleSearch = () => {
		filteredList = allTeamMembers ?? [];
		filteredList = filteredList.filter((item) => item.email.includes(query));
		filteredList = filteredList.filter((item) => !invitedUserIds.includes(item.id));
		filteredList = filteredList.splice(4);
	};

	const handleAddItem = (id: string, member: Profile) => {
		query = '';
		filteredList = allTeamMembers ?? [];
		displayAssignUser = false;
		invitedUserIds = [id, ...invitedUserIds];
		invitedUsers = [member, ...invitedUsers];
	};
</script>

<section>
	<header>
		<h2 class="text-md font-bold text-grey-700 dark:text-grey-200">Invite team members</h2>
	</header>
	<div class="my-md flex items-center">
		<div class="flex items-center gap-md">
			{#each invitedUsers as { avatar_url }}
				{#if avatar_url}
					<img src={avatar_url} alt="" class="aspect-square h-10 w-10 rounded-full object-cover" />
				{:else}
					<User
						className="bg-grey-200 dark:bg-grey-700 rounded-full w-10 h-10 stroke-grey-700 dark:stroke-grey-200"
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
