<script lang="ts">
	import type { ComponentType } from 'svelte';

	export let name: string;
	export let page: string;
	export let icon: ComponentType;
</script>

<a
	href={page}
	class="flex items-center gap-md rounded px-md py-sm font-bold text-grey-700 hover:bg-grey-100 dark:text-grey-200 hover:dark:bg-grey-800"
>
	<svelte:component this={icon} className="stroke-grey-700 dark:stroke-grey-200 w-6 h-6" />
	{name}
</a>
