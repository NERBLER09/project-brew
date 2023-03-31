<script lang="ts">
	import Check from '$lib/assets/Check.svelte';
	import MobileSubPageLayout from '$lib/components/layouts/MobileSubPageLayout.svelte';
	import { currentProject } from '$lib/stores/project';
	import { enhance } from '$app/forms';
	import toast from 'svelte-french-toast';
	import { goto } from '$app/navigation';
	import type { PageData } from './$types';
	import AssignLead from '$lib/components/projects/milestones/AssignLead.svelte';

	export let data: PageData;

	let milestoneLead = '';
</script>

<svelte:head>
	<title>New Milestone</title>
</svelte:head>

<MobileSubPageLayout
	pageName="New Milestone"
	previousPage="/app/projects/{$currentProject.id}/milestones"
>
	<form
		method="POST"
		class="mt-md"
		use:enhance={() => {
			return async ({ result }) => {
				if (result.type === 'failure') {
					toast.error(`Failed to create milestone: ${result.data.errMsg}`);
				} else if (result.type === 'success') {
					toast.success('Created new milestone');
					goto(`/app/projects/${$currentProject.id}/milestones/${result.data.milestone}`);
				}
			};
		}}
	>
		<input
			type="text"
			class="input--text w-full"
			placeholder="What should this milestone be called?"
			required
			name="name"
		/>

		<textarea
			name="description"
			class="input--text mt-md h-36 w-full resize-none"
			placeholder="Write something about this milestone"
		/>

		<div class="mt-md">
			<label for="start-date" class="input--label">Start date:</label>
			<input type="date" class="input--text" id="start-date" required name="start-date" />
		</div>
		<div class="mt-md">
			<label for="end-date" class="input--label">End date:</label>
			<input type="date" class="input--text" id="end-date" required name="end-date" />
		</div>

		<AssignLead invited_users={data.project?.invited.users} bind:milestoneLead />
		<input type="text" class="hidden" name="lead" bind:value={milestoneLead} />

		<button class="button--circle absolute bottom-8 right-8" type="submit">
			<Check className="h-8 w-8 stroke-grey-200" />
			<span class="sr-only">Create new milestone</span>
		</button>
	</form>
</MobileSubPageLayout>
