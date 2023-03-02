<script lang="ts">
	import Calendar from '$lib/assets/Calendar.svelte';
	import Check from '$lib/assets/Check.svelte';
	import CirclePriority from '$lib/assets/Circle-Priority.svelte';
	import Trash from '$lib/assets/Trash.svelte';
	import User from '$lib/assets/User.svelte';
	import { supabase } from '$lib/supabase';

	export let visibility = false;
	export let id: number;
	export let priority: boolean;

	export let tasks: any[];

	const handleTaskDelete = async () => {
		const index = tasks.findIndex((item) => item.id === id);
		tasks.splice(index, 1);
		tasks = tasks;
		console.log(tasks);
		// const { error } = await supabase.from('tasks').delete().eq('id', id);
	};

	const handleChangePriority = async () => {
		priority = !priority;
		const { error } = await supabase.from('tasks').update({ is_priority: !priority }).eq('id', id);
		if (error) {
			console.error(error);
		}
	};
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
	class="dropdown--container fixed z-50 md:absolute md:right-6 md:top-[3.5rem] md:border-2 md:border-grey-700"
	on:click={() => (visibility = false)}
>
	<!-- <button class="dropdown--item" on:click={() => (visibility = false)}>
		<Check className="dropdown--icon" />
		<span class="dropdown--label">Mark as complete</span>
	</button> -->
	<!-- <button class="dropdown--item" on:click={() => (visibility = false)}>
		<Calendar className="dropdown--icon" />
		<span class="dropdown--label">Edit due date</span>
	</button> -->
	<button class="dropdown--item" on:click={handleChangePriority}>
		<CirclePriority className="dropdown--icon" />
		{#if priority}
			<span class="dropdown--label">Un-Prioritize</span>
		{:else}
			<span class="dropdown--label">Prioritize</span>
		{/if}
	</button>
	<!-- <button class="dropdown--item" on:click={() => (visibility = false)}>
		<User className="dropdown--icon" />
		<span class="dropdown--label">Edit assigned people</span>
	</button> -->
	<button class="dropdown--item" on:click={handleTaskDelete}>
		<Trash className="dropdown--icon" />
		<span class="dropdown--label">Delete</span>
	</button>
</div>
