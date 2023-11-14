<script lang="ts">
	import TagItem from './TagItem.svelte';

	export let tags: string[];
	tags = tags ?? [];
</script>

<div class="mb-sm flex flex-wrap gap-md">
	{#each tags as tag}
		<TagItem {tag} />
	{/each}
</div>
