<script lang="ts">
	import { signOut } from '$lib/api/auth';

	import LogOut from '$lib/assets/Arrow/Log-Out.svelte';
	import Settings from '$lib/assets/Settings.svelte';
	import User from '$lib/assets/User.svelte';
	import { userData } from '$lib/stores/user';

	export let visibility: boolean;
</script>

<div class="dropdown--container z-50 md:top-[6.25rem] md:right-xl md:left-auto lg:top-24">
	<a
		href="/app/team/member/{$userData.id}"
		class="dropdown--item"
		on:click={() => (visibility = false)}
	>
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
