<script lang="ts">
	import Back from '$lib/assets/Arrow/Back.svelte';
	import type { PageData } from './$types';
	import { onDestroy, onMount } from 'svelte';
	import { showMobileNav } from '$lib/stores/ui';
	import TeamMember from '$lib/components/team/about/TeamMember.svelte';
	import { supabase } from '$lib/supabase';

	export let data: PageData;

	let description = data.team.description;

	const handleUpdateDescription = async () => {
		if (description === data.team.description) return;
		const { error } = await supabase.from('teams').update({ description }).eq('id', data.team.id);
		console.log(error);
	};

	onMount(() => {
		$showMobileNav = false;
	});

	onDestroy(() => {
		$showMobileNav = true;
	});
</script>

<header
	class=" -top-6 -left-6 flex  items-end rounded-b-3xl bg-cover bg-center object-cover  
    {!data.team.banner ? 'static w-full' : 'relative h-[12.5rem] w-[calc(100%+48px)] p-6'}"
	style="background-image: {data.team.banner
		? 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.6) 115.18%),'
		: ''} url({data.team.banner});"
>
	<a class="flex w-full items-center gap-md" href="/app/team/{data.team.id}">
		<Back
			className="min-w-[2rem] min-h-[2rem] h-8 w-8 aspect-square {data.team.banner
				? 'stroke-grey-200'
				: 'stroke-grey-700 dark:stroke-grey-200'}"
		/>
		<h1
			class="text-lg {data.team.banner
				? 'max-w-[calc(100%-80px)] text-grey-200'
				: 'w-full text-grey-700 dark:text-grey-200'} truncate"
		>
			{data.team.name}
		</h1>
	</a>
</header>

<p
	class="my-md font-medium text-grey-700 dark:text-grey-300"
	contenteditable="true"
	bind:textContent={description}
	on:blur={handleUpdateDescription}
>
	{data.team.description}
</p>

<section class="mt-md">
	<header>
		<h2 class="text-md font-semibold text-grey-700 dark:text-grey-200">Invited team members</h2>
	</header>
	<div class="mt-sm flex flex-col items-start gap-lg">
		{#each data.team.team_members as { user_id, role }}
			<TeamMember id={user_id} {role} />
		{/each}
	</div>
</section>
