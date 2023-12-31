<script lang="ts">
	import { startCase } from 'lodash';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<header>
	<h1 class="text-lg text-grey-800 dark:text-grey-200 md:text-2xl">Search</h1>
	<h2 class="text-md font-semibold text-grey-800 dark:text-grey-100 md:text-lg">
		Searching for: {startCase(data.search.query)}
	</h2>
</header>
