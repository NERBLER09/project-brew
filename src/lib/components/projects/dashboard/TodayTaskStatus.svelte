<script lang="ts">
	import type { Task } from '$lib/types/projects';
	import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale } from 'chart.js';
	import { Doughnut } from 'svelte-chartjs';

	export let today: Task[];
	let done = today.filter((item) => item.status === 'done');
	let doing = today.filter((item) => item.status === 'doing');
	let todo = today.filter((item) => item.status === 'todo');
	let other = today.filter((item) => item.status === 'other');

	const data = {
		labels: ['Done', 'Doing', 'To-Do', 'Other'],
		datasets: [
			{
				data: [done.length, doing.length, todo.length, other.length],
				backgroundColor: ['#34d399', '#fb923c', '#f87171', '#495057']
			}
		]
	};

	ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);
</script>

<section>
	<div class="mx-auto h-48 w-48 md:mx-0">
		<Doughnut
			{data}
			options={{
				responsive: true,
				font: { size: 16, family: "'Inter', sans-serif", weight: '500' },
				color: '#495057',
				plugins: {
					legend: {
						position: 'bottom'
					}
				}
			}}
		/>
	</div>
</section>
