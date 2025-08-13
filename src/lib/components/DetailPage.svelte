<script>
	export let data = {};

	const typeLabel =
		{
			movie: 'Movie',
			series: 'TV Show',
			episode: 'Episode'
		}[data.Type?.toLowerCase()] || data.Type;
</script>

<div class="detail">
	<img
		class="poster"
		src={data.Poster !== 'N/A' ? data.Poster : '/placeholder.png'}
		alt={data.Title}
	/>

	<div class="info">
		<h1>{data.Title}</h1>
		<p class="meta">
			<span>{typeLabel}</span> • {data.Year} • {data.Rated} • {data.Runtime}
		</p>
		<p class="genre">{data.Genre}</p>
		<p class="plot">{data.Plot}</p>

		<div class="ratings">
			{#each data.Ratings as rating}
				<div class="rating">
					<strong>{rating.Source}:</strong>
					{rating.Value}
				</div>
			{/each}
		</div>

		<p class="actors"><strong>Actors:</strong> {data.Actors}</p>
		<p class="director"><strong>Director:</strong> {data.Director}</p>
		<p class="writer"><strong>Writer:</strong> {data.Writer}</p>
	</div>
</div>

<style>
	.detail {
		display: flex;
		flex-wrap: wrap;
		background: white;
		border-radius: 10px;
		box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
		padding: 1.5rem;
		gap: 2rem;
		max-width: 1000px;
		margin: 2rem auto;
	}

	.poster {
		width: 300px;
		border-radius: 8px;
		object-fit: cover;
	}

	.info {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	h1 {
		margin: 0;
		font-size: 2rem;
		color: #222;
	}

	.meta {
		color: #666;
		font-size: 0.95rem;
	}

	.genre {
		color: blueviolet;
		font-weight: 600;
	}

	.plot {
		margin: 1rem 0;
		line-height: 1.5;
	}

	.ratings {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem;
	}

	.rating {
		background: #f7f7f7;
		padding: 0.4rem 0.6rem;
		border-radius: 6px;
		font-size: 0.9rem;
	}

	@media (max-width: 768px) {
		.detail {
			flex-direction: column;
			align-items: center;
		}

		.poster {
			width: 100%;
			max-width: 350px;
		}
	}
</style>
