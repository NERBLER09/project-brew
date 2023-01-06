<script lang="ts">
	import { signOut } from '$lib/api/auth';

	import LogOut from '$lib/assets/Arrow/Log-Out.svelte';
	import Settings from '$lib/assets/Settings.svelte';
	import User from '$lib/assets/User.svelte';

	export let visibility: boolean;
</script>

<div class="md:top-[6.25rem] lg:top-24 md:right-xl md:left-auto dropdown--container">
	<a href="#" class="dropdown--item" on:click={() => (visibility = false)}>
		<User className="dropdown--icon" />
		<span class="dropdown--label">View Profile</span>
	</a>
	<a href="/app/settings" class="dropdown--item" on:click={() => (visibility = false)}>
		<Settings className="dropdown--icon" />
		<span class="dropdown--label">Settings</span>
	</a>
	<button
		class="dropdown--item md:hidden"
		on:click={() => {
			visibility = false;
			signOut();
		}}
	>
		<LogOut className="dropdown--icon" />
		<span class="dropdown--label">Log Out</span>
	</button>
</div>
