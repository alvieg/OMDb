<script>
	import DetailPage from '$lib/components/DetailPage.svelte';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	let data = null;
	let error = null;
	let loading = true;

	// reactive param
	$: id = $page.params.id;

	async function loadDetails() {
		loading = true;
		try {
			const res = await fetch(`/api/details?id=${id}&type=tv`);
			if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);
			data = await res.json();
		} catch (e) {
			error = e.message;
		} finally {
			loading = false;
		}
	}

	onMount(loadDetails);
</script>

{#if loading}
	<p>Loading...</p>
{:else if error}
	<p class="error">{error}</p>
{:else}
	<DetailPage {data} />
{/if}

<style>
	.error {
		color: red;
		font-weight: bold;
		margin: 1rem;
	}
</style>
