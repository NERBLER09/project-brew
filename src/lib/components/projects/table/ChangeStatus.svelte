<script lang="ts">
	import { supabase } from '$lib/supabase';
	import pkg from 'lodash';
	const { startCase } = pkg;
	import { onMount } from 'svelte';

	export let taskId: number;
	export let projectId: number;
	export let shown = false;

	let listStatus = [];

	const changeStatus = async (status: string) => {
		await supabase.from('tasks').update({ status }).eq('id', taskId);
		shown = false;
	};

	onMount(async () => {
		const { data, error } = await supabase.from('lists').select('status').eq('project', projectId);
		listStatus = data?.map((item) => item.status) ?? [];
	});
</script>

<div class="dropdown--container top-0 z-50">
	{#each listStatus as status}
		<button class="dropdown--item" on:click={() => changeStatus(status)}
			><span class="dropdown--label">{startCase(status)}</span></button
		>
	{/each}
</div>
