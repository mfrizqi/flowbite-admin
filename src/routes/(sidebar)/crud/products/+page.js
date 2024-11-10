/** @type {import('./$types').PageLoad} */
export const load = async ({ fetch, params }) => {
	const headers = {
		method: 'GET'
	};
	const url = 'https://673032d166e42ceaf15fa407.mockapi.io/chemicallist';
	const res = await fetch(url, headers);
	const fetchData = await res.json();

	const element = JSON.parse(JSON.stringify(fetchData)).splice(0, 7)
	let sevenElement = element.map((el) => { return (Math.ceil(el.amount * 0.001)) })
	console.log(element)
	console.log(sevenElement)

	return {
		chem_list: fetchData,
	};
}