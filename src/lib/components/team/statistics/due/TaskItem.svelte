<script lang="ts">
	export let project: number;
	export let name: string;
</script>

<div class="rounded bg-grey-200 px-2 py-3 dark:bg-grey-700">
	<input type="checkbox" class="input--checkbox" />
	<span class="ml-md font-bold text-grey-700 dark:text-grey-300">{name}</span>
</div>
