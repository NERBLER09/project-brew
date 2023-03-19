<script lang="ts">
	import { dndzone } from 'svelte-dnd-action';
	import type { PageData } from './$types';
	import { disableDrag, showAboutProjectPrompt } from '$lib/stores/ui';

	import PlusNew from '$lib/assets/Plus-New.svelte';
	import List from '$lib/components/projects/list/List.svelte';
	import AboutProject from '$lib/components/prompts/about/AboutProject.svelte';
	import NewList from '$lib/components/form/forms/NewList.svelte';

	export let data: PageData;

	let createNewList = false;

	const handleDnd = (event) => {
		data.lists = event.detail.items;
	};
</script>

<svelte:head>
	<title>{data.name}</title>
</svelte:head>

<section
	class="relative {!data.banner
		? '-top-8'
		: ''} flex flex-nowrap items-start gap-lg overflow-x-auto pb-4 md:gap-2xl"
	use:dndzone={{ items: data.lists, type: 'list', flipDurationMs: 300, dragDisabled: $disableDrag }}
	on:finalize={handleDnd}
	on:consider={handleDnd}
>
	{#each data.lists as list (list.id)}
		<List name={list.list_name} id={list.id} status={list.status} />
	{/each}

	<div
		class="min-w-[15.625rem] md:min-w-[18.75rem] lg:min-w-[25rem] {data.lists.length === 0
			? ''
			: 'mt-[2.625rem]  md:mt-[4.0625rem]'}"
	>
		{#if createNewList}
			<NewList bind:createNewList />
		{:else}
			<button
				class="button--primary flex w-full items-center justify-center gap-md"
				on:click={() => (createNewList = true)}
				draggable="false"
			>
				<PlusNew className="w-6 h-6 stroke-grey-200" />
				New List
			</button>
		{/if}
	</div>
</section>

<AboutProject bind:shown={$showAboutProjectPrompt} />
