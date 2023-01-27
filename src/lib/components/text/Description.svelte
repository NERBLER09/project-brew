<script lang="ts">
	export let description = '';
	export let banner = '';

	let expandContents = false;
	let contentOverflowing = false;

	let descriptionElement: HTMLElement;
	const checkForOverflow = (element: HTMLElement) => {
		if (!element) return;
		contentOverflowing =
			element.offsetHeight < element.scrollHeight || element.scrollWidth > element.clientWidth;
		console.log(contentOverflowing);
	};

	$: checkForOverflow(descriptionElement);
</script>

<svelte:window on:resize={() => checkForOverflow(descriptionElement)} />
<div>
	<p
		class="font-medium min-h-fit {expandContents
			? 'h-fit'
			: 'max-h-[6ch]'} text-ellipsis overflow-hidden {banner
			? 'text-grey-200'
			: 'text-grey-700 dark:text-grey-200'} text-sm sm:text-base"
		bind:this={descriptionElement}
	>
		{description}
	</p>
	{#if contentOverflowing}
		<button
			class="font-medium {banner
				? 'text-grey-200'
				: 'text-grey-700 dark:text-grey-200'} text-sm mt-sm"
			on:click={() => (expandContents = !expandContents)}
		>
			{#if expandContents}
				<span>Hide</span>
			{:else}
				<span>Show more</span>
			{/if}
		</button>
	{/if}
</div>

