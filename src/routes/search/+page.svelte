<script>
	import { page } from '$app/stores';
	import MovieCard from '$lib/components/MovieCard.svelte';

	let results = {};
	let loading = false;

	// Reactive query and type from URL search params
	$: query = $page.url.searchParams.get('q') || '';
	$: type = $page.url.searchParams.get('type') || 'multi'; // default to multi

	async function getResults() {
		if (!query) {
			results = {};
			return;
		}
		loading = true;
		try {
			const res = await fetch(`/api/search?q=${encodeURIComponent(query)}&type=${type}`);
			results = await res.json();
		} catch (e) {
			console.error(e);
			results = {};
		} finally {
			loading = false;
		}
	}

	// ✅ Fetch whenever query or type changes
	$: if (query) {
		getResults();
	}
</script>

<main>
	{#if loading}
		<p class="loading">Loading Search Results...</p>
	{:else if results.results?.length > 0}
		<div class="results-grid">
			{#each results.results as result (result.id)}
				<MovieCard data={result} />
			{/each}
		</div>
	{:else if query}
		<p class="no-results">No results found for <span>{query}</span></p>
	{/if}
</main>

<style>
	main {
		max-width: 1200px;
		margin: 0 auto;
		padding: 2rem 1rem;
	}

	.loading,
	.no-results {
		text-align: center;
		font-size: 1.2rem;
		color: #555;
	}

	.no-results span {
		color: blueviolet;
		font-weight: bold;
	}

	.results-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
		gap: 1.5rem;
		margin-top: 1.5rem;
	}

	@media (max-width: 600px) {
		.results-grid {
			grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
			gap: 1rem;
		}
	}
</style>
