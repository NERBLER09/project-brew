<script lang="ts">
	import Check from '$lib/assets/Check.svelte';
	import PlusNew from '$lib/assets/Plus-New.svelte';
	import Trash from '$lib/assets/Trash.svelte';
	import { currentProject } from '$lib/stores/project';
	import { supabase } from '$lib/supabase';

	export let taskTags: string[] = [];
	export let taskId;
	export let projectId;
	export let shown: boolean = false;
	let tags = taskTags ?? [];
	let projectTags = $currentProject.project_tags;

	const updateTags = async (tag: string) => {
		console.log('called');
		if (tags.includes(tag)) {
			const index = tags.indexOf(tag, 1);
			tags.splice(index, 1);
		} else {
			tags.push(tag);
		}
		tags = tags;
		taskTags = tags;
		await supabase.from('tasks').update({ tags: tags }).eq('id', taskId);
	};

	let newProjectTag = '';
	const addNewProjectTags = async (name: string) => {
		let tags = [name, ...projectTags];
		projectTags = tags;
		await supabase.from('projects').update({ project_tags: tags }).eq('id', projectId);
	};
	const deleteProjectTag = async (name: string) => {
		const index = projectTags.indexOf(name);
		projectTags.splice(index, 1);
		let tags = projectTags;
		projectTags = tags;
		await supabase.from('projects').update({ project_tags: tags }).eq('id', projectId);
	};
</script>

<div
	class="dropdown--container fixed top-[3ch] w-full -translate-x-[24px] translate-y-[calc(100vh-178px)] md:absolute md:left-0 md:translate-x-0 md:translate-y-0"
>
	<form
		class="input--text m-0 flex w-full flex-row flex-nowrap items-center p-0"
		on:submit|preventDefault={() => addNewProjectTags(newProjectTag)}
	>
		<input
			type="text"
			class="input--text m-0 w-full"
			bind:value={newProjectTag}
			placeholder="New tag name"
		/>
		<button>
			<PlusNew className="stroke-grey-700 dark:stroke-grey-300 w-6 h-6 mr-md" />
		</button>
	</form>
	{#each projectTags as tag}
		<div class="flex flex-row gap-md">
			<button on:click={() => deleteProjectTag(tag)}>
				<Trash className="stroke-grey-700 dark:stroke-grey-300 w-6 h-6" />
			</button>

			<button class="dropdown--item" on:click={() => updateTags(tag)}>
				<span class="dropdown--label">{tag}</span>
				{#if tags?.includes(tag)}
					<Check className="dropdown--icon" />
				{/if}
			</button>
		</div>
	{/each}
</div>
