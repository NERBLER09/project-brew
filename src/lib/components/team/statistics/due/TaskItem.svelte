<script lang="ts">
	import { supabase } from '$lib/supabase';
	import { onMount } from 'svelte';

	export let project: number;
	export let name: string;

	let project_name: string;

	console.log(project);
	onMount(async () => {
		const { data, error } = await supabase
			.from('projects')
			.select()
			.eq('id', project)
			.limit(1)
			.single();

		project_name = data?.project_name ?? '';
		console.log(project_name);
	});
</script>

<div class="flex items-center rounded bg-grey-200 px-2 py-3 dark:bg-grey-700">
	<input type="checkbox" class="input--checkbox" />
	<span class="ml-md font-bold text-grey-700 dark:text-grey-300">{name}</span>
	<li class="ml-md list-inside list-disc font-bold text-grey-700 dark:text-grey-300">
		<a href="/app/projects/{project}">
			{project_name}
		</a>
	</li>
</div>
