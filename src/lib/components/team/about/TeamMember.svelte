<script lang="ts">
	import Down from '$lib/assets/Arrow/Chevron/Down.svelte';
	import MoreHorizontal from '$lib/assets/More Horizontal.svelte';
	import UserRemove from '$lib/assets/User-Remove.svelte';
	import { supabase } from '$lib/supabase';
	import { onMount } from 'svelte';

	export let id: string;
	export let role: 'owner' | 'admin' | 'editor' | 'viewer';

	let name: string;
	let email: string;
	let avatar: string;
	let roleFormatted: string;

	onMount(async () => {
		const { data: profile, error } = await supabase
			.from('profiles')
			.select()
			.eq('id', id)
			.limit(1)
			.single();

		if (profile) {
			name = profile.name;
			email = profile.email;
			avatar = profile.avatar_url ?? '';
		}

		switch (role) {
			case 'owner':
				roleFormatted = 'Owner';
				break;
			case 'admin':
				roleFormatted = 'Admin';
				break;
			case 'editor':
				roleFormatted = 'Editor';
				break;
			case 'viewer':
				roleFormatted = 'Viewer';
				break;
		}
	});
</script>

<div class="w-full">
	<div class="flex gap-lg">
		<img
			src={avatar}
			alt="{name} profile"
			class="aspect-square h-12 w-12 rounded-full object-cover"
		/>
		<div class="flex flex-col gap-sm">
			<span class="font-bold text-grey-700 dark:text-grey-200">{name}</span>
			<span class="font-medium text-grey-700 dark:text-grey-300">{email}</span>
		</div>
	</div>

	<div class="mt-sm flex items-center">
		<div class="flex items-center gap-sm rounded bg-grey-200 px-3 py-2 font-bold dark:bg-grey-700">
			<span class="font-bold text-grey-700 dark:text-grey-200">{roleFormatted}</span>
			<Down className="w-6 h-6 stroke-grey-700 dark:stroke-grey-300" />
			<span class="sr-only">Change team member status</span>
		</div>
		<div class="ml-auto flex gap-md">
			<UserRemove className="w-8 h-8 stroke-grey-700 dark:stroke-grey-300" />
			<MoreHorizontal className="w-8 h-8 stroke-grey-700 dark:stroke-grey-300" />
		</div>
	</div>
</div>
