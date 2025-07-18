<script lang="ts">
	import Calendar from '$lib/assets/Calendar.svelte';
	import CalendarAdd from '$lib/assets/CalendarAdd.svelte';
	import Milestone from '$lib/assets/Milestone.svelte';
	import { supabase } from '$lib/supabase';
	import { onMount } from 'svelte';
	import Assinged from '../card/Assinged.svelte';
	import PriorityLevel from '../card/priority/PriorityLevel.svelte';
	import ChangeMilestone from './ChangeMilestone.svelte';
	import { userRole } from '$lib/stores/team';
	import Down from '$lib/assets/Arrow/Chevron/Down.svelte';
	import Left from '$lib/assets/Arrow/Chevron/Left.svelte';
	import SubTaskList from '../card/sub-tasks/SubTaskList.svelte';
	import ChangeStatus from './ChangeStatus.svelte';
	import pkg from 'lodash';
	import SubTasksTablePage from '../card/sub-tasks/SubTasksTablePage.svelte';
	import Trash from '$lib/assets/Trash.svelte';
	import { invalidate } from '$app/navigation';
	import TagSelect from '../tags/TagSelect.svelte';
	import { currentProject } from '$lib/stores/project';
	import PlusNew from '$lib/assets/Plus-New.svelte';
	import Check from '$lib/assets/Check.svelte';
	const { startCase } = pkg;

	export let name: string;
	export let tags: string[] = [];
	export let due_date: string;
	export let id: number;
	export let status: 'other' | 'todo' | 'done' | 'doing';
	export let assigned: string[] | null;
	export let milestone: string | null;
	export let priority_level: string | null;
	export let projectId: number;
	export let sub_tasks: string[];

	tags = tags ?? [];
	assigned = assigned ?? [];

	let formattedDate = '';
	let milestoneName = '';
	let showChangeMilestone = false;
	let showChangeStatus = false;
	let addNewTags = false;

	let showSubTasks = false;

	let isViewer = $userRole === 'viewer';

	let newDate: Date;
	let newDateInput: HTMLInputElement;

	let showDelete = false;
	const handleTaskDelete = async () => {
		await supabase.from('tasks').delete().eq('id', id);
		invalidate('app:project');
	};

	const updateDetails = async (name: string, date: Date) => {
		await supabase
			.from('tasks')
			.update({ name, due_date: new Date(date).toISOString() })
			.eq('id', id);

		const tempDueDate = new Date(newDate);
		tempDueDate.setDate(tempDueDate.getDate() + 1);
		formattedDate = tempDueDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
	};

	onMount(() => {
		const tempDueDate = new Date(due_date);
		tempDueDate.setDate(tempDueDate.getDate() + 1);
		formattedDate = tempDueDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

		milestoneName = milestone?.name;
	});
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
	class="flex max-h-12 items-center py-2 md:py-1"
	on:mouseenter={() => (showDelete = true)}
	on:mouseleave={() => (showDelete = false)}
