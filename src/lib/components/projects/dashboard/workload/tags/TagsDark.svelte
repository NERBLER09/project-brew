<script lang="ts">
	import type { Task } from '$lib/types/projects';
	import lodash from 'lodash';
	const { flattenDepth, uniq, countBy, values } = lodash;
	import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale } from 'chart.js';
	import { Doughnut } from 'svelte-chartjs';

	export let tasks: Task[];
	let allTags: string[][] | string[] = tasks.map((item) => {
		if (item.status !== 'done' && item.tags) {
			return item.tags ?? [];
		}
	});
	allTags = [...flattenDepth(allTags)];
	allTags = allTags.filter((item) => item !== undefined);
	let tagsAmount = values(countBy(allTags));

	const data = {
		labels: uniq(allTags),
		datasets: [
			{
				data: tagsAmount,
				backgroundColor: [
					'#0ea5e9',
					'#f472b6',
					'#ea580c',
					'#eab308',
					'#dc2626',
					'#059669',
					'#9333ea'
				]
			}
		]
	};

	ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);
</script>

{#if tagsAmount.length > 0}
	<Doughnut
		{data}
		options={{
			responsive: false,
			font: { size: 16, family: "'Inter', sans-serif", weight: '500' },
			color: '#DEE2E6',
			plugins: {
				legend: {
					position: 'bottom'
				}
			},
			borderColor: '#212529'
		}}
	/>
{:else}
	<p class="font-medium text-grey-800 dark:text-grey-200">
		Create tasks with tags to view what tags are being used.
	</p>
{/if}
