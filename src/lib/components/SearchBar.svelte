<script>
	import { goto } from '$app/navigation';

	let query = '';
	let type = 'all';
	function onSubmit() {
		goto(`/search?q=${encodeURIComponent(query)}${type !== 'all' ? `&type=${type}` : ''}`);
	}
</script>

<form on:submit|preventDefault={onSubmit}>
	<input type="text" placeholder="Search A Movie..." bind:value={query} />
	<select bind:value={type}>
		<option value="all" selected>All</option>
		<option value="movie">Movie</option>
		<option value="series">TV Show</option>
		<option value="episode">Episode</option>
	</select>
</form>

<style>
	form {
		display: flex;
		align-items: center;
		width: 100%;
		max-width: 400px;
		background: white;
		border-radius: 50px;
		overflow: hidden;
		box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
		height: 40px;
	}

	form input {
		flex: 1;
		padding: 0 1rem;
		border: none;
		outline: none;
		font-size: 0.95rem;
		height: 100%;
	}

	form select {
		padding: 0 1rem;
		border: none;
		border-left: 1px solid #ddd;
		outline: none;
		font-size: 0.9rem;
		background: #f8f8f8;
		cursor: pointer;
		height: 100%;
		border-top-right-radius: 50px;
		border-bottom-right-radius: 50px;
	}

	form select:focus,
	form input:focus {
		background: #f0f0f0;
	}

	form select::-webkit-scrollbar {
		width: 0;
		background: transparent;
	}
</style>
