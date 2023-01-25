<script lang="ts">
	import { goto } from '$app/navigation';

	import Trash from '$lib/assets/Trash.svelte';
	import { supabase } from '$lib/supabase';

	export let visibility = false;
	export let listId: number;

	const handleListDelete = async () => {
		await supabase.from('tasks').delete().eq('list', listId);
		const { error } = await supabase.from('lists').delete().eq('id', listId);

		console.log(error)
	};
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
	class="md:right-6 md:top-[3.5rem] dropdown--container absolute md:border-grey-700 md:border-2 z-50"
	on:click={() => (visibility = false)}
>
	<button class="dropdown--item" on:click={handleListDelete}>
		<Trash className="dropdown--icon" />
		<span class="dropdown--label">Delete</span>
	</button>
</div>
