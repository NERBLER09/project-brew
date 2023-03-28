<script lang="ts">
	import { invalidate } from '$app/navigation';
	import Back from '$lib/assets/Arrow/Back.svelte';
	import Calendar from '$lib/assets/Calendar.svelte';
	import PlusNew from '$lib/assets/Plus-New.svelte';
	import Target from '$lib/assets/Target.svelte';
	import { currentProject } from '$lib/stores/project';
	import { supabase } from '$lib/supabase';
	import type { PageData } from './$types';

	export let data: PageData;

	let startDate = new Date(data.milestone.start_date).toLocaleDateString('en-US', {
		month: 'short',
		day: 'numeric'
	});
	let endDate = new Date(data.milestone?.end_date).toLocaleDateString('en-US', {
		month: 'short',
		day: 'numeric'
	});

	let updatedName = data.milestone.name;
	let updatedDescription = data.milestone.description;
	let updatedStartDate: Date = new Date();
	let startDateInput: HTMLInputElement;
	let updatedEndDate: Date = new Date();
	let endDateInput: HTMLInputElement;

	const updateMilestoneName = async () => {
		if (updatedName === data.milestone.name) return;
		else if (!updatedName) {
			updatedName = data.milestone.name;
			return;
		}
		await supabase
			.from('milestones')
			.update({ name: updatedName })
			.eq('project', $currentProject.id);
		invalidate('milestone:open');
	};

	const updateMilestoneDescription = async () => {
		if (updatedDescription === data.milestone.description) return;

		await supabase
			.from('milestones')
			.update({ description: updatedDescription })
			.eq('project', $currentProject.id);

		invalidate('milestone:open');
	};

	const updateMilestoneStartDate = async () => {
		await supabase
			.from('milestones')
			.update({ start_date: new Date(updatedStartDate).toISOString() })
			.eq('project', $currentProject.id);

		invalidate('milestone:open');
		startDate = new Date(data.milestone.start_date).toLocaleDateString('en-US', {
			month: 'short',
			day: 'numeric'
		});
	};

	const updateMilestoneEndDate = async () => {
		await supabase
			.from('milestones')
			.update({ start_date: new Date(updatedEndDate).toISOString() })
			.eq('project', $currentProject.id);

		invalidate('milestone:open');
		endDate = new Date(data.milestone?.end_date).toLocaleDateString('en-US', {
			month: 'short',
			day: 'numeric'
		});
	};

	let strokeArray = 380;
	let percentCompleted = 100;
</script>

<svelte:head>
	<title>{data.milestone.name}</title>
</svelte:head>

<header class="flex items-center gap-md lg:px-80">
	<a href="/app/projects/{$currentProject.id}/milestones">
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
</header>

<div class="mt-md flex flex-col-reverse items-start gap-lg md:mt-xl md:flex-row lg:px-80">
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
	<div>
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
				<span class="font-medium text-grey-700 dark:text-grey-300">{startDate}</span>
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
				<span class="font-medium text-grey-700 dark:text-grey-300">{endDate}</span>
				<span class="sr-only">Click to update the end date of this milestone</span>
			</button>
		</div>
		<p
			class="font-medium text-grey-700 dark:text-grey-300"
			contenteditable
			bind:textContent={updatedDescription}
			on:blur={updateMilestoneDescription}
		>
			{data.milestone.description}
		</p>
	</div>
</div>

<section class="mt-md md:mt-lg lg:px-80">
	<header class="flex items-center">
		<h2 class="text-md font-semibold text-grey-800 dark:text-grey-200 md:text-lg">Tasks</h2>

		<PlusNew className="w-8 h-8 stroke-grey-700 dark:stroke-grey-200 ml-auto" />
	</header>

	<div class="flex flex-col gap-md">
		{#each data.milestone.tasks as task}
			<span>{task.name}</span>
		{:else}
			<p class="font-semibold text-grey-700 dark:text-grey-300">
				There are no tasks associated with this milestone.
			</p>
		{/each}
	</div>
</section>
