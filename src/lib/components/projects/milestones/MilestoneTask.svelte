<script lang="ts">
	import User from '$lib/assets/User.svelte';
	import { supabase } from '$lib/supabase';
	import { onMount } from 'svelte';

	export let name: string;
	export let assigned: string[];
	export let id: number;
	export let status: string;

	let assignedUserProfiles: any[] = [];

	interface SubTask {
		completed: boolean;
		id: string;
		list: number;
		name: string;
		project: number;
		task: number;
	}

	let subTasks: SubTask[] = [];
	let total = 0;
	let completed = 0;

	const getSubTasks = async () => {
		const { data: tasks } = await supabase.from('sub_tasks').select().eq('task', id);
		subTasks = tasks ?? [];
		total = subTasks.length;
		completed = [...subTasks.filter((item) => item.completed)].length;
	};

	onMount(async () => {
		if (!assignedUserProfiles) return;
		const { data } = await supabase.from('profiles').select('avatar_url, name').in('id', assigned);
		assignedUserProfiles =
			data?.map((item) => ({ profile: item.avatar_url ?? '', name: item.name })) ?? [];
		getSubTasks();
	});
</script>

<div class="flex items-center">
	<span
		class="font-bold text-grey-700 dark:text-grey-200 {status === 'done'
			? 'text-emerald-600 line-through dark:text-emerald-500'
			: ''}">{name}</span
	>

	{#if subTasks.length > 0}
		<div class="ml-2xl hidden w-full max-w-[18.75rem] items-center gap-md md:flex">
			<span class="font-bold text-grey-700 dark:text-grey-300">{completed}/{total}</span>
			<span class="sr-only">{completed}/{total} of this task's sub tasks are completed</span>

			<div class="relative w-full">
				<div
					class="absolute h-1 rounded-full bg-grey-700 dark:bg-grey-300"
					style="width: {(completed / total) * 100}%"
				/>
				<div class="h-1 w-full rounded-full bg-grey-300 dark:bg-grey-700" />
			</div>
		</div>
	{/if}

	<div class="ml-auto flex w-fit flex-row-reverse items-center">
		{#each assignedUserProfiles as assigned}
			{#if assigned.profile}
				<img
					src={assigned.profile}
					class="-ml-md aspect-square h-8 w-8 rounded-full border border-grey-100 object-cover first:border-0 last:ml-0 dark:border-grey-800"
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
