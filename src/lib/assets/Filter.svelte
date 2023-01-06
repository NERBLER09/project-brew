<script>
	export let className = '';
	export let parentBg = '';
</script>

<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class={className}>
	<line
		x1="0.75"
		y1="-0.75"
		x2="11.25"
		y2="-0.75"
		transform="matrix(-1 0 0 1 18 16.5)"
		stroke-width="1.5"
		stroke-linecap="round"
	/>
	<line
		x1="0.75"
		y1="-0.75"
		x2="11.25"
		y2="-0.75"
		transform="matrix(-1 0 0 1 18 12.75)"
		stroke-width="1.5"
		stroke-linecap="round"
	/>
	<line
		x1="0.75"
		y1="-0.75"
		x2="11.25"
		y2="-0.75"
		transform="matrix(-1 0 0 1 18 9)"
		stroke-width="1.5"
		stroke-linecap="round"
	/>
	<path d="M14.25 7L14.25 9.5" stroke-width="1.5" stroke-linecap="round" />
	<path d="M14.25 14.5L14.25 17" stroke-width="1.5" stroke-linecap="round" />
	<path d="M9.75 10.75L9.75 13.25" stroke-width="1.5" stroke-linecap="round" />
	<path d="M11 10.75L11 13.25" stroke-linecap="round" class="stroke-{parentBg}" />
	<path d="M13 7.25L13 9.75" stroke-linecap="round" class="stroke-{parentBg}" />
	<path d="M13 14.75L13 17.25" stroke-linecap="round" class="stroke-{parentBg}" />
</svg>
