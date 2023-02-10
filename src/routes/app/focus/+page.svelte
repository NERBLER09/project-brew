<script lang="ts">
	import Left from '$lib/assets/Arrow/Chevron/Left.svelte';
	import PlusNew from '$lib/assets/Plus-New.svelte';

	let strokeArray = 360;
</script>

<svelte:head>
	<title>Project Brew - Focus</title>
</svelte:head>

<header>
	<h1 class="text-lg text-grey-800 dark:text-grey-100 md:text-2xl">Focus</h1>
</header>

<section class="mt-md flex flex-col items-center">
	<div
		class="relative flex aspect-square h-[15.625rem] w-[15.625rem] items-center justify-center gap-sm rounded-full"
	>
		<div class="absolute">
			<svg class="h-[15.625rem] w-[15.625rem]">
				<circle
					cx="125"
					cy="125"
					class="fill-none stroke-grey-200 dark:stroke-grey-700"
					stroke-width="15"
					r="115"
				/>
				<circle
					cx="125"
					cy="125"
					r="115"
					class="fill-none stroke-accent-light transition-all duration-300 ease-in"
					stroke-dashoffset={strokeArray - (strokeArray * 50) / 100}
					stroke-dasharray={strokeArray}
					stroke-linecap="round"
					stroke-width="15"
					transform="rotate(90 125 125)"
				/>
			</svg>
		</div>
		<!-- Add content here -->
	</div>

	<button class="button--secondary mt-lg flex items-center gap-md">
		Select a project to focus on
		<Left className="stroke-grey-700 dark:stroke-grey-200 w-6 h-6" />
	</button>

	<div class="mt-md">
		<label for="notify" class="input--label">Notify me when I am done</label>
		<input type="checkbox" class="input--checkbox" id="notify" />
	</div>

	<section class="mt-md">
		<header>
			<div class="input--text mb-sm flex w-full items-center">
				<input
					type="text"
					placeholder="Search by email to invite people"
					class="input--text m-0 w-full p-0"
				/>
				<button>
					<PlusNew
						className="stroke-grey-700 dark:stroke-grey-200 w-[1.125rem] h-[1.125rem] ml-auto"
					/>
				</button>
			</div>

			<h2 class="text-md font-semibold text-grey-700 dark:text-grey-200">Blocked urls</h2>
		</header>
	</section>
	<button class="button--primary mt-lg">Start</button>
</section>
