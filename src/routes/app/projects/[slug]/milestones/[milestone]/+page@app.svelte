<script lang="ts">
	import { invalidate } from '$app/navigation';
	import Back from '$lib/assets/Arrow/Back.svelte';
	import Calendar from '$lib/assets/Calendar.svelte';
	import PlusNew from '$lib/assets/Plus-New.svelte';
	import Target from '$lib/assets/Target.svelte';
	import AddTask from '$lib/components/projects/milestones/AddTask.svelte';
	import MilestoneTask from '$lib/components/projects/milestones/MilestoneTask.svelte';
	import RoadmapItem from '$lib/components/projects/milestones/RoadmapItem.svelte';
	import { showMobileNav } from '$lib/stores/ui';
	import { supabase } from '$lib/supabase';
	import { onDestroy, onMount } from 'svelte';
	import type { PageData } from './$types';
	import { enhance } from '$app/forms';
	import toast from 'svelte-french-toast';
	import User from '$lib/assets/User.svelte';
	import Trash from '$lib/assets/Trash.svelte';
	import ConfirmDelete from '$lib/components/prompts/projects/milestones/ConfirmDelete.svelte';
	import AddLead from '$lib/components/projects/milestones/AddLead.svelte';
	import CircleCheck from '$lib/assets/Fill/CircleCheck.svelte';
	import Check from '$lib/assets/Check.svelte';
	import CloseMultiply from '$lib/assets/Close-Multiply.svelte';
	import { milestoneFilter } from '$lib/stores/project';

	export let data: PageData;

	let tasks = data.milestone.tasks.sort((item) => {
		if (item.status === 'done') return 1;
		else return 0;
	});

	let startDate = new Date(data.milestone.start_date).setDate(
		new Date(data.milestone.start_date).getDate() + 1
	);
	let endDate = new Date(data.milestone?.end_date).setDate(
		new Date(data.milestone?.end_date).getDate() + 1
	);

	let formattedStartDate = '';
	let formattedEndDate = '';

	let updatedName = data.milestone.name;
	let updatedDescription = data.milestone.description;
	let updatedStartDate: Date = new Date();
	let startDateInput: HTMLInputElement;
	let updatedEndDate: Date = new Date();
	let endDateInput: HTMLInputElement;

	let newMilestoneLead = '';
	let showAddLead = false;

	const updateMilestoneName = async () => {
		if (updatedName === data.milestone.name) return;
		else if (!updatedName) {
			updatedName = data.milestone.name;
			return;
		}
		await supabase.from('milestones').update({ name: updatedName }).eq('id', data.milestone.id);
		invalidate('milestone:open');
	};

	const updateMilestoneDescription = async () => {
		if (updatedDescription === data.milestone.description) return;

		await supabase
			.from('milestones')
			.update({ description: updatedDescription })
			.eq('id', data.milestone.id);

		invalidate('milestone:open');
	};

	const updateMilestoneStartDate = async () => {
		await supabase
			.from('milestones')
			.update({ start_date: new Date(updatedStartDate).toISOString() })
			.eq('id', data.milestone.id);

		invalidate('milestone:open');
		formattedStartDate = new Date(data.milestone.start_date).toLocaleDateString('en-US', {
			month: 'short',
			day: 'numeric'
		});
	};

	const updateMilestoneEndDate = async () => {
		await supabase
			.from('milestones')
			.update({ end_date: new Date(updatedEndDate).toISOString() })
			.eq('id', data.milestone.id);

		invalidate('milestone:open');
		formattedEndDate = new Date(data.milestone?.end_date).toLocaleDateString('en-US', {
			month: 'short',
			day: 'numeric'
		});
	};

	const setMilestoneLead = async (id: string) => {
		await supabase.from('milestones').update({ leader: id }).eq('id', data.milestone.id);
		invalidate('milestone:open');
	};

	$: setMilestoneLead(newMilestoneLead);

	let strokeArray = 380;
	let totalTasks = 0;
	let completedTasks = 0;
	let percentCompleted = 0;

	onMount(async () => {
		$showMobileNav = false;

		totalTasks = data.milestone.tasks?.length ?? 0;
		completedTasks = data.milestone.tasks?.filter((item) => item.status === 'done').length!;
		percentCompleted = Math.round((completedTasks / totalTasks) * 100) || 0;

		formattedStartDate = new Date(startDate).toLocaleDateString('en-US', {
			month: 'short',
			day: 'numeric'
		});
		formattedEndDate = new Date(endDate).toLocaleDateString('en-US', {
			month: 'short',
			day: 'numeric'
		});
	});

	const markMilestoneAsCompleted = async () => {
		const { error } = await supabase
			.from('milestones')
			.update({ completed: !data.milestone.completed })
			.eq('id', data.milestone.id);

		invalidate('milestone:open');
		console.log(error);
	};

	onDestroy(() => ($showMobileNav = true));

	let showAddTaskDropdown = false;
	let showCreateRoadmapItem = false;
	let showDeleteWarning = false;
