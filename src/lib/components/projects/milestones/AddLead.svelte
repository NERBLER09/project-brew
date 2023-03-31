<script lang="ts">
	import PlusNew from '$lib/assets/Plus-New.svelte';
	import User from '$lib/assets/User.svelte';
	import type { User as Profile } from '$lib/types/projects';

	export let invited_users: Profile[] = [];
	export let milestoneLead = '';
	export let shown = false;
</script>

<div class="dropdown--container top-8 right-0 z-40">
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
					shown = false;
				}}
				type="button"
			>
				<PlusNew className="h-8 w-8 stroke-grey-700 dark:stroke-grey-300" />
				<span class="sr-only">Have {name} lead this milestone</span>
			</button>
		</div>
	{/each}
</div>
