<script>
	import { compile } from 'mdsvex';

	export let mdText = '';

	const convertTextToMD = async (text) => {
		// Now you can compile it if you wish
		const compiled = await compile(text);
		handleProcessText(compiled);
	};

	const handleProcessText = async (compiled) => {
		processedMarkdownText = compiled.code;
	};

	$: processedMarkdownText = convertTextToMD(mdText);
</script>

<div class="mt-lg" id="processed-markdown">{@html processedMarkdownText}</div>

<style>
	:global(div#processed-markdown > *) {
		color: #282828;
	}
	:global(div#processed-markdown > h1, h2, h3, h4, h5 h6) {
		font-weight: 900;
	}
	:global(div#processed-markdown > h1) {
		font-size: 2.5rem;
		line-height: 4rem;
	}
	:global(div#processed-markdown > h2) {
		font-size: 1.75rem;
		line-height: 2.8125rem;
	}
	:global(div#processed-markdown > h3) {
		font-size: 1.25rem;
		line-height: 1.5rem;
	}
	:global(div#processed-markdown > span, p) {
		font-size: 1rem;
		line-height: 1.375rem;
	}
	@media (prefers-color-scheme: dark) {
		:global(div#processed-markdown > *) {
			color: #e9ecef;
		}
	}
</style>
