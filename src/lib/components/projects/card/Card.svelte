<script lang="ts">
	import Calendar from '$lib/assets/Calendar.svelte';
	import Check from '$lib/assets/Check.svelte';
	import Milestone from '$lib/assets/Milestone.svelte';
	import PlusNew from '$lib/assets/Plus-New.svelte';
	import UserAdd from '$lib/assets/User-Add.svelte';
	import { currentProject, projectMilestones } from '$lib/stores/project';
	import { supabase } from '$lib/supabase';
	import type { SubTask, Task } from '$lib/types/projects';
	import AssignPerson from '../list/new/AssignPerson.svelte';
	import Assinged from './Assinged.svelte';
	import PriorityLevel from './priority/PriorityLevel.svelte';
	import SubTaskList from './sub-tasks/SubTaskList.svelte';
	import UpdateTaskMilestone from './UpdateTaskMilestone.svelte';
	import CloseMultiply from '$lib/assets/Close-Multiply.svelte';
	import { onMount } from 'svelte';
	import { userRole } from '$lib/stores/team';
	import { invalidate } from '$app/navigation';
	import Trash from '$lib/assets/Trash.svelte';
	import TagSelect from '../tags/TagSelect.svelte';

	export let name: string;
	export let tags: string[] = [];
	export let description = '';
	export let due_date: string;
	export let id: number;
	export let status: 'other' | 'todo' | 'done' | 'doing';
	export let assigned: string[] | null;
	export let milestone: object | null;
	export let list: number;
	export let sub_tasks: SubTask[] = [];
	export let priority_level: string | null;
	let invitedPeopleProfiles = $currentProject.invited_people?.map((item) => item.profiles);

	let formattedDate = '';

	let newName = name;
	let newDescription = description;
	let newTags: string[] = [];
	let newDate: Date;

	let showAssignNewUsers = false;
	let addNewTags = false;
	let dateInputElement: HTMLInputElement;

	let updateTaskMilestone = false;

	let isViewer = $userRole === 'viewer';

	const handleTaskDelete = async () => {
		const { error } = await supabase.from('tasks').delete().eq('id', id);
		invalidate('app:project');
	};

	const updateTaskName = async () => {
		if (newName === name || !newName) {
			newName = name;
			return;
		}
		await supabase.from('tasks').update({ name: newName }).eq('id', id);
	};

	const updateTaskDescription = async () => {
		if (newDescription === description || !newDescription) {
			newDescription = description;
			return;
		}
		await supabase.from('tasks').update({ description: newDescription }).eq('id', id);
		description = newDescription;
	};

	const assignTask = async (userId: string) => {
		const tempAssigned = assigned ?? [];
		await supabase
			.from('tasks')
			.update({ assigned: [...tempAssigned, userId] })
			.eq('id', id);

		showAssignNewUsers = false;
	};

	const updateTaskDate = async () => {
		await supabase
			.from('tasks')
			.update({ due_date: new Date(newDate).toISOString() })
			.eq('id', id);
		due_date = new Date(newDate).toISOString();
		const tempDueDate = new Date(due_date);
		tempDueDate.setDate(tempDueDate.getDate() + 1);
		formattedDate = tempDueDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
	};

	onMount(() => {
		if (!due_date) return '';

		const tempDueDate = new Date(due_date);
		tempDueDate.setDate(tempDueDate.getDate() + 1);
		formattedDate = tempDueDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
	});

	let milestoneDropdownElement: HTMLElement;
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<section class="w-full rounded-lg bg-grey-100 p-6 dark:bg-grey-800">
	<header class="mb-md flex h-fit items-center">
		<div class="flex items-center gap-sm">
			{#if status === 'done'}
				<Check className="h-8 w-8 min-h-[2rem] min-w-[2rem] stroke-[#059669] hidden md:block" />
			{/if}
			{#if isViewer}
				<h3
					class="h-fit font-bold text-grey-700 dark:text-grey-200 {status === 'done'
						? 'text-[#059669] line-through'
						: null}"
				>
					{name}
				</h3>
			{:else}
				<h3
					class="h-fit font-bold text-grey-700 dark:text-grey-200 {status === 'done'
						? 'text-[#059669] line-through'
						: null}"
					contenteditable
					bind:textContent={newName}
					on:blur={updateTaskName}
				>
					{name}
				</h3>
			{/if}
		</div>

		{#if !isViewer}
			<button class="button--secondary ml-auto border-0 p-0" on:click={handleTaskDelete}>
				<Trash className="h-6 w-6 stroke-grey-700 dark:stroke-grey-300" />
				<span class="sr-only">Delete {name}</span>
				<span class="sr-only">Delete this task</span>
			</button>
		{/if}
	</header>

	<div class="mb-md flex flex-col items-start gap-md lg:mb-sm lg:flex-row lg:items-center">
		<div>
			{#if isViewer}
				<div class="flex items-center md:gap-sm">
					<Calendar className="h-6 w-6 stroke-accent-light" />
					{#if due_date}
						<span
							class="whitespace-nowrap break-normal text-sm font-medium text-grey-700 dark:text-grey-200 md:text-base"
							>{formattedDate}</span
						>
					{:else}
						<span class="text-sm font-medium text-grey-700 dark:text-grey-200 md:text-base">
							Unset
							<span class="sr-only">No due date has been added</span>
						</span>
					{/if}
				</div>
			{:else}
				<button class="flex items-center md:gap-sm" on:click={() => dateInputElement.showPicker()}>
					<Calendar className="h-6 w-6 stroke-accent-light" />
					{#if due_date}
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
			{/if}

			<input
				type="date"
				class="hidden"
				bind:this={dateInputElement}
				bind:value={newDate}
				on:change={updateTaskDate}
			/>
		</div>

		<div class="hidden h-[5px] w-[5px] rounded-full bg-grey-700 dark:bg-grey-300 lg:inline" />

		<PriorityLevel bind:priority_level taskId={id} />

		{#if $projectMilestones.length > 0}
			<div class="hidden h-[5px] w-[5px] rounded-full bg-grey-700 dark:bg-grey-300 lg:inline" />
		{/if}

		<div class="relative" bind:this={milestoneDropdownElement}>
			{#if isViewer && $projectMilestones.length > 0}
				<div class="flex items-center md:gap-sm">
					<Milestone className="h-6 w-6 stroke-accent-light" />
					{#if milestone?.name}
						<span
							class="truncate text-sm font-medium text-grey-700 dark:text-grey-200 md:max-w-[18ch] md:text-base"
							>{milestone?.name}</span
						>
					{:else}
						<span class="text-sm font-medium text-grey-700 dark:text-grey-200 md:text-base"
							>No Milestone
						</span>
					{/if}
				</div>
			{:else if !isViewer && $projectMilestones.length > 0}
				<button
					class="flex items-center md:gap-sm"
					on:click={() => (updateTaskMilestone = !updateTaskMilestone)}
				>
					<Milestone className="h-6 w-6 stroke-accent-light" />
					{#if milestone?.name}
						<span
							class="truncate text-sm font-medium text-grey-700 dark:text-grey-200 md:max-w-[18ch] md:text-base"
							>{milestone?.name}</span
						>
					{:else}
						<span class="text-sm font-medium text-grey-700 dark:text-grey-200 md:text-base"
							>Add to milestone
						</span>
					{/if}
				</button>
			{/if}

			{#if updateTaskMilestone}
				<UpdateTaskMilestone
					bind:currentMilestone={milestone}
					bind:shown={updateTaskMilestone}
					taskId={id}
					bind:milestone
				/>
			{/if}
		</div>
	</div>
	<div class="mb-md">
		{#if description && !isViewer}
			<p
				class="max-h-[10ch] text-sm font-medium text-grey-700 empty:hidden dark:text-grey-200"
				contenteditable
				bind:textContent={newDescription}
				on:blur={updateTaskDescription}
			>
				{description}
			</p>
		{:else if description && isViewer}
			<p class="max-h-[10ch] text-sm font-medium text-grey-700 empty:hidden dark:text-grey-200">
				{description}
			</p>
		{:else if !description && !isViewer}
			<textarea
				bind:value={newDescription}
				on:blur={updateTaskDescription}
				placeholder="Enter a description"
				class="border-1 m-0 h-fit w-full rounded-md border-dashed border-grey-700 bg-grey-100 p-1 text-sm font-medium text-grey-700 dark:border-grey-300 dark:bg-grey-800 dark:text-grey-300 dark:placeholder:text-grey-300"
			/>
		{/if}
	</div>

	{#if tags && !isViewer}
		<div class="md:relative">
			<button
				class="mb-4 flex w-full appearance-none flex-wrap items-center gap-md pt-sm empty:hidden"
				on:click={() => (addNewTags = !addNewTags)}
			>
				{#each tags as tag}
					<div class="w-fit rounded-full bg-grey-200 px-4 py-1 dark:bg-grey-700">
						<span class="text-sm font-medium text-grey-700 dark:text-grey-300">{tag}</span>
					</div>
				{/each}
			</button>
			{#if addNewTags && !isViewer}
				<TagSelect
					bind:taskTags={tags}
					taskId={id}
					projectId={$currentProject.id}
					bind:shown={addNewTags}
				/>
			{/if}
		</div>
	{:else if !tags && !isViewer}
		<div class="mb-4 flex flex-wrap items-center gap-md pt-sm empty:hidden md:relative">
			<button
				class="m-0 flex items-center gap-sm p-0 font-medium text-grey-700 dark:text-grey-300"
				on:click={() => (addNewTags = !addNewTags)}
			>
				{#if !addNewTags}
					Add new tags
					<PlusNew className="h-8 w-8 md:w-6 md:h-6 stroke-grey-700 dark:stroke-grey-300" />
				{:else}
					Update tags
					<Check className="h-8 w-8 md:w-6 md:h-6 stroke-grey-700 dark:stroke-grey-300" />
				{/if}
			</button>
			{#if addNewTags && !isViewer}
				<TagSelect
					bind:taskTags={tags}
					taskId={id}
					projectId={$currentProject.id}
					bind:shown={addNewTags}
				/>
			{/if}
		</div>
	{/if}
	<SubTaskList taskId={id} {list} project={$currentProject.id} subTasks={sub_tasks} />

	<div class=" z-40 mt-md flex items-center">
		{#if assigned}
			{#each assigned as id}
				<Assinged {id} profiles={invitedPeopleProfiles} />
			{/each}
		{/if}
		{#if !isViewer}
			<button
				on:click={() => (showAssignNewUsers = !showAssignNewUsers)}
				class:ml-auto={assigned?.length > 0}
			>
				{#if !showAssignNewUsers}
					<UserAdd
						className="h-10 w-10 stroke-accent-light border-dashed border border-grey-700 dark:border-grey-300 rounded-full"
					/>
				{:else}
					<CloseMultiply
						className="h-10 w-10 stroke-grey-700 dark:stroke-grey-300 border-dashed border border-grey-700 dark:border-grey-300 rounded-full"
					/>
				{/if}
			</button>
		{/if}
	</div>

	{#if showAssignNewUsers}
		<AssignPerson bind:assingedUserIds={assigned} {assignTask} profiles={invitedPeopleProfiles} />
	{/if}
</section>
