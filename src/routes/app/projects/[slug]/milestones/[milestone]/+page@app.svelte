<script lang="ts">
	import Back from '$lib/assets/Arrow/Back.svelte';
	import Calendar from '$lib/assets/Calendar.svelte';
	import Target from '$lib/assets/Target.svelte';
	import MobileSubPageLayout from '$lib/components/layouts/MobileSubPageLayout.svelte';
	import { currentProject } from '$lib/stores/project';
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

	let strokeArray = 380;

	let percentCompleted = 100;
</script>

<svelte:head>
	<title>{data.milestone.name}</title>
</svelte:head>

<MobileSubPageLayout
	pageName={data.milestone.name}
	previousPage="/app/projects/{$currentProject.id}/milestones"
/>

<header>
	<a
		class="hidden items-center gap-md md:flex"
		href="/app/projects/{$currentProject.id}/milestones"
	>
		<Back
			className="w-8 h-8 min-w-[2rem] min-h-[2rem] aspect-square stroke-grey-700 dark:stroke-grey-200 md:h-10 md:w-10"
		/>
		<h1 class="w-full truncate text-xl font-semibold text-grey-700 dark:text-grey-200">
			{data.milestone.name}
		</h1>
	</a>
</header>

<div class="mt-md flex flex-col-reverse items-start gap-lg md:mt-xl md:flex-row">
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
			<div class="flex items-center gap-sm">
				<Calendar className="h-8 w-8 stroke-accent-light" />
				<span class="font-medium text-grey-700 dark:text-grey-300">{startDate}</span>
			</div>
			<Back className="w-8 h-8 stroke-grey-700 dark:stroke-grey-300 rotate-180" />
			<div class="flex items-center gap-sm">
				<Target className="h-8 w-8 stroke-accent-light" />
				<span class="font-medium text-grey-700 dark:text-grey-300">{endDate}</span>
			</div>
		</div>
		<p class="font-medium text-grey-700 dark:text-grey-300">{data.milestone.description}</p>
	</div>
</div>
