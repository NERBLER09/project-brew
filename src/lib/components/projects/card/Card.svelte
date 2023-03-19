<script lang="ts">
	import Calendar from '$lib/assets/Calendar.svelte';
	import CalendarAdd from '$lib/assets/CalendarAdd.svelte';
	import Check from '$lib/assets/Check.svelte';
	import CirclePriority from '$lib/assets/Fill/CirclePriority.svelte';
	import MoreHorizontal from '$lib/assets/More Horizontal.svelte';
	import PlusNew from '$lib/assets/Plus-New.svelte';
	import UserAdd from '$lib/assets/User-Add.svelte';
	import CardDropdown from '$lib/components/dropdowns/projects/CardDropdown.svelte';
	import { currentProject } from '$lib/stores/project';
	import { userData } from '$lib/stores/user';
	import { supabase } from '$lib/supabase';
	import type { Task } from '$lib/types/projects';
	import { onMount } from 'svelte/internal';
	import NewTagsInput from '../edit/NewTagsInput.svelte';
	import AssignPerson from '../list/new/AssignPerson.svelte';
	import Assinged from './Assinged.svelte';

	export let name: string;
	export let tags: any[] = [];
	export let description: string = '';
	export let dueDate: any;
	export let isPriority: boolean = false;
	export let id: number;
	export let status: 'other' | 'todo' | 'done' | 'doing';
	export let assinged: string[] | null;
	export let tasks: Task[] | undefined;

	let showCardDropdown = false;
	let formattedDate = '';

	let newName = name;
	let newDescription = description;
	let newTags: string[] = [];

	let showAssignNewUsers = false;
	let newTaskAssignedPeople: string[] = [];
	let addNewTags = false;

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

	const updateAssignedPeople = async () => {
		await supabase.from('tasks').update({ assigned: newTaskAssignedPeople }).eq('id', id);
		assinged = newTaskAssignedPeople;
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

	const checkIfTaskIsDueToday = async () => {
		if (!dueDate) return;
		const date = new Date(dueDate);
		const today = new Date();

		date.setDate(date.getDate() + 1);

		const taskDueToday =
			date.getDate() === today.getDate() &&
			date.getMonth() === today.getMonth() &&
			date.getFullYear() === today.getFullYear();

		if (taskDueToday) {
			const { data: notifications } = await supabase
				.from('notifications')
				.select()
				.eq('target_user', $userData.id)
				.eq('message', `${name} in ${$currentProject.name} is due today`);

			if (notifications?.length === 0) {
				const { error } = await supabase.from('notifications').insert({
					title: $currentProject.name,
					message: `${name} in ${$currentProject.name} is due today`,
					target_user: $userData.id,
					type: 'dueTask'
				});
				console.log(error);
			}
		}
	};

	onMount(() => {
		if (!dueDate) return '';

		const tempDueDate = new Date(dueDate);
		tempDueDate.setDate(tempDueDate.getDate() + 1);
		formattedDate = tempDueDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

		checkIfTaskIsDueToday();
	});

	let cardDropdownElement: HTMLElement;
	const handleClickOutside = (event: Event) => {
		if (!cardDropdownElement.contains(event.target)) {
			showCardDropdown = false;
		}
	};
</script>

<svelte:window on:click={handleClickOutside} />

<div class="md:relative">
	<section class="w-full rounded-lg bg-grey-100 p-6 dark:bg-grey-800">
		<header class="mb-sm flex h-fit items-start">
			<div>
				<div class="flex items-center gap-sm">
					{#if status === 'done'}
						<Check className="h-8 w-8 min-h-[2rem] min-w-[2rem] stroke-[#059669] hidden md:block" />
					{/if}
					<h3
						class="font-bold text-grey-700 dark:text-grey-200 card__text--{status} h-fit"
						contenteditable
						bind:textContent={newName}
						on:blur={updateTaskName}
					>
						{name}
					</h3>
				</div>
				<div>
					{#if dueDate}
						<button class="flex items-center md:gap-sm">
							<Calendar className="h-6 w-6 stroke-accent-light" />
							<span class="text-sm font-medium text-grey-700 dark:text-grey-200 md:text-base"
								>{formattedDate}</span
							>
						</button>
					{:else}
						<button class="flex items-center md:gap-sm">
							<CalendarAdd className="h-6 w-6 stroke-accent-light" />
							<span class="text-sm font-medium text-grey-700 dark:text-grey-200 md:text-base">
								Add
								<span class="sr-only">a due date</span>
							</span>
						</button>
					{/if}
				</div>
			</div>

			<div class="ml-auto flex h-8 w-8 items-center gap-md">
				<div bind:this={cardDropdownElement}>
					<button on:click={() => (showCardDropdown = !showCardDropdown)}>
						<MoreHorizontal className="h-8 w-8 stroke-grey-700 dark:stroke-grey-200" />
					</button>

					{#if showCardDropdown}
						<CardDropdown
							bind:visibility={showCardDropdown}
							{id}
							bind:priority={isPriority}
							bind:tasks
						/>
					{/if}
				</div>
			</div>
		</header>

		<div class="mb-md">
			{#if description}
				<p
					class="max-h-[10ch] text-sm font-medium text-grey-700 empty:hidden dark:text-grey-200"
					contenteditable
					bind:textContent={newDescription}
					on:blur={updateTaskDescription}
				>
					{description}
				</p>
			{:else}
				<input
					type="text"
					bind:value={newDescription}
					on:blur={updateTaskDescription}
					placeholder="Enter a description"
					class="border-1 m-0 w-full rounded-md border-dashed border-grey-700 bg-grey-100 p-1 text-sm font-medium text-grey-700 dark:border-grey-300 dark:bg-grey-800"
				/>
			{/if}
		</div>

		{#if tags}
			<div class="mb-4 flex flex-wrap items-center gap-md pt-sm empty:hidden">
				{#each tags as tag}
					<div class="w-fit rounded bg-grey-200 py-1 px-2">
						<span class="text-sm font-medium text-grey-700">{tag}</span>
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

		<div class="flex items-center">
			{#if assinged}
				<div class="relative mt-md flex items-center">
					{#each assinged as id}
						<Assinged {id} />
					{/each}
				</div>
			{/if}
			{#if assinged?.length === 0 && !showAssignNewUsers}
				<button on:click={() => (showAssignNewUsers = !showAssignNewUsers)}>
					<UserAdd
						className="h-10 w-10 stroke-accent-light border-dashed border border-grey-700 dark:broder-grey-300 rounded-full"
					/>
				</button>
			{:else if assinged?.length === 0 && showAssignNewUsers}
				<button on:click={updateAssignedPeople}>
					<Check
						className="h-10 w-10 stroke-accent-light border-dashed border border-grey-700 dark:broder-grey-300 rounded-full"
					/>
				</button>
			{/if}

			{#if isPriority}
				<CirclePriority className="h-12 w-12 fill-[#E68F16] ml-auto" />
			{/if}
		</div>

		{#if showAssignNewUsers}
			<AssignPerson bind:assingedUserIds={newTaskAssignedPeople} />
		{/if}
	</section>
</div>

<style>
	.card__text--done {
		@apply text-[#059669] line-through;
	}
</style>
