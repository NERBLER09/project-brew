<script>
	import Switch from '$lib/components/form/Switch.svelte';
	import { settingsPage } from '$lib/stores/ui';
	import { onMount } from 'svelte';

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
		<Switch id="project-invite" text="Invited to a project" />
		<Switch id="new-task" text="Assigned a new task" />
		<Switch id="due-tasks" text="Due Tasks" />
		<Switch id="focus-timer-up" text="When focus timer is up" />
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
		<Switch id="email-project-invite" text="Invited to a project" />
		<Switch id="email-new-task" text="Assigned a new task" />
		<Switch id="email-due-tasks" text="Due Tasks" />
	</div>
</section>
