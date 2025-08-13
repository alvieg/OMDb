<script>
	import DetailPage from '$lib/components/DetailPage.svelte';
	import { get } from 'svelte/store';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	let data = {};
	let id = get(page).params.id;
	async function getDetails() {
		const res = await fetch(`/api/details?id=${id}`);
		data = await res.json();
	}

	onMount(getDetails);
</script>

<DetailPage {data} />
