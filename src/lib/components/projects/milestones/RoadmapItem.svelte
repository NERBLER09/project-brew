<script lang="ts">
	import Calendar from '$lib/assets/Calendar.svelte';
	import User from '$lib/assets/User.svelte';
	import { supabase } from '$lib/supabase';
	import { onMount } from 'svelte';

	export let id: string;
	export let name: string;
	export let description: string | null = '';
	export let target: string;
	export let assigned: string[] | null = [];
	export let milestone: string;

	let updatedName = name;
	let updatedDescription = description ?? '';
	let updatedTargetDate = new Date(target);
	let targetDateInput: HTMLInputElement;

	let targetDate = new Date(target).setDate(new Date(target).getDate() + 1);
	let formattedTargetDate = '';

	let assignedUserProfiles: any[] = [];

	onMount(async () => {
		if (assigned) {
			const { data } = await supabase
				.from('profiles')
				.select('avatar_url, name')
				.in('id', assigned ?? []);
			assignedUserProfiles =
				data?.map((item) => ({ profile: item.avatar_url ?? '', name: item.name })) ?? [];
		}
		formattedTargetDate = new Date(targetDate).toLocaleDateString('en-US', {
			month: 'short',
			day: 'numeric'
		});
	});

	const updateRoadmapItem = async (name: string, description: string, target: string) => {
		name = updatedName;
		description = updatedDescription;
		target = new Date(updatedTargetDate).toISOString();

		targetDate = new Date(target).setDate(new Date(target).getDate() + 1);
		formattedTargetDate = new Date(targetDate).toLocaleDateString('en-US', {
			month: 'short',
			day: 'numeric'
		});

		await supabase.from('roadmap').update({ name, description, target }).eq('id', id);
	};
</script>

<section>
	<header class="flex items-center">
		<h3
			class="font-bold text-grey-700 dark:text-grey-300"
			bind:textContent={updatedName}
			contenteditable
			on:blur={() =>
				updateRoadmapItem(
					updatedName,
					updatedDescription,
					new Date(updatedTargetDate).toISOString()
				)}
		>
			{name}
		</h3>
		<button
			class="ml-lg flex items-center hover:rounded hover:bg-grey-200 hover:dark:bg-grey-700"
			on:click={() => targetDateInput.showPicker()}
		>
			<Calendar className="h-6 w-6 stroke-accent-light" />
			<span class="font-medium text-grey-700 dark:text-grey-300">{formattedTargetDate}</span>
		</button>
		<input
			type="date"
			class="hidden"
			bind:this={targetDateInput}
			bind:value={updatedTargetDate}
			on:change={() =>
				updateRoadmapItem(
					updatedName,
					updatedDescription,
					new Date(updatedTargetDate).toISOString()
				)}
		/>

		<div class="ml-auto flex w-fit flex-row-reverse items-center">
			{#each assignedUserProfiles as assigned}
				{#if assigned.profile}
					<img
						src={assigned.profile}
						class="-ml-md aspect-square h-8 w-8 rounded-full border border-grey-100 object-cover first:border-0 last:ml-0  dark:border-grey-800"
						alt="{assigned.name} profile image"
					/>
				{:else}
					<User
						className="border-2 -ml-md h-8 w-8 rounded-full bg-grey-100 dark:bg-grey-800 stroke-grey-700 dark:stroke-grey-300 border-grey-300 object-cover dark:border-grey-700 last:ml-0"
					/>
				{/if}
			{/each}
		</div>
	</header>

	{#if description}
		<p
			class="font-medium text-grey-700 dark:text-grey-300"
			contenteditable
			bind:textContent={updatedDescription}
			on:blur={() =>
				updateRoadmapItem(
					updatedName,
					updatedDescription,
					new Date(updatedTargetDate).toISOString()
				)}
		>
			{description}
		</p>
	{:else}
		<textarea
			bind:value={updatedDescription}
			on:blur={() =>
				updateRoadmapItem(
					updatedName,
					updatedDescription,
					new Date(updatedTargetDate).toISOString()
				)}
			placeholder="Enter a description"
			class="border-1 m-0 h-20 w-full resize-none rounded-md border-dashed border-grey-700 bg-white p-2 text-sm font-medium text-grey-700 dark:border-grey-300 dark:bg-grey-900 dark:text-grey-300 dark:placeholder:text-grey-300"
		/>
	{/if}
</section>
