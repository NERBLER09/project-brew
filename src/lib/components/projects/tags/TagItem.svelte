<script lang="ts">
	export let tag: string;
	export let sm = false;
</script>

<div class="w-fit rounded bg-grey-200  dark:bg-grey-700 {!sm ? 'py-2 px-3' : ' py-1 px-2'}">
	<span class="font-medium text-grey-700 dark:text-grey-200">{tag}</span>
</div>
