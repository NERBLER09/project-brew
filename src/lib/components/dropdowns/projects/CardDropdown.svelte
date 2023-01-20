<script>
	import Calendar from '$lib/assets/Calendar.svelte';

	import Check from '$lib/assets/Check.svelte';
	import CirclePriority from '$lib/assets/Circle-Priority.svelte';
	import Trash from '$lib/assets/Trash.svelte';
	import User from '$lib/assets/User.svelte';

	export let visibility = false;
</script>

<div
	class="md:-top-[100px] md:right-auto md:left-[calc(100%-272px)] dropdown--container absolute md:relative md:border-grey-701 md:border-2"
>
	<button class="dropdown--item" on:click={() => (visibility = false)}>
		<Check className="dropdown--icon" />
		<span class="dropdown--label">Mark as complete</span>
	</button>
	<button class="dropdown--item" on:click={() => (visibility = false)}>
		<Calendar className="dropdown--icon" />
		<span class="dropdown--label">Edit due date</span>
	</button>
	<button class="dropdown--item" on:click={() => (visibility = false)}>
		<CirclePriority className="dropdown--icon" />
		<span class="dropdown--label">Un-Prioritize</span>
	</button>
	<button class="dropdown--item" on:click={() => (visibility = false)}>
		<User className="dropdown--icon" />
		<span class="dropdown--label">Edit assigned people</span>
	</button>
	<button class="dropdown--item" on:click={() => (visibility = false)}>
		<Trash className="dropdown--icon" />
		<span class="dropdown--label">Delete</span>
	</button>
</div>

