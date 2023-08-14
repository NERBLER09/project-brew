<script lang="ts">
	import { userTeams } from '$lib/stores/project';
	import type { PageData } from './$types';

	export let data: PageData;

	$userTeams = data.project?.user_teams ?? [];
</script>

<slot />
