<script>
	import CircleInfo from '$lib/assets/Circle-Info.svelte';
	import Filter from '$lib/assets/Filter.svelte';
	import Trash from '$lib/assets/Trash.svelte';
	import User from '$lib/assets/User.svelte';
	import { currentProject } from '$lib/stores/project';

	export let visibility = false;
</script>

<div class="md:top-16 md:right-xl md:left-auto dropdown--container">
	<button class="dropdown--item" on:click={() => (visibility = false)}>
		<Filter className="dropdown--icon" parentBg="grey-100" />
		<span class="dropdown--label">Filter</span>
	</button>
	<a class="dropdown--item" href="/app/projects/{$currentProject.id}/about">
		<CircleInfo className="dropdown--icon" />
		<span class="dropdown--label">View Info</span>
	</a>
	<button class="dropdown--item" on:click={() => (visibility = false)}>
		<User className="dropdown--icon" />
		<span class="dropdown--label">View invited members</span>
	</button>
	<button class="dropdown--item" on:click={() => (visibility = false)}>
		<Trash className="dropdown--icon" />
		<span class="dropdown--label">Delete</span>
	</button>
</div>
