<script lang="ts">
	import MoreHorizontal from '$lib/assets/More Horizontal.svelte';
	import PlusNew from '$lib/assets/Plus-New.svelte';

	export let name: string;
</script>

<section class="w-[15.625rem] md:w-[25rem]">
	<header class="flex items-center">
		<h2 class="text-grey-900 font-semibold text-lg mb-md md:mb-lg">{name}</h2>
		<button class="ml-auto">
			<MoreHorizontal className="stroke-grey-700 h-8 w-8" />
		</button>
	</header>
	<button class="button--secondary w-full flex items-center gap-md justify-center">
		<PlusNew className="w-6 h-6 stroke-grey-700" />
		New task
	</button>
</section>
