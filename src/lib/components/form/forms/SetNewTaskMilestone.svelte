<script lang="ts">
	import Check from '$lib/assets/Check.svelte';
	import Trash from '$lib/assets/Trash.svelte';
	import { projectMilestones } from '$lib/stores/project';
	import { supabase } from '$lib/supabase';
	import { onMount } from 'svelte';

	interface Milestone {
		description: string | null;
		end_date: string | null;
		id: string;
		name: string;
		owner: string | null;
		project: number;
		start_date: string;
		leader?: string | null;
	}

	export let milestoneId: string | null;
	export let projectId: number;
	export let shown = false;
	export let selectedMilestone: object | null = {};

	let search = '';

	let milestones: Milestone[] = [];
	let searchedMilestones = milestones;

	const handleSearch = () => {
		searchedMilestones = milestones.filter((item) =>
			item.name.toLowerCase().includes(search.toLowerCase())
		);
	};

	const updateMilestone = async (id: string, milestone) => {
		milestoneId = id;
		selectedMilestone = milestone;
		shown = false;
	};

	const handleRemoveMilestone = async () => {
		milestoneId = null;
		selectedMilestone = null;
		shown = false;
	};

	onMount(async () => {
		searchedMilestones = $projectMilestones;
	});
</script>

<div class="dropdown--container right-0 z-50 md:top-6">
	{#if milestoneId}
		<button class="dropdown--item" on:click={handleRemoveMilestone} type="button">
			<Trash className="dropdown--icon" />
			<span class="dropdown--label">Remove milestone</span></button
		>
	{/if}

	<input
		type="search"
		class="input--text"
		placeholder="Search for a milestone"
		bind:value={search}
		on:change={handleSearch}
	/>

	{#each searchedMilestones as milestone}
		<button
			class="dropdown--item"
			type="button"
			on:click={() => updateMilestone(milestone.id, milestone)}
		>
			{#if milestone.id === milestoneId}
				<Check className="dropdown--icon" />
			{/if}
			<span class="dropdown--label">{milestone?.name}</span>
		</button>
	{/each}
</div>
