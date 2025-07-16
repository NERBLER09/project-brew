<script>
	import Back from '$lib/assets/Arrow/Back.svelte';
	import CloseMultiply from '$lib/assets/Close-Multiply.svelte';
	import { currentProject } from '$lib/stores/project';
	import { slide } from 'svelte/transition';
	import { compile } from 'mdsvex';
	import ProcessedMarkdown from '$lib/components/projects/pages/ProcessedMarkdown.svelte';
	let viewMode = 'edit';

	let pageName = 'Sample Page';
	let pageDescription = 'What is this page going to be about?';

	let mdText = '';
	const convertTextToMD = async (text, view) => {
		// Now you can compile it if you wish
		if (viewMode === 'view') {
			const compiled = await compile(text);
			handleProcessText(compiled);
		}
	};

	const handleProcessText = async (compiled) => {
		processedMarkdownText = compiled.code;
	};

	$: processedMarkdownText = convertTextToMD(mdText, viewMode);
</script>

<div
	class="absolute left-0 top-0 z-50 h-full w-screen overflow-hidden bg-grey-100 p-lg dark:bg-grey-800 md:left-auto md:right-0 md:w-3/5 md:border-l md:border-l-grey-700 md:dark:border-l-grey-300 lg:w-1/2"
	transition:slide
>
	<!-- Mobile Only	 -->
	<header class="block md:hidden">
		<a class="flex items-center gap-md" href="/app/projects/{$currentProject.id}/pages">
			<Back className="w-8 h-8 aspect-square stroke-grey-800 dark:stroke-grey-200" />
			<h2
				class="w-fit truncate text-lg text-grey-900 dark:text-grey-200"
				contenteditable="true"
				bind:innerText={pageName}
			>
				{pageName}
			</h2>
		</a>
	</header>

	<!-- Desktop Only	 -->
	<header class="hidden items-center gap-sm md:flex">
		<a href="/app/projects/{$currentProject.id}/pages">
			<span class="sr-only">Close this page</span>
			<CloseMultiply className="w-8 h-8 aspect-square stroke-grey-800 dark:stroke-grey-200" />
		</a>
		<h2
			class="text-md font-semibold text-grey-700 dark:text-grey-200 md:text-lg"
			contenteditable="true"
			bind:innerText={pageName}
		>
			Sample Page
		</h2>
	</header>

	<span
		class="content-['What is this page going to be about'] my-md font-semibold text-grey-700 dark:text-grey-200"
		bind:innerText={pageDescription}
		contenteditable="true"
	>
		{pageDescription}
	</span>

	<div class="mx-lg my-md h-[1px] bg-grey-700 dark:bg-grey-300" />

	<div class="mt-md flex items-center">
		<button
			class="group flex w-fit items-center gap-md rounded px-md py-sm font-bold text-grey-700 hover:bg-grey-100 dark:text-grey-200 hover:dark:bg-grey-800
			{viewMode === 'edit' ? 'border-2 border-grey-700 dark:border-grey-200' : ''}"
			on:click={() => (viewMode = 'edit')}
		>
			Edit Mode
		</button>
		<button
			class="group flex w-fit items-center gap-md rounded px-md py-sm font-bold text-grey-700 hover:bg-grey-100 dark:text-grey-200 hover:dark:bg-grey-800
			{viewMode === 'view' ? 'border-2 border-grey-700 dark:border-grey-200' : ''}"
			on:click={() => (viewMode = 'view')}
		>
			View Mode
		</button>
	</div>
	{#if viewMode === 'edit'}
		<div class="mt-lg h-full">
			<textarea
				name="raw-markdown"
				bind:value={mdText}
				placeholder="What is on your mind?"
				class="h-full w-full resize-none border-0 bg-grey-100 p-0 text-grey-700 focus:outline-0 dark:bg-grey-800 dark:text-grey-200"
			/>
		</div>
	{:else if viewMode === 'view'}
		<ProcessedMarkdown bind:mdText />
	{/if}
</div>
