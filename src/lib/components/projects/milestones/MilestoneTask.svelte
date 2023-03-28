<script lang="ts">
	import User from '$lib/assets/User.svelte';
	import { supabase } from '$lib/supabase';
	import { onMount } from 'svelte';

	export let name: string;
	export let assigned: string[];
	export let id: number;
	export let status: string;

	let assignedUserProfiles: any[] = [];

	onMount(async () => {
		if (!assignedUserProfiles) return;
		const { data } = await supabase.from('profiles').select('avatar_url, name').in('id', assigned);
		assignedUserProfiles =
			data?.map((item) => ({ profile: item.avatar_url ?? '', name: item.name })) ?? [];
	});
</script>

<div class="flex items-center">
	<span
		class="font-bold text-grey-700 dark:text-grey-200 {status === 'done'
			? 'text-emerald-600 line-through dark:text-emerald-500'
			: ''}">{name}</span
	>

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
</div>
