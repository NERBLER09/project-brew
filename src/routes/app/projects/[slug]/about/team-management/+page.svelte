<script>
	import Back from '$lib/assets/Arrow/Back.svelte';
	import User from '$lib/assets/User.svelte';
	import TeamMember from '$lib/components/team/project/TeamMember.svelte';
	import { currentProject } from '$lib/stores/project';
</script>

<header
	class="relative -top-6 -left-6 flex w-[calc(100%+48px)] items-end rounded-b-3xl bg-cover bg-center object-cover p-4 {!$currentProject.banner
		? 'static w-fit'
		: 'h-[12.5rem]'}"
	style="background-image: url({$currentProject.banner});"
>
	<a class="flex items-center gap-md" href="/app/projects/{$currentProject.id}/about">
		<Back
			className="w-8 h-8 aspect-square {$currentProject.banner
				? 'stroke-grey-200'
				: 'stroke-grey-700 dark:stroke-grey-200'}"
		/>
		<h1
			class="w-fit text-lg {$currentProject.banner
				? 'text-grey-200'
				: 'text-grey-700 dark:text-grey-200'} truncate"
		>
			Manage invited members
		</h1>
	</a>
</header>

<div class="input--text flex w-full items-center">
	<input
		type="text"
		placeholder="Search by name or email to invite people"
		class="input--text m-0 w-full p-0"
	/>
	<button>
		<User className="stroke-grey-700 dark:stroke-grey-200 w-[1.125rem] h-[1.125rem] ml-auto" />
	</button>
</div>

<section class="mt-md">
	<header>
		<h2 class="text-md font-semibold text-grey-700 dark:text-grey-200">Invited team members</h2>
	</header>
	<div>
		<div class="mt-md flex w-full flex-col items-start gap-lg md:grid md:grid-cols-2">
			{#each $currentProject.invited_people as id}
				<TeamMember {id} />
			{/each}
		</div>
	</div>
</section>
