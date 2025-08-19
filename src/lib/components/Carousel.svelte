<script>
	export let items = []; // array of image URLs
	export let height = 300; // carousel height in px

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
		{#each items as img}
			<img src={img} alt="Carousel Image" style="height:{height}px" />
		{/each}
	</div>
	<button class="arrow right" on:click={scrollRight} aria-label="Scroll right">▶</button>
</div>

<style>
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
		flex-shrink: 0;
		border-radius: 8px;
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

	@media (max-width: 1024px) {
		.carousel img {
			height: 280px !important;
		}
	}
	@media (max-width: 768px) {
		.carousel img {
			height: 200px !important;
		}
	}
</style>
