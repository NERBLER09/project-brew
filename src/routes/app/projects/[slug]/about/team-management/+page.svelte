<script>
	import Back from '$lib/assets/Arrow/Back.svelte';
	import { currentProject } from '$lib/stores/project';
</script>

<section>
	<header
		class="relative -top-6 -left-6 flex w-[calc(100%+48px)] items-end rounded-b-3xl bg-cover bg-center object-cover p-4 {!$currentProject.banner
			? 'static w-fit'
			: 'h-[12.5rem]'}"
		style="background-image: url({$currentProject.banner});"
	>
		<a class="flex items-center gap-md" href="/app/projects/{$currentProject.id}">
			<Back
				className="w-8 h-8 aspect-square {$currentProject.banner
					? 'stroke-grey-200'
					: 'stroke-grey-700 dark:stroke-grey-200'}"
			/>
			<h1
				class="w-fit text-lg {$currentProject.banner
					? 'text-grey-200'
					: 'text-grey-700 dark:text-grey-200'} truncate"
			>
				Manage invited members
			</h1>
		</a>
	</header>
</section>
