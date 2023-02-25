<script lang="ts">
	import { invalidate } from '$app/navigation';
	import Trash from '$lib/assets/Trash.svelte';
	import { showMobileNav } from '$lib/stores/ui';
	import { supabase } from '$lib/supabase';
	import { onDestroy, onMount } from 'svelte';

	export let visibility = false;
	export let listId: number;

	const handleListDelete = async () => {
		await supabase.from('tasks').delete().eq('list', listId);
		const { error } = await supabase.from('lists').delete().eq('id', listId);

		if (!error) {
			invalidate('app:project');
		}
	};

	onMount(() => {
		$showMobileNav = false;
	});
	onDestroy(() => {
		$showMobileNav = true;
	});
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
	class="dropdown--container fixed bottom-0 z-50 md:absolute md:right-0 md:top-10 md:border-2 md:border-grey-700"
	on:click={() => (visibility = false)}
>
	<button class="dropdown--item" on:click={handleListDelete}>
		<Trash className="dropdown--icon" />
		<span class="dropdown--label">Delete</span>
	</button>
</div>
