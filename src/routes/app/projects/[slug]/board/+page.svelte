<script lang="ts">
	import { dndzone } from 'svelte-dnd-action';
	import { disableDrag, showAboutProjectPrompt } from '$lib/stores/ui';

	import PlusNew from '$lib/assets/Plus-New.svelte';
	import List from '$lib/components/projects/list/List.svelte';
	import AboutProject from '$lib/components/prompts/about/AboutProject.svelte';
	import NewList from '$lib/components/form/forms/NewList.svelte';
	import type { PageData } from './$types';
	import { supabase } from '$lib/supabase';
	import { userData } from '$lib/stores/user';
	import { invalidate } from '$app/navigation';
	import { userRole } from '$lib/stores/team';

	export let data: PageData;

	let createNewList = false;

	const handleDnd = async (event) => {
		data.lists = event.detail.items;
		const found = data?.lists.find((list) => list.id === event.detail.info.id);
		if (!data?.lists.includes(found) && found) return;

		await supabase
			.from('lists')
			.update({
				project: data.project?.id,
				user_id: $userData.id,
				position: data.lists?.indexOf(found)
			})
			.eq('id', event.detail.info.id);
	};

	supabase
		.channel('any')
		.on('postgres_changes', { event: '*', schema: 'public', table: 'tasks' }, (payload) => {
			invalidate('project:board');
		})
		.subscribe();
</script>

<svelte:head>
	<title>{data.name}</title>
</svelte:head>

<section
	class="relative flex flex-nowrap items-start gap-lg pb-4 md:gap-2xl"
	use:dndzone={{
		items: data.lists,
		type: 'list',
		flipDurationMs: 300,
		dragDisabled: $disableDrag || $userRole === 'viewer'
	}}
	on:finalize={handleDnd}
	on:consider={handleDnd}
>
	{#each data.lists as list (list.id)}
		<List name={list.list_name} id={list.id} status={list.status} dbTasks={data.project.tasks} />
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
