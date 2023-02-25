<script lang="ts">
	import { onMount } from 'svelte';
	import TagItem from './TagItem.svelte';

	export let tags: string | string[];
	let formattedTags: string[] = [];
	onMount(() => {
		try {
			// tags = tags.toString().replace('', '');
			formattedTags = JSON.parse(tags.toString());
		} catch {
			formattedTags = tags;
		}
		console.log(formattedTags);
	});
</script>

<div class="mb-md flex flex-wrap gap-md">
	{#each formattedTags as tag}
		<TagItem {tag} />
	{/each}
</div>
