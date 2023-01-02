<script>
	export let id = '';
	export let text = '';
	export let checked = false;
	export let disabled = false;
</script>

<label for={id} class="flex">
	<span class="input--label">{text}</span>
	<div class="switch">
		<input {id} name={id} type="checkbox" class="sr-only" {disabled} bind:checked />
		<div class="track" />
		<div class="thumb" />
	</div>
</label>

<style>
	.switch {
		@apply relative inline-block align-middle cursor-pointer select-none bg-none;
	}

	.track {
		@apply w-12 h-6 bg-grey-600 rounded-full;
	}

	.thumb {
		@apply transition-all duration-300 ease-in-out absolute top-0 left-0 w-6 h-6 bg-white border-2 border-grey-600 rounded-full;
	}

	input[type='checkbox']:checked ~ .thumb {
		@apply transform translate-x-full border-accent-light;
	}

	input[type='checkbox']:checked ~ .track {
		@apply transform transition-colors bg-accent-light;
	}

	input[type='checkbox']:disabled ~ .track {
		@apply bg-grey-500;
	}

	input[type='checkbox']:disabled ~ .thumb {
		@apply bg-grey-100 border-grey-500;
	}
</style>