</script>

<svelte:head>
	<title>{data.milestone.name}</title>
</svelte:head>

<header class="flex items-center gap-md md:[padding:_0_clamp(2em,5vw,10em)]">
	<a href="/app/projects/{data.project.id}/milestones">
		<Back
			className="w-8 h-8 min-w-[2rem] min-h-[2rem] aspect-square stroke-grey-700 dark:stroke-grey-200 md:h-10 md:w-10"
		/>
	</a>
	<h1
		class="w-full truncate text-lg text-grey-700 dark:text-grey-200 md:text-xl md:font-semibold"
		contenteditable
		bind:textContent={updatedName}
		on:blur={updateMilestoneName}
	>
		{data.milestone.name}
	</h1>

	<button
		class="button--secondary m-0 border-0 p-0"
		on:click={markMilestoneAsCompleted}
		title={data.milestone.completed ? 'Close milestone' : 'Re-open milestone'}
	>
		{#if !data.milestone.completed}
			<Check className="w-8 h-8 stroke-grey-700 dark:stroke-grey-200" />
		{:else}
			<CloseMultiply className="w-8 h-8 stroke-grey-700 dark:stroke-grey-200" />
		{/if}
		<span class="sr-only">Mark milestone as completed</span>
	</button>
	<button class="button--secondary m-0 border-0 p-0" on:click={() => (showDeleteWarning = true)}>
		<Trash className="w-8 h-8 stroke-grey-700 dark:stroke-grey-200" />
	</button>
</header>

<div
	class="mt-md flex flex-col-reverse items-start gap-lg md:mt-xl md:flex-row md:[padding:_0_clamp(2em,5vw,10em)]"
>
	<div
		class="w-full rounded-xl bg-grey-100 p-lg shadow shadow-grey-700 dark:bg-grey-800 dark:shadow-grey-600 md:w-fit"
	>
		<div
			class="relative mx-auto flex aspect-square h-32 w-32 flex-col items-center justify-center gap-sm rounded-full md:mx-0"
		>
			<div class="absolute">
				<svg class="h-32 w-32">
					<circle
						cx="64"
						cy="64"
						class="fill-none stroke-grey-200 dark:stroke-grey-700"
						stroke-width="8"
						r="60"
					/>
					<circle
						cx="64"
						cy="64"
						r="60"
						class="fill-none stroke-accent-light transition-all duration-300 ease-in"
						stroke-dashoffset={strokeArray - (strokeArray * percentCompleted) / 100}
						stroke-dasharray={strokeArray}
						stroke-linecap="round"
						stroke-width="8"
						transform="rotate(-90 64 64)"
					/>
				</svg>
			</div>
			<span class="font-bold text-grey-700 dark:text-grey-200">{percentCompleted}%</span>
			<span class="font-medium text-grey-700 dark:text-grey-200">Completed</span>
		</div>
	</div>
	<div class="w-full">
		<div
			class="mb-sm flex flex-col items-start gap-sm md:mb-0 md:flex-row md:items-center md:gap-0"
		>
			<div class="flex items-center gap-sm">
				<button class="flex items-center gap-sm" on:click={() => startDateInput.showPicker()}>
					<input
						type="date"
						class="hidden"
						bind:this={startDateInput}
						bind:value={updatedStartDate}
						on:change={updateMilestoneStartDate}
					/>
					<Calendar className="h-8 w-8 stroke-accent-light" />
					<span class="font-medium text-grey-700 dark:text-grey-300">{formattedStartDate}</span>
					<span class="sr-only">Click to update the start date of this milestone</span>
				</button>
				<Back className="w-8 h-8 stroke-grey-700 dark:stroke-grey-300 rotate-180" />
				<button class="flex items-center gap-sm" on:click={() => endDateInput.showPicker()}>
					<input
						type="date"
						class="hidden"
						bind:this={endDateInput}
						bind:value={updatedEndDate}
						on:change={updateMilestoneEndDate}
					/>
					<Target className="h-8 w-8 stroke-accent-light" />
					<span class="font-medium text-grey-700 dark:text-grey-300">{formattedEndDate}</span>
					<span class="sr-only">Click to update the end date of this milestone</span>
				</button>
			</div>

			<div class="md:ml-auto">
				{#if data.milestone.leader}
					<!--TODO: Display milestone lead profile picture  -->
					<div class="flex items-center gap-md">
						<span class="font-medium text-grey-700 dark:text-grey-300">Milestone lead</span>
						{#if data.milestone.leader_profile}
							<img
								class="h-8 w-8 rounded-full object-cover"
								src={data.milestone.leader_profile}
								alt="Milestone leader"
							/>
						{:else}
							<User className="h-8 w-8 stroke-grey-700 dark:stroke-grey-300" />
						{/if}
					</div>
				{:else}
					<div class="md:relative">
						<button
							class="button--text m-0 flex items-center gap-md p-0"
							on:click={() => (showAddLead = true)}
						>
							<PlusNew className="h-6 w-6 stroke-grey-700 dark:stroke-grey-300" />
							<span class="sr-only">Add a milestone leader</span>
							<span class="font-medium text-grey-700 dark:text-grey-300">Milestone leader</span>
						</button>
						{#if showAddLead}
							<AddLead
								invited_users={data.project.invited_people}
								bind:milestoneLead={newMilestoneLead}
								bind:shown={showAddLead}
							/>
						{/if}
					</div>
				{/if}
			</div>
		</div>
		{#if data.milestone.description}
			<p
				class="font-medium text-grey-700 dark:text-grey-300"
				contenteditable
				bind:textContent={updatedDescription}
				on:blur={updateMilestoneDescription}
			>
				{data.milestone.description}
			</p>
		{:else}
			<textarea
				bind:value={updatedDescription}
				on:blur={updateMilestoneDescription}
				placeholder="Enter a description"
				class="border-1 m-0 h-36 w-full resize-none rounded-md border-dashed border-grey-700 bg-white p-2 text-sm font-medium text-grey-700 dark:border-grey-300 dark:bg-grey-900 dark:text-grey-300 dark:placeholder:text-grey-300"
			/>
		{/if}
	</div>
</div>

<section class="mt-md md:mt-lg md:flex-row md:[padding:_0_clamp(2em,5vw,10em)]">
	<header class="mb-md flex items-center">
		<h2 class="text-md font-semibold text-grey-800 dark:text-grey-200 md:text-lg">Tasks</h2>

		<div class="relative ml-auto">
			<button on:click={() => (showAddTaskDropdown = true)}>
				<PlusNew className="w-8 h-8 stroke-grey-700 dark:stroke-grey-200" />
			</button>
			{#if showAddTaskDropdown}
				<AddTask milestoneId={data.milestone.id} bind:show={showAddTaskDropdown} />
			{/if}
		</div>
	</header>

	<div
		class="flex flex-col gap-md {data.milestone.tasks
			? 'rounded-xl bg-none md:bg-grey-100 md:p-lg md:dark:bg-grey-800'
			: ''}"
	>
		{#each tasks as task}
			<MilestoneTask {...task} />
		{:else}
			<p class="font-semibold text-grey-700 dark:text-grey-300">
				There are no tasks associated with this milestone.
			</p>
		{/each}
	</div>
</section>

<section class="mt-md md:mt-lg md:flex-row md:[padding:_0_clamp(2em,5vw,10em)]">
	<header class="mb-md flex items-center">
		<h2 class="text-md font-semibold text-grey-800 dark:text-grey-200 md:text-lg">Roadmap</h2>

		<button class="ml-auto" on:click={() => (showCreateRoadmapItem = !showCreateRoadmapItem)}>
			<PlusNew className="w-8 h-8 stroke-grey-700 dark:stroke-grey-200" />
		</button>
	</header>

	{#if showCreateRoadmapItem}
		<section class="mb-lg">
			<header class="mb-sm">
				<h3 class="font-semibold text-grey-800 dark:text-grey-200 md:text-md">Create a new item</h3>
			</header>
			<form
				method="POST"
				use:enhance={() => {
					return async ({ result }) => {
						if (result.type === 'failure') {
							toast.error(`Failed to create new item: ${result.data.errMsg}`);
						} else if (result.type === 'success') {
							toast.success('Successfully created roadmap item');
							invalidate('milestone:open');
						}
					};
				}}
			>
				<input
					type="text"
					class="input--text w-full md:w-1/2"
					placeholder="What should happen on this date?"
					name="name"
				/>
				<textarea
					name="description"
					id="description-input"
					class="input--text mt-sm h-36 w-full resize-none"
					placeholder="Write a simple description on what needs to happen."
				/>

				<label for="target-date-input" class="input--label mt-sm">What is the target?</label>
				<input type="date" id="target-date-input" class="input--text mt-sm" name="target-date" />

				<div class="mt-md flex w-full items-center justify-center gap-md">
					<button class="button--primary">Create</button>
					<button
						class="button--secondary"
						type="button"
						on:click={() => (showCreateRoadmapItem = false)}>Cancel</button
					>
				</div>
			</form>
		</section>
	{/if}

	<div class="flex flex-col gap-sm">
		{#each data.milestone.roadmap as item}
			<RoadmapItem {...item} />
		{:else}
			<p class="font-semibold text-grey-700 dark:text-grey-300">
				There are not important dates for this milestone.
			</p>
		{/each}
	</div>
</section>

<ConfirmDelete bind:shown={showDeleteWarning} name={data.milestone.name} id={data.milestone.id} />
