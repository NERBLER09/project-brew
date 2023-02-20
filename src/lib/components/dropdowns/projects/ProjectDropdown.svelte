<script lang="ts">
	import { goto } from '$app/navigation';

	import CircleInfo from '$lib/assets/Circle-Info.svelte';
	import Filter from '$lib/assets/Filter.svelte';
	import Trash from '$lib/assets/Trash.svelte';
	import User from '$lib/assets/User.svelte';
	import { currentProject } from '$lib/stores/project';
	import { showAboutProjectPrompt } from '$lib/stores/ui';
	import { userData } from '$lib/stores/user';
	import { supabase } from '$lib/supabase';
	import { camelCase } from 'lodash';
	import toast from 'svelte-french-toast';

	export let visibility = false;
	export let projectId: number;

	const handleProjectDelete = async () => {
		if ($currentProject.banner) {
			await supabase.storage
				.from('project-covers')
				.remove([`${$userData.id}/${camelCase($currentProject.name)}`]);
		}

		await supabase.from('tasks').delete().eq('project', projectId);
		await supabase.from('lists').delete().eq('project', projectId);
		const { error } = await supabase.from('projects').delete().eq('id', projectId);

		if (!error) {
			toast.success('Successfully deleted project');
			goto('/app/projects');
		} else {
			toast.error(`Failed to deleted project: ${error.message}`);
		}
	};
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="dropdown--container md:top-16 md:right-xl md:left-auto">
	<!-- <button class="dropdown--item" on:click={() => (visibility = false)}>
		<Filter className="dropdown--icon" parentBg="grey-100" />
		<span class="dropdown--label">Filter</span>
	</button> -->
	<a class="dropdown--item md:hidden" href="/app/projects/{$currentProject.id}/about">
		<CircleInfo className="dropdown--icon" />
		<span class="dropdown--label">View Info</span>
	</a>
	<button
		class="dropdown--item hidden items-center md:flex"
		on:click={() => ($showAboutProjectPrompt = true)}
	>
		<CircleInfo className="dropdown--icon" />
		<span class="dropdown--label">View Info</span>
	</button>
	<a
		class="dropdown--item md:hidden"
		href="/app/projects/{$currentProject.id}/about/team-management"
	>
		<User className="dropdown--icon" />
		<span class="dropdown--label">View invited members</span>
	</a>
	<button class="dropdown--item" on:click={handleProjectDelete}>
		<Trash className="dropdown--icon" />
		<span class="dropdown--label">Delete</span>
	</button>
</div>
