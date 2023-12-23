<script lang="ts">
	export let milestoneId: string | null;
	export let taskId: number;
	export let projectId: number;
	export let shown = false;
	export let positioning: string = '';
	export let milestoneName: string = '';
</script>

<div class="dropdown--container top-0 z-50">
	<div class="dropdown--item"><span class="dropdown--label">Done</span></div>
	<div class="dropdown--item"><span class="dropdown--label">To-Do</span></div>
	<div class="dropdown--item"><span class="dropdown--label">Doing</span></div>
	<div class="dropdown--item"><span class="dropdown--label">Other</span></div>
</div>
