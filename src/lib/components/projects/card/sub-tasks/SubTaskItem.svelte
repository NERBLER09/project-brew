<script lang="ts">
	import { supabase } from '$lib/supabase';

	export let completed: boolean;
	export let id: string;
	export let name: string;
	export let task: number;

	const updateStatus = async () => {
		await supabase.from('sub_tasks').update({ completed }).eq('id', id);
	};
</script>

<div>
	<input
		type="checkbox"
		class="input--checkbox"
		bind:checked={completed}
		id="{name}-sub-task"
		on:change={updateStatus}
	/>
	<label for="{name}-sub-task" class="input--label">{name}</label>
</div>
