/** @type {import('./$types').PageLoad} */
export const load = async({fetch, params }) => {
	const headers = {
		method: 'GET'
	};
	const url = 'https://673032d166e42ceaf15fa407.mockapi.io/chemicallist';
	const res = await fetch(url,headers);
	const fetchData = await res.json();
	 
	return {	
		series: [
			{
				name: 'Revenue',
				data: [6356, 6218, 6156, 6526, 6356, 6256, 6056],
				color: '#EF562F'
			},
			{
				name: 'Revenue (previous period)',
				data: [6556, 6725, 6424, 6356, 6586, 6756, 6616],
				color: '#FDBA8C'
			}
		],
		chem_list: fetchData
	};
}