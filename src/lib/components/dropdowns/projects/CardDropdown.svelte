<script lang="ts">
	import { invalidate } from '$app/navigation';
	import Trash from '$lib/assets/Trash.svelte';
	import { supabase } from '$lib/supabase';

	export let visibility = false;
	export let id: number;

	const handleTaskDelete = async () => {
		const { error } = await supabase.from('tasks').delete().eq('id', id);
		invalidate('app:project');
	};
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
	class="dropdown--container fixed z-50 md:absolute md:right-6 md:top-[3.5rem] md:border-2 md:border-grey-700"
	on:click={() => (visibility = false)}
	role="menu"
	tabindex="0"
>
	<button class="dropdown--item" on:click={handleTaskDelete}>
		<Trash className="dropdown--icon" />
		<span class="dropdown--label">Delete</span>
	</button>
</div>
