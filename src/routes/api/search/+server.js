import { json } from '@sveltejs/kit';

export async function GET({ url }) {
	const q = url.searchParams.get('q');
	const type = url.searchParams.get('type');
	const page = url.searchParams.get('page') ?? 1;

	if (!q) {
		return json({ error: "Missing required query parameter 'q'" }, { status: 400 });
	}

	const OMDB_API_KEY = process.env.OMDB_API_KEY || '9ad83c1d';

	if (!OMDB_API_KEY) {
		return json({ error: 'Missing OMDB_API_KEY environment variable' }, { status: 500 });
	}

	const omdbURL = new URL('https://www.omdbapi.com/');
	omdbURL.searchParams.set('apikey', OMDB_API_KEY);
	omdbURL.searchParams.set('s', q);
	omdbURL.searchParams.set('page', page);

	if (type) omdbURL.searchParams.set('type', type);

	try {
		const res = await fetch(omdbURL.toString());
		const data = await res.json();
		return json(data);
	} catch (err) {
		console.error(err);
		return json({ error: 'Failed to fetch from OMDb' }, { status: 500 });
	}
}
