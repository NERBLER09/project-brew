<script>
	import Back from '$lib/assets/Arrow/Back.svelte';
	import Description from '$lib/components/text/Description.svelte';
	import { currentProject } from '$lib/stores/project';
</script>

<section>
	<header
		class="relative -top-6 -left-6 w-[calc(100%+48px)] h-[12.5rem] p-4 flex items-end object-cover rounded-b-3xl bg-cover bg-center"
		style="background-image: url({$currentProject.banner});"
	>
		<a class="flex items-center gap-md" href="/app/projects">
			<Back
				className="w-8 h-8 aspect-square {$currentProject.banner
					? 'stroke-grey-200'
					: 'stroke-grey-700'}"
			/>
			<h1
				class="w-fit text-lg {$currentProject.banner ? 'text-grey-200' : 'text-grey-700'} truncate"
			>
				{$currentProject?.name}
			</h1>
		</a>
	</header>
	<div>
		<div class="flex flex-wrap gap-md mb-lg">
			{#each $currentProject.tags as tag}
				<div class="bg-grey-200 py-2 px-3 w-fit rounded">
					<span class="text-grey-700 font-medium">{tag}</span>
				</div>
			{/each}
		</div>
		<Description banner="" description={$currentProject.description} />
		<h2 class="text-md font-semibold text-grey-700 mt-md">Team management coming.</h2>
	</div>
</section>
