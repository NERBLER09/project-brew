<script lang="ts">
	import Down from '$lib/assets/Arrow/Chevron/Down.svelte';

	import Left from '$lib/assets/Arrow/Chevron/Left.svelte';
	import Up from '$lib/assets/Arrow/Chevron/Up.svelte';
	import Edit from '$lib/assets/Edit.svelte';
	import PlusNew from '$lib/assets/Plus-New.svelte';
	import Trash from '$lib/assets/Trash.svelte';
	import FocusProjectPrompt from '$lib/components/prompts/focus/FocusProjectPrompt.svelte';
	import { focusMinutes, focusProject } from '$lib/stores/focus';

	let strokeArray = 720;
	let minutes = 25;
	let seconds = 0;

	let blockedURLS: string[] = [];
	let blockURL = '';
	const addBlockedURL = () => {
		blockedURLS = [blockURL, ...blockedURLS];
		blockURL = '';
	};

	const removeURL = (url: string) => {
		const index = blockedURLS.indexOf(url);
		blockedURLS.splice(index, 1);
		blockedURLS = blockedURLS;
	};

	$: percent = ((minutes + seconds / 100) / 120) * 100;
	$: if (minutes < 0) minutes = 0;
	else if (minutes > 120) minutes = 120;

	$: if (seconds < 0) seconds = 0;
	else if (seconds > 55) seconds = 55;

	$: $focusMinutes = minutes;

	let showFocusProjectPrompt = false;
</script>

<svelte:head>
	<title>Project Brew - Focus</title>
</svelte:head>

<header>
	<h1 class="text-lg text-grey-800 dark:text-grey-100 md:text-2xl">Focus</h1>
</header>

<section class="mx-auto mt-md flex flex-col items-center md:w-3/4 md:max-w-[21.875rem]">
	<div
		class="relative flex aspect-square h-[15.625rem] w-[15.625rem] items-center justify-center gap-sm rounded-full"
	>
		<div class="absolute">
			<svg class="h-[15.625rem] w-[15.625rem]">
				<circle
					cx="125"
					cy="125"
					class="fill-none stroke-grey-200 dark:stroke-grey-700"
					stroke-width="15"
					r="115"
				/>
				<circle
					cx="125"
					cy="125"
					r="115"
					class="fill-none stroke-accent-light transition-all duration-300 ease-in"
					stroke-dashoffset={strokeArray - (strokeArray * percent) / 100}
					stroke-dasharray={strokeArray}
					stroke-linecap="round"
					stroke-width="15"
					transform="rotate(-90 125 125)"
				/>
			</svg>
		</div>
		<!-- Add content here -->
		<div class="flex items-center gap-md">
			<div class="relative z-40 flex flex-col items-center justify-center">
				<button class="button--text m-0 p-0" on:click={() => (minutes += 5)}>
					<Up className="h-8 w-8 stroke-accent-light" />
				</button>
				<span
					class=" {minutes >= 100
						? 'w-[3ch]'
						: 'w-[2ch]'} text-end text-lg font-semibold text-grey-700 dark:text-grey-200"
					>{minutes < 10 ? '0' : ''}{minutes}</span
				>
				<button class="button--text m-0 p-0" on:click={() => (minutes -= 5)}>
					<Down className="h-8 w-8 stroke-accent-light" />
				</button>
			</div>
			<span class="text-center text-md font-semibold text-grey-700 dark:text-grey-200">:</span>
			<div class="relative z-40 flex flex-col items-center justify-center">
				<button class="button--text m-0 p-0" on:click={() => (seconds += 5)}>
					<Up className="h-8 w-8 stroke-accent-light" />
				</button>

				<span
					class=" {seconds >= 100
						? 'w-[3ch]'
						: 'w-[2ch]'} text-end text-lg font-semibold text-grey-700 dark:text-grey-200"
					>{seconds < 10 ? '0' : ''}{seconds}</span
				>
				<button class="button--text m-0 p-0" on:click={() => (seconds -= 5)}>
					<Down className="h-8 w-8 stroke-accent-light" />
				</button>
			</div>
		</div>
	</div>
	<a
		href="/app/focus/focus-project"
		class="button--secondary mt-lg flex w-full items-center gap-md px-3 md:hidden"
	>
		{#if $focusProject}
			Focusing on {$focusProject.project_name}
			<Edit className="stroke-grey-700 dark:stroke-grey-200 w-6 h-6 ml-auto" />
		{:else}
			Select a project to focus on
			<Left className="stroke-grey-700 dark:stroke-grey-200 w-6 h-6 ml-auto" />
		{/if}
	</a>

	<button
		class="button--secondary mt-lg hidden w-full items-center gap-md px-3 md:flex"
		on:click={() => (showFocusProjectPrompt = true)}
	>
		{#if $focusProject}
			Focusing on {$focusProject.project_name}
			<Edit className="stroke-grey-700 dark:stroke-grey-200 w-6 h-6 ml-auto" />
		{:else}
			Select a project to focus on
			<Left className="stroke-grey-700 dark:stroke-grey-200 w-6 h-6 ml-auto" />
		{/if}
	</button>

	<div class="mt-md w-full">
		<label for="notify" class="input--label">Notify me when I am done</label>
		<input type="checkbox" class="input--checkbox" id="notify" />
	</div>
</section>

<section class="mx-auto mt-md md:w-3/4 md:max-w-[21.875rem]">
	<header>
		<form on:submit|preventDefault={addBlockedURL}>
			<div class="input--text mb-sm flex w-full items-center">
				<input
					type="text"
					placeholder="Enter a url you would like to block"
					class="input--text m-0 w-full p-0"
					bind:value={blockURL}
				/>
				<button>
					<PlusNew
						className="stroke-grey-700 dark:stroke-grey-200 w-[1.125rem] h-[1.125rem] ml-auto"
					/>
				</button>
			</div>
		</form>

		<h2 class="text-md font-semibold text-grey-700 dark:text-grey-200">Blocked urls</h2>
	</header>

	<div>
		{#each blockedURLS as url}
			<div class="flex items-center">
				<p class="font-medium text-grey-700 dark:text-grey-200">{url}</p>
				<button class="button--text m-0 ml-auto p-0" on:click={() => removeURL(url)}>
					<span class="sr-only">Remove {url} from blocked url list</span>
					<Trash className="h-8 w-8 stroke-grey-700 dark:stroke-grey-200" />
				</button>
			</div>
		{:else}
			<p class="font-medium text-grey-700 dark:text-grey-200">
				You have added any urls to this focus' block list.
			</p>
		{/each}
	</div>
</section>
<div class="flex w-full items-center justify-center">
	<a href="/app/focus/running" class="button--primary mt-lg text-center">Start</a>
</div>
<FocusProjectPrompt bind:shown={showFocusProjectPrompt} />
