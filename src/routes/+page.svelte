<script>
	import Header from '$lib/components/landing/Header.svelte';
	import Computer from '$lib/assets/Landing-Page/Computer.png';
	import ProjectsPage from '$lib/assets/Landing-Page/ProjectsPage.png';
	import TeamPage from '$lib/assets/Landing-Page/TeamPage.png';
	import FocusPage from '$lib/assets/Landing-Page/FocusPage.png';
	import Lock from '$lib/assets/Landing-Page/Lock.svelte';
	import Github from '$lib/assets/Landing-Page/Github.svelte';
	import CreditCard from '$lib/assets/Landing-Page/CreditCard.svelte';
	import Community from '$lib/assets/Community.svelte';
	import Footer from '$lib/components/landing/Footer.svelte';
</script>

<svelte:head>
	<title>Project Brew</title>
	<meta
		name="description"
		content="Project Brew is an free and open source project and team manager to start managing projects with everything you need."
	/>
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
				<a href="/sign-up" class="button--primary">Get started (its free)</a>
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
					class="mt-md aspect-[16/10] max-h-[34.5rem] w-full max-w-[53.4375rem] rounded shadow-sm  shadow-grey-900"
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
					class="mt-md aspect-[16/10] max-h-[34.5rem] w-full max-w-[53.4375rem] rounded shadow-sm shadow-grey-900"
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
					class="mt-md aspect-[16/10] max-h-[34.5rem] w-full max-w-[53.4375rem] rounded shadow-sm  shadow-grey-900"
				/>
			</section>
		</section>

		<section class="mt-md">
			<header>
				<h2 class="text-center text-lg font-semibold text-grey-800">Still not sure</h2>
			</header>

			<div class="flex-center mt-md flex flex-col flex-wrap gap-md md:flex-row md:justify-center">
				<section class="text-center md:w-[18.75rem]">
					<header>
						<Lock className="h-14 w-14 stroke-grey-700 mx-auto" />
						<h3 class="text-md font-semibold text-grey-700">Secure</h3>
					</header>
					<div class="mt-sm">
						<p class="font-medium text-grey-700">
							Have piece of mind that no personal information is sold to third parties and is
							entirely manageable by you. Read our privacy policy, it wont even take you 5 minutes
						</p>
					</div>
				</section>
				<section class="text-center md:w-[18.75rem]">
					<header>
						<Github className="h-14 w-14 fill-grey-700 mx-auto" />
						<h3 class="text-md font-semibold text-grey-700">Open source</h3>
					</header>
					<div class="mt-sm">
						<p class="font-medium text-grey-700">
							Have complete access to the projects source code. Contribute ideas, code, and submit
							bug reports.
						</p>
					</div>
				</section>
				<section class="text-center md:w-[18.75rem]">
					<header>
						<CreditCard className="h-14 w-14 stroke-grey-700 mx-auto" />
						<h3 class="text-md font-semibold text-grey-700">Free forever</h3>
					</header>
					<div class="mt-sm">
						<p class="font-medium text-grey-700">
							Manage how many projects with how many team members you want without paying a cent.
						</p>
					</div>
				</section>
				<section class="text-center md:w-[18.75rem]">
					<header>
						<Community className="h-14 w-14 stroke-grey-700 mx-auto" />
						<h3 class="text-md font-semibold text-grey-700">Community supported</h3>
					</header>
					<div class="mt-sm">
						<p class="font-medium text-grey-700">
							Funding is provided by the community through donations. No corporate funding has nor
							will be taken
						</p>
					</div>
				</section>
			</div>
		</section>
	</main>
	<Footer />
</div>
