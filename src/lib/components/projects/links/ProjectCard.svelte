<script lang="ts">
	export let id: number;
	export let project_name: string;
	export let banner: string | null = '';
	export let description: string | null = '';
	export let invited_people: string[] | null = [];
	export let tags: string[] = [];
</script>

<a href="/app/projects/{id}">
	<section
		href="/app/projects/{id}"
		class="md:max-w-72 relative flex aspect-[3/2] h-48 w-72 flex-col justify-end rounded-lg bg-grey-100 bg-cover bg-center bg-origin-border object-cover p-4 dark:bg-grey-800 md:h-full md:max-h-48 md:w-full"
		style="background-image: url({banner});"
	>
		<header>
			<span
				class="text-md font-medium {banner ? 'text-grey-200' : 'text-grey-700 dark:text-grey-200'}"
				>{project_name}</span
			>
		</header>
		<div>
			<p
				class="{banner
					? 'text-grey-200'
					: 'text-grey-700 dark:text-grey-200'} h-[4ch] overflow-hidden text-ellipsis text-sm font-medium empty:hidden"
			>
				{description}
			</p>

			<div class="flex flex-wrap items-center gap-md pt-sm empty:hidden">
				{#each tags as tag}
					<div class="w-fit rounded bg-grey-200 py-1 px-2">
						<span class="text-sm font-medium text-grey-700">{tag}</span>
					</div>
				{/each}
			</div>
		</div>
	</section>
</a>
