<script lang="ts">
	import User from '$lib/assets/User.svelte';
	import { invitedTeamMembers } from '$lib/stores/project';
	import { userData } from '$lib/stores/user';

	export let assingedUserIds: string[] = [];
	export let assignTask: (id: string) => Promise<void>;
	export let profiles;

	let query = '';
	let filteredList = profiles ?? [];
	assingedUserIds = assingedUserIds ?? [];

	const handleSearch = () => {
		filteredList = profiles ?? [];

		filteredList = filteredList.filter((item) => item.email.includes(query));
		filteredList = filteredList.filter((item) => !assingedUserIds.includes(item.id));
		filteredList = filteredList.splice(4);
	};

	const handleAddItem = (id: string) => {
		query = '';
		assignTask(id);
	};
</script>

<section>
	<header>
		<h2 class="font-bold text-grey-700 dark:text-grey-200">Assign a person</h2>
	</header>

	<input
		type="text"
		class="input--text mt-sm w-full"
		placeholder="Search by name"
		bind:value={query}
		on:keyup={handleSearch}
	/>

	<div class="mt-md flex flex-col gap-sm">
		{#each filteredList as user}
			{#if !assingedUserIds.includes(user.id)}
				<button
					class="flex items-center gap-md rounded p-2 hover:bg-grey-200 hover:dark:bg-grey-700"
					on:click={() => handleAddItem(user.id)}
					type="button"
				>
					{#if user.avatar_url}
						<img
							src={user.avatar_url}
							alt=""
							class="aspect-square h-10 w-10 rounded-full object-cover"
						/>
					{:else}
						<User
							className="w-10 h-10 stroke-grey-700 dark:stroke-grey-200 bg-grey-200 dark:bg-grey-700 rounded-full border-1 border-solid border-grey-100 first:border-0 dark:border-grey-800"
						/>
					{/if}

					<div class="flex flex-col items-start gap-sm">
						<span class="font-bold text-grey-700 dark:text-grey-200">{user.name}</span>
						<span class="text-sm font-medium text-grey-700 dark:text-grey-200">{user.email}</span>
					</div>
				</button>
			{/if}
		{/each}
	</div>
</section>
