<script lang="ts">
	import TagItem from './TagItem.svelte';

	export let tags: string[];
</script>

<div class="mb-md flex flex-wrap gap-md">
	{#each tags as tag}
		<TagItem {tag} />
	{/each}
</div>
