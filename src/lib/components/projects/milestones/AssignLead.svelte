<script lang="ts">
	import PlusNew from '$lib/assets/Plus-New.svelte';
	import Down from '$lib/assets/Arrow/Chevron/Down.svelte';
	import User from '$lib/assets/User.svelte';
	import Up from '$lib/assets/Arrow/Chevron/Up.svelte';
	import Trash from '$lib/assets/Trash.svelte';

	import type { User as Profile } from '$lib/types/projects';

	export let invited_users: Profile[] = [];
	export let milestoneLead = '';

	let addMilestoneLead = false;
	let leadProfileName = '';
	let leadEmail = '';
	let leadAvatar = '';
</script>

<section class="my-md">
	<header class="flex items-center">
		<h4 class="input--label">Select a milestone lead</h4>
		<button
			class="button--secondary m-0 ml-auto border-0 p-0"
			on:click={() => (addMilestoneLead = !addMilestoneLead)}
			type="button"
		>
			{#if addMilestoneLead}
				<Down className="h-8 w-8 stroke-grey-700 dark:stroke-grey-300" />
				<span class="sr-only">Click to select a milestone lead</span>
			{:else}
				<Up className="h-8 w-8 stroke-grey-700 dark:stroke-grey-300" />
				<span class="sr-only">Cancel adding a milestone lead</span>
			{/if}
		</button>
	</header>

	{#if addMilestoneLead && !milestoneLead}
		{#each invited_users as { avatar_url, name, id, email }}
			<div class="flex w-full items-center">
				<div class="flex w-full gap-lg">
					{#if avatar_url}
						<img
							src={avatar_url}
							alt="{name} profile"
							class="aspect-square h-12 w-12 rounded-full object-cover"
						/>
					{:else}
						<User className="h-12 w-12 stroke-grey-700 dark:stroke-grey-200" />
					{/if}

					<div class="flex w-[calc(100%-4.875rem)] flex-col gap-sm">
						<div class="flex items-center gap-sm">
							<span class="truncate font-bold text-grey-700 dark:text-grey-200">{name}</span>
						</div>
						<span class="truncate font-medium text-grey-700 dark:text-grey-300">{email}</span>
					</div>
				</div>

				<button
					class="button--secondary m-0 ml-auto border-0 p-0"
					on:click={() => {
						milestoneLead = id;
						leadProfileName = name;
						leadAvatar = avatar_url ?? '';
						leadEmail = email;
						addMilestoneLead = false;
					}}
					type="button"
				>
					<PlusNew className="h-8 w-8 stroke-grey-700 dark:stroke-grey-300" />
					<span class="sr-only">Have {name} lead this milestone</span>
				</button>
			</div>
		{/each}
	{:else if !addMilestoneLead && milestoneLead}
		<div class="flex w-full items-center">
			<div class="flex w-full gap-lg">
				{#if leadAvatar}
					<img
						src={leadAvatar}
						alt="{leadProfileName} profile"
						class="aspect-square h-12 w-12 rounded-full object-cover"
					/>
				{:else}
					<User className="h-12 w-12 stroke-grey-700 dark:stroke-grey-200" />
				{/if}

				<div class="flex w-[calc(100%-4.875rem)] flex-col gap-sm">
					<div class="flex items-center gap-sm">
						<span class="truncate font-bold text-grey-700 dark:text-grey-200"
							>{leadProfileName}</span
						>
					</div>
					<span class="truncate font-medium text-grey-700 dark:text-grey-300">{leadEmail}</span>
				</div>
			</div>

			<button
				class="button--secondary m-0 ml-auto border-0 p-0"
				on:click={() => {
					milestoneLead = '';
					leadProfileName = '';
					leadAvatar = '';
					leadEmail = '';
					addMilestoneLead = false;
				}}
				type="button"
			>
				<Trash className="h-8 w-8 stroke-grey-700 dark:stroke-grey-300" />
				<span class="sr-only">Remove {leadProfileName} as leader for this milestone</span>
			</button>
		</div>
	{/if}
</section>
