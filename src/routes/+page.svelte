<script>
	import Header from '$lib/components/landing/Header.svelte';
	import Computer from '$lib/assets/Landing-Page/Computer.png';
	import ProjectsPage from '$lib/assets/Landing-Page/ProjectsPage.png';
	import TeamPage from '$lib/assets/Landing-Page/TeamPage.png';
	import FocusPage from '$lib/assets/Landing-Page/FocusPage.png';
</script>

<svelte:head>
	<title>Project Brew</title>
</svelte:head>

<div class="h-screen overflow-y-auto overflow-x-hidden">
	<Header />

	<main class="mx-lg md:mx-28 lg:mx-52">
		<header class="items-center md:flex">
			<div>
				<h1 class="text-2xl font-semibold text-grey-900">Do project management right</h1>
				<p class="my-md text-lg font-semibold text-grey-800">
					Start managing project easily, today for free
				</p>
				<button class="button--primary">Get started (its free)</button>
			</div>

			<img src={Computer} alt="computer on a project's page" class="mt-md aspect-[77/47]" />
		</header>

		<section class="mt-md lg:mt-2xl">
			<header>
				<h2 class="text-center text-xl font-semibold text-grey-900 lg:text-start">
					It's all there
				</h2>
			</header>

			<section class="items-start lg:flex">
				<header class="lg:mr-lg lg:w-[15.625rem] lg:min-w-[15.625rem]">
					<h3 class="text-md font-semibold text-grey-800">Project management</h3>
					<p class="mt-sm font-medium text-grey-700">
						Easily get up and running managing your projects.
					</p>
				</header>

				<img
					src={ProjectsPage}
					alt="the main projects page"
					class="mt-md aspect-[16/10] max-h-[34.5rem] w-full rounded shadow-sm shadow-grey-900"
				/>
			</section>
			<section class="mt-md items-start lg:flex">
				<header class="lg:mr-lg lg:w-[15.625rem] lg:min-w-[15.625rem]">
					<h3 class="text-md font-semibold text-grey-800">Team management</h3>
					<p class="mt-sm font-medium text-grey-700">
						Get all your team members up and running. Manage what projects they are apart of and
						view what they are working on.
					</p>
				</header>

				<img
					src={TeamPage}
					alt="the main projects page"
					class="mt-md aspect-[16/10] max-h-[34.5rem] w-full rounded shadow-sm shadow-grey-900"
				/>
			</section>
			<section class="mt-md items-start lg:flex">
				<header class="lg:mr-lg lg:w-[15.625rem] lg:min-w-[15.625rem]">
					<h3 class="text-md font-semibold text-grey-800">Focus mode</h3>
					<p class="mt-sm font-medium text-grey-700">
						Get focus on what needs to get done without switching apps.
					</p>
				</header>

				<img
					src={FocusPage}
					alt="the main projects page"
					class="mt-md aspect-[16/10] max-h-[34.5rem] w-full rounded shadow-sm shadow-grey-900"
				/>
			</section>
		</section>
	</main>
</div>
