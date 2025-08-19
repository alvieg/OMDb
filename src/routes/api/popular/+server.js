import { json } from '@sveltejs/kit';

export async function GET({ url }) {
	const type = url.searchParams.get('type') || 'movie'; // movie or tv
	const page = url.searchParams.get('page') || 1;

	const API_KEY = process.env.TMDB_API_KEY; // add your TMDb API key to .env

	if (!API_KEY) {
		return json({ error: 'Missing TMDB_API_KEY environment variable' }, { status: 500 });
	}

	const validTypes = ['movie', 'tv'];
	if (!validTypes.includes(type)) {
		return json({ error: 'Invalid type. Must be "movie" or "tv".' }, { status: 400 });
	}

	const apiUrl = `https://api.themoviedb.org/3/${type}/popular?api_key=${API_KEY}&language=en-US&page=${page}`;

	try {
		const res = await fetch(apiUrl);
		if (!res.ok) throw new Error(`TMDb fetch failed: ${res.status}`);
		const data = await res.json();
		return json(data);
	} catch (err) {
		console.error(err);
		return json({ error: 'Failed to fetch popular content' }, { status: 500 });
	}
}
