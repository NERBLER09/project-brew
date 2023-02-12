<script lang="ts">
	import Switch from '$lib/components/form/Switch.svelte';
	import { settingsPage } from '$lib/stores/ui';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	let pushInvited = data.notifcations_settings.push.invited;
	let pushAssigned = data.notifcations_settings.push.assigned;
	let pushDueTask = data.notifcations_settings.push.dueTask;
	let pushFocusTimerUp = data.notifcations_settings.push.timerUp;

	let emailInvited = data.notifcations_settings.email.invited;
	let emailAssigned = data.notifcations_settings.email.assigned;
	let emailDueTask = data.notifcations_settings.email.dueTask;

	onMount(() => {
		$settingsPage = 'Notifications';
	});
</script>

<section>
	<header>
		<h2 class="mb-sm text-lg font-semibold text-grey-900 dark:text-grey-100">Push Notifications</h2>
		<p class="font-medium text-grey-700 dark:text-grey-200">
			Control what you get a push notification from.
		</p>
	</header>
	<div class="mt-md flex flex-col gap-md">
		<Switch id="project-invite" text="Invited to a project" bind:checked={pushInvited} />
		<Switch id="new-task" text="Assigned a new task" bind:checked={pushAssigned} />
		<Switch id="due-tasks" text="Due Tasks" bind:checked={pushDueTask} />
		<Switch id="focus-timer-up" text="When focus timer is up" bind:checked={pushFocusTimerUp} />
	</div>
</section>

<section class="mt-md">
	<header>
		<h2 class="mb-sm text-lg font-semibold text-grey-900 dark:text-grey-100">
			Email Notifications
		</h2>
		<p class="font-medium text-grey-700 dark:text-grey-200">
			Control what you relative an email from.
		</p>
	</header>
	<div class="mt-md flex flex-col gap-md">
		<Switch id="email-project-invite" text="Invited to a project" bind:checked={emailInvited} />
		<Switch id="email-new-task" text="Assigned a new task" bind:checked={emailAssigned} />
		<Switch id="email-due-tasks" text="Due Tasks" bind:checked={emailDueTask} />
	</div>
</section>
