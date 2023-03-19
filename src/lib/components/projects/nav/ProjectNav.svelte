<script lang="ts">
	import DashboardHome from '$lib/assets/DashboardHome.svelte';
	import List from '$lib/assets/List.svelte';
	import Milestone from '$lib/assets/Milestone.svelte';
	import Roadmap from '$lib/assets/Roadmap.svelte';
	import Stack from '$lib/assets/Stack.svelte';
	import Item from './Item.svelte';
</script>

<nav class="flex items-center gap-md overflow-scroll">
	<Item name="Dashboard" page="#" icon={DashboardHome} />
	<Item name="Milestones" page="#" icon={Milestone} />
	<Item name="Board" page="#" icon={Stack} />
	<Item name="List" page="#" icon={List} />
	<Item name="Roadmap" page="#" icon={Roadmap} />
</nav>
