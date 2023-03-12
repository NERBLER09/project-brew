<script lang="ts">
	import Mail from '$lib/assets/Mail.svelte';
	import UserRemove from '$lib/assets/User-Remove.svelte';
	import User from '$lib/assets/User.svelte';

	import { showMobileNav } from '$lib/stores/ui';
	import { userData } from '$lib/stores/user';
	import { onDestroy, onMount } from 'svelte';

	export let visibility: boolean;
	export let email: string;
	export let removeUser = async () => {};

	const handleRemoveUser = async () => {
		await removeUser();
		visibility = false;
	};

	onMount(() => {
		$showMobileNav = false;
	});
	onDestroy(() => {
		$showMobileNav = true;
	});
</script>

<div class="dropdown--container fixed z-50 md:absolute md:top-10 md:right-0">
	<a href="/app/team/member/{$userData.id}" class="dropdown--item">
		<User className="dropdown--icon" />
		<span class="dropdown--label">View Profile</span>
	</a>
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
	<button class="dropdown--item" on:click={handleRemoveUser}>
		<UserRemove className="dropdown--icon" />
		<span class="dropdown--label">Remove</span>
	</button>
</div>
