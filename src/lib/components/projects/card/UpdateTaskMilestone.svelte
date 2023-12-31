<script lang="ts">
	import Check from '$lib/assets/Check.svelte';
	import PlusNew from '$lib/assets/Plus-New.svelte';
	import Trash from '$lib/assets/Trash.svelte';
	import { currentProject, projectMilestones } from '$lib/stores/project';
	import { supabase } from '$lib/supabase';
	import { onMount } from 'svelte';

	export let currentMilestone: string | null;
	export let shown: boolean;
	export let taskId: Number;
	export let milestone: object;

	let allMilestones: any[] = [];
	let search = '';

	$: unfilteredMilestone = allMilestones.filter((item) =>
		item.name.toLowerCase().includes(search.toLowerCase())
	);

	onMount(async () => {
		allMilestones = $projectMilestones ?? [];
		allMilestones = allMilestones.filter((item) => !item.completed);
	});

	const updateProjectMilestone = async (id: string, newMilestone: object) => {
		await supabase.from('tasks').update({ milestone: id }).eq('id', taskId);
		currentMilestone = id;
		milestone = newMilestone;
		shown = false;
	};

	const removeMilestone = async () => {
		await supabase.from('tasks').update({ milestone: null }).eq('id', taskId);
		currentMilestone = null;
		shown = false;
		milestone = null;
	};
</script>

<div
	class="absolute right-0 z-50 max-h-72 overflow-scroll rounded-lg bg-grey-100 p-2 shadow shadow-grey-700 dark:bg-grey-800"
>
	<span class="sr-only">Add this task to a milestone</span>
	<input type="search" class="input--text" placeholder="Search for a task" bind:value={search} />

	<div class="mt-md flex flex-col items-start gap-sm">
		{#each unfilteredMilestone as milestone}
			<div class="flex w-full items-center">
				<button
					class="flex w-full items-center"
					on:click={() => updateProjectMilestone(milestone.id)}
				>
					<span class="sr-only">Add this task to {milestone.name}</span>
					{#if currentMilestone === milestone.id}
						<Check className="h-8 w-8 stroke-grey-700 dark:stroke-grey-300 mr-sm" />
					{/if}
					<span class="font-bold text-grey-700 dark:text-grey-300">{milestone.name}</span>
					{#if currentMilestone !== milestone.id}
						<PlusNew className="h-8 w-8 stroke-grey-700 dark:stroke-grey-300 ml-auto" />
					{/if}
				</button>
				<button on:click={removeMilestone}>
					<span class="sr-only">Remove from current milestone</span>
					{#if currentMilestone?.id === milestone.id}
						<Trash className="h-8 w-8 stroke-grey-700 dark:stroke-grey-300 ml-auto" />
					{/if}
				</button>
			</div>
		{/each}
	</div>
</div>
