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

	let milestones: Milestone[] = [];

	const updateMilestone = async (id: string) => {
		await supabase.from('tasks').update({ milestone: id }).eq('id', taskId);
		invalidate('project:list');
		shown = false;
	};

	onMount(async () => {
		const { data } = await supabase.from('milestones').select().eq('project', projectId);
		milestones = data ?? [];
	});
</script>

<div class="dropdown--container z-50">
	{#if milestoneId}
		<button class="dropdown--item"><span class="dropdown--label">Remove milestone</span></button>
	{/if}

	<input type="search" class="input--text" placeholder="Search for a milestone" />

	{#each milestones as milestone}
		<button class="dropdown--item" on:click={() => updateMilestone(milestone.id)}>
			{#if milestone.id === milestoneId}
				<Check className="dropdown--icon" />
			{/if}
			<span class="dropdown--label">{milestone?.name}</span>
		</button>
	{/each}
</div>
