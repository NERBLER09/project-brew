<script lang="ts">
	import User from '$lib/assets/User.svelte';
	export let data: any;
</script>

<header
	style="background-image: url({data.banner});"
	class="object-cover relative rounded-b-3xl md:px-8 px-6 h-[15.625rem] flex items-end bg-center"
>
	<div class="flex items-start gap-md absolute -bottom-12 w-auto md:-bottom-8 pr-6">
		{#if data.avatar_url}
			<img
				src={data.avatar_url}
				alt="User profile"
				class="w-[6.25rem] h-[6.25rem] rounded-full aspect-square object-cover relative -top-2"
			/>
		{:else}
			<User className="w-[6.25rem] h-[6.25rem] stroke-grey-700" />
		{/if}

		<div class="mt-sm md:mt-md md:w-auto flex flex-col z-50 h-full w-full overflow-hidden">
			<h1 class="text-grey-100 text-lg md:text-xl">Settings</h1>
			<span class="md:hidden text-grey-700 font-bold inline-block">{data.name}</span>
			<span class="md:hidden text-grey-700 font-medium inline-block truncate">{data.email}</span>

			<span class="text-grey-700 font-bold hidden md:block truncate"
				>{data.name} <span class="font-medium">- {data.email}</span>
			</span>
		</div>
	</div>
</header>
