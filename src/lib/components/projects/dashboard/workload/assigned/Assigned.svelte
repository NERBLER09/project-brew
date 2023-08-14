<script lang="ts">
	import type { Task } from '$lib/types/projects';
	import lodash from 'lodash';
	const { flattenDepth } = lodash;
	import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale } from 'chart.js';
	import { Doughnut } from 'svelte-chartjs';

	export let tasks: Task[];
	export let invitedUserIds: string[];
	export let invitedUserNames: string[];

	let assignedTaskAmount: number[] = [];
	let tasksWithAssignedUsers = flattenDepth(tasks.map((item) => item.assigned));

	for (const id of invitedUserIds) {
		assignedTaskAmount = [
			tasksWithAssignedUsers.filter((item) => item?.includes(id)).length,
			...assignedTaskAmount
		];
	}

	const data = {
		labels: invitedUserNames,
		datasets: [
			{
				data: assignedTaskAmount,
				backgroundColor: [
					'#60a5fa',
					'#f472b6',
					'#fb923c',
					'#fde047',
					'#f87171',
					'#34d399',
					'#c084fc'
				]
			}
		]
	};

	ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);
</script>

<Doughnut
	{data}
	options={{
		responsive: false,
		font: { size: 16, family: "'Inter', sans-serif", weight: '500' },
		color: '#495057',
		plugins: {
			legend: {
				position: 'bottom'
			}
		}
	}}
/>
