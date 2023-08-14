<script lang="ts">
	import Calendar from '$lib/assets/Calendar.svelte';
	import Milestone from '$lib/assets/Milestone.svelte';
	import User from '$lib/assets/User.svelte';
	import { supabase } from '$lib/supabase';
	import type { User as Profile } from '$lib/types/projects';
	import { onMount } from 'svelte';
	import PriorityLevel from '../card/priority/PriorityLevel.svelte';

	export let name: string;
	export let milestone: string | null;
	export let id: number;
	export let due_date: string | null;
	export let assigned: string[] | null;
	export let priority_level: string | null;
	export let location: 'todays-progress' | 'milestones' = 'todays-progress';

	let formattedDate = '';
	let milestoneName = '';
	let assignedUsers: Profile[] = [];

	onMount(async () => {
		if (milestone) {
			const { data: miletoneData } = await supabase
				.from('milestones')
				.select('name')
				.eq('id', milestone)
				.limit(1)
				.single();
			milestoneName = miletoneData?.name ?? '';
		}

		if (due_date) {
			let tempDate = new Date(due_date);
			tempDate.setDate(tempDate.getDate() + 1);
			formattedDate = new Date(tempDate).toLocaleDateString('en-US', {
				month: 'short',
				day: 'numeric'
			});
		}

		if (assigned) {
			const { data: people } = await supabase.from('profiles').select().in('id', assigned);
			assignedUsers = people ?? [];
		}
	});
</script>

<div
	class="flex w-full items-center justify-between rounded bg-grey-100  dark:bg-grey-800 {location ===
	'milestones'
		? ''
		: 'p-2'}"
>
	<span class="font-bold text-grey-700 dark:text-grey-300">{name}</span>
	<div class="flex gap-sm">
		<Calendar className="h-6 w-6 stroke-accent-light" />
		<span
			class="whitespace-nowrap break-normal text-sm font-medium text-grey-700 dark:text-grey-200 md:text-base"
			>{formattedDate}</span
		>
	</div>

	{#if milestone}
		<div class="gap-sm {location === 'milestones' ? 'hidden' : 'hidden lg:flex'}">
			<Milestone className="h-6 w-6 stroke-accent-light" />
			<span
				class="whitespace-nowrap break-normal text-sm font-medium text-grey-700 dark:text-grey-200 md:text-base"
				>{milestoneName}</span
			>
		</div>
	{/if}

	<PriorityLevel bind:priority_level taskId={id} />

	<div class="relative flex items-center">
		{#each assignedUsers as { avatar_url, name }}
			{#if avatar_url}
				<img
					src={avatar_url}
					alt="User profile"
					class="border-1 aspect-square h-6 w-6 rounded-full border-solid border-grey-100 object-cover first:border-0 dark:border-grey-800"
				/>
			{:else}
				<User
					className="w-6 h-6 stroke-grey-700 dark:stroke-grey-200 bg-grey-200 dark:bg-grey-700 rounded-full border-1 border-solid border-grey-100 first:border-0 dark:border-grey-800"
				/>
			{/if}
			<span class="sr-only">
				{name}'s profile
			</span>
		{/each}
	</div>
</div>
