<script>
	import Edit from '$lib/assets/Edit.svelte';
	import UserAdd from '$lib/assets/User-Add.svelte';
</script>

<!-- Only shows on mobile -->
<div class="dropdown--container z-20">
	<a class="dropdown--item" href="/app/team/join">
		<Edit className="dropdown--icon" />
		<span class="dropdown--label">Join Team</span>
	</a>
	<a class="dropdown--item" href="/app/team/create">
		<UserAdd className="dropdown--icon" />
		<span class="dropdown--label">Create team</span>
	</a>
</div>
