<script lang="ts">
	import Check from '$lib/assets/Check.svelte';
	import CloseMultiply from '$lib/assets/Close-Multiply.svelte';
	import Search from '$lib/assets/Search.svelte';
	import Trash from '$lib/assets/Trash.svelte';
	import { focusProject } from '$lib/stores/focus';
	import { supabase } from '$lib/supabase';
	import type { Projects } from '$lib/types/projects';
	import { onMount } from 'svelte';
	import toast from 'svelte-french-toast';

	export let shown = false;
	let projects: Projects[] = [];
	let dialog: HTMLDialogElement;

	onMount(async () => {
		const { data: session } = await supabase.auth.getUser();
		const { data, error: err } = await supabase
			.from('projects')
			.select()
			.eq('user_id', session?.user?.id);

		const { data: invited, error: err2 } = await supabase
			.from('projects')
			.select()
			.contains('invited_people', [session?.user?.id]);

		if (data && invited) {
			projects = [...data, ...invited];
			unfiltteredList = projects;
		}
	});

	const handleModalStatus = (status: boolean) => {
		if (!dialog) return;
		if (status) {
			shown = true;
			dialog.showModal();
		} else {
			shown = false;
			dialog.close();
		}
	};

	const handleSelectFocusProject = (project: Projects) => {
		$focusProject = project;
		toast.success(`Selected ${project.project_name} as something to focus on`);
		shown = false;
	};

	let unfiltteredList = projects;
	let query = '';
	const handleSearch = () => {
		projects = unfiltteredList?.filter((value) =>
			value?.project_name.toLowerCase().includes(query)
		);
	};

	$: handleModalStatus(shown);
</script>

<dialog
	bind:this={dialog}
	class="h-1/2 w-2/3 rounded-2xl bg-grey-100 p-8 dark:bg-grey-900 xl:h-2/3 xl:w-1/3"
>
	<header class="flex items-center">
		<h2 class="text-lg font-semibold text-grey-800 dark:text-grey-200">Edit pinned projects</h2>
		<button on:click={() => (shown = false)} class="ml-auto">
			<CloseMultiply className="stroke-grey-700 dark:stroke-grey-200 w-12 h-12" />
		</button>
	</header>
	<p class="pt-sm font-medium text-grey-700 dark:text-grey-200">
		Select a project that you want to focus on for this session
	</p>
	<div class="input--search my-md p-md">
		<Search className="stroke-grey-700 w-6 h-6" />
		<input
			type="text"
			placeholder="Search for a project"
			class="w-full border-none bg-grey-200 p-0"
			bind:value={query}
			on:keyup={handleSearch}
		/>
	</div>

	<div class="flex flex-col gap-md">
		{#each projects as project}
			<div class="flex items-center gap-md">
				{#if $focusProject?.id === project.id}
					<Check className="stroke-grey-700 dark:stroke-grey-300 w-8 h-8" />
				{/if}
				<button
					class="input--label button--text w-full pl-2 text-start"
					on:click={() => handleSelectFocusProject(project)}
				>
					{project.project_name}
				</button>
			</div>
		{/each}
	</div>

	{#if $focusProject}
		<button
			class="button--primary mx-auto mt-md flex items-center gap-lg"
			on:click={() => ($focusProject = null)}
		>
			<Trash className="stroke-grey-200 w-8 h-8" />
			Clear focus project
		</button>
	{/if}
</dialog>
