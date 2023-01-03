<script lang="ts">
	import { goto } from '$app/navigation';
	import MobileNavbar from '$lib/components/Sidebar/MobileNavbar.svelte';

	import { supabase } from '$lib/supabase';
	import { onMount } from 'svelte';

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

<MobileNavbar />

<slot />
