<script>
	import NavBar from '$lib/components/NavBar.svelte';
</script>

<NavBar />

<slot />

<style>
	:global(body) {
		min-height: 100vh;
		width: 100%;
		overflow-x: hidden;
		margin: 0;
		border: none;
	}
</style>
