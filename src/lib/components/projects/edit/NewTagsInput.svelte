<script lang="ts">
	import CloseMultiply from "$lib/assets/Close-Multiply.svelte";
	import PlusNew from "$lib/assets/Plus-New.svelte";
	import Trash from "$lib/assets/Trash.svelte";


	let addNewTag = false;
	let tagName = '';
	export let newTags: string[] = [];

	const handleCreateNewTag = () => {
		newTags = [...newTags, tagName];
		tagName = '';
		addNewTag = false;
	};

	const handleRemoveTag = (tag: string) => {
		const index = newTags.indexOf(tag);
		newTags.splice(index, 1);
		newTags = [...newTags];
	};
</script>

{#each newTags as tag}
	<div class="bg-grey-200 py-2 px-3 w-fit rounded flex items-center">
		<span class="text-grey-700 font-medium">{tag}</span>
		<button on:click={() => handleRemoveTag(tag)}>
			<Trash className="w-6 h-6 stroke-grey-700" />
			<span class="sr-only">Remove {tag} tag</span>
		</button>
	</div>
{/each}

{#if addNewTag}
	<form on:submit={handleCreateNewTag} class="flex items-center gap-sm ml-auto">
		<input
			type="text"
			class="input--text w-36"
			placeholder="Tag name"
			bind:value={tagName}
			required
		/>
		<button type="submit">
			<PlusNew className="h-8 w-8 stroke-grey-700" />
			<span class="sr-only">Add new tag</span>
		</button>
		<button type="button" class="ml-sm" on:click={() => (addNewTag = false)}>
			<CloseMultiply className="h-8 w-8 stroke-grey-700" />
			<span class="sr-only">Cancel</span>
		</button>
	</form>
{:else}
	<button type="button" on:click={() => (addNewTag = true)} class="ml-auto">
		<PlusNew className="h-8 w-8 stroke-grey-700" />
		<span class="sr-only">Add new tag</span>
	</button>
{/if}
