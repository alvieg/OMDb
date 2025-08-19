<script>
	import SearchBar from './SearchBar.svelte';
</script>

<nav>
	<a href="/" class="logo-link" aria-label="Home">
		<p class="logo">
			TV<span class="purple">Db</span>
		</p>
	</a>
	<div class="search">
		<SearchBar />
	</div>
</nav>

<style>
	nav {
		position: relative;
		display: flex;
		align-items: center;
		height: 60px;
		background: #111;
		color: white;
		padding: 0 2rem;
		box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
	}

	.logo-link {
		z-index: 2; /* keep logo clickable */
	}

	.logo {
		font-size: 1.9rem;
		font-weight: 700;
		letter-spacing: 1.2px;
		color: white;
		margin: 0;
		user-select: none;
	}

	.logo .purple {
		color: blueviolet;
	}

	.search {
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		width: 400px;
		max-width: 90vw;
		z-index: 1;
	}

	/* Optional: prevent logo and search overlap on small screens */
	@media (max-width: 600px) {
		nav {
			height: auto;
			flex-direction: column;
			padding: 1rem;
		}

		.logo-link {
			margin-bottom: 0.75rem;
		}

		.search {
			position: static;
			transform: none;
			width: 100%;
			max-width: none;
		}
	}
</style>
