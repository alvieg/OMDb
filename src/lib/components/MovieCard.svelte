<script>
	import { goto } from '$app/navigation';

	export let data = {};

	function onclick() {
		// TMDb uses "media_type" for search results
		const type = data.media_type || (data.title ? 'movie' : data.name ? 'tv' : null);
		if (type && data.id) {
			goto(`/${type}/${data.id}`);
		}
	}

	// Poster URL handling
	$: poster = data.poster_path
		? `https://image.tmdb.org/t/p/w500${data.poster_path}`
		: 'https://via.placeholder.com/300x450?text=No+Image';

	// Title handling (movies have `title`, TV shows have `name`)
	$: title = data.title || data.name || 'Untitled';

	// Year handling
	$: year =
		data.release_date?.split('-')[0] || data.first_air_date?.split('-')[0] || 'Unknown Year';

	// Media type display
	$: typeLabel =
		data.media_type === 'tv' || data.name
			? 'TV Show'
			: data.media_type === 'movie' || data.title
				? 'Movie'
				: data.media_type === 'person'
					? 'Person'
					: 'Unknown';
</script>

<div class="card" on:click={onclick}>
	<img src={poster} alt={title} />
	<div class="info">
		<h4>{title}</h4>
		<p class="year">{year}</p>
		<p class="type">{typeLabel}</p>
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
		background: #eee;
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
