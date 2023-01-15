<script lang="ts">
	import Check from "$lib/assets/Check.svelte";
	import CircleCheck from "$lib/assets/Fill/CircleCheck.svelte";
    import Dark from "$lib/assets/Theme/Dark.svelte";
    import Light from "$lib/assets/Theme/Light.svelte";
    import System from "$lib/assets/Theme/System.svelte";

    type Theme = "light" | "dark" | "system"
    let selectedTheme: Theme = "light"
</script>
<section>
	<header>
		<h2 class="text-lg text-grey-700 font-semibold">Theme</h2>
	</header>

	<div class="flex flex-wrap gap-6 mt-md">
		<button class="relative text-start" on:click={() => selectedTheme = "light"}>
            {#if selectedTheme === "light"}
                <CircleCheck className="fill-accent-light w-8 h-8 absolute -top-4 -right-4"/>
            {/if}
            <div class="p-sm {selectedTheme === "light" ? 'border-accent-light' : 'border-grey-700'} border-2 rounded-lg mb-md">
                <Light/>
            </div>
            <span class="{selectedTheme === "light" ? 'text-accent-light' : 'text-grey-700'} font-bold">Light</span>
        </button>
		<button class="relative text-start" on:click={() => selectedTheme = "dark"}>
            {#if selectedTheme === "dark"}
                <CircleCheck className="fill-accent-light w-8 h-8 absolute -top-4 -right-4"/>
            {/if}
            <div class="p-sm {selectedTheme === "dark" ? 'border-accent-light' : 'border-grey-700'} border-2 rounded-lg mb-md">
                <Dark/>
            </div>
            <span class="{selectedTheme === "dark" ? 'text-accent-light' : 'text-grey-700'} font-bold">Dark</span>
        </button>
		<button class="relative text-start" on:click={() => selectedTheme = "system"}>
            {#if selectedTheme === "system"}
                <CircleCheck className="fill-accent-light w-8 h-8 absolute -top-4 -right-4"/>
            {/if}
            <div class="p-sm {selectedTheme === "system" ? 'border-accent-light' : 'border-grey-700'} border-2 rounded-lg mb-md">
                <System/>
            </div>
            <span class="{selectedTheme === "system" ? 'text-accent-light' : 'text-grey-700'} font-bold">System</span>
        </button>

		<button class="md:hidden button--circle bottom-32 right-8 fixed z-50">
			<Check className="h-8 w-8 stroke-grey-200" />
			<span class="sr-only">Save info</span>
		</button>
		<button class="button--primary absolute right-0 -top-36 z-50 hidden md:block">
			<span>Save changes</span>
		</button>
	</div>
</section>
