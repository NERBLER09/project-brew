<script lang="ts">
	import { goto } from '$app/navigation';
	import DesktopSidebar from '$lib/components/Sidebar/DesktopSidebar.svelte';
	import MobileNavbar from '$lib/components/Sidebar/MobileNavbar.svelte';

	import { supabase } from '$lib/supabase';
	import { onMount } from 'svelte';

	import '$lib/stores/user';
	import { userData } from '$lib/stores/user';

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
		} else {
			if ($userData) return;
			const { data } = await supabase.auth.getUser();
			const id = data.user?.id;
			const { data: user, error } = await supabase.from('profiles').select().eq('id', id);
			if (error) console.error(error);
			else if (user.length === 0) goto('/welcome');
			else userData.set(user[0]);
		}
	});
</script>

<div class="md:flex">
	<aside>
		<!-- Each automaticly hide based on screen size in tailwind -->
		<DesktopSidebar />
		<MobileNavbar />
	</aside>

	<main class="md:p-8 p-6 w-full">
		<slot />
	</main>
</div>
