<script lang="ts">
	import { goto } from '$app/navigation';

	import CloseMultiply from '$lib/assets/Close-Multiply.svelte';
	import Pause from '$lib/assets/Pause.svelte';
	import PlusNew from '$lib/assets/Plus-New.svelte';
	import { focusMinutes, focusProject } from '$lib/stores/focus';
	import { tasksCompletedThisDay } from '$lib/stores/project';
	import { weeklyActivity } from '$lib/api/activity';

	import { showMobileNav } from '$lib/stores/ui';
	import { supabase } from '$lib/supabase';
	import type { Task } from '$lib/types/projects';
	import { parseInt } from 'lodash';
	import { onMount } from 'svelte';
	import { userData } from '$lib/stores/user';

	let strokeArray = 720;
	let minutes = 0;
	let seconds = 0;
	let duration = 0;

	let countdown: NodeJS.Timer | null;

	$: percent = ((minutes + seconds / 100) / $focusMinutes) * 100;

	const handleCountdown = () => {
		countdown = setInterval(() => {
			duration--;
			minutes = Math.floor(duration / 60);
			seconds = duration % 60;

			if (duration <= 0) {
				clearCountdown();
				if (
					Notification.permission === 'granted' &&
					$userData?.notifcations_settings.push.timerUp
				) {
					new Notification('Your focus timer is up');
				}
			}
		}, 1000);
	};

	const clearCountdown = () => {
		const currentMinutes = parseInt(localStorage.getItem('focusTime') || '0');
		localStorage.setItem('focusTime', ($focusMinutes - minutes + currentMinutes).toString());
		clearInterval(countdown!);
		countdown = null;
	};

	const stopTimer = () => {
		clearCountdown();
		goto('/app/focus');
	};

	$: $showMobileNav = countdown ? false : true;

	let uncompletedTasks: Task[] = [];
	let doneListId: number;

	const getUncompletedTasks = async () => {
		const { data: tasks } = await supabase
			.from('tasks')
			.select('*')
			.eq('project', $focusProject?.id)
			.neq('status', 'done');

		const { data: list } = await supabase
			.from('lists')
			.select('id')
			.eq('project', $focusProject?.id)
			.eq('status', 'done')
			.limit(1)
			.single();
		if (tasks) {
			uncompletedTasks = tasks;
		}
		if (list) {
			doneListId = list.id;
		}
	};

	const handleMarkTaskAsDone = async (id: number, index: number) => {
		const { error } = await supabase
			.from('tasks')
			.update({ status: 'done', list: doneListId })
			.eq('id', id)
			.eq('project', $focusProject?.id);

		console.log(index);
		if (!error) {
			$tasksCompletedThisDay++;
			$weeklyActivity[$weeklyActivity.length - 1].tasksCompleted++;
			localStorage.setItem('tasksCompletedToday', $tasksCompletedThisDay.toString());

			uncompletedTasks = [...uncompletedTasks.splice(index, 1)];
		}
	};

	onMount(async () => {
		duration = $focusMinutes * 60;
		handleCountdown();

		if ($focusProject) {
			await getUncompletedTasks();
		}
	});
</script>

<svelte:head>
	<title>Keep on focusing!</title>
</svelte:head>

<header>
	<h1 class="text-lg text-grey-800 dark:text-grey-100 md:text-2xl">Focus</h1>
</header>

<section class="mx-auto mt-md flex flex-col items-center md:w-3/4 md:max-w-[21.875rem]">
	<div
		class="relative flex aspect-square h-[15.625rem] w-[15.625rem] items-center justify-center gap-sm rounded-full"
	>
		<div class="absolute">
			<svg class="h-[15.625rem] w-[15.625rem]">
				<circle
					cx="125"
					cy="125"
					class="fill-none stroke-grey-200 dark:stroke-grey-700"
					stroke-width="15"
					r="115"
				/>
				<circle
					cx="125"
					cy="125"
					r="115"
					class="fill-none stroke-accent-light transition-all duration-300 ease-in"
					stroke-dashoffset={strokeArray - (strokeArray * percent) / 100}
					stroke-dasharray={strokeArray}
					stroke-linecap="round"
					stroke-width="15"
					transform="rotate(-90 125 125)"
				/>
			</svg>
		</div>
		<!-- Add content here -->
		<div class="flex items-center gap-md">
			<span class="text-center text-lg font-semibold text-grey-700 dark:text-grey-200">
				{minutes < 10 ? '0' : ''}{minutes}</span
			>
			<span class="text-center text-md font-semibold text-grey-700 dark:text-grey-200">:</span>
			<span class="text-center text-lg font-semibold text-grey-700 dark:text-grey-200"
				>{seconds < 10 ? '0' : ''}{seconds}</span
			>
		</div>
	</div>
	<div>
		{#if countdown}
			<button class="button--circle" on:click={clearCountdown}>
				<Pause className="h-6 w-6 stroke-grey-200" />
				<span class="sr-only">Pause focus timer</span>
			</button>
		{:else}
			<button class="button--circle" on:click={handleCountdown}>
				<PlusNew className="h-6 w-6 stroke-grey-200" />
				<span class="sr-only">Resume focus timer</span>
			</button>
		{/if}
		<button class="button--secondary m-md rounded-full bg-none p-md" on:click={stopTimer}>
			<CloseMultiply className="h-6 w-6 stroke-grey-700 dark:stroke-grey-200" />
			<span class="sr-only">Stop focus timer</span>
		</button>
	</div>
	{#if $focusProject}
		<p class="text-md font-semibold text-grey-700 dark:text-grey-200">
			Focusing on {$focusProject?.project_name}
		</p>
	{/if}
</section>

<section class="mx-auto mt-md md:w-3/4 md:max-w-[21.875rem]">
	<header>
		<h2 class="text-md font-semibold text-grey-700 dark:text-grey-200">
			Here is what you need to get done:
		</h2>
		<p class="mt-sm font-medium text-grey-700 dark:text-grey-200">
			Any checked off tasks will be automatically moved and marked as done.
		</p>
	</header>

	<div class="mt-md flex flex-col gap-md">
		{#each uncompletedTasks as task, index}
			<div>
				<label for="{task.id}-item" class="input--label">{task.name}</label>
				<input
					type="checkbox"
					class="input--checkbox"
					id="{task.id}-item"
					on:change={() => handleMarkTaskAsDone(task.id, index)}
				/>
			</div>
		{/each}
	</div>
</section>
