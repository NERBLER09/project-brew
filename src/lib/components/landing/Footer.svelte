<script>
	import Logo from '$lib/assets/Logo/Logo.svelte';
</script>

<footer
	class="mt-xl flex h-[18.75rem] flex-col items-center justify-center bg-grey-100 py-2xl md:h-[12.5rem] md:flex-row md:justify-start md:gap-2xl md:px-28 lg:px-52"
>
	<div>
		<div class="flex items-center gap-md">
			<Logo className="h-12 w-12 rounded-lg bg-grey-300" />
			<span class="text-md font-semibold text-grey-800">Project Brew</span>
		</div>
		<p class="mt-md font-medium text-grey-700">Created by Noah Beaudin</p>
		<p class="mt-md font-medium text-grey-700">&#169; 2023 Noah Beaudin</p>
	</div>
	<nav class="mt-lg flex flex-col gap-md text-center md:text-start">
		<a
			href="https://github.com/NERBLER09/project-brew/issues/new"
			rel="noreferrer"
			target="_blank"
			class="font-bold text-grey-700">Report an issue</a
		>
		<a href="/credits" class="font-bold text-grey-700">Credits </a>
		<a
			href="https://github.com/NERBLER09/project-brew"
			target="_blank"
			rel="noreferrer"
			class="font-bold text-grey-700">Source code</a
		>
		<a href="#" class="font-bold text-grey-700"> Privacy policy </a>
	</nav>
</footer>
