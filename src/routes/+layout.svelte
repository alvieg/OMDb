<script>
	import NavBar from '$lib/components/NavBar.svelte';
</script>

<div class="nav">
	<NavBar />
</div>

<slot />

<style>
	:global(body) {
		min-height: 100vh;
		width: 100%;
		overflow-x: hidden;
		margin: 0;
		border: none;
	}

	.nav {
		position: sticky;
		top: 0; /* stick to top */
		z-index: 1000; /* stay above other content */
	}
</style>
