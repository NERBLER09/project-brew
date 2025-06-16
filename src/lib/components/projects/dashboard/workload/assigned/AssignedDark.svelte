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
	let tasksWithAssignedUsers = tasks.map((item) => {
		if (item.assigned) {
			return item.assigned;
		}
	});
	tasksWithAssignedUsers = flattenDepth(tasksWithAssignedUsers);

	let unassignedTasks: number = tasksWithAssignedUsers.filter((item) => {
		if (!item?.assigned) return [];
	}).length;

	for (const id of invitedUserIds) {
		assignedTaskAmount = [
			tasksWithAssignedUsers.filter((item) => item?.includes(id)).length,
			...assignedTaskAmount
		];
	}

	if (!invitedUserNames.includes('Unassigned')) {
		assignedTaskAmount.push(unassignedTasks);
		invitedUserNames.push('Unassigned');
		invitedUserNames.pop();
	}

	const data = {
		labels: invitedUserNames,
		datasets: [
			{
				data: assignedTaskAmount,
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
