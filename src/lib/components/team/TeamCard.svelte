<script lang="ts">
	export let id: string;
	export let name: string;
	export let banner: string | null = '';
	export let description: string | null = '';
</script>

<a href="/app/team/{id}" class="w-full">
	<section
		class="relative flex aspect-[3/2] h-48 w-full flex-col justify-end rounded-lg bg-grey-100 bg-cover bg-center bg-origin-border object-cover p-4 dark:bg-grey-800"
		style="background-image: {banner === ''
			? 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.6) 107.5%),'
			: ''} url({banner});"
	>
		<header>
			<span
				class="text-md font-medium {banner ? 'text-grey-200' : 'text-grey-700 dark:text-grey-200'}"
				>{name}</span
			>
		</header>
		<div>
			<p
				class="{banner
					? 'text-grey-200'
					: 'text-grey-700 dark:text-grey-200'} h-fit max-h-[4ch] overflow-hidden text-ellipsis text-sm font-medium empty:hidden"
			>
				{description}
			</p>
		</div>
	</section>
</a>
