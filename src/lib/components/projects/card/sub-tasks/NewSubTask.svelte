<script lang="ts">
	import PlusNew from '$lib/assets/Plus-New.svelte';
	import { supabase } from '$lib/supabase';

	export let task: number;
	export let project: number;
	export let getSubTasks: () => Promise<void>;

	let subTaskName: string;

	const handleCreateSubTask = async () => {
		await supabase.from('sub_tasks').insert({ task, project, name: subTaskName });
		getSubTasks();
		subTaskName = '';
	};
</script>

<form on:submit|preventDefault={handleCreateSubTask}>
	<div class="input--text relative flex w-full items-center">
		<span class="sr-only">Enter a name for this new sub task</span>
		<input
			type="text"
			placeholder="Enter a name"
			class="input--text m-0 w-full p-0"
			bind:value={subTaskName}
			name="invite_email"
		/>
		<button>
			<PlusNew className="stroke-grey-700 dark:stroke-grey-200 w-[1.125rem] h-[1.125rem] ml-auto" />
		</button>
	</div>
</form>
