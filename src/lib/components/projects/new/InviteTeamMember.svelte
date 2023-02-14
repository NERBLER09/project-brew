<script lang="ts">
	import PlusNew from '$lib/assets/Plus-New.svelte';

	import type { User as Profile } from '$lib/types/projects';
	export let invitedMembers: Profile[];
</script>

<section>
	<header>
		<h2 class="text-md font-bold text-grey-700 dark:text-grey-200">Invite team members</h2>
	</header>
	<div>
		<button type="button">
			<PlusNew className="h-8 w-8 stroke-grey-700 dark:stroke-grey-200" />
			<span class="sr-only">Add new team member</span>
		</button>
	</div>
</section>
