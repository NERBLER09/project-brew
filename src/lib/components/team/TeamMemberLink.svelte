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

{#if !name}
	<p class="font-bold text-grey-700 dark:text-grey-100">Loading team member details...</p>
{:else}
	<a href="/app/team/{id}" class="flex items-start gap-md">
		{#if avatar_url}
			<img
				src={avatar_url}
				alt="User profile"
				class="aspect-square h-12 w-12 rounded-full object-cover"
			/>
		{:else}
			<User className="w-12 h-12 stroke-grey-700 dark:stroke-grey-200" />
		{/if}
		<div class="flex flex-col items-start justify-start gap-sm">
			<p class="font-bold text-grey-700 dark:text-grey-100">{name}</p>
			<p class="font-bold text-grey-700 dark:text-grey-100">{email}</p>
		</div>
	</a>
{/if}
