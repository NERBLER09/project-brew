<script lang="ts">
	import { currentProject } from '$lib/stores/project';
	import { deserialize } from '$app/forms';
	import { invalidate } from '$app/navigation';
	import CloseMultiply from '$lib/assets/Close-Multiply.svelte';
	import NewTagsInput from '$lib/components/projects/edit/NewTagsInput.svelte';
	import { userData } from '$lib/stores/user';
	import toast from 'svelte-french-toast';
	import { disableDrag } from '$lib/stores/ui';
	import { onDestroy, onMount } from 'svelte';
	import PlusNew from '$lib/assets/Plus-New.svelte';
	import Down from '$lib/assets/Arrow/Chevron/Down.svelte';
	import SetNewTaskMilestone from './SetNewTaskMilestone.svelte';
	import PriorityLevel from '$lib/components/projects/card/priority/PriorityLevel.svelte';
	import Calendar from '$lib/assets/Calendar.svelte';
	import Check from '$lib/assets/Check.svelte';

	export let showCreateTask = false;
	export let listId: string;
	export let listStatus: string;
	export let tasks: any[];

	let newTaskName = 'New Task';
	let newTaskDescription = '';
	let newTaskDueDate: string | Date = '';
	let newTaskTags: string[] = [];
	let newTaskAssignedPeople: string[] = [];
	let newTaskPriorityLevel = 'none';
	let newTaskMilestone: string | null = null;
	let selectedMilestone: object | null = {};
	let showMilestoneSelect = false;

	$: formattedDate = new Date(newTaskDueDate)?.toLocaleDateString('en-US', {
		month: 'short',
		day: 'numeric'
	});

	let priorityContainer: HTMLElement;
	let changePriorityDropdown = false;
	let dateInputElement: HTMLInputElement;
	let shown: boolean;

	const handleAutoClose = (event: Event) => {
		if (!priorityContainer.contains(event.target)) {
			changePriorityDropdown = false;
		}
	};

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
		form.append('milestone', newTaskMilestone);

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

<svelte:window on:click={handleAutoClose} />

<button
	class="button--secondary mb-md flex w-full items-center justify-center gap-md"
	type="button"
	on:click={() => (showCreateTask = false)}
>
	<CloseMultiply className="w-6 h-6 stroke-grey-700 dark:stroke-grey-200" />
	Cancel
</button>

