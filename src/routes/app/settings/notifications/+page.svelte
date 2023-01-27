<script>
	import Switch from '$lib/components/form/Switch.svelte';
</script>

<section>
	<header>
		<h2 class="font-semibold text-grey-900 dark:text-grey-100 text-lg mb-sm">Push Notifications</h2>
		<p class="text-grey-700 dark:text-grey-200 font-medium">
			Control what you get a push notification from.
		</p>
	</header>
	<div class="flex flex-col gap-md mt-md">
		<Switch id="project-invite" text="Invited to a project" />
		<Switch id="new-task" text="Assigned a new task" />
		<Switch id="due-tasks" text="Due Tasks" />
		<Switch id="focus-timer-up" text="When focus timer is up" />
	</div>
</section>

<section class="mt-md">
	<header>
		<h2 class="font-semibold text-grey-900 dark:text-grey-100 text-lg mb-sm">
			Email Notifications
		</h2>
		<p class="text-grey-700 dark:text-grey-200 font-medium">
			Control what you relative an email from.
		</p>
	</header>
	<div class="flex flex-col gap-md mt-md">
		<Switch id="email-project-invite" text="Invited to a project" />
		<Switch id="email-new-task" text="Assigned a new task" />
		<Switch id="email-due-tasks" text="Due Tasks" />
	</div>
</section>

