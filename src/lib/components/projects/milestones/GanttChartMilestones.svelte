<script lang="ts">
	import Gantt from 'frappe-gantt';
	import { onMount } from 'svelte';

	export let milestones = [];

	let ganttContainer;

	onMount(() => {
		let milestonesList = milestones.map((item) => {
			return {
				id: item.id,
				name: item.name,
				start: item.start_date,
				end: item.end_date
			};
		});

		new Gantt(ganttContainer, milestonesList, {
			readonly: true
		});
	});
</script>

<div bind:this={ganttContainer} class="mb-md h-fit" />
