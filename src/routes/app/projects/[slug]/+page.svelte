<script lang="ts">
	import { deserialize } from '$app/forms';
	import { invalidate } from '$app/navigation';
	import { currentProject } from '$lib/stores/project';
	import { dndzone } from 'svelte-dnd-action';

	import Back from '$lib/assets/Arrow/Back.svelte';
	import CircleInfo from '$lib/assets/Circle-Info.svelte';
	import CloseMultiply from '$lib/assets/Close-Multiply.svelte';
	import MoreHorizontal from '$lib/assets/More Horizontal.svelte';
	import PlusNew from '$lib/assets/Plus-New.svelte';
	import ProjectDropdown from '$lib/components/dropdowns/projects/ProjectDropdown.svelte';
	import List from '$lib/components/projects/list/List.svelte';
	import AboutProject from '$lib/components/prompts/about/AboutProject.svelte';
	import Description from '$lib/components/text/Description.svelte';

	import type { ActionData, PageData } from './$types';

	export let data: PageData;
	currentProject.set(data);

	let showAboutPrompt = false;
	let showProjectDropdown = false;

	let createNewList = false;
	let newListName = '';
	let newListStatus = 'other';

	const handleCreateNewList = async (event) => {
		createNewList = false;
		const form = new FormData(this);
		form.append('list-name', newListName);
		form.append('list-status', newListStatus);
		form.append('project-id', data.id);

		const response = await fetch('/app/projects/{data.id}?/newList', {
			method: 'POST',
			body: form
		});

		const result: ActionData = deserialize(await response.text());

		if (result?.type === 'success') {
			invalidate('app:project');
		}
	};

	const handleDnd = (event) => {
		data.lists = event.detail.items;
	};
</script>

<svelte:head>
	<title>{data.name}</title>
</svelte:head>

<header
	class="min-h-[13.5rem] object-cover bg-origin-border bg-center bg-cover rounded-b-3xl relative -top-6 -left-6 p-6 w-[calc(100%+48px)] md:-top-8 md:-left-8 md:w-[calc(100%+64px)] md:p-8"
	style="background-image: url({data.banner});"
>
	<div class="flex items-center mb-md md:mb-sm md:items-start">
		<a class="flex items-center gap-md" href="/app/projects">
			<Back
				className="w-8 h-8 aspect-square {data.banner
					? 'stroke-grey-200'
					: 'stroke-grey-700'} md:h-10 md:w-10"
			/>
			<h1
				class="w-fit text-lg {data.banner
					? 'text-grey-200'
					: 'text-grey-700'} truncate md:text-xl md:font-semibold"
			>
				{data.name}
			</h1>
		</a>
		<div class="flex items-center gap-md ml-auto">
			<a href="/app/projects/{data.id}/about" class="block md:hidden">
				<CircleInfo className="w-8 h-8 {data.banner ? 'stroke-grey-200' : 'stroke-grey-700'}" />
				<span class="sr-only">View project info</span>
			</a>
			<button class="hidden md:block" on:click={() => (showAboutPrompt = true)}>
				<CircleInfo className="w-8 h-8 {data.banner ? 'stroke-grey-200' : 'stroke-grey-700'}" />
				<span class="sr-only">View project info</span>
			</button>
			<button on:click={() => (showProjectDropdown = !showProjectDropdown)}>
				<MoreHorizontal className="w-8 h-8 {data.banner ? 'stroke-grey-200' : 'stroke-grey-700'}" />
			</button>
		</div>
	</div>
	<div class="flex flex-wrap gap-md mb-md">
		{#each data.tags as tag}
			<div class="bg-grey-200 py-1 px-2 w-fit rounded">
				<span class="text-grey-700 text-sm font-medium">{tag}</span>
			</div>
		{/each}
	</div>

	<Description banner={data.banner} description={data.description} />
</header>

<section
	class="flex flex-nowrap items-start gap-lg overflow-x-auto md:gap-2xl pb-4"
	use:dndzone={{ items: data.lists, type: 'list', flipDurationMs: 300 }}
	on:finalize={handleDnd}
	on:consider={handleDnd}
>
	{#each data.lists as list (list.id)}
		<List name={list.list_name} id={list.id} project_id={list.project} status={list.status} />
	{/each}

	<div class="min-w-[12.5rem] mt-[2.625rem] md:mt-[4.0625rem]">
		{#if createNewList}
			<form on:submit|preventDefault={handleCreateNewList}>
				<button
					class="button--secondary w-full flex items-center gap-md justify-center"
					on:click={() => (createNewList = false)}
					type="button"
				>
					<CloseMultiply className="w-6 h-6 stroke-grey-700" />
					Cancel
				</button>

				<input
					type="text"
					class="input--text mt-md mb-sm w-full"
					placeholder="Enter a list name"
					bind:value={newListName}
				/>

				<div class="mt-sm mb-md">
					<label for="status-input" class="input--label">Select a task status for this list:</label>
					<select
						name="status-input"
						id="status-input"
						class="input--text w-full"
						bind:value={newListStatus}
					>
						<option value="todo">To-do</option>
						<option value="doing">Doing</option>
						<option value="done">Done</option>
						<option value="other" default>Other</option>
					</select>

					<span class="font-medium text-grey-700 text-sm"
						>Selecting a special status can display tasks in a certain way relative to the status.</span
					>
				</div>
				<button
					class="button--primary w-full flex items-center gap-md justify-center"
					type="submit"
				>
					<PlusNew className="w-6 h-6 stroke-grey-200" />
					Create list
				</button>
			</form>
		{:else}
			<button
				class="button--primary w-full flex items-center gap-md justify-center"
				on:click={() => (createNewList = true)}
			>
				<PlusNew className="w-6 h-6 stroke-grey-200" />
				New List
			</button>
		{/if}
	</div>
</section>

<AboutProject shown={showAboutPrompt} />

{#if showProjectDropdown}
	<ProjectDropdown bind:visibility={showProjectDropdown} projectId={data.id} />
{/if}
