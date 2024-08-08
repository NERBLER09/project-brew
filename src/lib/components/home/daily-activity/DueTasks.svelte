<script lang="ts">
	export let tasks;
	const date = new Date();
	const today = date.toISOString().split('T')[0];
	const dueTasks = tasks.filter((item) => {
		console.log(item.due_date);
		console.log(today);
		return item.due_date === today;
	});

	console.log(dueTasks);
</script>

<div class="col-span-5 row-start-2 lg:col-span-2 lg:col-start-3 lg:row-start-1">
	{#each dueTasks as task}
		<div>{task.name}</div>
	{/each}
</div>
