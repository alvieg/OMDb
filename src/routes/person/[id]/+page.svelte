<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';

	let data = {};
	let loading = true;
	let error = null;

	$: id = $page.params.id;

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

	async function getPerson() {
		loading = true;
		try {
			const res = await fetch(`/api/person?id=${id}`);
			if (!res.ok) throw new Error(`Failed to fetch person: ${res.status}`);
			data = await res.json();
		} catch (e) {
			error = e.message;
		} finally {
			loading = false;
		}
	}

	onMount(getPerson);
</script>

<main>
	{#if loading}
		<p>Loading person...</p>
	{:else if error}
		<p class="error">{error}</p>
	{:else}
		<div class="person-detail">
			<!-- Carousel -->
			{#if data.images?.length}
				<div class="carousel-container">
					<button class="arrow left" on:click={scrollLeft}>◀</button>
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
						{#each data.images as img}
							<img src={`https://image.tmdb.org/t/p/w300${img.file_path}`} alt={data.name} />
						{/each}
					</div>
					<button class="arrow right" on:click={scrollRight}>▶</button>
				</div>
			{/if}

			<div class="info">
				<h1>{data.name}</h1>
				<p class="meta">
					{#if data.birthday}Born: {data.birthday}{/if}
					{#if data.deathday}
						• Died: {data.deathday}{/if}
					{#if data.gender === 1}
						• Female{/if}
					{#if data.gender === 2}
						• Male{/if}
				</p>

				{#if data.biography}
					<h2>Biography</h2>
					<p class="bio">{data.biography}</p>
				{/if}

				{#if data.known_for?.length}
					<h2>Known For</h2>
					<div class="credits-grid">
						{#each data.known_for as c}
							<a href={`/${c.media_type}/${c.id}`} class="credit-card">
								<img
									src={c.poster_path
										? `https://image.tmdb.org/t/p/w200${c.poster_path}`
										: '/placeholder.png'}
									alt={c.title || c.name}
								/>
								<div class="rating">{c.title || c.name}</div>
							</a>
						{/each}
					</div>
				{/if}
			</div>
		</div>
	{/if}
</main>

<style>
	main {
		max-width: 1100px;
		margin: 2rem auto;
		padding: 0 1rem;
		font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
	}

	.error {
		color: red;
		font-weight: bold;
		text-align: center;
	}

	.person-detail {
		display: flex;
		flex-direction: column;
		gap: 2rem;
		background: #fff;
		border-radius: 10px;
		padding: 1.5rem;
		box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
	}

	.info {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	h1 {
		margin: 0;
		font-size: 2.2rem;
	}

	.meta {
		color: #666;
		font-size: 0.95rem;
	}

	h2 {
		margin-top: 1rem;
		font-size: 1.2rem;
		color: #333;
	}

	.bio {
		line-height: 1.5;
		font-size: 1rem;
		color: #444;
	}

	/* Carousel */
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
		height: 300px;
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

	/* Known-for grid */
	.credits-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
		gap: 1rem;
		margin-top: 1rem;
	}

	.credit-card {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		text-decoration: none;
		color: #222;
	}
	.credit-card img {
		width: 100%;
		border-radius: 6px;
		object-fit: cover;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
		transition: transform 0.3s;
	}
	.credit-card img:hover {
		transform: scale(1.05);
	}

	.credit-card .rating {
		background: #f7f7f7;
		padding: 0.4rem 0.6rem;
		border-radius: 6px;
		font-size: 0.9rem;
		margin-top: 0.3rem;
		width: 100%;
		text-align: center;
	}
</style>
