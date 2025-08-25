<script lang="ts">
	import User from '$lib/assets/User.svelte';

	import { supabase } from '$lib/supabase';
	import { onMount } from 'svelte';

	export let id: string | undefined;
	export let profiles;
	let name: string;
	let avatar_url: string | null;

	onMount(async () => {
		const profile = profiles.find((item) => {
			if (item.id == id) return item;
		});

		name = profile.name;
		avatar_url = profile.avatar_url;
	});
</script>

<div class="group -ml-md first:ml-0">
	{#if avatar_url}
		<img
			src={avatar_url}
			alt="User profile"
			class="border-1 aspect-square h-10 w-10 rounded-full border-solid border-grey-100 object-cover first:border-0 dark:border-grey-800"
		/>
	{:else}
		<User
			className="w-10 h-10 stroke-grey-700 dark:stroke-grey-200 bg-grey-200 dark:bg-grey-700 rounded-full border-1 border-solid border-grey-100 first:border-0 dark:border-grey-800"
		/>
	{/if}
	<span
		class="absolute -top-1 left-10 z-50 m-2 w-auto min-w-max origin-left scale-0 rounded-md bg-grey-200 p-2 text-sm font-bold text-grey-200 shadow-md transition-all duration-100 group-hover:scale-100 dark:bg-grey-700 dark:text-grey-200"
	>
		{name}
	</span>
</div>
