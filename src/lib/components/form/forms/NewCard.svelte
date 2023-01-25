<script lang="ts">
	import { currentProject } from '$lib/stores/project';
	import { deserialize } from '$app/forms';
	import { invalidate } from '$app/navigation';
	import CloseMultiply from '$lib/assets/Close-Multiply.svelte';
	import NewTagsInput from '$lib/components/projects/edit/NewTagsInput.svelte';

	export let showCreateTask = false;
	export let listId: string;
	export let listStatus: string;
	export let tasks: any[];

	let newTaskName = '';
	let newTaskDescription = '';
	let newTaskDueDate = new Date();
	let newTaskPriority = false;
	let newTaskTags: string[] = [];

	const handleCreateNewTask = async (event) => {
		showCreateTask = false;

		const form = new FormData(this);
		form.append('name', newTaskName);
		form.append('description', newTaskDescription);
		form.append('tags', newTaskTags.toString());
		form.append('date', newTaskDueDate.toString());
		form.append('priority', newTaskPriority.toString() ?? null);
		form.append('list-id', listId);
		form.append('list-status', listStatus);
		form.append('project', $currentProject.id);

		const response = await fetch('/app/projects/{project_id}?/newTask', {
			method: 'POST',
			body: form
		});

		const result = deserialize(await response.text());

		if (result?.type === 'success') {
			tasks = [result.data?.data, ...tasks];
			invalidate('app:project');
		}
	};
</script>

<form method="POST" on:submit|preventDefault={handleCreateNewTask}>
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
		bind:value={newTaskName}
	/>
	<textarea
		name="description"
		id="description-input"
		class="input--text  resize-none h-36 w-full mt-sm"
		placeholder="Enter a short description"
		bind:value={newTaskDescription}
	/>
	<label for="date-input" class="input--label mt-sm">Select a due date</label>
	<input
		type="date"
		class="input--text mt-sm"
		id="date-input"
		name="date"
		bind:value={newTaskDueDate}
	/>
	<br />

	<label for="priority-input" class="input--label mt-sm">Mark as priority</label>
	<input
		type="checkbox"
		class="input--checkbox my-sm"
		id="prority-input"
		name="priority"
		bind:checked={newTaskPriority}
	/>

	<section>
		<h4 class="text-grey-700 font-bold">Tags</h4>

		<div class="flex flex-wrap gap-md mb-md">
			<NewTagsInput bind:newTags={newTaskTags} />
		</div>
	</section>

	<button
		class="button--primary w-full flex items-center gap-md justify-center mt-md"
		type="submit"
	>
		<plusnew classname="w-6 h-6 stroke-grey-100" />
		Create
	</button>
</form>
