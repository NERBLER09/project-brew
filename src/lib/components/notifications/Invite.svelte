<script lang="ts">
	import type { User as Profile } from '$lib/types/projects';

	export let message: string;
	export let sentBy: Profile | null;
	export let sent: string | null;
</script>

<div class="flex items-center">
	<img src={sentBy?.avatar_url} alt="profile" class="h-10 w-10 rounded-full" />
	<div class="ml-md">
		<div>
			<span class="font-bold text-grey-700 dark:text-grey-200">{sentBy?.name}</span>
		</div>
		<div>
			<span class="text-sm font-medium text-grey-700 dark:text-grey-200">{message}</span>
		</div>
	</div>
</div>
