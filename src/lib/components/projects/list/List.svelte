<script lang="ts">
	import CloseMultiply from '$lib/assets/Close-Multiply.svelte';
	import MoreHorizontal from '$lib/assets/More Horizontal.svelte';
	import PlusNew from '$lib/assets/Plus-New.svelte';
	import Card from '../card/Card.svelte';

	import { supabase } from '$lib/supabase';
	import { onMount } from 'svelte';
	import { dndzone } from 'svelte-dnd-action';
	import { userId } from '$lib/stores/user';

	export let name: string;
	export let id: any;
	export let project_id: any;
	let tasks: any[] = [];

	let showCreateTask = false;

	const handleDnd = (e) => {
		tasks = e.detail.items;
	};

	const handleFinalize = async (event) => {
		tasks = event.detail.items;
		const { error } = await supabase
			.from('tasks')
			.update({ list: id, user_id: $userId })
			.eq('id', event.detail.info.id);
	};

	onMount(async () => {
		const { data, error } = await supabase.from('tasks').select().eq('list', id);
		tasks = data || [];
	});
</script>

<section class="w-[15.625rem] md:w-[25rem]">
	<header class="flex items-center w-[15.625rem] md:w-[25rem]">
		<h2 class="text-grey-900 font-semibold text-md md:text-lg mb-md md:mb-lg">{name}</h2>
		<button class="ml-auto">
			<MoreHorizontal className="stroke-grey-700 h-8 w-8" />
		</button>
	</header>
	{#if showCreateTask}
		<form method="POST" action="/app/projects/{project_id}?/newTask">
			<button
				class="button--secondary w-full flex items-center gap-md justify-center"
				type="button"
				on:click={() => (showCreateTask = false)}
			>
				<CloseMultiply className="w-6 h-6 stroke-grey-700" />
				Cancel
			</button>

			<input
				type="text"
				class="input--text w-full mt-md"
				name="name"
				required
				placeholder="Enter the name of the new task"
			/>
			<textarea
				name="description"
				id="description-input"
				class="input--text  resize-none h-36 w-full mt-sm"
				placeholder="Enter a short description"
			/>
			<label for="date-input" class="input--label mt-sm">Select a due date</label>
			<input type="date" class="input--text mt-sm" id="date-input" name="date" />
			<br />

			<label for="priority-input" class="input--label mt-sm">Mark as priority</label>
			<input type="checkbox" class="input--checkbox my-sm" id="prority-input" name="priority" />

			<input type="text" class="hidden" name="list-id" value={id} />

			<button
				class="button--primary w-full flex items-center gap-md justify-center mt-md"
				type="submit"
			>
				<PlusNew className="w-6 h-6 stroke-grey-100" />
				Create
			</button>
		</form>
	{:else}
		<button
			class="button--secondary w-full flex items-center gap-md justify-center"
			on:click={() => (showCreateTask = true)}
		>
			<PlusNew className="w-6 h-6 stroke-grey-700" />
			New task
		</button>
	{/if}
	<div
		class="flex flex-col gap-md mt-md min-h-[200px]"
		use:dndzone={{ items: tasks, type: 'card', flipDurationMs: 300 }}
		on:consider={handleDnd}
		on:finalize={handleFinalize}
	>
		{#each tasks as task}
			<Card
				name={task.name}
				description={task.description}
				dueDate={task.due_date}
				isPriority={task.is_priority}
				tags={task.tags}
			/>
		{/each}
	</div>
</section>