<form method="POST" on:submit|preventDefault={handleCreateNewTask} class="relative">
	<button class="absolute right-6 top-6" type="submit">
		<Check className="w-8 h-8 stroke-grey-100" />
		<span class="sr-only">Create new task</span>
	</button>

	<section class="w-full rounded-lg bg-grey-100 p-6 dark:bg-grey-800">
		<header class="mb-md flex h-fit items-center">
			<div class="flex items-center gap-sm">
				<h3
					class="h-fit font-bold text-grey-700 dark:text-grey-200 {status === 'done'
						? 'text-[#059669] line-through'
						: null}"
					contenteditable
					bind:textContent={newTaskName}
				>
					{newTaskName}
				</h3>
			</div>
		</header>

		<div class="mb-md flex flex-col items-start gap-md lg:mb-sm lg:flex-row lg:items-center">
			<div>
				<button class="flex items-center md:gap-sm" on:click={() => dateInputElement.showPicker()}>
					<Calendar className="h-6 w-6 stroke-accent-light" />
					{#if newTaskDueDate}
						<span
							class="whitespace-nowrap break-normal text-sm font-medium text-grey-700 dark:text-grey-200 md:text-base"
							>{formattedDate}</span
						>
					{:else}
						<span class="text-sm font-medium text-grey-700 dark:text-grey-200 md:text-base">
							Add
							<span class="sr-only">a due date</span>
						</span>
					{/if}
				</button>

				<input
					type="date"
					class="hidden"
					bind:this={dateInputElement}
					bind:value={newTaskDueDate}
				/>
			</div>

			<div class="hidden h-[5px] w-[5px] rounded-full bg-grey-700 dark:bg-grey-300 lg:inline" />

			<!-- Stuoopid bloat that needs to be moved into a file that will only be used here -->
			<div
				bind:this={priorityContainer}
				class="rounded hover:bg-grey-200
		hover:dark:bg-grey-700 md:relative {changePriorityDropdown
					? 'bg-grey-200 dark:bg-grey-700'
					: ''} col-start-4 max-w-fit"
			>
				<button
					on:click={() => {
						changePriorityDropdown = !changePriorityDropdown;
					}}
				>
					<span class="sr-only">Click to change the priority</span>
					{#if newTaskPriorityLevel === 'high'}
						<div class="rounded-full bg-red-400 px-3 py-[0.125rem] dark:bg-red-600">
							<span class="sr-only">High priority</span>
							<span class="font-medium text-grey-100">High</span>
						</div>
					{:else if newTaskPriorityLevel === 'med'}
						<div class="rounded-full bg-orange-400 px-3 py-[0.125rem] dark:bg-orange-600">
							<span class="sr-only">Medium priority</span>
							<span class="font-medium text-grey-100">Medium</span>
						</div>
					{:else if newTaskPriorityLevel === 'low'}
						<div class="rounded-full bg-yellow-300 px-3 py-[0.125rem] dark:bg-yellow-500">
							<span class="sr-only">Low priority</span>
							<span class="font-medium text-grey-700">Low</span>
						</div>
					{:else if newTaskPriorityLevel === 'none' || newTaskPriorityLevel === null}
						<div class="rounded-full bg-emerald-400 px-3 py-[0.125rem] dark:bg-emerald-500">
							<span class="sr-only">No priority</span>
							<span class="font-medium text-grey-100">None</span>
						</div>
					{/if}
				</button>
				{#if changePriorityDropdown}
					<div
						class="dropdown--container z-50 border-grey-200 shadow dark:border-grey-700 md:left-0 md:top-8 md:w-[12.5rem] md:border-2"
					>
						<button
							class="dropdown--item"
							on:click={() => {
								newTaskPriorityLevel = 'high';
								changePriorityDropdown = false;
							}}
						>
							{#if newTaskPriorityLevel === 'high'}
								<Check className="dropdown--icon" />
							{/if}
							<div class="rounded-full bg-red-400 px-4 py-1 dark:bg-red-600">
								<span class="sr-only">High priority</span>
								<span class="font-medium text-grey-100">High</span>
							</div>
						</button>

						<button
							class="dropdown--item"
							on:click={() => {
								newTaskPriorityLevel = 'med';

								changePriorityDropdown = false;
							}}
						>
							{#if newTaskPriorityLevel === 'med'}
								<Check className="dropdown--icon" />
							{/if}
							<div class="rounded-full bg-orange-400 px-4 py-1 dark:bg-orange-600">
								<span class="font-medium text-grey-100">Medium</span>
							</div>
						</button>
						<button
							class="dropdown--item"
							on:click={() => {
								newTaskPriorityLevel = 'med';
								shown = true;
							}}
						>
							{#if newTaskPriorityLevel === 'low'}
								<Check className="dropdown--icon" />
							{/if}
							<div class="rounded-full bg-yellow-300 px-4 py-1 dark:bg-yellow-500">
								<span class="sr-only">Low priority</span>
								<span class="font-medium text-grey-700">Low</span>
							</div>
						</button>
						<button
							class="dropdown--item"
							on:click={() => {
								newTaskPriorityLevel = 'none';
								shown = true;
							}}
						>
							{#if newTaskPriorityLevel === 'none'}
								<Check className="dropdown--icon" />
							{/if}
							<div class="rounded-full bg-emerald-400 px-4 py-1 dark:bg-emerald-500">
								<span class="sr-only">No priority</span>
								<span class="font-medium text-grey-100">None</span>
							</div>
						</button>
					</div>
				{/if}
				<div class="hidden h-[5px] w-[5px] rounded-full bg-grey-700 dark:bg-grey-300 lg:inline" />

				<!-- <div class="relative" bind:this={milestoneDropdownElement}>
				<button
					class="flex items-center md:gap-sm"
					on:click={() => (updateTaskMilestone = !updateTaskMilestone)}
				>
					<Milestone className="h-6 w-6 stroke-accent-light" />
					<a
						class="truncate text-sm font-medium text-grey-700 dark:text-grey-200 md:max-w-[18ch] md:text-base"
						href="milestones/{milestone?.id}">{milestone?.name}</a
					>
					<span class="text-sm font-medium text-grey-700 dark:text-grey-200 md:text-base"
						>Add to milestone
					</span>
				</button>

				{#if updateTaskMilestone}
					<UpdateTaskMilestone
						bind:currentMilestone={milestone}
						bind:shown={updateTaskMilestone}
						taskId={id}
						bind:milestone
					/>
				{/if}
			</div>
		</div> -->
			</div>
		</div>
		<div class="mb-md">
			<input
				type="text"
				bind:value={newTaskDescription}
				placeholder="Enter a description"
				class="border-1 m-0 w-full rounded-md border-dashed border-grey-700 bg-grey-100 p-1 text-sm font-medium text-grey-700 dark:border-grey-300 dark:bg-grey-800 dark:text-grey-300 dark:placeholder:text-grey-300"
			/>
		</div>

		<div class="mb-md flex flex-wrap gap-md">
			<NewTagsInput bind:newTags={newTaskTags} />
		</div>
	</section>
</form>
