<script lang="ts">
	import Check from '$lib/assets/Check.svelte';

	import Image from '$lib/assets/Image.svelte';
	import PlusNew from '$lib/assets/Plus-New.svelte';
	import MobileSubPageLayout from '$lib/components/layouts/MobileSubPageLayout.svelte';
</script>

<MobileSubPageLayout pageName="New Project" previousPage="/app/projects">
	<p class="font-medium text-grey-700 pt-sm pb-md">Chose what projects are displayed on top.</p>

	<form method="POST" action="/app/projects?/new">
		<section>
			<header>
				<h2 class="font-bold text-grey-700 text-md">Basic Details</h2>
			</header>
			<div>
				<input
					name="name"
					type="text"
					class="input--text w-full mb-4"
					placeholder="Enter a project name"
					required
				/>
				<textarea
					name="description"
					class="input--text resize-none h-36 w-full"
					placeholder="Enter a breif description"
				/>
			</div>
		</section>

		<section>
			<header>
				<h2 class="font-bold text-grey-700 text-md">Tags</h2>
			</header>
			<div>
				<button type="button">
					<PlusNew className="h-8 w-8 stroke-grey-700" />
					<span class="sr-only">Add new tag</span>
				</button>
			</div>
		</section>
		<section>
			<header>
				<h2 class="font-bold text-grey-700 text-md">Invite team members</h2>
			</header>
			<div>
				<button type="button">
					<PlusNew className="h-8 w-8 stroke-grey-700" />
					<span class="sr-only">Add new team member</span>
				</button>
			</div>
		</section>
		<section>
			<header>
				<h2 class="font-bold text-grey-700 text-md">Cover image</h2>
			</header>
			<div class="max-w-xl">
				<label
					class="flex justify-center w-full h-32 px-4 transition bg-white border-2 border-grey-800 border-dashed rounded-md appearance-none cursor-pointer hover:border-grey-600 focus:outline-none"
				>
					<span class="flex flex-col justify-center items-center space-x-2">
						<Image className="h-8 w-8 stroke-grey-700" />
						<span class="font-medium text-grey-700">Select a cover image</span>
					</span>
					<input type="file" name="file_upload" class="hidden" />
				</label>
			</div>
		</section>
		<button class="button--circle bottom-8 right-8 absolute" type="submit">
			<Check className="h-8 w-8 stroke-grey-200" />
			<span class="sr-only">Update pinned projects</span>
		</button>
	</form>
</MobileSubPageLayout>
