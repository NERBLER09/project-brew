<script lang="ts">
	import Mail from '$lib/assets/Mail.svelte';

	import OpenShare from '$lib/assets/Open-Share.svelte';
	import UserRemove from '$lib/assets/User-Remove.svelte';

	import User from '$lib/assets/User.svelte';
	import { userData } from '$lib/stores/user';

	export let visibility: boolean;
	export let email: string;
</script>

<div class="dropdown--container md:top-10 md:right-0">
	<a href="/app/team/{$userData.id}" class="dropdown--item">
		<User className="dropdown--icon" />
		<span class="dropdown--label">View Profile</span>
	</a>
	<button class="dropdown--item" on:click={() => (visibility = false)}>
		<OpenShare className="dropdown--icon" />
		<span class="dropdown--label">Share</span>
	</button>

	<!-- Very dirty way in order to open an email writer -->
	<a
		href="mailto:{email}"
		target="__blank"
		class="dropdown--item"
		on:click={() => (visibility = false)}
	>
		<Mail className="dropdown--icon" />
		<span class="dropdown--label">Email</span>
	</a>
	<button class="dropdown--item" on:click={() => (visibility = false)}>
		<UserRemove className="dropdown--icon" />
		<span class="dropdown--label">Remove</span>
	</button>
</div>
