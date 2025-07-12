<script lang="ts">
	import User from '$lib/assets/User.svelte';
	import { currentProject } from '$lib/stores/project';
	import { invitedTeamMembers } from '$lib/stores/user';
	import TagItem from '../tags/TagItem.svelte';

	export let id: string = 'sample-page';
	export let page_name: string = 'New Page';
	export let description: string | null = '';
	export let banner: string = '';
</script>

<a href="/app/projects/{$currentProject.id}/pages/{id}">
	<section
		class="relative flex aspect-[3/2] h-48 w-full flex-col justify-end rounded-lg bg-grey-100 bg-cover bg-center bg-origin-border object-cover p-4 dark:bg-grey-800 md:h-full md:max-h-48 md:w-72 md:max-w-[18rem]"
		style="background-image: {banner
			? 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.6) 107.5%),'
			: ''} url({banner});"
	>
		<header>
			<span
				class="text-md font-medium {banner ? 'text-grey-200' : 'text-grey-700 dark:text-grey-200'}"
				>{page_name}</span
			>
		</header>
		<p
			class="{banner
				? 'text-grey-200'
				: 'text-grey-700 dark:text-grey-200'} h-fit max-h-[4ch] overflow-hidden text-ellipsis text-sm font-medium empty:hidden"
		>
			{description}
		</p>
	</section>
</a>
