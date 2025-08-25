<script>
	import Logo from '$lib/assets/Logo/Logo.svelte';
</script>

<div class="grid grid-cols-4 grid-rows-3 gap-md">
	<div
		class="col-span-2 col-start-2 row-start-2 flex h-32 items-center justify-center gap-md rounded-lg bg-grey-200 p-3 shadow-md shadow-grey-700"
	>
		<Logo className="h-12 w-12 rounded-lg" />
		<span class="text-md font-semibold text-grey-800">Project Brew</span>
	</div>
	<div class="h-32 rounded-lg bg-grey-200 p-3 shadow-md shadow-grey-700">
		<span class="font-medium text-grey-700">Clean dashboard page</span>
	</div>
	<div><span class="font-medium text-grey-700">Projects</span></div>
	<div><span class="font-medium text-grey-700">Manage milestones</span></div>
	<div><span class="font-medium text-grey-700">Board</span></div>
	<div><span class="font-medium text-grey-700">Table</span></div>
	<div><span class="font-medium text-grey-700">Keep notes with pages</span></div>
	<div><span class="font-medium text-grey-700">Stay focused on what matters</span></div>
	<div><span class="font-medium text-grey-700">Collaberate with your entire team</span></div>
	<div><span class="font-medium text-grey-700">Manage and track your teams progress</span></div>
</div>
