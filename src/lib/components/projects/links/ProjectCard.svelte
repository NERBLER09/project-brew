<script lang="ts">
	export let id: string;
	export let project_name: string;
	export let banner: string = '';
	export let description: string = '';
	export let invited_people: string[] = [];
	export let tags: string[] = [];
</script>

<a href="/app/projects/{id}">
	<section
		href="/app/projects/{id}"
		class="bg-grey-100 p-4 rounded-lg w-72 h-48 flex flex-col justify-end relative"
	>
		<div class="relative z-50">
			<header>
				<span class="text-md font-medium {banner ? 'text-grey-200' : 'text-grey-700'}"
					>{project_name}</span
				>
			</header>
			<div>
				<p
					class="{banner
						? 'text-grey-200'
						: 'text-grey-700'} text-sm font-medium h-[4ch] overflow-hidden text-ellipsis empty:hidden"
				>
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
		</div>
		<img
			src={banner}
			alt="project banner"
			class="absolute top-0 left-0 rounded-lg w-72 h-48 {banner
				? 'block'
				: 'hidden'} aspect-[2/3] object-cover object-center "
		/>
	</section>
</a>
