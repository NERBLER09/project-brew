<script lang="ts">
	import User from '$lib/assets/User.svelte';
	import { invitedTeamMembers } from '$lib/stores/user';
	import { onMount } from 'svelte';
	import TagItem from '../tags/TagItem.svelte';

	export let id: number;
	export let project_name: string;
	export let banner: string | null = '';
	export let invited_people: string[] | null = [];
	export let description: string | null = '';
	export let tags: string[] = [];

	let invitedPeople = $invitedTeamMembers ?? [];
	invitedPeople = invitedPeople.filter((item) => invited_people?.includes(item.id));

	$: tags = JSON.parse(tags.toString() || '[]');
</script>

<a href="/app/projects/{id}">
	<section
		href="/app/projects/{id}"
		class="relative flex aspect-[3/2] h-48 w-full flex-col justify-end rounded-lg bg-grey-100 bg-cover bg-center bg-origin-border object-cover p-4 dark:bg-grey-800 md:h-full md:max-h-48 md:w-72 md:max-w-[18rem]"
		style="background-image: {banner
			? 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.6) 107.5%),'
			: ''} url({banner});"
	>
		<header>
			<span
				class="text-md font-medium {banner ? 'text-grey-200' : 'text-grey-700 dark:text-grey-200'}"
				>{project_name}</span
			>
		</header>
		<div>
			<p
				class="{banner
					? 'text-grey-200'
					: 'text-grey-700 dark:text-grey-200'} h-[4ch] overflow-hidden text-ellipsis text-sm font-medium empty:hidden"
			>
				{description}
			</p>

			<div class="flex flex-wrap items-center gap-md pt-sm empty:hidden">
				{#each tags as tag}
					<TagItem {tag} />
				{/each}
			</div>

			<div class="mt-sm flex items-center">
				{#each invitedPeople as { avatar_url }}
					{#if avatar_url}
						<img
							src={avatar_url}
							alt="User profile"
							class="-ml-md aspect-square h-6 w-6 rounded-full object-cover first:ml-0"
						/>
					{:else}
						<User
							className="w-8 h-8 stroke-grey-700 dark:stroke-grey-200 bg-grey-200 dark:bg-grey-700 rounded-full  -ml-md first:ml-0"
						/>
					{/if}
				{/each}
			</div>
		</div>
	</section>
</a>
