<script lang="ts">
	import MoreHorizontal from '$lib/assets/More Horizontal.svelte';
	import PlusNew from '$lib/assets/Plus-New.svelte';
	import Card from '../card/Card.svelte';

	import { supabase } from '$lib/supabase';
	import { onMount } from 'svelte';
	import { dndzone } from 'svelte-dnd-action';
	import { userData } from '$lib/stores/user';
	import NewCard from '$lib/components/form/forms/NewCard.svelte';

	export let name: string;
	export let id: any;
	export let status: string;
	let tasks: any[] = [];

	let showCreateTask = false;
	const handleDnd = (e) => {
		tasks = e.detail.items;
	};

	const handleFinalize = async (event) => {
		tasks = event.detail.items;

		const { error } = await supabase
			.from('tasks')
			.update({ list: id, user_id: $userData.id, status })
			.eq('id', event.detail.info.id);

		const found = tasks.find((task) => task.id === event.detail.info.id);
		const index = tasks.indexOf(found);
		if (index < 0) return; // Prevents error if index is below 0
		tasks[index].status = status;
	};

	onMount(async () => {
		const { data, error } = await supabase.from('tasks').select().eq('list', id);
		tasks = data || [];
	});
</script>

<section class="w-[15.625rem] md:w-[18.75rem] lg:w-[25rem]">
	<header class="flex w-[15.625rem] items-center md:w-[18.75rem] lg:w-[25rem]">
		<div class="mb-md flex items-center gap-md md:mb-lg">
			<h2 class="text-md font-semibold text-grey-900 dark:text-grey-100 md:text-lg">{name}</h2>
			<p class="text-sm font-medium text-grey-700 dark:text-grey-200 md:text-base">
				{tasks.length}
			</p>
		</div>
		<button class="ml-auto">
			<MoreHorizontal className="stroke-grey-700 dark:stroke-grey-200 h-8 w-8" />
		</button>
	</header>

	{#if showCreateTask}
		<NewCard bind:showCreateTask bind:tasks listId={id} listStatus={status} />
	{:else}
		<button
			class="button--secondary flex w-full items-center justify-center gap-md"
			on:click={() => (showCreateTask = true)}
		>
			<PlusNew className="w-6 h-6 stroke-grey-700 dark:stroke-grey-200" />
			New task
		</button>
	{/if}

	<div
		class="mt-md flex min-h-[200px] flex-col gap-md"
		use:dndzone={{ items: tasks, type: 'card', flipDurationMs: 300 }}
		on:consider={handleDnd}
		on:finalize={handleFinalize}
	>
		{#each tasks as task (task.id)}
			<Card {...task} />
		{/each}
	</div>
</section>
