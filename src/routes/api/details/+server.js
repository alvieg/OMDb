import { json } from '@sveltejs/kit';

export async function GET({ url }) {
	const id = url.searchParams.get('id');
	let type = url.searchParams.get('type') || 'movie';
	const API_KEY = process.env.TMDB_API_KEY;

	if (!id) return json({ error: 'Missing id' }, { status: 400 });
	if (!API_KEY) return json({ error: 'Missing TMDB_API_KEY' }, { status: 500 });

	// Ensure type is either movie or tv
	type = type.toLowerCase();
	if (type !== 'movie' && type !== 'tv') type = 'movie';

	try {
		// Fetch main details
		const res = await fetch(
			`https://api.themoviedb.org/3/${type}/${id}?api_key=${API_KEY}&language=en-US`
		);
		if (!res.ok) throw new Error(`TMDb details request failed with ${res.status}`);
		const data = await res.json();

		// Fetch images (safe)
		try {
			const imgRes = await fetch(
				`https://api.themoviedb.org/3/${type}/${id}/images?api_key=${API_KEY}`
			);
			const imgData = await imgRes.json();
			data.images = [
				...(imgData.posters || []).slice(0, 5),
				...(imgData.backdrops || []).slice(0, 5)
			];
		} catch {
			data.images = [];
		}

		// Fetch videos (safe)
		try {
			const vidRes = await fetch(
				`https://api.themoviedb.org/3/${type}/${id}/videos?api_key=${API_KEY}`
			);
			const vidData = await vidRes.json();
			data.videos = (vidData.results || []).filter((v) => v.site === 'YouTube');
		} catch {
			data.videos = [];
		}

		// Fetch credits (safe)
		try {
			const credRes = await fetch(
				`https://api.themoviedb.org/3/${type}/${id}/credits?api_key=${API_KEY}`
			);
			const credits = await credRes.json();
			data.credits = credits;
		} catch {
			data.credits = { cast: [], crew: [] };
		}

		return json(data);
	} catch (err) {
		console.error('TMDb fetch error:', err);
		return json({ error: 'Failed to fetch from TMDb' }, { status: 500 });
	}
}
