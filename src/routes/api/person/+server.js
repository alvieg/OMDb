import { json } from '@sveltejs/kit';

export async function GET({ url }) {
	const id = url.searchParams.get('id');
	const API_KEY = process.env.TMDB_API_KEY;

	if (!id) return json({ error: 'Missing id' }, { status: 400 });
	if (!API_KEY) return json({ error: 'Missing TMDB_API_KEY' }, { status: 500 });

	try {
		// Person details
		const res = await fetch(
			`https://api.themoviedb.org/3/person/${id}?api_key=${API_KEY}&language=en-US`
		);
		if (!res.ok) throw new Error(`TMDb request failed with ${res.status}`);
		const data = await res.json();

		// Person images
		const imgRes = await fetch(
			`https://api.themoviedb.org/3/person/${id}/images?api_key=${API_KEY}`
		);
		const imgData = await imgRes.json();
		data.images = imgData.profiles?.slice(0, 10) || [];

		// Known-for movies/TV
		const creditsRes = await fetch(
			`https://api.themoviedb.org/3/person/${id}/combined_credits?api_key=${API_KEY}&language=en-US`
		);
		const creditsData = await creditsRes.json();
		data.known_for = (creditsData.cast || []).slice(0, 6); // limit to 6 items

		return json(data);
	} catch (err) {
		console.error(err);
		return json({ error: 'Failed to fetch person from TMDb' }, { status: 500 });
	}
}
