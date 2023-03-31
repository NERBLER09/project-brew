<script lang="ts">
	export let completed: boolean;
	export let id: string;
	export let name: string;
	export let task: number;
</script>

<div>
	<input type="checkbox" class="input--checkbox" bind:checked={completed} id="{name}-sub-task" />
	<label for="{name}-sub-task" class="input--label">{name}</label>
</div>
