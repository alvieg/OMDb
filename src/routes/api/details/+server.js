import { json } from '@sveltejs/kit';

export async function GET({ url }) {
	const id = url.searchParams.get('id');
	const OMDB_API_KEY = process.env.OMDB_API_KEY || '9ad83c1d';

	if (!id) {
		return json({ error: 'Missing id or title' }, { status: 400 });
	}

	const apiUrl = `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${id}&plot=full`;

	try {
		const res = await fetch(apiUrl);
		const data = await res.json();
		return json(data);
	} catch (err) {
		return json({ error: 'Fetch failed' }, { status: 500 });
	}
}
