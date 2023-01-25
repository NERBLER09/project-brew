<script lang="ts">
	import { goto } from '$app/navigation';

	import CircleInfo from '$lib/assets/Circle-Info.svelte';
	import Filter from '$lib/assets/Filter.svelte';
	import Trash from '$lib/assets/Trash.svelte';
	import User from '$lib/assets/User.svelte';
	import { currentProject } from '$lib/stores/project';
	import { showAboutProjectPrompt } from '$lib/stores/ui';
	import { supabase } from '$lib/supabase';

	export let visibility = false;
	export let projectId: number;

	const handleProjectDelete = async () => {
		await supabase.from('tasks').delete().eq('project', projectId);
		await supabase.from('lists').delete().eq('project', projectId);
		const { error } = await supabase.from('projects').delete().eq('id', projectId);

		if (!error) {
			goto('/app/projects');
		}
	};
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
	class="md:top-16 md:right-xl md:left-auto dropdown--container"
	on:click={() => (visibility = false)}
>
	<button class="dropdown--item" on:click={() => (visibility = false)}>
		<Filter className="dropdown--icon" parentBg="grey-100" />
		<span class="dropdown--label">Filter</span>
	</button>
	<a class="dropdown--item md:hidden" href="/app/projects/{$currentProject.id}/about">
		<CircleInfo className="dropdown--icon" />
		<span class="dropdown--label">View Info</span>
	</a>
	<button class="dropdown--item hidden md:flex items-center" on:click={() => ($showAboutProjectPrompt = true)}>
		<CircleInfo className="dropdown--icon" />
		<span class="dropdown--label">View Info</span>
	</button>
	<button class="dropdown--item" on:click={() => (visibility = false)}>
		<User className="dropdown--icon" />
		<span class="dropdown--label">View invited members</span>
	</button>
	<button class="dropdown--item" on:click={handleProjectDelete}>
		<Trash className="dropdown--icon" />
		<span class="dropdown--label">Delete</span>
	</button>
</div>
