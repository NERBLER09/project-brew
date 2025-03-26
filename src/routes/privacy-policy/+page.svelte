<script>
	import Back from '$lib/assets/Arrow/Back.svelte';
	import Logo from '$lib/assets/Logo/Logo.svelte';
</script>

<div class="h-screen overflow-y-auto">
	<header class="relative z-50 px-lg py-lg md:px-28 lg:px-52">
		<a class="hidden items-center gap-md md:flex" href="/">
			<Logo className="h-12 w-12 rounded-lg" />
			<span class="text-md font-semibold text-grey-800">Project Brew</span>
		</a>

		<a class="flex items-center gap-md md:hidden" href="/">
			<Back className="stroke-grey-900 w-8 h-8" />
			<span class="text-lg text-grey-900">Back</span>
		</a>
	</header>

	<main class="mx-lg mb-xl md:mx-28 lg:mx-52">
		<header>
			<h1 class="text-lg font-semibold text-grey-900 md:text-xl">Privacy Policy</h1>
			<p class="font-medium text-grey-700">
				This privacy policy is in affect at February 27th, 2023.
			</p>
		</header>

		<section class="mt-md">
			<header>
				<h2 class="text-md font-semibold text-grey-800 md:text-lg">Information Collected</h2>
			</header>

			<p class="font-medium text-grey-700">
				When you sign up for an account to Project Brew which also includes the welcome page, the
				follow pieces of information are collected as provided by the user:
			</p>
			<ul class="list-inside list-disc">
				<li class="font-medium text-grey-700">Email (required)</li>
				<li class="font-medium text-grey-700">Password (required)</li>
				<li class="font-medium text-grey-700">Name (required)</li>
				<li class="font-medium text-grey-700">Bio</li>
				<li class="font-medium text-grey-700">Profile picture</li>
				<li class="font-medium text-grey-700">User banner</li>
			</ul>
			<p class="mt-md font-medium text-grey-700">
				The follow other pieces can be entered and controlled by the user in there Account settings:
			</p>
			<ul class="list-inside list-disc">
				<li class="font-medium text-grey-700">Location</li>
				<li class="font-medium text-grey-700">Job/Role</li>
			</ul>
			<p class="font-medium text-grey-700">
				No personal data outside that provided by the user is collected.
			</p>
		</section>
		<section class="mt-md">
			<header>
				<h2 class="text-md font-semibold text-grey-800 md:text-lg">
					How your information is utilized
				</h2>
			</header>
			<p class="font-medium text-grey-700">
				Here is how each piece of information collected is used by Project Brew:
			</p>
			<ul class="list-inside list-disc">
				<li class="font-medium text-grey-700">
					Email - Utilized when identifying/searching for a user when inviting another person to a
					project, used for sending email notifications
				</li>
				<li class="font-medium text-grey-700">Password - Utilized for user authentication</li>
				<li class="font-medium text-grey-700">
					Name - Displayed on the home page, displayed in app to identify the user by name (includes
					team member page, about project page, manage invited members page)
				</li>
				<li class="font-medium text-grey-700">
					Bio - Displayed when viewing a persons team member page
				</li>
				<li class="font-medium text-grey-700">
					Profile picture - Collected to personalize the user's appearance
				</li>
				<li class="font-medium text-grey-700">
					User banner - Displayed on the team members page and in the settings page
				</li>
				<li class="font-medium text-grey-700">
					Location - Displayed when viewing a team members page. This is non-identifying
				</li>
				<li class="font-medium text-grey-700">
					Job/Role - Displayed when viewing a team members page. This is non-identifying
				</li>
			</ul>
		</section>
		<section class="mt-md">
			<header>
				<h2 class="text-md font-semibold text-grey-800 md:text-lg">Usage of third-parties</h2>
			</header>

			<p class="font-medium text-grey-700">
				The only 3rd party used is Google and that for user authentication (logging in and signing
				up). When using Google for signing up no information is taken from the used Google account.
			</p>
		</section>
		<section class="mt-md">
			<header>
				<h2 class="text-md font-semibold text-grey-800 md:text-lg">
					Opt out of non-necessary data collection
				</h2>
			</header>

			<p class="font-medium text-grey-700">
				The following pieces of information are required for Project Brew to function properly:
			</p>
			<ul class="list-inside list-disc">
				<li class="font-medium text-grey-700">Email</li>
				<li class="font-medium text-grey-700">Password</li>
				<li class="font-medium text-grey-700">Name</li>
			</ul>

			<p class="mt-md font-medium text-grey-700">
				The following pieces of information can be opted out of by removing them in the account
				settings:
			</p>
			<ul class="list-inside list-disc">
				<li class="font-medium text-grey-700">Bio</li>
				<li class="font-medium text-grey-700">Location</li>
				<li class="font-medium text-grey-700">Job/Role</li>
				<li class="font-medium text-grey-700">Profile picture</li>
				<li class="font-medium text-grey-700">User banner</li>
			</ul>
		</section>

		<section class="mt-md">
			<header>
				<h2 class="text-md font-semibold text-grey-800 md:text-lg">
					How to request for your data to be deleted
				</h2>
			</header>

			<p class="font-medium text-grey-700">
				You can request your account data to be deleted by emailing the following email with the
				subject line "Project Brew Account Deletion Request", the email address you use will be the
				one selected. This will permanently delete your account, all teams, and all projects you
				have created.
			</p>
			<p class="font-medium text-grey-700">Email: finnegan.beaudin@protonmail.com</p>
		</section>
		<section class="mt-md">
			<header>
				<h2 class="text-md font-semibold text-grey-800 md:text-lg">Contact</h2>
			</header>

			<p class="font-medium text-grey-700">
				If you have any questions about this privacy policy to can reach the following email address
				with the subject line "Project Brew Privacy Policy Question(s)".
			</p>
			<p class="font-medium text-grey-700">Email: finnegan.beaudin@protonmail.com</p>
		</section>
	</main>
</div>
