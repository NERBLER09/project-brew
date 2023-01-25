<script lang="ts">
	import { deserialize } from '$app/forms';
	import { invalidate } from '$app/navigation';
	import CloseMultiply from '$lib/assets/Close-Multiply.svelte';
	import PlusNew from '$lib/assets/Plus-New.svelte';
	import { currentProject } from '$lib/stores/project';

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
		}
	};
</script>

<form on:submit|preventDefault={handleCreateNewList}>
	<button
		class="button--secondary w-full flex items-center gap-md justify-center"
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
			<option value="other" default>Other</option>
		</select>

		<span class="font-medium text-grey-700 text-sm"
			>Selecting a special status can display tasks in a certain way relative to the status.</span
		>
	</div>
	<button class="button--primary w-full flex items-center gap-md justify-center" type="submit">
		<PlusNew className="w-6 h-6 stroke-grey-200" />
		Create list
	</button>
</form>
