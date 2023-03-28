<script lang="ts">
	import Calendar from '$lib/assets/Calendar.svelte';
	import User from '$lib/assets/User.svelte';
	import { supabase } from '$lib/supabase';
	import { onMount } from 'svelte';

	export let name: string;
	export let description: string | null = '';
	export let target: string;
	export let assigned: string[] | null = [];
	export let milestone: string;

	let targetDate = new Date(target).setDate(new Date(target).getDate() + 1);
	let formattedTargetDate = '';

	let assignedUserProfiles: any[] = [];

	onMount(async () => {
		if (assigned) {
			const { data } = await supabase
				.from('profiles')
				.select('avatar_url, name')
				.in('id', assigned ?? []);
			assignedUserProfiles =
				data?.map((item) => ({ profile: item.avatar_url ?? '', name: item.name })) ?? [];
		}
		formattedTargetDate = new Date(targetDate).toLocaleDateString('en-US', {
			month: 'short',
			day: 'numeric'
		});
	});
</script>

<section>
	<header class="flex items-center">
		<h3 class="font-bold text-grey-700 dark:text-grey-300">{name}</h3>
		<div class="ml-lg flex items-center">
			<Calendar className="h-6 w-6 stroke-accent-light" />
			<span class="font-medium text-grey-700 dark:text-grey-300">{formattedTargetDate}</span>
		</div>

		<div class="ml-auto flex w-fit flex-row-reverse items-center">
			{#each assignedUserProfiles as assigned}
				{#if assigned.profile}
					<img
						src={assigned.profile}
						class="-ml-md aspect-square h-8 w-8 rounded-full border border-grey-100 object-cover first:border-0 last:ml-0  dark:border-grey-800"
						alt="{assigned.name} profile image"
					/>
				{:else}
					<User
						className="border-2 -ml-md h-8 w-8 rounded-full bg-grey-100 dark:bg-grey-800 stroke-grey-700 dark:stroke-grey-300 border-grey-300 object-cover dark:border-grey-700 last:ml-0"
					/>
				{/if}
			{/each}
		</div>
	</header>

	<p class="font-medium text-grey-700 dark:text-grey-300">{description}</p>
</section>
