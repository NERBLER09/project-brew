<script lang="ts">
	import User from '$lib/assets/User.svelte';

	import { supabase } from '$lib/supabase';
	import { onMount } from 'svelte';

	export let id: string | undefined;
	let name: string;
	let avatar_url: string | null;
	let email: string;

	onMount(async () => {
		const { data: member, error } = await supabase
			.from('profiles')
			.select()
			.eq('id', id)
			.limit(1)
			.single();
		if (member) {
			name = member.name;
			email = member.email;
			avatar_url = member.avatar_url;
		}
	});
</script>

<div class="-m-md first:ml-0">
	{#if avatar_url}
		<img
			src={avatar_url}
			alt="User profile"
			class="aspect-square h-10 w-10 rounded-full object-cover"
		/>
	{:else}
		<User
			className="w-10 h-10 stroke-grey-700 dark:stroke-grey-200 bg-grey-200 dark:bg-grey-700 rounded-full"
		/>
	{/if}
</div>
