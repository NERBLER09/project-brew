<script lang="ts">
	import Calendar from '$lib/assets/Calendar.svelte';
	import CalendarAdd from '$lib/assets/CalendarAdd.svelte';
	import Check from '$lib/assets/Check.svelte';
	import Milestone from '$lib/assets/Milestone.svelte';
	import MoreHorizontal from '$lib/assets/More Horizontal.svelte';
	import PlusNew from '$lib/assets/Plus-New.svelte';
	import UserAdd from '$lib/assets/User-Add.svelte';
	import CardDropdown from '$lib/components/dropdowns/projects/CardDropdown.svelte';
	import { currentProject } from '$lib/stores/project';
	import { userData } from '$lib/stores/user';
	import { supabase } from '$lib/supabase';
	import type { SubTask, Task } from '$lib/types/projects';
	import NewTagsInput from '../edit/NewTagsInput.svelte';
	import AssignPerson from '../list/new/AssignPerson.svelte';
	import Assinged from './Assinged.svelte';
	import PriorityLevel from './priority/PriorityLevel.svelte';
	import SubTaskList from './sub-tasks/SubTaskList.svelte';
	import UpdateTaskMilestone from './UpdateTaskMilestone.svelte';
	import CloseMultiply from '$lib/assets/Close-Multiply.svelte';
	import { onMount } from 'svelte';
	import { userRole } from '$lib/stores/team';

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

	let showCardDropdown = false;
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

	const updateTaskTags = async () => {
		if (!tags) {
			newTags = tags;
			return;
		}
		await supabase.from('tasks').update({ tags: newTags }).eq('id', id);
		addNewTags = false;
		tags = newTags;
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

	// const checkIfTaskIsDueToday = async () => {
	// 	if (!due_date) return;
	// 	const date = new Date(due_date);
	// 	const today = new Date();
	//
	// 	date.setDate(date.getDate() + 1);
	//
	// 	const taskDueToday =
	// 		date.getDate() === today.getDate() &&
	// 		date.getMonth() === today.getMonth() &&
	// 		date.getFullYear() === today.getFullYear();
	//
	// 	if (taskDueToday) {
	// 		const { data: notifications } = await supabase
	// 			.from('notifications')
	// 			.select()
	// 			.eq('target_user', $userData.id)
	// 			.eq('message', `${name} in ${$currentProject.project_name} is due today`);
	//
	// 		if (notifications?.length === 0) {
	// 			const { error } = await supabase.from('notifications').insert({
	// 				title: $currentProject.project_name,
	// 				message: `${name} in ${$currentProject.project_name} is due today`,
	// 				target_user: $userData.id,
	// 				type: 'dueTask'
	// 			});
	// 		}
	// 	}
	// };
	//

	onMount(() => {
		if (!due_date) return '';

		const tempDueDate = new Date(due_date);
		tempDueDate.setDate(tempDueDate.getDate() + 1);
		formattedDate = tempDueDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

		// checkIfTaskIsDueToday();
	});

	let cardDropdownElement: HTMLElement;
	let milestoneDropdownElement: HTMLElement;
	const handleClickOutside = (event: Event) => {
		if (!cardDropdownElement.contains(event.target)) {
			showCardDropdown = false;
		}

		if (!milestoneDropdownElement.contains(event.target)) {
			updateTaskMilestone = false;
		}
	};
</script>

<svelte:window on:click={handleClickOutside} />

<div class="md:relative" style="visibility: visible !important;">
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
				<div class="ml-auto flex h-8 w-8 items-center gap-md">
					<div bind:this={cardDropdownElement}>
						<button on:click={() => (showCardDropdown = !showCardDropdown)}>
							<MoreHorizontal className="h-8 w-8 stroke-grey-700 dark:stroke-grey-200" />
						</button>

						{#if showCardDropdown}
							<CardDropdown bind:visibility={showCardDropdown} {id} />
						{/if}
					</div>
				</div>
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
					<button
						class="flex items-center md:gap-sm"
						on:click={() => dateInputElement.showPicker()}
					>
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

			<div class="hidden h-[5px] w-[5px] rounded-full bg-grey-700 dark:bg-grey-300 lg:inline" />

			<div class="relative" bind:this={milestoneDropdownElement}>
				{#if isViewer}
					<div class="flex items-center md:gap-sm">
						<Milestone className="h-6 w-6 stroke-accent-light" />
						{#if milestone?.name}
							<a
								class="truncate text-sm font-medium text-grey-700 dark:text-grey-200 md:max-w-[18ch] md:text-base"
								href="milestones/{milestone?.id}">{milestone?.name}</a
							>
						{:else}
							<span class="text-sm font-medium text-grey-700 dark:text-grey-200 md:text-base"
								>No Milestone
							</span>
						{/if}
					</div>
				{:else}
					<button
						class="flex items-center md:gap-sm"
						on:click={() => (updateTaskMilestone = !updateTaskMilestone)}
					>
						<Milestone className="h-6 w-6 stroke-accent-light" />
						{#if milestone?.name}
							<a
								class="truncate text-sm font-medium text-grey-700 dark:text-grey-200 md:max-w-[18ch] md:text-base"
								href="milestones/{milestone?.id}">{milestone?.name}</a
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
				<input
					type="text"
					bind:value={newDescription}
					on:blur={updateTaskDescription}
					placeholder="Enter a description"
					class="border-1 m-0 w-full rounded-md border-dashed border-grey-700 bg-grey-100 p-1 text-sm font-medium text-grey-700 dark:border-grey-300 dark:bg-grey-800 dark:text-grey-300 dark:placeholder:text-grey-300"
				/>
			{/if}
		</div>

		{#if tags}
			<div class="mb-4 flex flex-wrap items-center gap-md pt-sm empty:hidden">
				{#each tags as tag}
					<div class="w-fit rounded-full bg-grey-200 px-4 py-1 dark:bg-grey-700">
						<span class="text-sm font-medium text-grey-700 dark:text-grey-300">{tag}</span>
					</div>
				{/each}
			</div>
		{:else}
			<div class="mb-4 flex flex-wrap items-center gap-md pt-sm empty:hidden">
				{#if !addNewTags}
					<button
						class="m-0 flex items-center gap-sm p-0 font-medium text-grey-700 dark:text-grey-300"
						on:click={() => (addNewTags = true)}
					>
						Add new tags
						<PlusNew className="h-8 w-8 md:w-6 md:h-6 stroke-grey-700 dark:stroke-grey-300" />
					</button>
				{:else}
					<button
						class="m-0 flex items-center gap-sm p-0 font-medium text-grey-700 dark:text-grey-300"
						on:click={updateTaskTags}
					>
						Update tags
						<Check className="h-8 w-8 md:w-6 md:h-6 stroke-grey-700 dark:stroke-grey-300" />
					</button>
					<NewTagsInput bind:newTags />
				{/if}
			</div>
		{/if}

		<SubTaskList taskId={id} {list} project={$currentProject.id} subTasks={sub_tasks} />

		<div class="relative mt-md flex items-center">
			{#if assigned}
				{#each assigned as id}
					<Assinged {id} />
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
			<AssignPerson bind:assingedUserIds={assigned} {assignTask} />
		{/if}
	</section>
</div>
