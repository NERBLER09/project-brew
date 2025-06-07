<script lang="ts">
	import { deserialize } from '$app/forms';
	import { invalidate } from '$app/navigation';
	import CloseMultiply from '$lib/assets/Close-Multiply.svelte';
	import PlusNew from '$lib/assets/Plus-New.svelte';
	import { currentProject } from '$lib/stores/project';
	import { disableDrag } from '$lib/stores/ui';
	import { onDestroy, onMount } from 'svelte';
	import toast from 'svelte-french-toast';

	export let createNewList = false;
	let newName = '';
	let newStatus = 'todo';

	const handleCreateNewList = async (event) => {
		createNewList = false;
		const form = new FormData(this);
		form.append('list-name', newName);
		form.append('list-status', newStatus.toLowerCase());
		form.append('project-id', $currentProject.id);

		const response = await fetch(`/app/projects/${$currentProject.id}?/newList`, {
			method: 'POST',
			body: form
		});

		const result = deserialize(await response.text());

		if (result?.type === 'success') {
			invalidate('project:board');
		} else if (result.type === 'failure') {
			toast.error(result?.data.message);
		}
	};

	onMount(() => {
		$disableDrag = true;
	});

	onDestroy(() => {
		$disableDrag = false;
	});
</script>

<form
	on:submit|preventDefault={handleCreateNewList}
	class="max-w-[15.625rem] md:max-w-[18.75rem] lg:max-w-[25rem]"
>
	<button
		class="button--secondary flex w-full items-center justify-center gap-md"
		on:click={() => (createNewList = false)}
		type="button"
	>
		<CloseMultiply className="w-6 h-6 stroke-grey-700 dark:stroke-grey-200" />
		Cancel
	</button>

	<input
		type="text"
		class="input--text mb-sm mt-md w-full"
		placeholder="Enter a list name"
		bind:value={newName}
		required
	/>

	<div class="mb-md mt-sm">
		<label for="status-input" class="input--label">Enter a task status for this list:</label>
		<select name="status-input" id="status-input" class="input--text w-full" bind:value={newStatus}>
			<option value="todo">To-do</option>
			<option value="doing">Doing</option>
			<option value="done">Done</option>
			<option value="other">Other</option>
		</select>
		<input
			type="text"
			class="input--text mt-md w-full"
			placeholder="Enter a list status"
			name="status-input"
			bind:value={newStatus}
			required
		/>
	</div>
	<button class="button--primary flex w-full items-center justify-center gap-md" type="submit">
		<PlusNew className="w-6 h-6 stroke-grey-200" />
		Create list
	</button>
</form>
