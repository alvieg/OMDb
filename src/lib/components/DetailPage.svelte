<script>
	export let data = {};

	$: title = data.title || data.name || 'Untitled';
	$: year =
		data.release_date?.split('-')[0] || data.first_air_date?.split('-')[0] || 'Unknown Year';
	$: runtime = data.runtime
		? `${data.runtime} min`
		: data.episode_run_time?.length
			? `${data.episode_run_time[0]} min/ep`
			: '';
	$: genres = data.genres?.map((g) => g.name).join(', ') || '';
	$: typeLabel = data.title ? 'Movie' : data.name ? 'TV Show' : 'Unknown';
	$: plot = data.overview || 'No overview available.';
	$: rating = data.vote_average
		? `${data.vote_average.toFixed(1)} / 10 (${data.vote_count} votes)`
		: null;
	$: cast = data.credits?.cast?.slice(0, 6) || [];
	$: directors = data.credits?.crew?.filter((c) => c.job === 'Director') || [];
	$: trailers = (data.videos || []).filter((v) => v.site === 'YouTube').slice(0, 4);
	$: images = data.images?.map((i) => `https://image.tmdb.org/t/p/original${i.file_path}`) || [];

	let carouselEl;
	let startX = 0;
	let scrollLeftStart = 0;
	let isDragging = false;

	function scrollLeft() {
		carouselEl.scrollBy({ left: -400, behavior: 'smooth' });
	}
	function scrollRight() {
		carouselEl.scrollBy({ left: 400, behavior: 'smooth' });
	}
	function onPointerDown(e) {
		isDragging = true;
		startX = e.clientX || e.touches[0].clientX;
		scrollLeftStart = carouselEl.scrollLeft;
	}
	function onPointerMove(e) {
		if (!isDragging) return;
		const x = e.clientX || e.touches[0].clientX;
		const walk = startX - x;
		carouselEl.scrollLeft = scrollLeftStart + walk;
	}
	function onPointerUp() {
		isDragging = false;
	}
</script>

<div class="detail">
	<!-- Carousel -->
	{#if images.length > 0}
		<div class="carousel-container">
			<button class="arrow left" on:click={scrollLeft} aria-label="Scroll left">◀</button>
			<div
				class="carousel"
				bind:this={carouselEl}
				on:pointerdown={onPointerDown}
				on:pointermove={onPointerMove}
				on:pointerup={onPointerUp}
				on:pointerleave={onPointerUp}
				on:touchstart={onPointerDown}
				on:touchmove={onPointerMove}
				on:touchend={onPointerUp}
			>
				{#each images as img}
					<img src={img} alt="Movie Image" />
				{/each}
			</div>
			<button class="arrow right" on:click={scrollRight} aria-label="Scroll right">▶</button>
		</div>
	{/if}

	<div class="info">
		<h1>{title}</h1>
		<p class="meta">
			<span>{typeLabel}</span> • {year}
			{runtime ? `• ${runtime}` : ''}
		</p>
		{#if genres}<p class="genre">{genres}</p>{/if}
		<p class="plot">{plot}</p>

		{#if rating}
			<div class="ratings">
				<div class="rating"><strong>TMDb Rating:</strong> {rating}</div>
			</div>
		{/if}

		{#if cast.length > 0}
			<p class="people">
				<strong>Cast:</strong>
				{#each cast as c, i}
					<a href={`/person/${c.id}`} class="person-btn">{c.name}</a>{i < cast.length - 1
						? ', '
						: ''}
				{/each}
			</p>
		{/if}

		{#if directors.length > 0}
			<p class="people">
				<strong>Director{directors.length > 1 ? 's' : ''}:</strong>
				{#each directors as d, i}
					<a href={`/person/${d.id}`} class="person-btn">{d.name}</a>{i < directors.length - 1
						? ', '
						: ''}
				{/each}
			</p>
		{/if}

		{#if trailers.length > 0}
			<div class="trailers">
				{#each trailers as video}
					<iframe
						width="560"
						height="315"
						src={`https://www.youtube.com/embed/${video.key}`}
						title={video.name}
						allowfullscreen
					></iframe>
				{/each}
			</div>
		{/if}
	</div>
</div>

<style>
	.detail {
		display: flex;
		flex-direction: column;
		background: #fff;
		border-radius: 10px;
		box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
		padding: 1rem 2rem;
		gap: 2rem;
		max-width: 1200px;
		margin: 2rem auto;
	}

	.carousel-container {
		position: relative;
		display: flex;
		align-items: center;
		user-select: none;
		margin-bottom: 2rem;
	}

	.carousel {
		display: flex;
		overflow-x: auto;
		scroll-behavior: smooth;
		gap: 0.5rem;
		padding: 0.5rem 0;
		cursor: grab;
	}
	.carousel:active {
		cursor: grabbing;
	}
	.carousel img {
		height: 350px;
		border-radius: 8px;
		flex-shrink: 0;
		box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
		transition: transform 0.3s;
	}
	.carousel img:hover {
		transform: scale(1.05);
	}

	.arrow {
		background: rgba(0, 0, 0, 0.5);
		color: white;
		border: none;
		border-radius: 50%;
		width: 44px;
		height: 44px;
		font-size: 1.4rem;
		display: flex;
		align-items: center;
		justify-content: center;
		position: absolute;
		z-index: 10;
		cursor: pointer;
	}
	.arrow.left {
		left: 0;
	}
	.arrow.right {
		right: 0;
	}
	.arrow:hover {
		background: rgba(0, 0, 0, 0.8);
	}

	.info {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}
	h1 {
		margin: 0;
		font-size: 2.5rem;
		color: #222;
	}
	.meta {
		color: #666;
		font-size: 1rem;
	}
	.genre {
		color: blueviolet;
		font-weight: 600;
	}
	.plot {
		margin: 1rem 0;
		line-height: 1.5;
		font-size: 1.1rem;
	}
	.ratings {
		margin-top: 1rem;
	}
	.rating {
		background: #f7f7f7;
		padding: 0.5rem 0.8rem;
		border-radius: 6px;
		font-size: 1rem;
		display: inline-block;
		margin-bottom: 0.5rem;
	}
	.people {
		margin-top: 1rem;
	}
	.person-btn {
		background: #f7f7f7;
		padding: 0.4rem 0.8rem;
		border-radius: 6px;
		font-size: 0.95rem;
		font-weight: 500;
		color: #222;
		text-decoration: none;
		margin-right: 0.3rem;
		display: inline-block;
	}
	.person-btn:hover {
		background: #e0e0e0;
	}

	.trailers {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
		margin-top: 1.5rem;
	}

	@media (max-width: 1024px) {
		.carousel img {
			height: 280px;
		}
	}
	@media (max-width: 768px) {
		.carousel img {
			height: 200px;
		}
		iframe {
			width: 100%;
			height: auto;
		}
	}
</style>
