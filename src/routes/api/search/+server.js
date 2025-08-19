import { json } from '@sveltejs/kit';

export async function GET({ url }) {
	const q = url.searchParams.get('q');
	const type = url.searchParams.get('type') || 'multi'; // default to multi search
	const page = url.searchParams.get('page') ?? 1;

	if (!q) {
		return json({ error: "Missing required query parameter 'q'" }, { status: 400 });
	}

	// Use TMDB API key instead of OMDb
	const API_KEY = process.env.TMDB_API_KEY;

	if (!API_KEY) {
		return json({ error: 'Missing TMDB_API_KEY environment variable' }, { status: 500 });
	}

	// Build TMDb URL
	// type can be: movie, tv, or multi
	const tmdbURL = new URL(`https://api.themoviedb.org/3/search/${type}`);
	tmdbURL.searchParams.set('api_key', API_KEY);
	tmdbURL.searchParams.set('query', q);
	tmdbURL.searchParams.set('page', page);

	try {
		const res = await fetch(tmdbURL.toString());
		const data = await res.json();
		return json(data);
	} catch (err) {
		console.error(err);
		return json({ error: 'Failed to fetch from TMDb' }, { status: 500 });
	}
}
