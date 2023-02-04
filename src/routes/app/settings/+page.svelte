<script>
	import { goto } from '$app/navigation';

	import { settingsPage, showMobileSettingsNav } from '$lib/stores/ui';
	import { onMount } from 'svelte';

	onMount(() => {
		$showMobileSettingsNav = true;
		goto('/app/settings/account');
		$settingsPage = 'Settings';
	});
</script>
