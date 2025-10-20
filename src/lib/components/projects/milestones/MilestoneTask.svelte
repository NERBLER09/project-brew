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

<div class="flex w-full items-center">
	<span
		class="col-span-1 col-start-1 w-full truncate text-grey-700 dark:text-grey-200 md:font-semibold"
		>{name}</span
	>

	{#if subTasks.length > 0}
		<div
			class="col-span-1 col-start-2 ml-auto w-fit max-w-[16ch] items-center gap-md whitespace-nowrap"
		>
			<span class="font-bold text-grey-700 dark:text-grey-300">Sub tasks: {completed}/{total}</span>
			<span class="sr-only">{completed}/{total} of this task's sub tasks are completed</span>
		</div>
	{/if}

	<!-- <div class="col-span-1 col-start-3 ml-auto flex w-fit flex-row-reverse items-center"> -->
	<!-- 	{#each assignedUserProfiles as assigned} -->
	<!-- 		{#if assigned.profile} -->
	<!-- 			<img -->
	<!-- 				src={assigned.profile} -->
	<!-- 				class="-ml-md aspect-square h-8 w-8 rounded-full border border-grey-100 object-cover first:border-0 last:ml-0 dark:border-grey-800" -->
	<!-- 				alt="{assigned.name} profile image" -->
	<!-- 			/> -->
	<!-- 		{:else} -->
	<!-- 			<User -->
	<!-- 				className="border-2 -ml-md h-8 w-8 rounded-full bg-grey-100 dark:bg-grey-800 stroke-grey-700 dark:stroke-grey-300 border-grey-300 object-cover dark:border-grey-700 last:ml-0" -->
	<!-- 			/> -->
	<!-- 		{/if} -->
	<!-- 	{/each} -->
	<!-- </div> -->
</div>
