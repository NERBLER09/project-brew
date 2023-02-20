<script lang="ts">
	import { deserialize } from '$app/forms';
	import { invalidate } from '$app/navigation';
	import CloseMultiply from '$lib/assets/Close-Multiply.svelte';
	import PlusNew from '$lib/assets/Plus-New.svelte';
	import { currentProject } from '$lib/stores/project';
	import toast from 'svelte-french-toast';

	export let createNewList = false;
	let newName = '';
	let newStatus = 'other';

	const handleCreateNewList = async (event) => {
		createNewList = false;
		const form = new FormData(this);
		form.append('list-name', newName);
		form.append('list-status', newStatus);
		form.append('project-id', $currentProject.id);

		const response = await fetch('/app/projects/{data.id}?/newList', {
			method: 'POST',
			body: form
		});

		const result = deserialize(await response.text());

		if (result?.type === 'success') {
			invalidate('app:project');
		} else if (result.type === 'failure') {
			toast.error(result?.data.message);
		}
	};
</script>

<form on:submit|preventDefault={handleCreateNewList}>
	<button
		class="button--secondary flex w-full items-center justify-center gap-md"
		on:click={() => (createNewList = false)}
		type="button"
	>
		<CloseMultiply className="w-6 h-6 stroke-grey-700" />
		Cancel
	</button>

	<input
		type="text"
		class="input--text mt-md mb-sm w-full"
		placeholder="Enter a list name"
		bind:value={newName}
	/>

	<div class="mt-sm mb-md">
		<label for="status-input" class="input--label">Select a task status for this list:</label>
		<select name="status-input" id="status-input" class="input--text w-full" bind:value={newStatus}>
			<option value="todo">To-do</option>
			<option value="doing">Doing</option>
			<option value="done">Done</option>
			<option value="other">Other</option>
		</select>

		<span class="text-sm font-medium text-grey-700 dark:text-grey-200"
			>Selecting a special status can display tasks in a certain way relative to the status.</span
		>
	</div>
	<button class="button--primary flex w-full items-center justify-center gap-md" type="submit">
		<PlusNew className="w-6 h-6 stroke-grey-200" />
		Create list
	</button>
</form>
