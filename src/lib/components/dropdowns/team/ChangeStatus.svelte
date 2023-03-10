<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
	const handleUpdateRole = (role: 'admin' | 'editor' | 'viewer') => {
		dispatch('update', {
			role
		});
	};
</script>

<div
	class="absolute left-0 top-[2.5rem] flex h-fit w-screen max-w-[calc(100vw-3rem)] flex-col gap-4 rounded-2xl bg-grey-100 px-6 py-lg text-start dark:bg-grey-800 md:w-96 md:p-md"
>
	<button
		class="dropdown--item flex flex-col items-start"
		on:click={() => handleUpdateRole('admin')}
	>
		<span class="dropdown--label">Admin</span>
		<span class="dropdown--label text-start text-sm font-medium">
			Allow user to modify the team's name, description, and banner. Control who is invited and what
			their status is.
		</span>
	</button>
	<button
		class="dropdown--item flex flex-col items-start"
		on:click={() => handleUpdateRole('editor')}
	>
		<span class="dropdown--label">Can Edit</span>
		<span class="dropdown--label text-start text-sm font-medium">
			Allow user to modify the team's name, description, and banner.
		</span>
	</button>
	<button
		class="dropdown--item flex flex-col items-start"
		on:click={() => handleUpdateRole('viewer')}
	>
		<span class="dropdown--label">Can View</span>
		<span class="dropdown--label text-start text-sm font-medium">Can view this team. </span>
	</button>
</div>
