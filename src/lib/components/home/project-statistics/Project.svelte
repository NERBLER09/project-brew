<script lang="ts">
	import { supabase } from '$lib/supabase';

	import { onMount } from 'svelte';

	export let project_name: string | undefined;
	export let id: number | undefined;

	let totalAmmountOfTasks = 0;
	let completedTasks = 0;
	let percentCompleted = 0;

	onMount(async () => {
		const { data: user } = await supabase.auth.getUser();
		const userId = user.user?.id;
		const { data, error } = await supabase
			.from('tasks')
			.select()
			.eq('user_id', userId)
			.eq('project', id);

		totalAmmountOfTasks = data?.length!;
		completedTasks = data?.filter((item) => item.status === 'done').length!;
		percentCompleted = Math.round((completedTasks / totalAmmountOfTasks) * 100) || 0;
	});
</script>

<section class="flex flex-col items-center text-center">
	<header>
		<h3 class="mb-md text-md font-semibold text-grey-700 dark:text-grey-200">
			{project_name}
		</h3>
	</header>

	<div
		class="flex aspect-square h-32 w-32 flex-col items-center justify-center gap-sm rounded-full border-8 border-grey-200 dark:border-grey-700"
	>
		<span class="font-bold text-grey-700 dark:text-grey-200">{percentCompleted}%</span>
		<span class="font-medium text-grey-700 dark:text-grey-200">Completed</span>
	</div>
</section>
