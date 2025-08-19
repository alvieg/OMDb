<script>
	import { onMount } from 'svelte';
	import MovieCard from '$lib/components/MovieCard.svelte';

	let popular = [];
	let featured = null;
	let error = null;
	let loading = true;

	async function loadPopular() {
		try {
			const res = await fetch('/api/popular?type=movie&page=1');
			if (!res.ok) throw new Error(`Failed to fetch popular movies: ${res.status}`);
			const data = await res.json();
			popular = data.results || [];

			// pick the first movie as featured
			if (popular.length > 0) {
				featured = popular[0];
			}
		} catch (e) {
			console.error(e);
			error = e.message;
		} finally {
			loading = false;
		}
	}

	onMount(loadPopular);
</script>

<main>
	{#if loading}
		<p class="loading">Loading popular movies...</p>
	{:else if error}
		<p class="error">{error}</p>
	{:else}
		{#if featured}
			<section
				class="hero"
				style="background-image: url('https://image.tmdb.org/t/p/w780{featured.backdrop_path}')"
				aria-label="Featured Movie"
			>
				<div class="overlay">
					<h1>{featured.title} <span class="year">({featured.release_date?.slice(0, 4)})</span></h1>
					<p class="plot">{featured.overview}</p>
					<a href={`/movie/${featured.id}`} class="btn">See Details</a>
				</div>
			</section>
		{/if}

		<h2 class="section-title">Popular Movies</h2>
		<div class="results-grid">
			{#each popular as movie (movie.id)}
				<MovieCard data={movie} />
			{/each}
		</div>
	{/if}
</main>

<style>
	main {
		background-color: #111;
		color: #eee;
		min-height: 100vh;
		padding: 1rem 2rem;
		font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
	}

	.loading,
	.error {
		text-align: center;
		font-size: 1.2rem;
		margin-top: 2rem;
		color: #ff5555;
	}

	.hero {
		position: relative;
		height: 450px;
		background-size: cover;
		background-position: center;
		border-radius: 12px;
		overflow: hidden;
		display: flex;
		align-items: flex-end;
		margin-bottom: 2rem;
		box-shadow: inset 0 0 150px #000000cc;
	}

	.overlay {
		background: linear-gradient(180deg, transparent, rgba(0, 0, 0, 0.85));
		width: 100%;
		padding: 2rem;
	}

	.overlay h1 {
		margin: 0 0 0.25rem 0;
		font-size: 3rem;
		color: white;
		text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.85);
		display: flex;
		align-items: baseline;
		gap: 0.5rem;
	}

	.year {
		font-weight: 400;
		font-size: 1.8rem;
		color: #bbb;
	}

	.plot {
		font-size: 1.1rem;
		line-height: 1.5;
		max-width: 700px;
		margin-bottom: 1.5rem;
		color: #ddd;
		text-shadow: 1px 1px 6px rgba(0, 0, 0, 0.7);
	}

	.btn {
		background-color: blueviolet;
		color: white;
		padding: 0.7rem 1.4rem;
		border-radius: 30px;
		font-weight: bold;
		text-decoration: none;
		transition: background-color 0.3s ease;
		user-select: none;
	}

	.btn:hover,
	.btn:focus {
		background-color: rebeccapurple;
		outline: none;
	}

	.section-title {
		font-size: 2rem;
		margin: 2rem 0 1rem;
		color: #eee;
	}

	.results-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
		gap: 1rem;
	}

	@media (max-width: 700px) {
		.hero {
			height: 300px;
		}
		.overlay h1 {
			font-size: 2rem;
		}
		.year {
			font-size: 1.2rem;
		}
		.plot {
			font-size: 1rem;
		}
	}
</style>
