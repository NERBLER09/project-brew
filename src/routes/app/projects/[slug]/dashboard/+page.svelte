<script lang="ts">
	import { showProjectAside } from '$lib/stores/project';
	import { onDestroy, onMount } from 'svelte';

	onMount(() => {
		$showProjectAside = false;
	});

	onDestroy(() => {
		$showProjectAside = true;
	});
</script>
