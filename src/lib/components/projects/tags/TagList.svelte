<script lang="ts">
	import { onMount } from 'svelte';
	import TagItem from './TagItem.svelte';

	export let tags: string[];
	onMount(() => {
		try {
			tags = JSON.parse(tags.toString());
		} catch {}
	});
</script>

<div class="mb-md flex flex-wrap gap-md">
	{#each tags as tag}
		<TagItem {tag} />
	{/each}
</div>