>
	<div
		class="relative mr-md flex min-w-[18.75rem] max-w-[18.75rem] items-center gap-md overflow-y-visible truncate"
	>
		<button
			class="button--secondary relative m-0 flex items-center gap-sm border-0 p-0"
			on:click={() => (showSubTasks = !showSubTasks)}
		>
			{#if showSubTasks}
				<Down className="h-6 w-6 stroke-grey-700 dark:stroke-grey-300" />
			{:else}
				<Left className="h-6 w-6 stroke-grey-700 dark:stroke-grey-300" />
			{/if}
			<span class="sr-only">Show sub tasks</span></button
		>
		{#if showDelete && !isViewer}
			<button
				class="button--secondary relative m-0 flex items-center gap-sm border-0 p-0"
				on:click={handleTaskDelete}
			>
				<Trash className="h-6 w-6 stroke-grey-700 dark:stroke-grey-300" />
				<span class="sr-only">Delete this task</span></button
			>
		{/if}
		{#if isViewer}
			<span class="font-bold text-grey-700 dark:text-grey-300">{name}</span>
		{:else}
			<span
				class="max-w-[20ch] truncate font-bold text-grey-700 dark:text-grey-300"
				contenteditable
				bind:textContent={name}
				on:blur={() => updateDetails(name, newDate)}>{name}</span
			>
		{/if}
	</div>

	{#if isViewer}
		<div
			class="button--secondary relative m-0 mr-md flex min-w-[12.5rem] items-center gap-sm border-0 bg-none p-0"
			style="background: none;"
		>
			{#if due_date}
				<Calendar className="h-6 w-6 stroke-accent-light" />
				<span class="font-bold text-grey-700 dark:text-grey-300">{formattedDate}</span>
			{:else}
				<CalendarAdd className="h-6 w-6 stroke-accent-light" />
				<span class="font-bold text-grey-700 dark:text-grey-300">No due date</span>
			{/if}
		</div>
	{:else}
		<button
			class="button--secondary relative m-0 mr-md flex min-w-[12.5rem] items-center gap-sm border-0 p-0"
			on:click={() => newDateInput.showPicker()}
		>
			<input
				type="date"
				class="hidden"
				bind:this={newDateInput}
				bind:value={newDate}
				on:change={() => updateDetails(name, newDate)}
			/>
			{#if due_date}
				<Calendar className="h-6 w-6 stroke-accent-light" />
				<span class="font-bold text-grey-700 dark:text-grey-300">{formattedDate}</span>
			{:else}
				<CalendarAdd className="h-6 w-6 stroke-accent-light" />
				<span class="font-bold text-grey-700 dark:text-grey-300">Add due date</span>
			{/if}
		</button>
	{/if}
	<div class="relative mr-md min-w-[12.5rem]">
		<button class="w-fit" on:click={() => (showChangeStatus = !showChangeStatus)}>
			{#if status === 'done'}
				<div class="rounded-full bg-emerald-400 px-3 py-[0.125rem] dark:bg-emerald-500">
					<span class="font-medium text-grey-100">Done</span>
				</div>
			{:else if status === 'doing'}
				<div class="rounded-full bg-yellow-300 px-3 py-[0.125rem] dark:bg-yellow-400">
					<span class="font-medium text-grey-700">Doing</span>
				</div>
			{:else if status === 'todo'}
				<div class="rounded-full bg-orange-400 px-3 py-[0.125rem] dark:bg-orange-600">
					<span class="font-medium text-grey-100">To-do</span>
				</div>
			{:else}
				<div class="rounded-full bg-grey-200 px-3 py-[0.125rem] dark:bg-grey-700">
					<span class="font-medium text-grey-700 dark:text-grey-300">{startCase(status)}</span>
				</div>
			{/if}
		</button>

		{#if showChangeStatus}
			<ChangeStatus {projectId} taskId={id} bind:shown={showChangeStatus} />
		{/if}
	</div>
	<div class="mr-md min-w-[12.5rem]">
		<div class="w-fit">
			<PriorityLevel {priority_level} taskId={id} />
		</div>
	</div>
	<div class="relative mr-md min-w-[12.5rem] max-w-[12.5rem] overflow-visible whitespace-nowrap">
		<button
			class="button--secondary m-0 flex w-fit min-w-[10.625rem] max-w-[10.625rem] items-center gap-sm border-0 p-0"
			on:click={() => (showChangeMilestone = !showChangeMilestone)}
		>
			<Milestone className="min-h-6 min-w-6 w-6 h-6 stroke-accent-light" />
			{#if milestoneName}
				<span class="max-w-[10ch] truncate font-bold text-grey-700 dark:text-grey-300"
					>{milestoneName}</span
				>
			{:else}
				<span class="truncate font-bold text-grey-700 dark:text-grey-300">No milestone</span>
			{/if}
		</button>

		{#if showChangeMilestone}
			<ChangeMilestone
				{projectId}
				milestoneId={milestone}
				taskId={id}
				bind:shown={showChangeMilestone}
				positioning="top-5"
				bind:milestoneName
			/>
		{/if}
	</div>
	<div class="relative mr-md min-w-[12.5rem]">
		{#if assigned}
			<div class="relative flex items-center">
				{#each assigned as id}
					<Assinged {id} />
				{/each}
			</div>
		{/if}
	</div>
	<!-- {#if tags} -->
	<div class="mr-md w-full min-w-[12.5rem] md:relative">
		<button
			class="flex-no-wrap z-40 flex min-h-[10px] w-full appearance-none items-center gap-md"
			on:click={() => (addNewTags = !addNewTags)}
		>
			{#if tags}
				{#each tags as tag}
					<div class="rounded-full bg-grey-200 px-4 py-1 dark:bg-grey-700">
						<span class="text-nowrap text-sm font-medium text-grey-700 dark:text-grey-300"
							>{tag}</span
						>
					</div>
				{/each}
			{/if}
		</button>
		{#if addNewTags}
			<TagSelect
				bind:taskTags={tags}
				taskId={id}
				projectId={$currentProject.id}
				bind:shown={addNewTags}
			/>
		{/if}
	</div>
	<!-- {:else} -->
	<!-- <div class="mb-4 flex flex-wrap items-center gap-md pt-sm empty:hidden md:relative"> -->
	<!-- 	<button -->
	<!-- 		class="m-0 flex items-center gap-sm p-0 font-medium text-grey-700 dark:text-grey-300" -->
	<!-- 		on:click={() => (addNewTags = !addNewTags)} -->
	<!-- 	> -->
	<!-- {#if !addNewTags} -->
	<!-- 	Add new tags -->
	<!-- 	<PlusNew className="h-8 w-8 md:w-6 md:h-6 stroke-grey-700 dark:stroke-grey-300" /> -->
	<!-- {:else} -->
	<!-- 	Update tags -->
	<!-- 	<Check className="h-8 w-8 md:w-6 md:h-6 stroke-grey-700 dark:stroke-grey-300" /> -->
	<!-- {/if} -->
	<!-- 		</button> -->
	<!-- 		{#if addNewTags} -->
	<!-- 			<TagSelect -->
	<!-- 				bind:taskTags={tags} -->
	<!-- 				taskId={id} -->
	<!-- 				projectId={$currentProject.id} -->
	<!-- 				bind:shown={addNewTags} -->
	<!-- 			/> -->
	<!-- 		{/if} -->
	<!-- 	</div> -->
	<!-- {/if} -->
</div>

{#if showSubTasks}
	<div class="ml-[2.5rem]">
		<SubTasksTablePage
			subTasks={sub_tasks}
			showSubTasks={true}
			showCreateSubTasks={true}
			taskId={id}
			project={projectId}
		/>
	</div>
{/if}
