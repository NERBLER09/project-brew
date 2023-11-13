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
	class="absolute left-0 top-[2.5rem] z-40 flex h-fit w-screen max-w-[calc(100vw-3rem)] flex-col gap-4 rounded-2xl bg-grey-100 px-6 py-lg text-start dark:bg-grey-800 md:w-96 md:p-md lg:left-auto lg:right-0"
>
	<button
		class="dropdown--item flex flex-col items-start gap-sm"
		on:click={() => handleUpdateRole('editor')}
	>
		<span class="dropdown--label">Editor</span>
		<span class="dropdown--label text-start text-sm font-medium">
			Can update the information of this project and manage and move tasks around. Can't control who
			is invited to this project.
		</span>
	</button>
	<button
		class="dropdown--item flex flex-col items-start gap-sm"
		on:click={() => handleUpdateRole('viewer')}
	>
		<span class="dropdown--label">Viewer</span>
		<span class="dropdown--label text-start text-sm font-medium"
			>Can view this project, but can't make any modifications to it.</span
		>
	</button>
</div>
