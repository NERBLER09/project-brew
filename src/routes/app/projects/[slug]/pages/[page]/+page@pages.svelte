<script lang="ts">
	import Back from '$lib/assets/Arrow/Back.svelte';
	import CloseMultiply from '$lib/assets/Close-Multiply.svelte';
	import { currentProject } from '$lib/stores/project';
	import { slide } from 'svelte/transition';
	import { compile } from 'mdsvex';
	import ProcessedMarkdown from '$lib/components/projects/pages/ProcessedMarkdown.svelte';
	import { supabase } from '$lib/supabase';
	import { page as svpage } from '$app/stores';
	import Trash from '$lib/assets/Trash.svelte';
	import { goto, invalidate } from '$app/navigation';
	import OpenShare from '$lib/assets/Open-Share.svelte';

	let viewMode = 'edit';

	let data = $svpage.data.pages ?? [];
	const pageId = $svpage.params.page;
	const page = data.find((item) => item.id === pageId);
	let pageName = page.name;
	let pageDescription = page.description;

	let pageFullScreen = false;

	let mdText = page.text_contents;
	const convertTextToMD = async (text, view) => {
		if (viewMode === 'view') {
			const compiled = await compile(text);
			handleProcessText(compiled);
		}
	};

	const handleProcessText = async (compiled) => {
		processedMarkdownText = compiled.code;
	};

	let lastedUpateMdText = mdText;
	let lastedUpatePageName = pageName;
	let lastedUpatePageDescription = pageDescription;

	const handleUpdateTextOnBlur = async () => {
		if (
			lastedUpateMdText === mdText &&
			lastedUpatePageName === pageName &&
			lastedUpatePageDescription === pageDescription
		)
			return;
		await supabase
			.from('pages')
			.update({ name: pageName, description: pageDescription, text_contents: mdText })
			.eq('id', page.id);
		invalidate('project:pages');
		lastedUpateMdText = lastedUpateMdText;
		lastedUpatePageDescription = pageDescription;
		lastedUpatePageName = pageName;
	};

	$: processedMarkdownText = convertTextToMD(mdText, viewMode);

	const handleDelete = async () => {
		const projectId = $currentProject.id;
		goto(`/app/projects/${projectId}/pages`);
		await supabase.from('pages').delete().eq('id', page.id);
		invalidate('project:pages');
	};
</script>

<div
	class="fixed left-0 top-0 z-50 h-full w-screen overflow-hidden bg-grey-100 p-lg dark:bg-grey-800 md:border-l md:border-l-grey-700 md:transition-all md:duration-500 md:dark:border-l-grey-300 {pageFullScreen
		? 'md:left-auto md:right-0  md:w-[calc(100vw-16.625rem)]'
		: 'md:left-auto  md:right-0 md:w-3/5 lg:w-1/2'}"
	transition:slide
>
	<!-- Mobile Only	 -->
	<header class="flex md:hidden">
		<a class="flex items-center gap-md" href="/app/projects/{$currentProject.id}/pages">
			<Back className="w-8 h-8 aspect-square stroke-grey-800 dark:stroke-grey-200" />
			<h2
				class="truncate text-lg text-grey-900 dark:text-grey-200"
				contenteditable="true"
				bind:innerText={pageName}
				on:blur={handleUpdateTextOnBlur}
			>
				{pageName}
			</h2>
		</a>
		<button on:click={handleDelete} class="ml-auto">
			<Trash
				className="w-8 h-8 {data.banner
					? 'stroke-grey-200'
					: 'stroke-grey-700 dark:stroke-grey-200'}"
			/>
			<span class="sr-only">Delete page</span>
		</button>
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
			on:blur={handleUpdateTextOnBlur}
		>
			Sample Page
		</h2>
		<button
			on:click={() => {
				pageFullScreen = !pageFullScreen;
			}}
			class="ml-auto"
		>
			<OpenShare
				className="w-8 h-8 {data.banner
					? 'stroke-grey-200'
					: 'stroke-grey-700 dark:stroke-grey-200'}"
			/>
			<span class="sr-only">Full screen</span>
		</button>
		<button on:click={handleDelete}>
			<Trash
				className="w-8 h-8 {data.banner
					? 'stroke-grey-200'
					: 'stroke-grey-700 dark:stroke-grey-200'}"
			/>
			<span class="sr-only">Delete page</span>
		</button>
	</header>

	<span
		class="content-['What is this page going to be about'] my-md font-semibold text-grey-700 dark:text-grey-200"
		bind:innerText={pageDescription}
		contenteditable="true"
		on:blur={handleUpdateTextOnBlur}
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
				on:blur={handleUpdateTextOnBlur}
			/>
		</div>
	{:else if viewMode === 'view'}
		<ProcessedMarkdown bind:mdText />
	{/if}
</div>
