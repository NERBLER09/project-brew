<script lang="ts">
	import { currentProject, invitedTeamMembers } from '$lib/stores/project';
	import { deserialize } from '$app/forms';
	import { invalidate } from '$app/navigation';
	import CloseMultiply from '$lib/assets/Close-Multiply.svelte';
	import NewTagsInput from '$lib/components/projects/edit/NewTagsInput.svelte';
	import AssingPerson from '$lib/components/projects/list/new/AssignPerson.svelte';
	import { userData } from '$lib/stores/user';
	import toast from 'svelte-french-toast';
	import { disableDrag } from '$lib/stores/ui';
	import { onDestroy, onMount } from 'svelte';
	import PlusNew from '$lib/assets/Plus-New.svelte';

	export let showCreateTask = false;
	export let listId: string;
	export let listStatus: string;
	export let tasks: any[];

	let newTaskName = '';
	let newTaskDescription = '';
	let newTaskDueDate: string | Date = '';
	let newTaskTags: string[] = [];
	let newTaskAssignedPeople: string[] = [];
	let newTaskPriorityLevel = 'high';

	const handleCreateNewTask = async (event) => {
		showCreateTask = false;

		const form = new FormData(this);
		form.append('name', newTaskName);
		form.append('description', newTaskDescription);
		form.append('tags', newTaskTags.toString());
		form.append('date', newTaskDueDate.toString());
		form.append('list-id', listId);
		form.append('list-status', listStatus);
		form.append('project', $currentProject.id);
		form.append('assigned', newTaskAssignedPeople.toString());
		form.append('project_name', $currentProject.project_name);
		form.append('user_object', $userData);
		form.append('priority_level', newTaskPriorityLevel);

		const response = await fetch('/app/projects/{project_id}?/newTask', {
			method: 'POST',
			body: form
		});

		const result = deserialize(await response.text());

		if (result?.type === 'success') {
			tasks = [result.data?.data, ...tasks];
			invalidate('app:project');
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

<form method="POST" on:submit|preventDefault={handleCreateNewTask}>
	<button
		class="button--secondary flex w-full items-center justify-center gap-md"
		type="button"
		on:click={() => (showCreateTask = false)}
	>
		<CloseMultiply className="w-6 h-6 stroke-grey-700 dark:stroke-grey-200" />
		Cancel
	</button>

	<input
		type="text"
		class="input--text mt-md w-full"
		name="name"
		required
		placeholder="Enter the name of the new task"
		bind:value={newTaskName}
	/>
	<textarea
		name="description"
		id="description-input"
		class="input--text mt-sm h-36 w-full resize-none"
		placeholder="Enter a short description"
		bind:value={newTaskDescription}
	/>
	<div class="flex flex-col items-start gap-sm">
		<label for="date-input" class="input--label mt-sm">Select a due date</label>
		<input
			type="date"
			class="input--text mt-sm"
			id="date-input"
			name="date"
			bind:value={newTaskDueDate}
		/>
	</div>
	<br />

	<label for="priority-input" class="input--label mt-sm">Select a priority level:</label>
	<select
		name="priority-level"
		id="priority-input"
		class="input--text"
		bind:value={newTaskPriorityLevel}
	>
		<option value="high">High</option>
		<option value="med">Medium</option>
		<option value="low">Low</option>
		<option value="none">None</option>
	</select>

	<section>
		<h4 class="font-bold text-grey-700 dark:text-grey-200">Tags</h4>

		<div class="mb-md flex flex-wrap gap-md">
			<NewTagsInput bind:newTags={newTaskTags} />
		</div>
	</section>
	{#if $invitedTeamMembers?.length !== 0}
		<AssingPerson bind:assingedUserIds={newTaskAssignedPeople} />
	{/if}

	<button
		class="button--primary mt-md flex w-full items-center justify-center gap-md"
		type="submit"
	>
		<PlusNew className="w-6 h-6 stroke-grey-100" />
		Create
	</button>
</form>
