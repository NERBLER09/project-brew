<script lang="ts">
	export let id: string;
	export let project_name: string;
	export let banner: string = '';
	export let description: string = '';
	export let invited_people: string[] = [];
	export let tags: string[] = [];
</script>

<section
	href="/app/projects/{id}"
	class="bg-grey-100 p-4 rounded-lg w-72 h-44 pt-[4.7rem] flex flex-col justify-end"
>
	<header>
		<span class="text-md font-medium text-grey-700">{project_name}</span>
	</header>
	<div>
		<p class="text-grey-700 text-sm font-medium h-[4ch] overflow-hidden text-ellipsis empty:hidden">
			{description}
		</p>

		<div class="flex items-center gap-md flex-wrap pt-sm empty:hidden">
			{#each tags as tag}
				<div class="bg-grey-200 py-1 px-2 w-fit rounded">
					<span class="text-grey-700 text-sm font-medium">{tag}</span>
				</div>
			{/each}
		</div>
	</div>
</section>
