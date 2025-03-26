<script lang="ts">
	import User from '$lib/assets/User.svelte';
	import { invitedTeamMembers } from '$lib/stores/user';
	import { onMount } from 'svelte';
	import TagItem from '../projects/tags/TagItem.svelte';

	export let id: number;
	export let project_name: string;
	export let banner: string | null = '';
	export let invited_people: string[] | null = [];
	export let description: string | null = '';
	export let tags: string[] = [];
	tags = tags ?? [];

	let invitedPeople = $invitedTeamMembers ?? [];
	invitedPeople = invitedPeople.filter((item) => invited_people?.includes(item.id));

	export let tasks: object[] | [];

	let totalAmountOfTasks = 0;
	let completedTasks = 0;
	let percentCompleted = 0;

	onMount(async () => {
		totalAmountOfTasks = tasks?.length!;
		completedTasks = tasks?.filter((item) => item.status === 'done').length!;
		percentCompleted = Math.round((completedTasks / totalAmountOfTasks) * 100) || 0;
	});
</script>

<a href="/app/projects/{id}">
	<section
		class="relative flex aspect-[4/5] h-[18.75rem] flex-col justify-end rounded-lg bg-grey-100 bg-cover bg-center bg-origin-border object-cover p-4 dark:bg-grey-800 md:h-[343.75px] md:w-[275px]"
		style="background-image: {banner
			? 'linear-gradient(0deg, rgba(0, 0, 0, 0.8) 0%, rgba(135,135,135, 0.4) 70%),'
			: ''} url({banner});"
	>
		<header>
			<span
				class="text-md font-bold {banner ? 'text-grey-200' : 'text-grey-700 dark:text-grey-200'}"
				>{project_name}</span
			>

			<div class="my-md w-full">
				<div
					class="font-medium {banner
						? 'text-grey-200'
						: 'text-grey-700 dark:text-grey-200'} gap-auto mb-sm flex w-full items-center"
				>
					<span class="mr-auto">Progress:</span>
					<span class="ml-auto font-semibold">{percentCompleted}%</span>
				</div>
				<div class="relative w-full">
					<div
						class="absolute h-4 rounded-full bg-grey-700 dark:bg-grey-300"
						style="width: {(completedTasks / totalAmountOfTasks) * 100}%"
					/>
					<div class="h-4 w-full rounded-full bg-grey-300 dark:bg-grey-700" />
				</div>
			</div>
		</header>
		<div>
			<p
				class="{banner
					? 'text-grey-200'
					: 'text-grey-700 dark:text-grey-200'} h-fit max-h-[4ch] overflow-hidden text-ellipsis text-sm font-medium empty:hidden"
			>
				{description}
			</p>
			{#if tags}
				<div class="mt-sm flex flex-wrap items-center gap-md empty:hidden">
					{#each tags as tag}
						<TagItem {tag} sm={true} />
					{/each}
				</div>
			{/if}
			<div class="mt-md flex items-center empty:hidden">
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
