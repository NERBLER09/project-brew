<script lang="ts">
	import MoreHorizontal from '$lib/assets/More Horizontal.svelte';
	import PlusNew from '$lib/assets/Plus-New.svelte';
	import { supabase } from '$lib/supabase';
	import { onMount } from 'svelte';
	import Card from '../card/Card.svelte';

	export let name: string;
	export let id: any;
	export let project_id: any;
	let tasks: any[] = [];

	onMount(async () => {
		const { data, error } = await supabase.from('tasks').select().eq('list', id);
		tasks = data || [];
	});
</script>

<section class="w-[15.625rem] md:w-[25rem]">
	<header class="flex items-center w-[15.625rem] md:w-[25rem]">
		<h2 class="text-grey-900 font-semibold text-lg mb-md md:mb-lg">{name}</h2>
		<button class="ml-auto">
			<MoreHorizontal className="stroke-grey-700 h-8 w-8" />
		</button>
	</header>
	<button class="button--secondary w-full flex items-center gap-md justify-center">
		<PlusNew className="w-6 h-6 stroke-grey-700" />
		New task
	</button>

	<div class="flex flex-col gap-md mt-md">
		{#each tasks as task}
			<Card
				name={task.name}
				description={task.description}
				dueDate={task.due_date}
				isPriority={task.is_priority}
				tags={task.tags}
			/>
		{/each}
		<Card
			name="Test Card"
			description="This is a test description meant to test out this component"
			dueDate="2023-01-16"
			isPriority={true}
		/>
		<Card
			name="Test Card"
			description="This is a test description meant to test out this component"
			dueDate="2023-01-16"
			isPriority={true}
		/>
		<Card
			name="Test Card"
			description="This is a test description meant to test out this component"
			dueDate="2023-01-16"
			isPriority={true}
		/>
	</div>
</section>
