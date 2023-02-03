<script lang="ts">
	import Mail from '$lib/assets/Mail.svelte';

	import OpenShare from '$lib/assets/Open-Share.svelte';
	import UserRemove from '$lib/assets/User-Remove.svelte';

	import User from '$lib/assets/User.svelte';
	import { userData } from '$lib/stores/user';

	export let visibility: boolean;
</script>

<div class="dropdown--container md:top-10 md:right-0">
	<a href="/app/team/{$userData.id}" class="dropdown--item">
		<User className="dropdown--icon" />
		<span class="dropdown--label">View Profile</span>
	</a>
	<div class="dropdown--item">
		<OpenShare className="dropdown--icon" />
		<span class="dropdown--label">Share</span>
	</div>
	<div class="dropdown--item">
		<Mail className="dropdown--icon" />
		<span class="dropdown--label">Email</span>
	</div>
	<div class="dropdown--item">
		<UserRemove className="dropdown--icon" />
		<span class="dropdown--label">Remove</span>
	</div>
</div>
