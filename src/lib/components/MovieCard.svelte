<script>
	import { goto } from '$app/navigation';

	export let data = {};
	function onclick() {
		// OMDb's Type is already lowercase (e.g., "movie", "series", "episode")
		const type = data.Type?.toLowerCase();
		if (type && data.imdbID) {
			goto(`/${type}/${data.imdbID}`);
		}
	}
</script>

<div class="card" on:click={onclick}>
	<img src={data.Poster} alt={data.Title} />
	<div class="info">
		<h4>{data.Title}</h4>
		<p class="year">{data.Year}</p>
		<p class="type">
			{data.Type === 'series' ? 'TV Show' : data.Type === 'movie' ? 'Movie' : 'Episode'}
		</p>
	</div>
</div>

<style>
	.card {
		background: white;
		border-radius: 10px;
		overflow: hidden;
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
		cursor: pointer;
		display: flex;
		flex-direction: column;
		transition:
			transform 0.2s ease,
			box-shadow 0.2s ease;
	}

	.card:hover {
		transform: translateY(-5px);
		box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
	}

	img {
		width: 100%;
		height: 300px;
		object-fit: cover;
	}

	.info {
		padding: 0.75rem 1rem;
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	h4 {
		font-size: 1rem;
		font-weight: bold;
		margin: 0;
		color: #222;
	}

	.year {
		color: #777;
		font-size: 0.9rem;
	}

	.type {
		color: blueviolet;
		font-weight: 600;
		font-size: 0.85rem;
		text-transform: uppercase;
	}

	@media (max-width: 600px) {
		img {
			height: 240px;
		}
	}
</style>
