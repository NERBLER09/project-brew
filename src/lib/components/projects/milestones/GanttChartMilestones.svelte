<script lang="ts">
	import Gantt from 'frappe-gantt';
	import { onMount } from 'svelte';

	export let milestones = [];

	let ganttContainer;

	onMount(() => {
		let roadmaps = milestones.map((item) => item.roadmap);
		let milestonesList = milestones.map((item) => {
			return {
				id: item.id,
				name: item.name,
				start: item.start_date,
				end: item.end_date
			};
		});

		let roadmapsList = roadmaps.map((item) => {
			if (item[0]) {
				let endDate = new Date(item[0].target) ?? item[0].target;
				endDate.setDate(endDate.getDate() + 1);
				let endDateTxt = endDate.toISOString().split('T');
				console.log(endDateTxt);
				return {
					id: item[0].id,
					name: item[0].name,
					start: item[0].target,
					end: endDateTxt[0]
				};
			} else {
				return [];
			}
		});
		console.log(roadmapsList);
		milestonesList.push(...roadmapsList);
		console.log(milestonesList);

		new Gantt(ganttContainer, milestonesList, {
			readonly: true
		});
	});
</script>

<div bind:this={ganttContainer} class="mb-md h-fit" />
