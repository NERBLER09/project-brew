<script lang="ts">
	import { invalidate } from '$app/navigation';
	import Check from '$lib/assets/Check.svelte';
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
	export let taskId: number;
	export let projectId: number;
	export let shown = false;
	export let positioning: string = '';
	export let milestoneName: string = '';

	let search = '';

	let milestones: Milestone[] = [];
	let searchedMilestones = milestones;

	const handleSearch = () => {
		searchedMilestones = milestones.filter((item) =>
			item.name.toLowerCase().includes(search.toLowerCase())
		);
	};

	const updateMilestone = async (id: string, name: string) => {
		await supabase.from('tasks').update({ milestone: id }).eq('id', taskId);
		invalidate('project:list');
		milestoneName = name;
		shown = false;
	};

	const handleRemoveMilestone = async () => {
		await supabase.from('tasks').update({ milestone: null }).eq('id', taskId);
		invalidate('project:list');
		milestoneId = null;
		milestoneName = null;
		shown = false;
	};

	onMount(async () => {
		const { data } = await supabase.from('milestones').select().eq('project', projectId);
		milestones = data ?? [];
		searchedMilestones = milestones;
	});
</script>

<div class="dropdown--container z-50 {positioning}">
	{#if milestoneId}
		<button class="dropdown--item" on:click={handleRemoveMilestone}
			><span class="dropdown--label">Remove milestone</span></button
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
		<button class="dropdown--item" on:click={() => updateMilestone(milestone.id, milestone.name)}>
			{#if milestone.id === milestoneId}
				<Check className="dropdown--icon" />
			{/if}
			<span class="dropdown--label">{milestone?.name}</span>
		</button>
	{/each}
</div>
