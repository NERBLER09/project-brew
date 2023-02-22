<script lang="ts">
	import CircleInfo from '$lib/assets/Circle-Info.svelte';
	import Trash from '$lib/assets/Trash.svelte';
	import User from '$lib/assets/User.svelte';
	import ConfirmDelete from '$lib/components/prompts/projects/ConfirmDelete.svelte';
	import { currentProject } from '$lib/stores/project';
	import { showAboutProjectPrompt } from '$lib/stores/ui';

	export let visibility = false;

	let showDeleteWarningPrompt = false;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="dropdown--container fixed top-[calc(100vh-198px)] md:top-16 md:right-xl md:left-auto">
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
	<button class="dropdown--item" on:click={() => (showDeleteWarningPrompt = true)}>
		<Trash className="dropdown--icon" />
		<span class="dropdown--label">Delete</span>
	</button>
</div>

<ConfirmDelete bind:shown={showDeleteWarningPrompt} />
