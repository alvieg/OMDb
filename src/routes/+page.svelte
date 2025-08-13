<script>
	import { onMount } from 'svelte';
	import MovieCard from '$lib/components/MovieCard.svelte';

	let featured = null;
	let error = null;

	async function loadHero() {
		try {
			const res = await fetch('/api/details?id=tt31036941');
			if (!res.ok) throw new Error('Failed to fetch featured movie');
			featured = await res.json();
		} catch (e) {
			console.error(e);
			error = e.message;
		}
	}

	onMount(loadHero);
</script>

<main>
	{#if error}
		<p class="error">Sorry, something went wrong: {error}</p>
	{:else if featured}
		<section
			class="hero"
			style="background-image: url('{featured.Poster !== 'N/A' ? featured.Poster : ''}')"
			aria-label="Featured Movie"
		>
			<div class="overlay">
				<h1>{featured.Title} <span class="year">({featured.Year})</span></h1>
				<p class="genre-rating">
					{featured.Genre} &bull; Rated: {featured.imdbRating !== 'N/A' ? featured.imdbRating : '—'}
				</p>
				<p class="plot">{featured.Plot !== 'N/A' ? featured.Plot : 'No plot available.'}</p>
				<a
					href={`/movie/${featured.imdbID}`}
					class="btn"
					aria-label={`See details for ${featured.Title}`}
				>
					See Details
				</a>
			</div>
		</section>
	{:else}
		<p>Loading featured movie...</p>
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

	.error {
		color: #ff5555;
		text-align: center;
		margin-top: 2rem;
		font-weight: bold;
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

	.genre-rating {
		font-size: 1rem;
		margin-bottom: 1rem;
		color: #ccc;
		text-shadow: 1px 1px 6px rgba(0, 0, 0, 0.7);
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

		.genre-rating {
			font-size: 0.9rem;
		}

		.plot {
			font-size: 1rem;
		}
	}
</style>
