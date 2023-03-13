<script lang="ts">
	import { supabase } from '$lib/supabase';

	import { onMount } from 'svelte';

	export let project_name: string | undefined;
	export let id: number | undefined;

	let strokeArray = 380;

	let totalAmountOfTasks = 0;
	let completedTasks = 0;
	let percentCompleted = 0;

	onMount(async () => {
		const { data: user } = await supabase.auth.getUser();
		const userId = user.user?.id;
		const { data, error } = await supabase
			.from('tasks')
			.select()
			.eq('project', id)
			.eq('due_date', new Date().toISOString());

		totalAmountOfTasks = data?.length!;
		completedTasks = data?.filter((item) => item.status === 'done').length!;
		percentCompleted = Math.round((completedTasks / totalAmountOfTasks) * 100) || 0;
		if (totalAmountOfTasks === 0 && completedTasks === 0) percentCompleted = 100;
	});
</script>

<section class="flex min-w-[8rem] flex-col items-center text-center">
	<header>
		<span
			class="text-start font-semibold text-grey-700 dark:text-grey-200 md:text-center md:text-md"
		>
			{project_name}
		</span>
	</header>

	<div
		class="relative flex aspect-square h-32 w-32 flex-col items-center justify-center gap-sm rounded-full"
	>
		<div class="absolute">
			<svg class="h-32 w-32">
				<circle
					cx="64"
					cy="64"
					class="fill-none stroke-grey-200 dark:stroke-grey-700"
					stroke-width="8"
					r="60"
				/>
				<circle
					cx="64"
					cy="64"
					r="60"
					class="fill-none stroke-accent-light transition-all duration-300 ease-in"
					stroke-dashoffset={strokeArray - (strokeArray * percentCompleted) / 100}
					stroke-dasharray={strokeArray}
					stroke-linecap="round"
					stroke-width="8"
					transform="rotate(-90 64 64)"
				/>
			</svg>
		</div>
		<span class="font-bold text-grey-700 dark:text-grey-200">{percentCompleted}%</span>
		<span class="font-medium text-grey-700 dark:text-grey-200">Completed</span>
	</div>
</section>
