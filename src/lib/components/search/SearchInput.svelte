<script lang="ts">
	import { goto } from '$app/navigation';
	import { search } from '$lib/api/search';
	import Search from '$lib/assets/Search.svelte';

	const handleSearch = async () => {
		await goto(`/app/search?query=${$search}`);
	};
</script>

<!-- TODO: Implement app wide search -->
<form on:submit|preventDefault={handleSearch} class="mt-4">
	<div class="input--search dark:border-grey-300 dark:bg-grey-800">
		<Search className="stroke-grey-700 w-6 h-6 dark:stroke-grey-300" />
		<input
			type="text"
			placeholder="Search"
			class="w-full border-none bg-grey-200 p-0 dark:bg-grey-800 dark:text-grey-300 dark:placeholder:text-grey-300"
			bind:value={$search}
		/>
	</div>
</form>
