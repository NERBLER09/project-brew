<script lang="ts">
	import { goto } from '$app/navigation';
	import DesktopSidebar from '$lib/components/Sidebar/DesktopSidebar.svelte';
	import MobileNavbar from '$lib/components/Sidebar/MobileNavbar.svelte';

	import { supabase } from '$lib/supabase';
	import { onMount } from 'svelte';

	import '$lib/stores/user';

	const checkIfUserIsAuth = async (): Promise<boolean> => {
		const { data: session } = await supabase.auth.getSession();
		if (session.session) {
			return true;
		} else {
			return false;
		}
	};

	onMount(async () => {
		if ((await checkIfUserIsAuth()) === false) {
			goto('/');
		}
	});
</script>

<aside>
	<!-- Each automaticly hide based on screen size in tailwind -->
	<DesktopSidebar />
	<MobileNavbar />
</aside>

<slot />
