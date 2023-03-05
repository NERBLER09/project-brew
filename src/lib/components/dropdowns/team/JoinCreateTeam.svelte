<script>
	import Edit from '$lib/assets/Edit.svelte';
	import UserAdd from '$lib/assets/User-Add.svelte';
</script>

<!-- Only shows on mobile -->
<div class="dropdown--container">
	<span class="dropdown--item">
		<Edit className="dropdown--icon" />
		<span class="dropdown--label">Create team</span>
	</span>
	<span class="dropdown--item">
		<UserAdd className="dropdown--icon" />
		<span class="dropdown--label">Create team</span>
	</span>
</div>
